import logging
import os
from .settings import STATICFILES_DIRS, MEDIA_ROOT, BASE_DIR, MODEL_ROOT


# Logging Config
logging.basicConfig(
    format="[%(asctime)s] %(levelname)s: %(message)s",
    level=logging.INFO,
    datefmt="%Y-%m-%d %I:%M:%S %p",
)

# Create media & static dirs
MEDIA_DIR = os.path.join(BASE_DIR, MEDIA_ROOT)
os.makedirs(BASE_DIR, exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, MODEL_ROOT), exist_ok=True)

for folder in STATICFILES_DIRS:
    os.makedirs(folder, exist_ok=True)