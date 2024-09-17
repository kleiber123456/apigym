const mongoose = require("mongoose");

// Define el esquema para "Ventas"
const ventasSchema = mongoose.Schema({
    _id: { 
        type: String,
        required: true,
        unique: true 
    },
    Clientes_id: {
        type: mongoose.Schema.Types.String,
        ref: 'Clientes',
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
        ref: 'ProductoServicio', // Asegúrate de usar el nombre correcto del modelo
        required: true
    }
});

module.exports = mongoose.model('Ventas', ventasSchema);
