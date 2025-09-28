import express from 'express';

import {Hostel} from '../models/index.js';

export const getHostel = async(req,res)=>{
   const hostel = await Hostel.findAll();
   res.json(hostel);
}

export const deleteHostel = async(req,res)=>{   
     const id = req.params.id;
    const deletehostel = await Hostel.destroy({
    where: {
        id: id
    }
   })
   res.json(deletehostel);
   
}

export const updateHostel = async(req,res)=>{
    const id = req.params.id;

   const updatehostel = await Hostel.update({
        hostelId: req.body.hostelId,
        hostelName: req.body.hostelName,
        register_count: req.body.register_count,
        leave_count: req.body.leave_count,
        sick_count: req.body.sick_count,
        room_count: req.body.room_count,
       
    
    },  {
        where: {
        id: id
    }
    })     
    
   
   res.json(updatehostel);
   
}


export const postHostel =async(req,res)=>{
    console.log("hostel",req.body)
    
    const newhostel = await Hostel.create({
        hostelId: req.body.hostelId,
        hostelName: req.body.hostelName,
        register_count: req.body.register_count,
        leave_count: req.body.leave_count,
        sick_count: req.body.sick_count,
        room_count: req.body.room_count,
      
    })

    console.log(newhostel);
    res.json(newhostel);
}

export const getHostelById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Hostel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Hostel not found" });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }}


  export const deleteHostelById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHostel = await Hostel.destroy({
      where: { id }
    });
    if (!deletedHostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }
    res.json({ message: "Hostel deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
    




        

    

