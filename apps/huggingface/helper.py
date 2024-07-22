import requests
from .exceptions import InvalidTokenException

class HuggingFaceAPI:
    def __init__(self, token):
        self.baseURL = "https://huggingface.co"
        self.headers = {
            "Authorization": f"Bearer {token}"
        }
    
    def whoAmI(self):
        url = f"{self.baseURL}/api/whoami-v2"
        response = requests.get(url, headers=self.headers)
        if response.status_code not in (200,):
            raise InvalidTokenException(f"{self.headers['Authorization']} is invalid")
        else:
            return response.json()
