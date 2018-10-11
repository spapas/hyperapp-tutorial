from rest_framework import serializers
import core.models


class GenreSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = core.models.Genre
        fields = "__all__"


class MovieSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    genres = GenreSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = core.models.Movie
        fields = "__all__"


class JobSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = core.models.Job
        fields = "__all__"


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = core.models.Person
        fields = "__all__"


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = core.models.Image
        fields = "__all__"
