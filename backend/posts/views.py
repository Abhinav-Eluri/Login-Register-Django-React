from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import UserSerializer, PostSerializer
from rest_framework.decorators import action
from .models import Post
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    print("I got request")

    @action(detail=False, methods=['post'])
    def register(self,request):
        print("Request data", request.data)
        if not User.objects.filter(username=request.data['username']).exists():
            if not User.objects.filter(email=request.data['email']).exists():
                if request.data['password'] == request.data['confirm_password']:
                    User.objects.create_user(
                        username=request.data['username'],
                        password=request.data['password'],
                        email=request.data['email']
                    )
                    return Response({"message": "User registered successfully.", "status": 200})
                else:
                    return Response({"message": "Password and Confirm Password do not match.", "status": 400})
            else:
                return Response({"message": "User with this email already exists.", "status": 400})
        else:
            return Response({"message": "User with this username already exists." , "status": 400})

    @action(detail=False, methods=['post'])
    def login(self,request):
        print("Request data", request.data)
        user = User.objects.filter(email=request.data['email']).first()
        if user:
            if user.check_password(request.data['password']):
                return Response({"message": "User logged in successfully.", "status": 200})
            else:
                return Response({"message": "Invalid credentials.", "status": 400})
        else:
            return Response({"message": "User not found.", "status": 400})



class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer