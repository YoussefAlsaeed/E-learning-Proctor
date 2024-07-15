# Proctoring Quiz Application

This project is a demo application consisting of a Node.js Express backend and a Vue.js frontend. It provides admin and student functionalities where admins can create quizzes and students can view and take these quizzes. The frontend includes proctoring features using mobile detection and computer vision.

## Features

- **Admin Functionality:**
  - Create quizzes
  - Manage quizzes

- **Student Functionality:**
  - View quizzes
  - Take quizzes with proctoring

- **Proctoring Features:**
  - Mobile detection using COCO-SSD
  - Head posture monitoring with Python Flask Socket
  - Face detection using face-api.js

## Technologies Used

- **Backend:**
  - Node.js
  - Express

- **Frontend:**
  - Vue.js
  - face-api.js
  - COCO-SSD

- **Proctoring:**
  - Python Flask
  - COCO-SSD for mobile detection
  - face-api.js for face detection

## Project Structure

```
├── backend
│ ├── node_modules
│ ├── package.json
│ ├── server.js
│ └── ...
└── proctoring-app
├── node_modules
├── package.json
├── src
│ ├── components
│ ├── views
│ ├── App.vue
│ └── ...
└── public
├── index.html
└── ...
```

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Python

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YoussefAlsaeed/E-learning-Proctor.git
   ```
2. Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```
3. Navigate to the frontend directory and install dependencies:
```bash
cd proctoring-app
npm install
```

### Running the Application
1. Start the backend server:
```bash
cd backend
npm start
```
2. Start the frontend server:
```bash
cd ../proctoring-app
npm run serve
```

### Accessing the Application
`Backend: http://localhost:3000`
`Frontend: http://localhost:8080`

## Acknowledgements

- [COCO-SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)
- [face-api.js](https://github.com/justadudewhohacks/face-api.js)
- [Vue.js](https://vuejs.org/)
- [Express](https://expressjs.com/)
