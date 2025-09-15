import express from 'express';

import Facility from '../models/facility.js';

export const getFacility = async(req,res)=>{
   const facility = await Facility.findAll();
   res.json(facility);
}

export const deleteFacility = async(req,res)=>{   
     const id = req.params.id;
    const deleteFacility = await Facility.destroy({
    where: {
        id: id
    }
   })
   res.json(deleteFacility);
   
}

export const updateFacility = async(req,res)=>{
    const id = req.params.id;

   const updateFacility = await Facility.update({
        facilityType : req.body.facilityType,
    
    },  {
        where: {
        id: id
    }
    })     
    
   
   res.json(updateFacility);
   
}


export const postFacility =async(req,res)=>{
    //console.log(req.body)
    try{
    const newfacility = await Facility.create({
        facilityType : req.body.facilityType,
    })

    console.log(newfacility);
    res.json(newfacility);
    }
    catch(err){
    console.log(err);
    }
}
    




        