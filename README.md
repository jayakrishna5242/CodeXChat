# ✨ CodeXChat - Full Stack Realtime Chat App ✨

![Demo App](/frontend/public/generated-image.png)

[Watch the Full Video Tutorial on YouTube](https://youtu.be/ntKkVrQqBYY)

---

## Features

- 🌟 **Tech Stack:** MERN (MongoDB, Express, React, Node.js) + Socket.io + TailwindCSS + Daisy UI  
- 🎃 **Authentication & Authorization:** JWT-based secure login/signup  
- 👾 **Real-time Messaging:** Instant chat with Socket.io  
- 🚀 **Online User Status:** See who’s online in real time  
- 👌 **Global State Management:** Powered by Zustand  
- 🐞 **Robust Error Handling:** On both server and client sides  
- ⭐ **Deployment Guide:** How to deploy your app professionally for FREE!  
- ⏳ And much more — including file sharing, voice/video calling, GIFs, emojis, and customizable themes  

---

## Getting Started

### Setup `.env` file

Create a `.env` file in your backend root directory with the following environment variables:

MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development

text

> Replace the values on the right with your actual configuration data.

---

### Build the Application

From your project root directory, run:

npm run build

text

This will build the frontend React app and prepare the backend for production.

---

### Start the Application

To start the backend server:

npm start

text

This launches your backend API on the port specified in your `.env` (default: 5001), serving the frontend and connecting to the database.

---

## Development

For a better development experience, you may run the backend and frontend concurrently in development mode (adjust based on your scripts if applicable):

- Backend
npm run dev

text

- Frontend
npm start

text

---

## Project Structure (Brief Overview)

- `/backend` — Node.js Express backend with API routes, controllers, middleware  
- `/frontend` — ReactJS frontend with components, hooks, and Zustand for state management  
- `/frontend/public` — Contains static assets including `screenshot-for-readme.png` used above  
- `.env` — Environment variables for security and API keys

---

## Useful Links

- [Video Tutorial on YouTube](https://youtu.be/ntKkVrQqBYY) — Follow along step-by-step  
- [Source Code Repository](https://github.com/jayakrishna5242/CodeXChat) — Full source code  

---

## Contribution

Feel free to contribute! If you find bugs, issues, or want to add features, open a PR or issue on the GitHub repo.

---

## License

MIT © [Your Name / Your Organization]

---

If you face any issues or want help setting up, check the tutorial video or open an issue on GitHub. Happy coding! 🚀