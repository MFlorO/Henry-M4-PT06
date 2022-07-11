const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();



router.post("/ability", async function(req,res){

    const {name, mana_cost} = req.body

    if(!name || !mana_cost){
        return res.status(404).send('Falta enviar datos obligatorios')
    }else{
        try{
            const ability = await Ability.create(req.body)
            res.status(201).json(ability)

        }catch{
            res.status(404).send('Error en los datos')
        }
    }
});


router.put("/setCharacter", async function(req,res){

    const {idAbility, codeCharacter} = req.body

    // const character = await Characte.findByPk(codeCharacter)
    const ability = await Ability.findByPk(idAbility)

    await ability.setAbility(codeCharacter)

    res.json(ability)
});



module.exports = router;