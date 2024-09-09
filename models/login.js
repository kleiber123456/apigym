// models/login.js
const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Asegura que el nombre de usuario sea único
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Asegura que el correo sea único
    match: [/^\S+@\S+\.\S+$/, 'Por favor, utiliza un correo electrónico válido'],
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Asegura que la contraseña tenga al menos 6 caracteres
  }
});

module.exports = mongoose.model('Login', loginSchema);