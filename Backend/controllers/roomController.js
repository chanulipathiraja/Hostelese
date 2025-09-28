import express from 'express';

import {Room} from '../models/index.js';

export const getRoom = async(req,res)=>{
   const room = await Room.findAll();
   res.json(room);
}

export const deleteRoom = async(req,res)=>{   
     const id = req.params.id;
    const deleteRoom = await Room.destroy({
    where: {
        id: id
    }
   })
   res.json(deleteRoom);
   
}

export const updateRoom = async(req,res)=>{
    const id = req.params.id;

   const updateroom = await Room.update({
        hostelid : req.body.hostelid,
        roomNo : req.body.roomNo,
        floorNo : req.body.floorNo,
        numberofStudents : req.body.numberofStudents,
        numberofBeds : req.body.numberofBeds
    
    },  {
        where: {
        id: id
    }
    })     
    
   
   res.json(updateroom);
   
}


export const postRoom =async(req,res)=>{
    //console.log(req.body)
    
    try{
        const newroom = await Room.create({
        hostelid : req.body.hostelid,
        roomNo : req.body.roomNo,
        floorNo : req.body.floorNo,
        numberofStudents : req.body.numberofStudents,
        numberofBeds : req.body.numberofBeds
    
    })

    console.log(newroom);
    res.json(newroom);
    }
    catch(err){
        console.log(err);
    }
}

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Room.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



    




        