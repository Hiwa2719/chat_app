from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken


@database_sync_to_async
def get_user(scope):
    try:
        token = scope['query_string'].decode()[6:]
        validated_token = JWTAuthentication().get_validated_token(token)
        return JWTAuthentication().get_user(validated_token)
    except InvalidToken:
        return


class JWTAuthMiddleware:
    """
    Custom middleware (insecure) that takes user IDs from the query string.
    """

    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).
        user = await get_user(scope)
        if user:
            scope['user'] = user
            return await self.app(scope, receive, send)


def JWTAuthMiddlewareStack(inner):
    return JWTAuthMiddleware(AuthMiddlewareStack(inner))
