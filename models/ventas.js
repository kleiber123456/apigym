const mongoose = require("mongoose");

const ventasSchema = mongoose.Schema({
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
        ref: 'ProductoServicio',
        required: true
    },
    Estado: {
        type: String,
        enum: ['Completada', 'Cancelada'], // Define los estados posibles
        default: 'Completada' // Por defecto, la venta estará "completada"
    }
});

module.exports = mongoose.model('Ventas', ventasSchema);
