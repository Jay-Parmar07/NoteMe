// created a web server using Express.js that serves notes data from a local file. The server has endpoints to retrieve all notes and individual notes by their ID. Environment variables are managed using the dotenv package. also added a .env file to store the PORT number for the server to listen on. tested the server to ensure it responds correctly to requests. added nodemon for easier development. used postman to test the API endpoints.

const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req,res) => {
  res.send('API is Running.....');
});

app.get('/api/notes', (req,res) => {
  res.json(notes);
});

app.get("/api/notes/:id/", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
  console.log(req.params);
  
}
)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));