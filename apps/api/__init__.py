import os
from llm_express.settings import BASE_DIR, MEDIA_ROOT

PROFILE_IMAGE_PATH = os.path.join("profile-images")
PROFILE_IMAGE_STORE_PATH = os.path.join(BASE_DIR, MEDIA_ROOT, PROFILE_IMAGE_PATH)