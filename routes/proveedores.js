const express = require("express");
const proveedoresSchema = require("../models/proveedores");

const router = express.Router();

// create user 
router.post('/proveedores' , (req, res) => {
    const proveedor = proveedoresSchema(req.body);
    proveedor
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({mesaage: error}))
});

// get all users
router.get("/proveedores", (req, res) =>{
    proveedoresSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesaage: error}));
});

//get a users

router.get("/proveedores/:id", (req, res) =>{
    const {id} = req.params;
    proveedoresSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesaage: error}));
});

//update a users

router.put("/proveedores/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const {
        Nombre,
        Apellido,
        Email,
        Telefono,
        Direccion
      }= req.body;
    
      // Crea un objeto con los datos actualizados
      const updatedData = {
        Nombre,
        Apellido,
        Email,
        Telefono,
        Direccion
      };
  
      // Actualiza el usuario en la base de datos
      const updatedProveedor = await proveedoresSchema.updateOne({ _id: id }, { $set: updatedData });
  
      if (updatedProveedor.matchedCount === 0) {
        return res.status(404).json({ message: 'El Proveedor no encontrado' });
      }
  
      res.json(updatedProveedor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  });
// delete a user
router.delete("/proveedores/:id", async (req, res) => {
    const { id } = req.params;
    proveedoresSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
  });



module.exports = router;