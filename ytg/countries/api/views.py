from django.shortcuts import render
from rest_framework import generics, permissions, mixins, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from ..models import Post, Vote, Country, City, Place
from .serializers import PostSerializer, VoteSerializer, \
                        CityListSerializer, CityDetailtSerializer,\
                        CountryListSerializer, CountryDetailSerializer,\
                        PlaceListSerializer, PlaceDetailSerializer 


#Post
class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def perform_create(self, serializer):
        serializer.save(poster=self.request.user)
    
class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def delete(self, request, *args, **kwargs):
        post = Post.objects.filter(pk=kwargs['pk'], poster=self.request.user)
        if post.exists():
            return self.destroy(request, *args, **kwargs)
        else:
            raise ValidationError("Heh this is not your post dude")
        

#Vote    
class VoteCreate(generics.CreateAPIView, mixins.DestroyModelMixin):
    serializer_class = VoteSerializer
    
    def get_queryset(self):
        user = self.request.user
        post = Post.objects.get(pk=self.kwargs['pk'])
        return Vote.objects.filter(voter=user, post=post)
    
    def perform_create(self, serializer):
        post=Post.objects.get(pk=self.kwargs['pk'])
        if self.get_queryset().exists():
            raise ValidationError("You already Vote for that post")
        else:
            serializer.save(voter=self.request.user, post=post)
    
    def delete(self, request, *args, **kwargs):
        post = Post.objects.get(pk=self.kwargs['pk'])
        if self.get_queryset().exists():
            self.get_queryset().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise ValidationError("You never voted for this post")
            

#City
class CityList(generics.ListAPIView):
    serializer_class = CityListSerializer

    def get_queryset(self):
        return City.objects.all()
    
class CityRetrieve(generics.RetrieveAPIView):
    serializer_class = CityDetailtSerializer

    def get_queryset(self):
        return City.objects.all()

    
#Country
class CountryList(generics.ListAPIView):
    serializer_class = CountryListSerializer

    def get_queryset(self):
        return Country.objects.all()

class CountryRetrieve(generics.RetrieveAPIView):
    serializer_class = CountryDetailSerializer

    def get_queryset(self):
        return Country.objects.all()


#Place TODO Places - maybe users can add some places, but places should be revieved by admin
class PlaceList(generics.ListAPIView):
    serializer_class = PlaceListSerializer

    def get_queryset(self):
        return Place.objects.all()


class PlaceRetrieve(generics.RetrieveAPIView):
    serializer_class = PlaceDetailSerializer

    def get_queryset(self):
        return Place.objects.all()