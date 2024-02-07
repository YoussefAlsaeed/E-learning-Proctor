<template>
  <section class="display">
    <video ref="videoEl" width="720" height="560" autoplay muted />
    <canvas ref="canvasEl" />
  </section>
</template>

<script>
import * as faceapi from '@vladmandic/face-api';
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import { onMounted, ref } from 'vue';

export default {
  name: 'VideoPlayer',
  setup() {
    const videoEl = ref(null);
    const canvasEl = ref(null);

    onMounted(async () => {
      const initModel = async () => {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
      };

      initModel();

      navigator.getUserMedia(
        { video: {} },
        (stream) => {
          videoEl.value.srcObject = stream;
          videoEl.value.addEventListener('play', async () => {
            const canvas = faceapi.createCanvasFromMedia(videoEl.value);
            document.body.append(canvas);
            const displaySize = {
              width: videoEl.value.videoWidth,
              height: videoEl.value.videoHeight
            };
            faceapi.matchDimensions(canvas, displaySize);
            const model = await cocoSsd.load()
            setInterval(async () => {
              const detections = await faceapi
                .detectAllFaces(videoEl.value, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

              const resizedDetections = faceapi.resizeResults(detections, displaySize);
              canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
              faceapi.draw.drawDetections(canvas, resizedDetections);
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

              const predictions = await model.detect(videoEl.value)

              predictions.forEach(prediction => {
                if (prediction.class === 'cell phone') {
                  const ctx = canvas.getContext('2d')
                  ctx.beginPath()
                  ctx.rect(prediction.bbox[0], prediction.bbox[1], prediction.bbox[2], prediction.bbox[3])
                  ctx.lineWidth = 2
                  ctx.strokeStyle = 'red'
                  ctx.fillStyle = 'red'
                  ctx.stroke()
                  ctx.fillText('Phone detected!', prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10)
                  alert('PUT DOWN YOUR PHONE CHEATER')
                }
              })

              if (resizedDetections.length === 0) {
                console.log('User is absent');
              } else if (resizedDetections.length > 1) {
                alert('More than one person detected');
              }
            }, 100);
          });
        },
        (err) => console.error(err)
      );

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          console.log('Tab is active');
        } else {
          alert('AFSHTK YA CHEATER');
          console.log('Tab is inactive');
        }
      });
    });

    return {
      videoEl,
      canvasEl
    };
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  position: absolute;
}
</style>