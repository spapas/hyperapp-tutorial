from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "A management command"

    def add_arguments(self, parser):
        parser.add_argument("arg1", type=int, help="The first arg")
        parser.add_argument("arg2", type=str, help="The 2nd arg")
        parser.add_argument("-t", "--test", help="Test", required=True)
        parser.add_argument("-k", "--koko", nargs=1, help="Koko")

        parser.add_argument(
            "-d",
            "--delete",
            action="store_true",
            dest="delete",
            help="Delete poll instead of closing it",
        )

    def handle(self, *args, **options):
        print("Starting")
        print(options)
