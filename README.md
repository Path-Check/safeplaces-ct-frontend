# Safe Places

A toolkit for public health, built on top of data shared by users of [Private Kit](https://github.com/tripleblindmarket/private-kit)

## Project Status

[![Project Status: WIP – The project is still under development and will reach a Minimum Viable Product stage soon.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)

The project is still under development and will reach a Minimum Viable Product (MVP) stage soon.  
*Note*: There can be breaking changes to the developing code until the MVP is released.

## Server

A server implementation can be easily built to host these tools. See how in the [Server API documentation](Safe-Places-Server.md).

## Tools

### [Location Viewer/Scrubber](https://raw.githack.com/tripleblindmarket/safe-places/master/location-scrubber/index.html)

Tool to visualize and redact time/location data. Intended for use in Contact Tracing.

-   Input: JSON exported/shared from Private Kit.

-   Output: Redacted JSON of time/location data.

NOTE: The app requires a Google Maps Javascript API key to work fully

<img  src="examples/Redaction_Tool_screenshot.png">

### [Publisher](https://raw.githack.com/tripleblindmarket/safe-places/master/publisher/index.html)

Tool to combind and publish redacted time/location data files. Intended for use by Healthcare Authorities.

-   Input: Redacted JSON time/location files.

-   Output: `safe-paths.json` -- a file ready for posting on a webserver to be consumed by Private Kit : Safe Paths

NOTE: The app requires a Google Maps Javascript API key to work fully

<img  src="examples/Publishing_Tool_screenshot.png">

## Transpiling to ES5

Before deployment run the following command to transpile JS code to ES5. Files in `js_es5` will be updated

> _npm run build_

## Deploying SafePlaces

  <!-- TOC -->

-   Deployment
    -   [How to build SafePlaces docker container](#how-to-build-safeplaces-docker-container)
    -   [How to run the SafePlaces container](#how-to-run-the-safeplaces--container)
    -   [How to use SafePlaces](#how-to-use-safeplaces)
    <!-- /TOC -->

#### How to build SafePlaces docker container

> _docker build -t safe-places:latest ._

###### _Note: The container requires no state of persistence to run. All data is persisted within the browser_

#### How to run the SafePlaces container

> _docker run --rm --name safeplaces -it -p 80:80 safe-places:latest_

###### _Note: The "--rm" flag will ensure that the docker container is deleted and cleaned up upon termination_

#### How to use SafePlaces

-   Open you browser and load the url http://localhost:8080
