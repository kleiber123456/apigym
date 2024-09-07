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
  fecha: { 
    type: Date, 
    default: Date.now 
  },
  stock:{
    type:Number,
    required:true
  },
  total: { 
    type: Number, 
    required: true 
  },
  estado: { 
    type: String, 
    enum: ['Pendiente', 'Completado', 'Cancelado'], 
    default: 'Pendiente' 
  },
  Producto_id: { 
    type: mongoose.Schema.Types.String, 
    ref: 'Productos', 
    required: true 
  },
});

module.exports = mongoose.model('Compras', comprasSchema);
