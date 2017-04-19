[![Docker Pulls](https://img.shields.io/docker/pulls/damack/swarmi.svg)](https://hub.docker.com/r/damack/swarmi/)
[![Microbadger](https://images.microbadger.com/badges/image/damack/swarmi.svg)](http://microbadger.com/images/damack/swarmi "Image size")

# swarmi

Swarmi is a lightweight management UI which allows you to easily manage your Docker Swarm cluster.

## Getting started

### Deploy Swarmi
docker run -d --name swarmi -p 9000:9000 -e GITHUB_CLIENT_ID=x -e GITHUB_CLIENT_SECRET=x -e GITHUB_CALLBACK_URL=x -v /var/run/docker.sock:/var/run/docker.sock damack/swarmi:latest

## Getting help

* Issues: https://github.com/damack/swarmi/issues
