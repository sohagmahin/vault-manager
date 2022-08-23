![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

🚧 _Under development_ 🚧≈
## Vault manger

Vault manager is a simple and minimal password manager. Developed by MERN Stack.

This is a self-learning project. So don’t aspect all functionality which has a real password manager. The repo is absolutely for beginners. <br>
So, _What I did this project_? 

`In Backend:` 
I created a user module and vault module. so users can able signup, sign in, and manage their profile.  And also store their vaults by vault module. And all important vault data are encrypted by cryptoJS(symmetric-key algorithm) and user module data are encrypted by bcrypt package. So the data are well protected on the database.

`In front-end:` 
Made a minimal and user-friendly interface by React and daisyUI(tailwind-based CSS framework). All data are coming from the backend via REST-FULL API. And I used Redux for state management. I know this is overwhelming to use redux in a small project like this. but for learning purposes, I did that.

   

 ### Technology:
 #### Frontend:
 ```
    React,
    Redux,
    Tailwind-css,
    Daisy UI
 ```
 
  #### Backend:
 ```
    ExpressJS
    MongoDB
 ```
 
 #### Core Library for backend
 ```
    bcrypt,
    cors,
    crypto-js,
    express-validator,
    jsonwebtoken,
    mongoose
 
 ```
 
 ### Working progress
 - [x]  add user profile
 - [ ]  delete profile
 - [ ]  add profile photo
 - [ ]  Validate registration field (username and password length should be 6 character)
 - [ ]  Show proper validation message and error (backend)
 - [ ]  add forget password (frontend + backend)
 - [ ]  Support PWA
 - [ ]  `Dockerize` the app

Run Project:

1. Set up `.env` from /backend: 

   Rename `.env.example` to `.env` and update by your data.

2. Install Yarn globally `(optional)`:
  `sudo npm install -g yarn`

3. Type in terminal:

   `npm run dev` or `yarn run dev`
