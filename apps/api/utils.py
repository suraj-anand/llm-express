import jwt
import logging
from llm_express.settings import JWT_SECRET
from rest_framework.response import Response
from rest_framework import status
import traceback 

def authenticated_resource(func):
    def wrapper(*args, **kwargs):
        request = args[0];
        try:
            token = request.session.get("token")
            if not token:
                return Response({"detail": "Token missing"}, status=status.HTTP_400_BAD_REQUEST)
            
            user_data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            if isinstance(user_data, dict):
                return func(*args, **kwargs)
            else:
                return Response({"detail": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            traceback.print_exception(err)
            logging.error(f"Exception on checking authenticated_resource, Error: {err}")
            return Response({"detail": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)
    return wrapper

def parse_user_session(request):
    try:
        token = request.session.get("token")
        if not token:
            raise Exception({"detail": "Token missing"})
        user_data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        if isinstance(user_data, dict):
            return user_data
        else:
            return {}
    except Exception as err:
        traceback.print_exception(err)
        logging.error(f"Failed on decoding user session")
        return {}