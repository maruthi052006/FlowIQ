import json
from channels.generic.websocket import AsyncWebsocketConsumer

class WorkflowRunConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.run_id = self.scope['url_route']['kwargs']['run_id']
        self.group_name = f"workflow_run_{self.run_id}"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def step_update(self, event):
        await self.send(text_data=json.dumps({
            'type': 'step_update',
            'payload': event['payload']
        }))

    async def run_complete(self, event):
        await self.send(text_data=json.dumps({
            'type': 'run_complete',
            'payload': event['payload']
        }))


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope.get('user')
        if not self.user or self.user.is_anonymous:
            await self.close()
            return

        self.group_name = f"user_notifications_{self.user.id}"
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )

    async def notification(self, event):
        await self.send(text_data=json.dumps({
            'type': 'notification',
            'payload': event['payload']
        }))
