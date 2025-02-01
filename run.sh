#!/bin/bash

# Kill any existing Chrome instances
killall "Google Chrome" 2>/dev/null

# Start Chrome in background
# /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# Store Chrome PID
CHROME_PID=$!

# Wait for Chrome to start
sleep 3

# Cleanup function
cleanup() {
    echo "Cleaning up..."
    kill $CHROME_PID 2>/dev/null
    killall "Google Chrome" 2>/dev/null
    exit 0
}

# Set trap for cleanup
trap cleanup EXIT INT TERM

# Run Node script
node main.js

# Wait for Node to finish
wait