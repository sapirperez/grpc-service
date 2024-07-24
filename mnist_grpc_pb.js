// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mnist_pb = require('./mnist_pb.js');

function serialize_mnist_DataRequest(arg) {
  if (!(arg instanceof mnist_pb.DataRequest)) {
    throw new Error('Expected argument of type mnist.DataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mnist_DataRequest(buffer_arg) {
  return mnist_pb.DataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mnist_Sample(arg) {
  if (!(arg instanceof mnist_pb.Sample)) {
    throw new Error('Expected argument of type mnist.Sample');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mnist_Sample(buffer_arg) {
  return mnist_pb.Sample.deserializeBinary(new Uint8Array(buffer_arg));
}


var MNISTServiceService = exports.MNISTServiceService = {
  getTrainingSamples: {
    path: '/mnist.MNISTService/GetTrainingSamples',
    requestStream: false,
    responseStream: true,
    requestType: mnist_pb.DataRequest,
    responseType: mnist_pb.Sample,
    requestSerialize: serialize_mnist_DataRequest,
    requestDeserialize: deserialize_mnist_DataRequest,
    responseSerialize: serialize_mnist_Sample,
    responseDeserialize: deserialize_mnist_Sample,
  },
};

exports.MNISTServiceClient = grpc.makeGenericClientConstructor(MNISTServiceService);
