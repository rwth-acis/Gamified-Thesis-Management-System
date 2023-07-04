
# Gamified Thesis Management System

A bachelor thesis of Silyu Li silyu.li@rwth-aachen.de. 

## Introduction

We hope this platform could give you some support while you writing your thesis, as we know how uneasy for most students this process is.

## Run This App Locally

Before running this app locally, please make sure that you are using all environment variables for local testing.

This application uses React as its frontend, Express as its backend and MongoDB as its database, to run this app locally, please:

run `cd backend` and `npm install`,

then start the server by running `nodemon server.js`.

Now redirect to the frontend folder by running `cd ..`, `cd frontend` and `npm install`,

then start the frontend client by running `npm start`.

By default, the server runs at `http://localhost:5000` and the fontend application runs at `http://localhost:3000`

## Deploy to Kubernetes

Before deploying this app, please make sure that you switched all environment variables for production.

Build this app first using docker by running `docker compose build` at its root directory. Then upload the images to dockerHub and go to the tech4Comp kubernetes. Choose the work space of `ba-silyu` and replace the images there with the new version.`

## Storybook Integration

This application integrates part of its components into Storybook for convenient future development. To run Storybook, go to the frontend directory and run `npm run storybook`. For more information on Storybook, please visit https://storybook.js.org/

## APIs

I have created a collection of API routes for this app during my implementation, it can be visited via this API call: https://api.postman.com/collections/21906435-f263586f-eae8-428e-930f-f5e0d5e03fc0?access_key=PMAT-01H4HFM07TAYB1NF4AKNRQQGGN. 

Please make sure you only use API routes starting with http://localhost:5000/api/ for testing. 

Please do not use those routes starting with https://milki-psy.dbis.rwth-aachen.de/api/! If you need to test them, make sure to change them into localhost first. Thank you!