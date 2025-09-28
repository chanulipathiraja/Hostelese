import express from 'express';

import {Emergency} from '../models/index.js';

export const getEmergency = async(req,res)=>{
   const emergency = await Emergency.findAll();
   res.json(emergency);
}

export const deleteEmergency = async(req,res)=>{   
     const id = req.params.id;
    const deleteEmergency = await Emergency.destroy({
    where: {
        id: id
    }
   })
   res.json(deleteEmergency);
   
}

export const updateEmergency = async(req,res)=>{
    const id = req.params.id;

   const updateemergency = await Emergency.update({
    subwardenName: req.body.subwardenName,
    subwardenContactnumber: req.body.subwardenContactnumber,
    medicalcenterName: req.body.medicalcenterName,
    medicalcenterContactnumber: req.body.medicalcenterContactnumber,
    ambulanceName: req.body.ambulanceName,
    ambulanceContactnumber: req.body.ambulanceContactnumber
    },  {
        where: {
        id: id
    }
    })     
    
   
   res.json(updateemergency);
   
}


export const postEmergency =async(req,res)=>{
    //console.log(req.body)
    
    const newemergency = await Emergency.create({
     subwardenName: req.body.subwardenName,
     subwardenContactnumber: req.body.subwardenContactnumber,
     medicalcenterName: req.body.medicalcenterName,
     medicalcenterContactnumber: req.body.medicalcenterContactnumber,
     ambulanceName: req.body.ambulanceName,
     ambulanceContactnumber: req.body.ambulanceContactnumber
    })

    console.log(newemergency);
    res.json(newemergency);
}

    


    