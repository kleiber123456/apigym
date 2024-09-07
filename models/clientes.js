const mongoose = require("mongoose")

const ClientesSchema = mongoose.Schema({
  _id: {  
    type: String,
    required: true,
    unique: true 
  },

  Nombre:{ 
    type: String,
    required:true
  },
  Apellido:{
    type: String,
    required:true
  },
  Email:{
    type: String,
    required: true,
    match: [/^\S+@\S+\.(com|cl)$/, 'El correo debe de terminar en .com o en .cl, compruebalo']
  },
  Telefono:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Clientes', ClientesSchema);