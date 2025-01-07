#!/bin/bash

# Add following to crontab file (crontab -e):
# */15 * * * * cd /Users/dushyant/Workspace/blogtest-next && bash deploy.sh >> deploy.log 2>&1

# Navigate to the Next.js project directory, build the project, and sync the output to S3
cd /Users/dushyant/Workspace/editorcuts-web/

# Use NVM to set Node version, remove this line if not using NVM
source ~/.nvm/nvm.sh
nvm use 20.5.1

# clear out /blog folder
if [ -n "$(ls -A ./data/blog/)" ]; then
  rm -rf ./data/blog/*
fi
yarn build

# Upload site to S3 with cache-control headers on each file (long cache)
# /usr/local/bin/aws s3 sync out/ s3://editorcuts-1 --metadata-directive REPLACE --cache-control "max-age=31536000"
/usr/local/bin/aws s3 sync out/ s3://editorcuts-1 --metadata-directive REPLACE --cache-control "max-age=31536000" --exact-timestamps

# Create a CloudFront invalidation (all pages)
/usr/local/bin/aws cloudfront create-invalidation --distribution-id EXPJVKOUZ5N69 --paths "/*"
