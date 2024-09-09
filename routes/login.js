// routes/login.js
const express = require("express");
const loginSchema = require("../models/login");

const router = express.Router();

// Crear usuario de login
router.post('/login', (req, res) => {
    const user = new loginSchema(req.body);
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los usuarios de login
router.get("/login", (req, res) => {
    loginSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un usuario de login por username
router.get("/login/:username", (req, res) => {
    const { username } = req.params;
    loginSchema.findOne({ username })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Actualizar un usuario de login por username
router.put("/login/:username", (req, res) => {
    const { username } = req.params;
    const { email, password } = req.body;

    loginSchema.updateOne({ username }, { $set: { email, password } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Eliminar un usuario de login por username
router.delete("/login/:username", (req, res) => {
    const { username } = req.params;
    loginSchema.deleteOne({ username })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;