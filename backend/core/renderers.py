from rest_framework.renderers import JSONRenderer

class StandardJSONRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = renderer_context.get('response') if renderer_context else None
        
        status_code = response.status_code if response else 200
        is_success = 200 <= status_code < 300

        if is_success:
            formatted = {
                'success': True,
                'data': data,
                'meta': {
                    'code': status_code
                }
            }
        else:
            formatted = {
                'success': False,
                'error': data if isinstance(data, dict) else {'message': str(data)},
                'meta': {
                    'code': status_code
                }
            }

        return super().render(formatted, accepted_media_type, renderer_context)
