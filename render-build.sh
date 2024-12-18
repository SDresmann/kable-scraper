#!/usr/bin/env bash

apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libfontconfig1 \
    libpango1.0-0 \
    libasound2 \
    libxshmfence1 \
    libgbm1 \
    libgtk-3-0 \
    wget

npx playwright install
