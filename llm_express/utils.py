from .settings import CIPHER_SECRET
from cryptography.fernet import Fernet

class CryptoService:
    def __init__(self):
        self.cipher_suite = Fernet(CIPHER_SECRET)
    
    def encrypt(self, plain_text: str) -> str:
        return self.cipher_suite.encrypt(plain_text.encode()).decode()

    def decrypt(self, cipher_text: str) -> str:
        return self.cipher_suite.decrypt(cipher_text.encode()).decode()