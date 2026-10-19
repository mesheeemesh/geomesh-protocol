# Runbook: High CPU

**Severity:** P2 | **Team:** Infrastructure

## Symptoms
- CPU > 80% sustained for 5+ minutes
- Grafana alert: `HighCPUUsage`
- Slow API responses / timeouts

## Diagnosis

```bash
# Identify top CPU consumers
kubectl top pods -n geomesh-protocol --sort-by=cpu

# Check recent deployments
kubectl rollout history deployment/geomesh-protocol-backend

# Inspect pod logs for hot loops
kubectl logs -n geomesh-protocol -l app=geomesh-protocol-backend --tail=100
```

## Resolution

1. **Scale out** if load-driven:
   ```bash
   kubectl scale deployment/geomesh-protocol-backend --replicas=5
   ```
2. **Rollback** if caused by a bad deploy:
   ```bash
   kubectl rollout undo deployment/geomesh-protocol-backend
   ```
3. **Kill runaway pod** if isolated:
   ```bash
   kubectl delete pod <pod-name> -n geomesh-protocol
   ```

## Escalation
If unresolved after 15 min → page on-call engineer via PagerDuty.

## Post-Mortem
File a post-mortem within 48 hours using the template in `incident-response.md`.
