from rest_framework import serializers
import core.models
from drf_writable_nested import WritableNestedModelSerializer, UniqueFieldsMixin, NestedUpdateMixin, NestedCreateMixin 


class GenreSerializer(UniqueFieldsMixin, WritableNestedModelSerializer):
    class Meta:
        model = core.models.Genre
        fields = ('id', 'name') 


class MovieSerializer(NestedCreateMixin, NestedUpdateMixin, serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    genres = GenreSerializer(many=True, required=False, read_only=False)

    class Meta:
        model = core.models.Movie
        fields = "__all__"

    def update2(self, instance, validated_data):
        genres_data = validated_data.pop('genres')
        for item in validated_data.items():
            setattr(instance, item[0], item[1])
        instance.save()
        return instance


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
