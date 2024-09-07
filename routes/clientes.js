const express = require("express");
const ClientesSchema = require("../models/clientes");

const router = express.Router();

// create user 
router.post('/clientes' , (req, res) => {
    const clientes = ClientesSchema(req.body);
    clientes
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({mesaage: error}))
});

// get all users
router.get("/clientes", (req, res) =>{
    ClientesSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesaage: error}));
});

//get a users

router.get("/clientes/:id", (req, res) =>{
    const {id} = req.params;
    ClientesSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mesaage: error}));
});

//update a users

router.put("/clientes/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const {
        Nombre,
        Apellido,
        Email,
        Telefono
      }= req.body;
    
      // Crea un objeto con los datos actualizados
      const updatedData = {
        Nombre,
        Apellido,
        Email,
        Telefono
      };
  
      // Actualiza el usuario en la base de datos
      const updatedClientes = await ClientesSchema.updateOne({ _id: id }, { $set: updatedData });
  
      if (updatedClientes.matchedCount === 0) {
        return res.status(404).json({ message: 'El Cliente no fue encontrado' });
      }
  
      res.json(updatedClientes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el Cliente' });
    }
  });
// delete a user
router.delete("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    ClientesSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
  });



module.exports = router;