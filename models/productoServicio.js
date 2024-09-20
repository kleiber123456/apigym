const mongoose = require("mongoose");

const productoServicioSchema = mongoose.Schema({
    _id: { 
        type: String,
        required: true,
        unique: true 
    },
    Nombre: { 
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true
    },

    Stock:{
       type: Number,
       required: true
    },
    Precio: {
        type: Number,
        required: true
    },
    Subtotal:{
        type: Number,
        required: true
    },
    Tipo: {
        type: String,
        required: true,
        enum: ['Producto', 'Servicio'], 
        message: 'El tipo debe ser "Producto" o "Servicio".'
    }
});

const ProductoServicio = mongoose.model('ProductoServicio', productoServicioSchema);

module.exports = ProductoServicio;
