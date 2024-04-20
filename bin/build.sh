#!/bin/bash

# Docker image name
IMAGE_NAME="editor-x"

if [ "$1" == "build" ]; then
    echo "Building Docker image..."
    docker build -t $IMAGE_NAME ${@:2} .
elif [ "$1" == "run" ]; then
    echo "Running Docker container..."
    docker run -p 5000:5000 $IMAGE_NAME ${@:2}
else
    echo "Invalid argument. Please use 'build' or 'run'."
fi