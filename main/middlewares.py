from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponse, JsonResponse
import chardet


class HttpError2JsonMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        # X-Requested-With: XMLHttpRequest
        is_xhr = request.META.get('HTTP_X_REQUESTED_WITH', None) == 'XMLHttpRequest'
        if is_xhr:
            if str(response.status_code)[0] in ['4', '5']:
                detected = chardet.detect(response.content)
                encoding = isinstance(detected, dict) and detected.get('encoding', 'utf-8')
                data = {
                    'error': response.status_code,
                    'desc': response.content.decode(encoding, 'ignore')
                }
                resp = JsonResponse(
                    data,
                    safe=False,
                    json_dumps_params={}
                )
                resp.status_code = response.status_code
                return resp
        return response
