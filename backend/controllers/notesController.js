const Note = require("../models/notesModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
}

)

const createNotes = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);

        throw new Error("Please Fill All The Fields");
    }

    else {
        const note = new Note({
            user: req.user._id, title, content, category
        });

        const createdNote = await note.save();

        res.status(201).json(createdNote);
    }

});

const getNotesById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        res.json(note);
    }

    else {
        res.status(404).json({ message: "Note Not Found" });
    }

});


const updateNotes = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    const note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this Action");
    }


    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNotes = await note.save()
    res.json(updatedNotes);


    // else {
    // res.status(404);
    // throw new Error("Note Not Found");
}
);

const deleteNotes = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this Action");
    }

    if (note) {
        await note.deleteOne();
        res.json({ message: "Note Removed" });
    }

    else {
        res.status(404);
        throw new Error("Note Not Found");
    }
});


module.exports = { getNotes, createNotes, getNotesById, updateNotes, deleteNotes }