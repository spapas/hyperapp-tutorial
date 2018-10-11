from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=32, unique=True)

    def __str__(self):
        return self.name


class Job(models.Model):
    name = models.CharField(max_length=32, unique=True)

    def __str__(self):
        return self.name


class Person(models.Model):
    name = models.CharField(max_length=128)
    imdb_id = models.CharField(max_length=32, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=128)
    imdb_id = models.CharField(max_length=32, blank=True, null=True)
    release_year = models.CharField(max_length=4)
    runtime = models.PositiveIntegerField()
    story = models.TextField()

    genres = models.ManyToManyField("Genre", blank=True)

    def __str__(self):
        return "{0} ({1})".format(self.title, self.release_year)


class MoviePerson(models.Model):
    person = models.ForeignKey("Person", on_delete="PROTECT")
    movie = models.ForeignKey("Movie", on_delete="PROTECT")
    job = models.ForeignKey("Job", on_delete="PROTECT")


class Image(models.Model):
    description = models.CharField(max_length=128)
    image = models.ImageField()
    movie = models.ForeignKey("Movie", on_delete="PROTECT")
