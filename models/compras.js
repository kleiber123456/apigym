const mongoose = require("mongoose");

// Define el esquema para "Compras"
const comprasSchema = mongoose.Schema({
  _id:{ 
    type: String,
    required:true,
    unique: true 
  },
  Proveedores_id: { 
    type: mongoose.Schema.Types.String, 
    ref: 'Proveedores', 
    required: true 
  },
  Fecha: { 
    type: Date, 
    default: Date.now 
  },
  Stock:{
    type:Number,
    required:true
  },
  Total: { 
    type: Number, 
    required: true 
  },
  Estado: { 
    type: String, 
    enum: ['Pendiente', 'Completado', 'Cancelado'], 
    default: 'Pendiente' 
  },
  ProductoServicio_id: { 
    type: mongoose.Schema.Types.String, 
    ref: 'Productos', 
    required: true 
  },
});

module.exports = mongoose.model('Compras', comprasSchema);
