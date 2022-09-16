from rest_framework import serializers
from ..models import Post, Vote, City, Country, Continent

class PostSerializer(serializers.ModelSerializer):
    poster = serializers.ReadOnlyField(source='poster.username')
    poster_id = serializers.ReadOnlyField(source='poster.id')
    class Meta:
        model = Post
        fields = ['id', 'url', 'poster','poster_id','country','city','description','created', 'changed']

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id']