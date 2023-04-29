const { Router } = require('express');
const express = require("express");
const {getDogsDetail} = require("../controllers/getDogs");
const {dogByID} = require("../controllers/getDogById");
const {postDog} = require("../controllers/createNewDog")
const {getTemperaments} = require("../controllers/getTemperaments");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.get("/dogs", getDogsDetail);


router.get("/dogs/:idRaza",dogByID);

router.post("/dogs", postDog);

router.get("/temperaments", getTemperaments)


module.exports = router;
