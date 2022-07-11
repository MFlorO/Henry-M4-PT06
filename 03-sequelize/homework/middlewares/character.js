const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post("/", async function(req,res){  
    //Va "/"" y no "/character" porque ya estoy dentro del middlewares de character
    const {code, name, hp, mana} = req.body;
    if(!code || !name || !hp || !mana ){
        return res.status(404).send("Falta enviar datos obligatorios")
    }
    
    try{
        const character = await Character.create(req.body);
        res.status(201).json(character)
    }
    catch (error){
            res.status(404).send("Error en alguno de los datos provistos")
        }
    
});


router.get("/", async function(req,res){
    const {race} = req.query;   

    const condiction = {};
    const where = {};


    if(race) where.race = race;

   condiction.where = where;

    const character = await Character.findAll(condiction);
    res.json(character);
    
});



router.get("/:code", async function(req,res){
    const {code} = req.params;

    const character = await Character.findByPk(code);

    return character ? res.json(character) : res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
    
    // Con promesas:

    // Character.findByPk(code)
    // .then(character =>{
    //     if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
    //     res.json(character)
    // })

});


module.exports = router;