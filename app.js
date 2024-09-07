const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require('cors');


const proveedorRouter = require("./routes/proveedores");
const clientesRouter = require("./routes/clientes");
const productoservicioRoutes =require("./routes/productoServicio");
const ventasRoutes = require("./routes/ventas");
const comprasRouter = require("./routes/compras");


// settings
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api", proveedorRouter)
app.use("/api", clientesRouter )
app.use("/api", comprasRouter )
app.use("/api", productoservicioRoutes)
app.use("/api", ventasRoutes)

// routes
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log('Server listening to', port));