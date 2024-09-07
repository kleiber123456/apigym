const mongoose = require("mongoose");

const proveedoresSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true // Identificador personalizado
  },
  Nombre: { 
    type: String,
    required: true
  },
  Apellido: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.(com|cl)$/, 'El correo debe de terminar en .com o en .cl, compruebalo']
  },
  Telefono: {
    type: String,
    required: true
  },
  Direccion: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Proveedores', proveedoresSchema);
