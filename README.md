# Buzz
An Angular Project offering managed solution for audio-video teaching systems. It can be installed in school classrooms or presented in seminars. It provides content management console and generates statistics over the usage.  
The Project is designed for remotely located institutions with no access to internet. Videos files can be directly embedded in the application. However the code can be tweaked here and there to make ready for internet accessing institutions (all necessary code is commented in files).  
It is an in-browser solution with file system of operating system as the base for data storage (JSON Files).Express.js, a minimalist web framework for Node.js is used for Backend to host the project on the server.    
The project follows the guidelines of Progressive Web Apps.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Fonts and Icons

All necessary Google Fonts and Materials Icons are downloaded and stored as assets for offline availability. Necessary code for online support is present as comments.

## Additional Angular Module Required for App

Learn more about [Progressive Web Apps](https://web.dev/what-are-pwas/)  
`ng add @angular/pwa`

## Additional Node Module Required for Server

Express is the web framework used here for Node.js  
`npm install express --save`

## What next?

The project expects the developers to use a database on server or cloud for data storage and custom logic for authentication.
