# MNIST gRPC Service

This project implements a gRPC service to stream MNIST dataset samples to a client using Node.js.

## Introduction

This project demonstrates how to Implement a GRPC service, which streams MNIST samples to a client. 
The GRPC service loads the MNIST examples and stream them to the client. 
The client connects with the running Mnist service and open a stream to get training
samples.

## Prerequisites

- Node.js (version 16 or later)
- npm (version 7 or later)
- Docker (if running the project in Docker containers)

## Installation

clone the repository to your local machine:

```sh
git clone https://github.com/sapirperez/grpc-service.git

cd grpc-service
```


## Running on your local machine

1. Install the necessary npm packages:

```sh
npm install
```

2. change client to connect to 'localhost:50051' instead 'mnist-grpc-server:50051'

3. Running the Server

```sh
node server.js
```

4. Running the Client

```sh
node client.js
```

## Docker Setup

The Docker Compose configuration will build images for both the gRPC server and client.

```sh
docker-compose up --build
```

## Testing

1. Use any gRPC client to connect to localhost:50051 and call the GetTrainingSamples method
2. client.js save the samples as images, check the folder
3. Unit Testing with Jest - see getTrainingSamples.test file. 
```sh 
npx jest getTrainingSamples.test.js
```