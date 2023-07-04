
# Gamified Thesis Management System

A bachelor thesis of Silyu Li silyu.li@rwth-aachen.de. 

## Introduction

We hope this platform could give you some support while you writing your thesis, as we know how uneasy for most students this process is.

## Run This App Locally

This application uses React as its frontend, Express as its backend and MongoDB as its database, to run this app locally, please:

run `cd Backend` and `npm install`,

then start the server by running `nodemon server.js`.

Now redirect to the frontend folder by running `cd ..`, `cd Frontend` and `npm install`,

then start the frontend application by running `npm start`.

By default, the server runs at `http://localhost:5000` and the fontend application runs at `http://localhost:3000`

## Deploy to Kubernetes

Build this app first using docker by running `docker compose build` at its root directory. Then upload the images to dockerHub and go to the tech4Comp kubernetes. Choose the work space of `ba-silyu` and replace the images there with the new version.`

## Storybook Integration

This application integrates part of its components into Storybook for convenient future development. To run Storybook