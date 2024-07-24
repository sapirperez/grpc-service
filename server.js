const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mnist = require('mnist');
const path = require('path');

const PROTO_PATH = path.resolve(__dirname, 'mnist.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const mnistProto = grpc.loadPackageDefinition(packageDefinition).mnist;

function getMNISTSamples() {
  const set = mnist.set(10, 0); 
  return set.training.map(sample => ({
    image: new Uint8Array(sample.input.map(x => Math.floor(x * 255))),
    label: sample.output.indexOf(1)
  }));
}

function getTrainingSamples(call) {
  const samples = getMNISTSamples();
  samples.forEach((sample) => {
    call.write({ image: sample.image, label: sample.label });
  });
  call.end();
}

const server = new grpc.Server();
server.addService(mnistProto.MNISTService.service, { GetTrainingSamples: getTrainingSamples });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running on port 50051');
});
