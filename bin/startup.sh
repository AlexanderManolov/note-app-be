#!/bin/sh
npx prisma migrate dev
nodemon index.ts