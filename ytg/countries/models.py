from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.ForeignKey('Country', on_delete=models.CASCADE)
    city = models.ForeignKey('City', on_delete=models.CASCADE)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    changed = models.DateTimeField(auto_now=True)
    
    # tags
    # rate

    class Meta:
        ordering = ['-created']
        verbose_name = "Post"
        verbose_name_plural = "Posts"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("Post_detail", kwargs={"pk": self.pk})


class Vote(models.Model): # have to visit vote
    voter = models.ForeignKey(User, related_name='votes', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class City(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    country = models.ForeignKey('Country', on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='cities', blank=True)
    safety = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    population = models.IntegerField(default=0)
    understanding_english = models.IntegerField(default=0,validators=[MinValueValidator(0), MaxValueValidator(10)])
    class Meta:
        verbose_name = ("City")
        verbose_name_plural = ("Cities")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("City_detail", kwargs={"pk": self.pk})
 
    
class Country(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    photo = models.ImageField(upload_to='countries', blank=True)
    flag = models.ImageField(upload_to='flags', blank=True)
    continent = models.ForeignKey('Continent', on_delete=models.CASCADE)
    languages = models.ManyToManyField("Language", blank=True, null=True)
    population = models.IntegerField(default=0)
    understanding_english = models.IntegerField(default=0,validators=[MinValueValidator(0), MaxValueValidator(10)])
    safety = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    currency = models.ManyToManyField('Currency', blank=True, null=True)

    
    class Meta:
        verbose_name = ("Country")
        verbose_name_plural = ("Countries")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Country_detail", kwargs={"pk": self.pk})
    
    @property
    def cities(self):
        cities = self.city_set.all()
        return cities
  
class Continent(models.Model):
    name = models.CharField(max_length=30)
    
    class Meta:
        verbose_name = ("Continent")
        verbose_name_plural = ("Continents")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Continent_detail", kwargs={"pk": self.pk})



class Language(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = ("Language")
        verbose_name_plural = ("Languages")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Language_detail", kwargs={"pk": self.pk})

class Currency(models.Model):
    name = models.CharField(max_length=50)
    short_name = models.CharField(max_length=4, blank=True)
    class Meta:
        verbose_name = ("Currency")
        verbose_name_plural = ("Currencies")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Currency_detail", kwargs={"pk": self.pk})
    





   
# class Safety(models.Model): TODO
#     value = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
#     related_to = models.ForeignKey('')
    



