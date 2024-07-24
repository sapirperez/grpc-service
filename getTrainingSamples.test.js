const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('mnist.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const mnistProto = grpc.loadPackageDefinition(packageDefinition).mnist;

test('GetTrainingSamples returns samples', done => {
  const client = new mnistProto.MNISTService('localhost:50051', grpc.credentials.createInsecure());

  const call = client.GetTrainingSamples({});

  call.on('data', (response) => {
    expect(response).toBeDefined();
    expect(response).toHaveProperty('image');
    expect(response.image).toBeInstanceOf(Buffer);
    expect(response).toHaveProperty('label');
    done();
  });
  
  call.on('error', (error) => {
    done.fail('Error: ' + error);
  });
});
