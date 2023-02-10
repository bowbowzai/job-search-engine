from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer
from users.models import MyUser


# Create your views here.
class RetrieveUser(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(MyUser, id=user_id)
        user_profile = ProfileSerializer(
            user.profile,
            context={
                "request": request,
            },
        )
        return Response(user_profile.data, status=status.HTTP_200_OK)
