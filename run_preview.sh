#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "🪐 Starting Jupiter Smart Swap Preview Server on http://localhost:3333 ..."

# Kill existing process on port 3333 if any
fuser -k 3333/tcp 2>/dev/null || true

# Start preview server using Vite preview
exec npx vite preview --port 3333 --host 0.0.0.0
