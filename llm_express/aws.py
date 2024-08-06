# database, s3 bucket and everything required as a part of application itself will be coming here.
import os
import json
import logging
import dotenv
import boto3
from boto3.dynamodb.conditions import Attr
dotenv.load_dotenv()

class ConversationHistory:
    def __init__(self):
        self.access_key = os.environ.get("ACCESS_KEY")
        self.secret_key = os.environ.get("SECRET_KEY")
        self.default_region = os.environ.get("DEFAULT_REGION")
        self.session = boto3.session.Session(
                            aws_access_key_id=self.access_key,
                            aws_secret_access_key=self.secret_key,
                            region_name=self.default_region
                        )
        self.db_client = self.session.resource("dynamodb")
        self.conversation_history = self.db_client.Table("conversation_history")
    
    def get_chats_on_model(self, model_id, user_id):
        data = self.conversation_history.scan(
            FilterExpression=Attr("user_id").eq(user_id) & Attr("model_id").eq(model_id),
            Select="SPECIFIC_ATTRIBUTES",
            ProjectionExpression="id,chat_history"
        )
        context = []
        for item in data.get("Items", []):
            chat_id = item.get("id")
            first_message = ""
            chat_history = json.loads(item.get("chat_history", "[]"))
            if chat_history:
                first_message = chat_history[0].get("content")
            context.append({"id": chat_id, "first_message": first_message})    
        return context

    def get_chat_data(self, chat_id, user_id) -> dict:
        try:
            data = self.conversation_history.get_item(Key={
                    "id": chat_id, "user_id": user_id
                    }).get("Item", {})
            return data
        except:
            return {}
        
    def add_update_chat_data(self, data):
        """
            data = {
                "id": "chat-id",
                "user_id": "user-id",
                "model_id": "model-id-from-db-entry",
            }
        """
        # returns: status, error
        try:
            resp = self.conversation_history.put_item(Item=data)
            if resp.get("ResponseMetadata", {}).get("HTTPStatusCode") in (200, 201):
                return True, None
        except Exception as err:
            logging.error(f"Failed on adding/updating chat to dynamodb, Error: {err}")
            return False, err

    def delete_chat(self, chat_id, user_id):
        try:
            resp = self.conversation_history.delete_item(Key={"id": chat_id, "user_id": user_id})
            if resp.get("ResponseMetadata", {}).get("HTTPStatusCode") in (200, 201):
                return True
            else:
                return False
        except:
            logging.error(f"Error on deleting chat")
            return False
    
    def delete_all_chats(self, model_id, user_id):
        try:
            resp = self.conversation_history.scan(
                        FilterExpression=Attr("model_id").eq(model_id) &
                        Attr("user_id").eq(user_id)
                    )
            chats_to_delete = []
            for chat in resp.get("Items", []):
                chats_to_delete.append({"id": chat.get("id"), "user_id": chat.get("user_id") })
            
            with self.conversation_history.batch_writer() as batch:
                for item in chats_to_delete:
                    batch.delete_item(Key={
                        "id": item["id"],
                        "user_id": item["user_id"],
                    })
            return True
        except:
            logging.error(f"Error on deleting chats")
            return False