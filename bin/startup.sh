#!/bin/sh
npx prisma migrate dev
nodemon src/server.ts