#!/bin/bash
cd /home/kavia/workspace/code-generation/oee-production-authentication-system-140-149/frontend_auth_system
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

