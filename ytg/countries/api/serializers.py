from dataclasses import fields
from rest_framework import serializers
from ..models import Post, Vote, City, Country, Continent, Language, Currency, Place
#PostSerializers
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
        
        

        
#LanguageSerializers
class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name']
 
     
class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['id', 'name']   
   
 
#CitySerializers        
class CityDetailtSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = City
        fields = ['id', 'name', 'description', 'photo', 'country', 
                  'safety', 'population', 'understanding_english']
        
      
class CityListSerializer(serializers.HyperlinkedModelSerializer):
    city_url = serializers.HyperlinkedIdentityField(view_name='city-detail')
    class Meta:
        model = City
        fields = ['id', 'name', 'photo', 'city_url']
        
        

#CountrySerializers             
class CountryDetailSerializer(serializers.HyperlinkedModelSerializer):
    cities = CityListSerializer(many=True, source='city_set')
    capital = CityListSerializer()
    languages = LanguageSerializer(many=True)
    currencies = CurrencySerializer(many=True)
    class Meta:
        model = Country
        fields = [
            'id', 'name', 'description', 
            'photo', 'flag',  'cities',
            'languages', 'population', 'understanding_english',
            'safety', 'currencies' , 'capital' , 
                  ]
        
        
class CountryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name','photo', 'flag']  
        
              
#PlaceSerializers
class PlaceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id', 'city', 'name', 'description']
        
        
        
class PlaceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id', 'city', 'name', 'description']
