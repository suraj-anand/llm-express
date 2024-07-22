import jwt
from llm_express.settings import JWT_SECRET
from rest_framework.permissions import BasePermission

def authenticated_resource(request):
    try:
        token = request.session.get("token")
        if not token:
            return False
        user_data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        if isinstance(user_data, dict):
            return True
        else:
            return False
    except Exception as err:
        return False
    
class Authenticated(BasePermission):
    def has_permission(self, request, view):
        return authenticated_resource(request)
        
class PostOnlyAuthenticated(BasePermission):
    def has_permission(self, request, view):
        if request.method == "POST":
            return authenticated_resource(request)
        return True
        
class DeleteOnlyAuthenticated(BasePermission):
    def has_permission(self, request, view):
        if request.method == "DELETE":
            return authenticated_resource(request)
        return True

class PutDeleteOnlyAuthenticated(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["PUT", "PATCH", "DELETE"]:
            return authenticated_resource(request)
        return True
    
class PostPutDeleteOnlyAuthenticated(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["POST", "PUT", "PATCH" ,"DELETE"]:
            return authenticated_resource(request)
        return True