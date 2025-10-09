#!/bin/bash
# Sobe o backend em background
cd backend
npm start &

# Sobe o frontend
cd ../frontend
npm run dev -- --host 0.0.0.0
