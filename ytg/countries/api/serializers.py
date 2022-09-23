from dataclasses import fields
from rest_framework import serializers
from ..models import Post, Vote, City, Country, Continent, Language, Currency

class PostSerializer(serializers.ModelSerializer):
    poster = serializers.ReadOnlyField(source='poster.username')
    poster_id = serializers.ReadOnlyField(source='poster.id')
    votes = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'url', 'poster','poster_id','country','city','description','created', 'changed', 'votes']

    def get_votes(self, post):
        return Vote.objects.filter(post=post).count()
    
class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id']
        
        
class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name', 'description', 'photo', 'country', 
                  'safety', 'population', 'understanding_english']

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name']
     
class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['id', 'name']   
        
class CountrySerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, source='city_set')
    languages = LanguageSerializer(many=True)
    currencies = CurrencySerializer(many=True)
    class Meta:
        model = Country
        fields = [
            'id', 'name', 'description', 
            'photo', 'flag', 'continent', 'cities',
            'languages', 'population', 'understanding_english',
            'safety', 'currencies'      
                  ]
        

