import express from 'express';

import {Facility} from '../models/index.js';

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
        hostelId : req.body.hostelId,
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
        hostelId : req.body.hostelId,
        facilityType : req.body.facilityType,
    })

    console.log(newfacility);
    res.json(newfacility);
    }
    catch(err){
    console.log(err);
    }
}

export const getFacilityById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Facility.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Facility not found" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }}
    




        