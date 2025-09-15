import express from 'express';

import Hostel from '../models/hostel.js';

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
      const hostel = await Hostel.findByPk(id);
      if (!hostel) {
        return res.status(404).json({ message: "Hostel not found" });
      }
      res.json(hostel);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }}

    




        

    

