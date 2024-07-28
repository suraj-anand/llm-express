import boto3

class AwsAPI:
    def __init__(self, aws_access_key, aws_secret_access_key):
        self.aws_access_key_id = aws_access_key
        self.aws_secret_access_key = aws_secret_access_key
        self.session = boto3.session.Session(aws_access_key_id=aws_access_key, aws_secret_access_key=aws_secret_access_key)
        self.bedrock_client = self.session.client("bedrock")

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