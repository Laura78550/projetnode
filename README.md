# Projetnodejs-music

# Description :
NodeJs project that allows you to view, modify, add and delete music lyrics.
The Api is used by the guest and user role and the ORM is only used by the user role.

# Team
- Laura Pineau : laura.pineau@mail-ecv.fr

# API documentation
An API is available to get the lyrics of a song. The documentation is available on Apiary.io: http://docs.lyricsovh.apiary.io/.

# Prerequisites:
- nodeJs 12.13.0 and more
- npm or yarn vs pnpm

# Project Dependencies
- express
- express-joi-validation
- joi
- jsonwebtoken
- axios
- body-parser
- sequelize
- sqlite3
- uuid
- bcrypt

# Installation & launch of the project
- Step 1
  Clone Project : git clone git@github.com:Laura78550/projetnodejs-music.git
- Step 2
  Install Packages : npm i
- Step 3
  Start Project : npm start

# PostMan Use
- Step 1
  Get the PostMan collection file in the project clone
- Step 2
  Add Collection to PostMan Application
- Step 3
  Go to login route (Login) and launch the route
- Step 4
  Retrieve the token (Copy to clipboard)
- Step 5
  For each request, go to the "Authorization" tab and paste the token in the "Access Token" field
- Step 6
  Enjoy Api

# View Database
- Website for look data in database : https://inloop.github.io/sqlite-viewer/
  Drag and drop file database.sqlite

# MiddleWares
- Authentification :
This middleware is used to verify that the person accessing the route is authenticated and what is his role.
- Validation :
This middleware is user to verify the input and output data of each query.
