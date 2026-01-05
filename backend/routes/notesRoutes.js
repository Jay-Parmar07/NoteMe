const express = require('express');
const { getNotes, createNotes, getNotesById, updateNotes, deleteNotes } = require('../controllers/notesController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNotes);
router.route("/:id").get(protect, getNotesById).put(protect, updateNotes).delete(protect, deleteNotes);

module.exports = router;