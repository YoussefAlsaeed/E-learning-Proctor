<template>
  <section class="display">
    <video ref="videoEl" width="300" height="300" autoplay muted />
    <canvas ref="canvasEl" />
  </section>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as faceapi from '@vladmandic/face-api';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export default {
  name: 'VideoPlayer',
  setup() {
    const videoEl = ref(null);
    const canvasEl = ref(null);

    let detectionInterval;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab is active');
      } else {
        alert('AFSHTK YA CHEATER');
        console.log('Tab is inactive');
      }
    };

    const startDetection = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);

      navigator.getUserMedia(
        { video: {} },
        stream => {
          videoEl.value.srcObject = stream;
          videoEl.value.addEventListener('play', async () => {
            const canvas = faceapi.createCanvasFromMedia(videoEl.value);
            document.body.append(canvas);
            const displaySize = { width: videoEl.value.videoWidth, height: videoEl.value.videoHeight };
            faceapi.matchDimensions(canvas, displaySize);
            const model = await cocoSsd.load();

            detectionInterval = setInterval(async () => {
              if (!videoEl.value) return;

              const detections = await faceapi
                .detectAllFaces(videoEl.value, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

              const resizedDetections = faceapi.resizeResults(detections, displaySize);
              canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
              // faceapi.draw.drawDetections(canvas, resizedDetections);
              // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

              if (videoEl.value) {
                const predictions = await model.detect(videoEl.value);
                predictions.forEach(prediction => {
                  if (prediction.class === 'cell phone') {
                    const ctx = canvas.getContext('2d');
                    ctx.beginPath();
                    ctx.rect(...prediction.bbox);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = 'red';
                    ctx.fillStyle = 'red';
                    ctx.stroke();
                    ctx.fillText('Phone detected!', prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10);
                    alert('PUT DOWN YOUR PHONE CHEATER');
                  }
                });             
              } else {
                console.error('Video element is not available');
              }



              if (resizedDetections.length === 0) {
                console.log('User is absent');
              } else if (resizedDetections.length > 1) {
                alert('More than one person detected');
              }
            }, 100);
          });
        },
        err => console.error(err)
      );
      document.addEventListener('visibilitychange', handleVisibilityChange);

    };

    const stopFaceDetection = () => {
      clearInterval(detectionInterval);
      if (videoEl.value && videoEl.value.srcObject) {
        videoEl.value.srcObject.getTracks().forEach(track => track.stop());
      }
      if (canvasEl.value) {
        const context = canvasEl.value.getContext('2d');
        context.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);
      }

      document.removeEventListener('visibilitychange',handleVisibilityChange);

    };

    onMounted(startDetection);
    onBeforeUnmount(stopFaceDetection);

    return {
      videoEl,
      canvasEl,
      stopFaceDetection

    };
  }
};
</script>

<style>

</style>
