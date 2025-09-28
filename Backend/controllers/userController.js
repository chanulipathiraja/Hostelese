import express from 'express';
import { DataTypes } from 'sequelize';

import {User, Hostel, Emergency} from '../models/index.js';

export const getUser = async(req,res)=>{
   const user = await User.findAll();
   res.json(user);
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // or req.body depending on your route
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const deleted = await User.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUser = async(req,res)=>{
    const id = req.body.id;

   const updateuser = await User.update({
    studentName: req.body.studentName,
    userName: req.body.userName,
    hostelId: req.body.hostelId,
    emergencyId: req.body.emergencyId,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    floorNumber: req.body.floorNumber,
    registerNumber: req.body.registerNumber,
    roomNumber: req.body.roomNumber,
    indexNumber: req.body.indexNumber,
    address: req.body.address,
    parentName: req.body.parentName,
    parentPhonenumber: req.body.parentPhonenumber,
    otherDetails: req.body.otherDetails
    
    },  {
        where: {
        id: id
    }
    })     
    
   
   res.json(updateuser);
   
}


export const postUser =async(req,res)=>{
    //console.log(req.body)
    
    const newuser = await User.create({
     studentName: req.body.studentName,
     userName: req.body.userName,
     hostelId: req.body.hostelId,
     emergencyId: req.body.emergencyId,
     password: req.body.password,
     confirmPassword: req.body.confirmPassword,
     email: req.body.email,
     phoneNumber: req.body.phoneNumber,
     floorNumber: req.body.floorNumber,
     registerNumber: req.body.registerNumber,
     roomNumber: req.body.roomNumber,
     indexNumber: req.body.indexNumber,
     address: req.body.address,
     parentName: req.body.parentName,
     parentPhonenumber: req.body.parentPhonenumber,
     otherDetails: req.body.otherDetails
    })

    console.log(newuser);
    res.json(newuser);
}

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({
      where: { userName, password },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found or wrong credentials" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id,{
      include: [
        { model: Hostel },      
        { model: Emergency }    // fetch emergency data too if needed
      ]
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({
      where: { id }
    });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

