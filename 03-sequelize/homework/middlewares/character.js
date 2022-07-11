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
    const {race,age} = req.query;   

    const condiction = {};
    const where = {};


    condiction.where = where;

    if(race) where.race = race;
    if(age) where.age = age;

    // {
    //     race:"human",
    //     age:27
    // }

    const character = await Character.findAll(condiction);
    res.json(character);
    
});


router.get("/young", async function(req,res){
 
    const character = await Character.findAll({
        where:{
            age:{[Op.lt]:25}
        }
    })

    res.json(character)

});


router.get("/roles/:code", async function(req,res){
    const {code} = req.params;

    const character = await Character.findByPk(code,{
        include: Role
    });

    res.status(404).json(character)
    

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



router.put("/addAbilities", async function(req,res){

    const {codeCharacter, abilities} = req.body;

    const character = await Character.findByPk(codeCharacter)
    const promises = abilities.map( a => character.createAbility(a))

    await Promise.all(promises)

    res.send('OK')

});




router.put("/:attribute", async function(req,res){

    const {attribute} = req.params;
    const {value} = req.query;
 

    await Character.update({  //Actualizame 
        [attribute]:value      // Los atributos que recibo por params, por esta value que recibo por query
    },{                      // [atribute] va con corchete pq no se que atributo es
        where:{
            [attribute]:null  //Donde esos atributos tengan valor "null"
        }
    })

    res.send('Personajes actualizados')

});









module.exports = router;