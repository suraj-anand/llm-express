import os
import joblib
import logging
import boto3
from botocore.client import Config
from langchain_aws import BedrockLLM
from llm_express.settings import MODEL_ROOT

class BedrockModel:
    def __init__(self, model_id, bedrock_client, model_kwargs={}, region="", aws_access_key_id="", aws_secret_access_key=""):
        self.aws_access_key_id = aws_access_key_id
        self.aws_secret_access_key = aws_secret_access_key
        self.model_id = model_id
        self.region = region
        self.client = bedrock_client
        self.llm = BedrockLLM(model_id=model_id, client=bedrock_client, model_kwargs=model_kwargs)

    def __getstate__(self):
        state = self.__dict__.copy()
        del state['client']
        del state['llm']
        return state

    def __setstate__(self, state):
        self.__dict__.update(state)
        self.client = self._recreate_client()
        self.llm = BedrockLLM(model_id=self.model_id, client=self.client)

    def _recreate_client(self):
        return boto3.session.Session(
            aws_access_key_id=self.aws_access_key_id, 
            aws_secret_access_key=self.aws_secret_access_key
        ).client("bedrock-runtime",
                config=Config(connect_timeout=300, read_timeout=300, retries={'max_attempts': 2}),
                region_name=self.region
            )

class AwsAPI:
    def __init__(self, aws_access_key, aws_secret_access_key):
        self.aws_access_key_id = aws_access_key
        self.aws_secret_access_key = aws_secret_access_key
        self.session = boto3.session.Session(aws_access_key_id=aws_access_key, aws_secret_access_key=aws_secret_access_key)
        self.bedrock_client = self.session.client("bedrock")
        self.config = Config(connect_timeout=300, read_timeout=300, retries={'max_attempts': 2})

    def validate_access(self):
        try:
            resp = self.bedrock_client.list_custom_models()
            if resp.get("ResponseMetadata", {}).get("HTTPStatusCode") in (200, 201):
                return True
            else:
                return False
        except Exception as e:
            return False
    
    def list_models(self):
        return self.bedrock_client.list_foundation_models().get("modelSummaries", [])
    
    def create_model(self, model_id, model_kwargs={}, region="ap-south-1"):
        try:
            bedrock_client = self.session.client("bedrock-runtime", config=self.config, region_name=region)
            model = BedrockModel(
                model_id, bedrock_client, model_kwargs,
                region, self.aws_access_key_id, self.aws_secret_access_key, 
            )
            return model
        except Exception as e:
            logging.error(f"Failure on creating {model_id}, Error: {e}")
            return False

def save_model(model, model_id="", user_id=""):
    try:
        model_path = os.path.join(MODEL_ROOT, user_id)
        os.makedirs(model_path, exist_ok=True)
        joblib.dump(model, open(os.path.join(model_path, f"{model_id}.pkl"), "wb"))
    except Exception as err:
        logging.error(f"Failure on saving model locally, error: {err}")
        raise Exception("Error on saving model")

def load_model(model_id, user_id):
    model_path = os.path.join(MODEL_ROOT, user_id, f"{model_id}.pkl")
    if not os.path.exists(model_path):
        raise Exception(f"no model exist on {model_path}")
    try:
        model = joblib.load(open(model_path, "rb"))
        return model
    except:
        raise Exception("error on loading model")