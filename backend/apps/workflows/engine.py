import time
import logging
from django.utils import timezone
from .models import WorkflowRun, WorkflowStepLog

logger = logging.getLogger('flowiq.engine')

class WorkflowExecutionEngine:
    def __init__(self, workflow, payload=None):
        self.workflow = workflow
        self.payload = payload or {}

    def execute(self):
        run = WorkflowRun.objects.create(
            workflow=self.workflow,
            status='running',
            input_payload=self.payload
        )
        start_time = time.time()
        logger.info(f"Starting execution for Workflow {self.workflow.id} (Run: {run.id})")

        nodes = self.workflow.nodes
        execution_context = dict(self.payload)

        try:
            for node in nodes:
                node_id = node.get('id', 'unknown')
                node_data = node.get('data', {})
                label = node_data.get('label', 'Unnamed Step')

                step_start = time.time()
                # Execute step logic
                step_output = self._process_node(node, execution_context)
                execution_context.update(step_output)

                WorkflowStepLog.objects.create(
                    run=run,
                    node_id=node_id,
                    node_name=label,
                    status='completed',
                    input_data=node_data,
                    output_data=step_output
                )

            duration = int((time.time() - start_time) * 1000)
            run.status = 'completed'
            run.completed_at = timezone.now()
            run.execution_time_ms = duration
            run.output_payload = execution_context
            run.save()
            logger.info(f"Workflow Run {run.id} finished successfully in {duration}ms")
            return run

        except Exception as e:
            run.status = 'failed'
            run.completed_at = timezone.now()
            run.save()
            logger.error(f"Workflow Run {run.id} failed: {str(e)}")
            raise e

    def _process_node(self, node, context):
        node_type = node.get('data', {}).get('nodeType', 'generic')
        # Standard step runner simulation
        return {'processed': True, 'timestamp': timezone.now().isoformat()}
