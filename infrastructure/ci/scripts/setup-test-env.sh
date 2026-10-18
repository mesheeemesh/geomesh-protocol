#!/usr/bin/env bash
set -euo pipefail

echo "Setting up integration test environment..."

# Start PostgreSQL
docker run -d \
  --name geomesh-protocol-test-db \
  -e POSTGRES_USER=geomesh-protocol_test \
  -e POSTGRES_PASSWORD="${TEST_DB_PASSWORD:-test_password}" \
  -e POSTGRES_DB=geomesh-protocol_test \
  -p 5432:5432 \
  postgres:15-alpine

# Wait for DB to be ready
echo "Waiting for database..."
for i in $(seq 1 30); do
  if docker exec geomesh-protocol-test-db pg_isready -U geomesh-protocol_test -d geomesh-protocol_test &>/dev/null; then
    echo "Database ready."
    break
  fi
  sleep 1
done

# Run migrations
cd Backend
DATABASE_URL="postgresql://geomesh-protocol_test:${TEST_DB_PASSWORD:-test_password}@localhost:5432/geomesh-protocol_test" \
  npm run migration:run 2>/dev/null || echo "No migrations to run."

echo "Test environment ready."
