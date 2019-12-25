#!/bin/bash

LOG_FILE="log.txt"
function timestamp(){
  echo "[$(date +%Y-%m-%d_%H-%M-%S)]"
}

echo "" >> "$LOG_FILE" && \
printf "$(timestamp) Checkout deploy branch ..." >> "$LOG_FILE" && \
git checkout master && \
echo "OK" >> "$LOG_FILE" && \

printf "$(timestamp) Pull new codes ..........." >> "$LOG_FILE" && \
git pull && \
echo "OK" >> "$LOG_FILE" && \

printf "$(timestamp) Install deps ............." >> "$LOG_FILE" && \
npm install && \
echo "OK" >> "$LOG_FILE" && \

printf "$(timestamp) Restart pm2 process ......" >> "$LOG_FILE" && \
pm2 stop "platform";
pm2 del "platform";
pm2 start index.js --name "platform" && \
echo "OK" >> "$LOG_FILE" && \

echo "$(timestamp) SUCCESS!" >> "$LOG_FILE"
