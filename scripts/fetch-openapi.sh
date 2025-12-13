#!/usr/bin/env bash
set -euo pipefail

OPENAPI_URL="${OPENAPI_URL:-https://api.example.com/openapi.yaml}"
TARGET="openapi/openapi.yaml"

mkdir -p openapi
curl -fsSL "$OPENAPI_URL" -o "$TARGET"
echo "Fetched OpenAPI -> $TARGET"
