from rest_framework import serializers
import core.models
from drf_writable_nested import WritableNestedModelSerializer, UniqueFieldsMixin, NestedUpdateMixin, NestedCreateMixin


class GenreSerializer(UniqueFieldsMixin, WritableNestedModelSerializer):
    class Meta:
        model = core.models.Genre
        fields = "__all__"


class MovieSerializer(NestedCreateMixin, NestedUpdateMixin, serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    genres = GenreSerializer(many=True, required=False, read_only=False)

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


class MoviePersonSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = core.models.MoviePerson
        fields = "__all__"
