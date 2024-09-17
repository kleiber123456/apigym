const express = require("express");
const mongoose = require('mongoose');
const comprasSchema = require("../models/compras"); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Función para verificar si un ID es un ObjectId válido
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Crear una compra
router.post('/compras', (req, res) => {
    const { Proveedores_id, ProductoServicio_id, Stock, Total, Estado } = req.body;

    console.log('Proveedores_id:', Proveedores_id);
    console.log('ProductoServicio_id:', ProductoServicio_id);

    if (!isValidObjectId(Proveedores_id)) {
        return res.status(400).json({ message: 'Proveedores_id inválido' });
    }
    if (!isValidObjectId(ProductoServicio_id)) {
        return res.status(400).json({ message: 'ProductoServicio_id inválido' });
    }

    if (!Proveedores_id || !ProductoServicio_id || Stock === undefined || Total === undefined) {
        return res.status(400).json({ message: 'Todos los campos requeridos deben estar presentes' });
    }

    const compra = new comprasSchema({
        Proveedores_id,
        Fecha: Date.now(),
        Stock,
        Total,
        Estado,
        ProductoServicio_id
    });

    compra
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});


// Obtener todas las compras
router.get("/compras", (req, res) => {
    comprasSchema
        .find()
        .populate('Proveedores_id') // Poblar proveedores
        .populate('ProductoServicio_id') // Poblar productos o servicios
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Obtener una compra por ID
router.get("/compras/:id", (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID de compra inválido' });
    }

    comprasSchema
        .findById(id)
        .populate('Proveedores_id') // Poblar proveedores
        .populate('ProductoServicio_id') // Poblar productos o servicios
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
        const { Proveedores_id, Fecha, Stock, Total, Estado, ProductoServicio_id } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'ID de compra inválido' });
        }
        if (!isValidObjectId(Proveedores_id)) {
            return res.status(400).json({ message: 'Proveedores_id inválido' });
        }
        if (!isValidObjectId(ProductoServicio_id)) {
            return res.status(400).json({ message: 'ProductoServicio_id inválido' });
        }

        // Crea un objeto con los datos actualizados
        const updatedData = {
            Proveedores_id,
            Fecha,
            Stock,
            Total,
            Estado,
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
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID de compra inválido' });
    }

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
