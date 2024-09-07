const mongoose = require("mongoose");

// Define el esquema para "Ventas"
const ventasSchema = mongoose.Schema({
    _id:{ 
        type: String,
        required:true,
        unique: true 
    },
  
    Clientes_id: {
    type: mongoose.Schema.Types.String,
    ref: 'Clientes', // Nombre del modelo al que hace referencia
    required: true
  },
  FechaVenta: {
    type: Date,
    required: true
  },
  Total: {
    type: Number,
    required: true
  },
  ProductoServicio_id: {
    type: mongoose.Schema.Types.String,
    ref: 'ProductoServicios', // Nombre del modelo al que hace referencia
    required: true
  }
});

module.exports = mongoose.model('Ventas', ventasSchema);
