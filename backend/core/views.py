from rest_framework.decorators import api_view
from rest_framework.response import Response
from firebase_admin import auth as firebase_auth
from firebase_admin import exceptions as firebase_exceptions
import firebase_admin_setup

@api_view(['GET'])
def protected_view(request):
    id_token = request.headers.get('Authorization')
    if not id_token:
        return Response({"error": "No token provided"}, status=401)

    try:
        decoded_token = firebase_auth.verify_id_token(id_token.split(' ').pop())
        uid = decoded_token['uid']
        return Response({"message": f"Hello, user {uid}!"})
    except firebase_exceptions.FirebaseError:
        return Response({"error": "Invalid token"}, status=401)
