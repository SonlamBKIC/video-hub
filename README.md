# Video Hub

## Description

A simple youtube video sharing app.

## Features

- Login / Register
- Share video
- View shared videos

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/) version 18 or above
- [MongoDB](https://www.mongodb.com/docs/manual/installation/) version 6 or above
- [Docker](https://docs.docker.com/engine/install/) version 24 or above

## Installation

1. Clone the repository.

```sh
git clone https://github.com/SonlamBKIC/video-hub.git
```

2.1. Install the dependencies for api project.

```sh
cd video-hub-api
npm install
```

2.2. Install the dependencies for web project.

```sh
cd video-hub-web
npm install
```

3.1. Configure api project by creating an .env file in the video-hub-web folder then add your necessary configuration to the .env file.

Description for each variables are in the [.env.example](video-hub-api/.env.example) file. Below is an example .env file for api project.

```env
NODE_ENV=development
PORT=3000
SOCKET_PORT=3001
MONGO_CONNECTION_STRING="mongodb://localhost:27017/video-hub"
JWT_SECRET_KEY="THIS IS MY SECRET KEY FOR THE JWT TOKEN GENERATION PROCESS"
GOOGLE_API_KEY="AIzaSyB8_22cX5EZaLoU51Ljwh8d2zIQaV51JFc"
```

3.2. Configure web project by creating an .env file in the video-hub-web folder then add your necessary configuration to the .env file.

Description for each variables are in the [.env.example](video-hub-web/.env.example) file. Below is an example .env file for web project.

```env
BASE_APP_URL="http://localhost:3000"
BASE_SOCKET_URL="http://localhost:3001"
```

## Database initialization

Do this if you want to have initial data before starting the app for the first time.

```sh
cd video-hub-api
npm run build
npm run init-data
```

## Running application in development environment

Running the api project in development environment.

```sh
cd video-hub-api
npm run start:dev
```

Running the web project in development environment.

```sh
cd video-hub-web
npm run dev
```

Access application using the following url.

```link
http://localhost:5173
```

Demo accounts if you did choose to initialize database in the previous step.

```
username: psbt001 | password: psbt@123456
username: psbt002 | password: psbt@123456
```

## Production deployment

Build production docker image for api project.

```sh
cd video-hub-api
docker build -t video-hub-api .
```

Create and run docker container for api project. **path_to_env_file** is the path to your .env for the production environment. The .env file structure for the production environment is the same as the development environment.

```sh
docker run -p3434:3000 -p3435:3001 -env-file {path_to_env_file} --name=video-hub-api -d video-hub-api
```

Build production docker image for web project.

```sh
cd video-hub-web
docker build -t video-hub-web .
```

Create and run docker container for web project. **path_to_env_file** is the path to your .env for the production environment. The .env file structure for the production environment is the same as the development environment.

```sh
docker run -p4173:8080 -env-file {path_to_env_file} --name=video-hub-web -d video-hub-web
```

Access the production application or host production application to the internet using the following url.

```link
http://localhost:4173
```

## Usage

- Video Hub Home Page. You can see shared videos's information and play shared videos.

![Video Hub home page](/screenshots/video_hub_home_page.png)

- Insert your username and password then click the **Login/Register** button. If your account had been created, you will be logged in. Otherwise, your account will be created then logged in.

![Video Hub login](/screenshots/video_hub_logged_in.png)

- After logged in, you can share video by click the **Share a video** button, insert the youtube url then **submit**.

![Video Hub share video](/screenshots/video_hub_share_video.png)

- After logged in, if another user shared a video, you will received notification about that shared video.

![Video Hub notification](/screenshots/video_shared_notification.png)

## Troubleshoot

- If you get **permission denied** error when running docker command, you can run docker command with sudo. For example:

```sh
sudo docker build -t video-hub-api .
```
