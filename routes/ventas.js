const express = require("express");
const ventasSchema = require("../models/ventas"); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Crear una venta
router.post('/ventas', (req, res) => {
    const venta = new ventasSchema(req.body);
    venta
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todas las ventas
router.get("/ventas", (req, res) => {
    ventasSchema
        .find()
        .populate('Clientes_id') // Popula la referencia al cliente
        .populate('ProductoServicio_id') // Popula la referencia al producto o servicio
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener una venta por ID
router.get("/ventas/:id", (req, res) => {
    const { id } = req.params;
    ventasSchema
        .findById(id)
        .populate('Clientes_id')
        .populate('ProductoServicio_id')
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar una venta
router.put("/ventas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Clientes_id, FechaVenta, Total, ProductoServicio_id } = req.body;

        // Crea un objeto con los datos actualizados
        const updatedData = {
            Clientes_id,
            FechaVenta,
            Total,
            ProductoServicio_id
        };

        // Actualiza la venta en la base de datos
        const updatedVenta = await ventasSchema.updateOne({ _id: id }, { $set: updatedData });

        if (updatedVenta.matchedCount === 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.json(updatedVenta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la venta' });
    }
});

// Eliminar una venta
router.delete("/ventas/:id", (req, res) => {
    const { id } = req.params;
    ventasSchema
        .deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 0) {
                return res.status(404).json({ message: 'Venta no encontrada' });
            }
            res.json({ message: 'Venta eliminada exitosamente' });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
