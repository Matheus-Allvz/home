#!/usr/bin/env bash
set -e

cd /home/deploy/portfolio
echo "==> 1. Sincronizando com o GitHub (origin/main)..."
git fetch origin main
git reset --hard origin/main

echo "==> 2. Reconstruindo container Docker..."
docker compose build --no-cache

echo "==> 3. Subindo container atualizado..."
docker compose up -d

echo "==> 4. Validando integridade HTTP local..."
sleep 2
curl -I -s http://127.0.0.1:8086 | head -n 5

echo "==> Deploy concluido com sucesso em https://matheus-alves.dev!"
