from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Post


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PostSerializer(ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'date_posted', 'updated_at', 'author']
