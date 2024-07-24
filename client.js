const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { createCanvas } = require('canvas');
const fs = require('fs');
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

const client = new mnistProto.MNISTService('mnist-grpc-server:50051', grpc.credentials.createInsecure());

const outputDir = path.resolve(__dirname, 'mnist_images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const call = client.GetTrainingSamples({});

let imageIndex = 0;

call.on('data', (sample) => {
  saveSampleAsImage(sample, imageIndex);
  imageIndex++;
});

call.on('end', () => {
  console.log('Stream ended');
});

call.on('error', (e) => {
  console.error(e);
});

function saveSampleAsImage(sample, index) {
  const imageBuffer = Buffer.from(sample.image);
  const label = sample.label;
  const canvas = createCanvas(28, 28);
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(28, 28);

  for (let i = 0; i < imageBuffer.length; i++) {
    const value = imageBuffer[i];
    imageData.data[i * 4] = value;        // Red
    imageData.data[i * 4 + 1] = value;    // Green
    imageData.data[i * 4 + 2] = value;    // Blue
    imageData.data[i * 4 + 3] = 255;      // Alpha
  }

  ctx.putImageData(imageData, 0, 0);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `digit_${index}_label_${label}.png`), buffer);
  console.log(`Saved digit_${index}_label_${label}.png`);
}
