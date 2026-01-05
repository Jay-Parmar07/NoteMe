// created a web server using Express.js that serves notes data from a local file. The server has endpoints to retrieve all notes and individual notes by their ID. Environment variables are managed using the dotenv package. also added a .env file to store the PORT number for the server to listen on. tested the server to ensure it responds correctly to requests. added nodemon for easier development. used postman to test the API endpoints.

const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');

// load environment variables and override any existing ones from the OS
dotenv.config({ override: true });
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');
const path = require('path');

const app = express();

// ensure dotenv variables are loaded (override existing env vars when needed)
// Note: dotenv already injected variables but making override explicit can help
// when env vars are set elsewhere (e.g., system environment)
connectDB();
app.use(express.json());





app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

// ---------------------------DEPLOYMENT-----------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production"){

  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  
  app.get(/.*/, (req, res) =>
    res.sendFile(
      path.resolve(__dirname1, "frontend", "build", "index.html")
    )
  );
}
else{
  app.get('/', (req, res) => {
  res.send('API is Running.....');
});
}

// ---------------------------DEPLOYMENT-----------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => { console.log(`Server started on PORT ${PORT}`) });

// Log unhandled promise rejections and uncaught exceptions for easier debugging
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});