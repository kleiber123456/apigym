const mongoose = require("mongoose");

const comprasSchema = mongoose.Schema({
  Proveedores_id: { 
    type: String, // String en lugar de ObjectId
    ref: 'Proveedores', 
    required: true 
  },
  Fecha: { 
    type: Date, 
    default: Date.now 
  },
  Stock: {
    type: Number,
    required: true
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
    type: String, // String en lugar de ObjectId
    ref: 'ProductoServicio', 
    required: true
  },
});

module.exports = mongoose.model('Compras', comprasSchema);


