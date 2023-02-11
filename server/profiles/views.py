from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer, ProfileUpdateSerializer
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


class ProfileUpdate(generics.UpdateAPIView):
    serializer_class = ProfileUpdateSerializer
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        profile = user.profile
        serializer = ProfileUpdateSerializer(profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        updated_profile = serializer.save()
        return Response(
            ProfileSerializer(updated_profile, context={"request": request}).data,
            status=status.HTTP_200_OK,
        )
