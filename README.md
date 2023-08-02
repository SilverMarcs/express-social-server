# express-social-server

This is the server for a social network that provides several API's to a frontend for backend logic and database interaction <br>
Based on Ed Roh's Full Stack Course with my own additions such as a refined **Comments section**, **User search** from searchbar, **Cloud hosting for images** and fixes.

## Demo

A **demo** of the frontend is available [**here**](https://express-social.vercel.app) <br>
\*Requires sign-up but feel free to use the dummy email and password. <br>
**Sample account**: ``tester@tester.com`` and ``12345678``

This is the server for a social network that provides several API's to a frontend for backend logic and database interaction <br>
Based on Ed Roh's Full Stack Course with my own additions such as a refined **comments section**, **user search** from searchbar, **Cloud hosting for images** and fixes.

### Stack used:

- **Express JS** for backend api and/or routing
- **MongoDB** for database
- **Cloudinary** for image hosting


## Running locally

-- Git clone the repository from terminal

```
git clone https://github.com/SilverMarcs/express-social-server.git
```

- Move to the cloned folder

```
cd express-social-server
```

- Install node dependencies and wait until they get installed

```
npm install
```

- Rename .env.example file to .env and link a MongoDB cluster and set your JWT_SECRET. You will also need to add your Cloudinary credentials

- Start the server. It should start running at http://localhost:3001

```
npm run start
```

<br>
