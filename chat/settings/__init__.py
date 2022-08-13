import os

if os.environ.get('DJANGO_DEBUG'):
    from .local import *
else:
    from .production import *
