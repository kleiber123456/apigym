const express = require("express");
const ventasSchema = require("../models/ventas"); // Importa el modelo de ventas
const comprasSchema = require("../models/compras"); // Importa el modelo de compras para ajustar el stock

const router = express.Router();

// Crear una venta y ajustar el stock
router.post('/ventas', async (req, res) => {
    const { Clientes_id, FechaVenta, Total, ProductoServicio_id } = req.body;

    try {
        // Buscar la compra relacionada al ProductoServicio_id
        const compra = await comprasSchema.findOne({ ProductoServicio_id });

        if (!compra) {
            return res.status(404).json({ message: "Compra no encontrada para el producto vendido" });
        }

        // Verificar que haya suficiente stock
        if (compra.Stock < Total) {
            return res.status(400).json({ message: "Stock insuficiente para realizar la venta" });
        }

        // Crear la venta
        const venta = new ventasSchema({
            Clientes_id,
            FechaVenta,
            Total,
            ProductoServicio_id,
            Estado
        });

        const savedVenta = await venta.save();

        // Restar el Total de la venta al Stock en la compra
        compra.Stock -= Total;
        await compra.save();

        res.json({ venta: savedVenta, message: "Venta realizada y stock actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
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
        const { Clientes_id, FechaVenta, Total, ProductoServicio_id, Estado } = req.body;

        // Crea un objeto con los datos actualizados
        const updatedData = {
            Clientes_id,
            FechaVenta,
            Total,
            ProductoServicio_id,
            Estado
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

// Cancelar una venta y ajustar el stock
router.put('/ventas/:id/cancelar', async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar la venta por su ID
        const venta = await ventasSchema.findById(id);

        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        // Verificar si la venta ya está cancelada
        if (venta.estado === 'cancelada') {
            return res.status(400).json({ message: 'La venta ya está cancelada' });
        }

        // Buscar la compra relacionada para ajustar el stock
        const compra = await comprasSchema.findOne({ ProductoServicio_id: venta.ProductoServicio_id });

        if (!compra) {
            return res.status(404).json({ message: "Compra no encontrada para el producto vendido" });
        }

        // Devolver el total de la venta al stock de la compra
        compra.Stock += venta.Total;
        await compra.save();

        // Cambiar el estado de la venta a 'cancelada'
        venta.estado = 'cancelada';
        await venta.save();

        res.json({ venta, message: 'Venta cancelada y stock ajustado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
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



