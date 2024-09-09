const express = require("express");
const multer = require('multer');
const productoServicioSchema = require("../models/productoServicio");

const router = express.Router();

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Crear Producto/Servicio (con imagen)
router.post('/ProductoServicio', upload.single('imagen'), (req, res) => {
    const { Nombre, Descripcion, Precio, Tipo } = req.body;

    // Crea una nueva instancia con la imagen como buffer
    const newProductoServicio = new productoServicioSchema({
        Nombre,
        Descripcion,
        Imagen: req.file ? req.file.buffer : null,  // Almacena la imagen como binario
        Precio,
        Tipo
    });

    newProductoServicio
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

// Obtener todos los Productos/Servicios
router.get("/ProductoServicio", (req, res) =>{
    productoServicioSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error }));
});

// Obtener un Producto/Servicio por ID
router.get("/ProductoServicio/:id", (req, res) =>{
    const { id } = req.params;
    productoServicioSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: error }));
});

// Actualizar un Producto/Servicio por ID (con imagen)
router.put("/ProductoServicio/:id", upload.single('imagen'), async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Descripcion, Precio, Tipo } = req.body;
        
        // Crea un objeto con los datos actualizados
        const updatedData = {
            Nombre,
            Descripcion,
            Precio,
            Tipo
        };

        // Si se ha subido una nueva imagen, también la actualizamos
        if (req.file) {
            updatedData.Imagen = req.file.buffer;  // Actualiza la imagen
        }

        // Actualiza el producto/servicio en la base de datos
        const updatedProductoServicio = await productoServicioSchema.updateOne({ _id: id }, { $set: updatedData });

        if (updatedProductoServicio.matchedCount === 0) {
            return res.status(404).json({ message: 'El producto o servicio no fue encontrado' });
        }

        res.json(updatedProductoServicio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto o servicio' });
    }
});

// Eliminar un Producto/Servicio
router.delete("/ProductoServicio/:id", async (req, res) => {
    const { id } = req.params;
    productoServicioSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

module.exports = router;
