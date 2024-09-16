const express = require("express");
const productoServicioSchema = require("../models/productoServicio");

const router = express.Router();

// create user 
router.post('/ProductoServicio' , (req, res) => {
    const ProductoServicio = productoServicioSchema(req.body);
    ProductoServicio
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({mesaage: error}))
});

// get all users
router.get("/ProductoServicio", (req, res) =>{
    productoServicioSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesaage: error}));
});

//get a users

router.get("/ProductoServicio/:id", (req, res) =>{
    const {id} = req.params;
    productoServicioSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesaage: error}));
});

//update a users

router.put("/ProductoServicio/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const {
        Nombre,
        Descripcion,
        Precio,
        Tipo
      }= req.body;

      // Crea un objeto con los datos actualizados
      const updatedData = {
        Nombre,
        Descripcion,
        Precio,
        Tipo
      };

      // Actualiza el usuario en la base de datos
      const updatedProductoServicio = await productoServicioSchema.updateOne({ _id: id }, { $set: updatedData });

      if (updatedProductoServicio.matchedCount === 0) {
        return res.status(404).json({ message: 'El producto o servicios no fue encontrado' });
      }

      res.json(updatedProductoServicio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el producto o servicio' });
    }
  });
// delete a user
router.delete("/ProductoServicio/:id", async (req, res) => {
    const { id } = req.params;
    productoServicioSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
  });



module.exports = router;