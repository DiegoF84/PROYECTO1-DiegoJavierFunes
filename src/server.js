const express = require("express");
const { findOneById, findAll, create, update, destroy } = require("./database/data.manager.js");

require('dotenv').config();

const server = express();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Obtener todos los productos: Ruta GET http://127.0.0.1:3000/productos
server.get('/productos', (req, res) => {
    findAll()
        .then((productos) => res.status(200).send(productos))
        .catch((error) => res.status(400).send(error.message));
});

// Obtener un producto específico: Ruta GET http://127.0.0.1:3000/productos/1
server.get('/productos/:id', (req, res) => {
    const { id } = req.params;

    findOneById(Number(id))
        .then((producto) => res.status(200).send(producto))
        .catch((error) => res.status(400).send(error.message));
});

// Crear un nuevo producto: Ruta POST http://127.0.0.1:3000/productos
server.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body;

    create({ nombre, descripcion, precio })
        .then((productos) => res.status(201).send(productos))
        .catch((error) => res.status(400).send(error.message));
});

// Actualizar un producto específico: Ruta PUT http://127.0.0.1:3000/productos/1
server.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;

    update({ id: Number(id), nombre, descripcion, precio })
        .then((producto) => res.status(200).send(producto))
        .catch((error) => res.status(400).send(error.message));
});

// Eliminar un producto específico: Ruta DELETE http://127.0.0.1:3000/productos/1
server.delete('/productos/:id', (req, res) => {
    const { id } = req.params;

    destroy(Number(id))
        .then((producto) => res.status(200).send(producto))
        .catch((error) => res.status(400).send(error.message));
});

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send(`Error 404...La URL indicada no existe en este servidor`);
});

// Método oyente de peticiones
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/productos`);
});