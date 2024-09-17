const express = require("express");
const comprasSchema = require("../models/compras"); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Crear una compra
router.post('/compras', (req, res) => {
    const compra = new comprasSchema(req.body);
    compra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todas las compras
router.get("/compras", (req, res) => {
    comprasSchema
        .find()
        .populate('Proveedores_id') 
        .populate('ProductoServicio_id') 
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener una compra por ID
router.get("/compras/:id", (req, res) => {
    const { id } = req.params;
    comprasSchema
        .findById(id)
        .populate('Proveedores_id')
        .populate('ProductoServicio_id')
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'Compra no encontrada' });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar una compra
router.put("/compras/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Proveedores_id, FechaCompra, Total, ProductoServicio_id } = req.body;

        // Crea un objeto con los datos actualizados
        const updatedData = {
            Proveedores_id,
            FechaCompra,
            Total,
            ProductoServicio_id
        };

        // Actualiza la compra en la base de datos
        const updatedCompra = await comprasSchema.updateOne({ _id: id }, { $set: updatedData });

        if (updatedCompra.matchedCount === 0) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        res.json(updatedCompra);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la compra' });
    }
});

// Eliminar una compra
router.delete("/compras/:id", (req, res) => {
    const { id } = req.params;
    comprasSchema
        .deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 0) {
                return res.status(404).json({ message: 'Compra no encontrada' });
            }
            res.json({ message: 'Compra eliminada exitosamente' });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
