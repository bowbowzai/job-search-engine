import json
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import authenticate
from users.models import MyUser
from profiles.serializers import ProfileSerializer


# # Create your views here.
# @api_view(["POST"])
# def login(request: Request, *args, **kwargs):
#     user = authenticate(
#         email=request.data.get("email"), password=request.data.get("password")
#     )
#     if user is not None:
#         refresh = RefreshToken.for_user(user)
#         tokens = {
#             "refresh": str(refresh),
#             "access": str(refresh.access_token),
#         }
#         user_profile = ProfileSerializer(
#             user.profile, context={"request": request}
#         ).data
#         response = Response(
#             data={
#                 "status": True,
#                 "message": "Login successful",
#                 "user": user_profile,
#             },
#             status=status.HTTP_200_OK,
#         )
#         response["Access-Control-Allow-Credentials"] = "True"
#         response["Access-Control-Allow-Origin"] = "http://localhost:5173"
#         response[
#             "Access-Control-Allow-Headers"
#         ] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
#         response.set_cookie(
#             "tokens",
#             json.dumps(tokens),
#             max_age=None,
#             expires=None,
#             samesite=None,
#             domain="127.0.0.1",
#         )
#         return response
#     else:
#         return Response(
#             "Invalid username or password", status=status.HTTP_401_UNAUTHORIZED
#         )


# @api_view(["POST"])
# def refresh_token(request: Request, *args, **kwargs):
#     refresh_token_str = request.COOKIES.get("tokens")
#     if not refresh_token_str:
#         return Response(
#             {"message": "Refresh token not found"}, status=status.HTTP_401_UNAUTHORIZED
#         )

#     try:
#         refresh_token_dict = json.loads(refresh_token_str)
#         refresh_token = RefreshToken(refresh_token_dict.get("refresh"))
#         user_id = refresh_token.payload.get("user_id")
#         user = get_object_or_404(MyUser, id=user_id)
#         refresh_token.blacklist()
#         new_tokens = RefreshToken.for_user(user)
#         tokens = {
#             "refresh": str(new_tokens),
#             "access": str(new_tokens.access_token),
#         }
#     except TokenError as e:
#         return Response(
#             {"message": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED
#         )
#     response = Response({"message": "Token refreshed"})
#     response.set_cookie(
#         "tokens",
#         json.dumps(tokens),
#         httponly=True,
#         max_age=None,
#         expires=None,
#     )
#     return response


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def logout(request: Request, *args, **kwargs):
    refresh_token_str = request.data.get("refresh")
    if not refresh_token_str:
        return Response(
            {"message": "Refresh token not found"}, status=status.HTTP_401_UNAUTHORIZED
        )
    refresh_token = RefreshToken(refresh_token_str)
    refresh_token.blacklist()
    response = Response(
        {"message": "logout successfully"}, status=status.HTTP_204_NO_CONTENT
    )
    return response
