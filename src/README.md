This branch contains a dockerized version of the web app. 

Dockerfile - this file will be read when building an image from the current directory. It will copy all files in this directory inside the nginx container. 

.dockerignore - used to exclude certain files from being copied inside the container.

web-app-image.tar - the docker image saved as a .tar archive. Usually images should be pushed to a docker repo, but for testing purposes for now this should suffice.

Prerequisites:

Docker installed and running on the host.


Usage:

# Load the image inside Docker

docker load -i web-app-image.tar

# Run the container in background and map the ports. Change the host port (first one) if necessary. 

docker run -d -p 80:80 js-web-app

# Open the app in a browser

http://localhost or http://127.0.0.1 

