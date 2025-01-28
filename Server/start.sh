#!/bin/bash
mkdir dist
npx tsc
npx prisma generate
pm2 start npm --name "kanban-backend" -- start
pm2 logs