from rest_framework.exceptions import APIException
from rest_framework import status

class FlowIQException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'An error occurred during process execution.'
    default_code = 'flowiq_error'

class WorkflowExecutionException(FlowIQException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = 'Workflow step failed during runtime execution.'
    default_code = 'workflow_execution_failed'

class FormValidationException(FlowIQException):
    status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
    default_detail = 'Form payload failed schema validation rules.'
    default_code = 'form_validation_failed'

class IntegrationException(FlowIQException):
    status_code = status.HTTP_502_BAD_GATEWAY
    default_detail = 'External integration service request failed.'
    default_code = 'integration_service_error'
