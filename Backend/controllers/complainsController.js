import express from 'express';

import Complains from '../models/complains.js';

export const getComplains = async(req,res)=>{
   const complains = await Complains.findAll();
   res.json(complains);
}

export const deleteComplains = async(req,res)=>{   
     const id = req.params.id;
    const deleteComplains = await Complains.destroy({
    where: {
        id: id
    }
   })
   res.json(deleteComplains);
   
}

export const updateComplains = async(req,res)=>{
    const id = req.params.id;

   const updateComplains = await Complains.update({
        complainDate : Date.now(),
        complainType : req.body.complainType,
        complainAbout : req.body.complainAbout
    
    },  {
        where: {
        id: id
    }
    })     
    
   
   res.json(updateComplains);
   
}


export const postComplains =async(req,res)=>{
    //console.log(req.body)
    
    const newcomplains = await Complains.create({
        complainDate : Date.now(),
        complainType : req.body.complainType,
        complainAbout : req.body.complainAbout
    })

    console.log(newcomplains);
    res.json(newcomplains);
}

    




        