import express from 'express';


import {Admin,Hostel,Payment,Complains} from '../models/index.js';

export const getAdmin = async(req,res)=>{
   const admin = await Admin.findAll();
   res.json(admin);
}

export const deleteAdmin = async(req,res)=>{   
     const id = req.params.id;
    const deleteadmin = await Admin.destroy({
    where: {
        id: id
    }
   })
   res.json(deleteadmin);
   
}

export const updateAdmin = async(req,res)=>{
    const id = req.params.id;

   const updateadmin = await Admin.update({
    adminsName: req.body.adminsName,
    adminsPost: req.body.adminsPost,
    adminHostelName: req.body.adminhostelName,
    userName: req.body.userName,
    password: req.body.passWord,
    confirmPassword: req.body.confirmPassword,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
    
    },  {
        where: {
        id: id
    }
    })     
    
   
   res.json(updateadmin);
   
}


export const postAdmin =async(req,res)=>{
    //console.log(req.body)
    
    const newadmin = await Admin.create({
     adminsName: req.body.adminsName,
     adminsPost: req.body.adminsPost,
     adminHostelName: req.body.adminHostelName,
     userName: req.body.userName,
     password: req.body.password,
     confirmPassword: req.body.confirmPassword,
     email: req.body.email,
     phoneNumber: req.body.phoneNumber
    })

    console.log(newadmin);
    res.json(newadmin);
}

export const loginAdmin = async (req, res) => {
  try {
    const { adminsName, password } = req.body;

    // Validate input
    if (!adminsName || !password) {
      return res.status(400).json({ message: "Admin name and password are required" });
    }

    // Find admin by name
    const admin = await Admin.findOne({
      where: { adminsName },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // If you are using plain passwords (not recommended)
    if (admin.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If using hashed passwords:
    // const isMatch = await bcrypt.compare(password, admin.password);
    // if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    // Success
    res.json({ message: "Login successful", admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Admin.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminDashboardData = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Admin.findByPk(id);
    const hostels = await Hostel.findAll();
    const payments = await Payment.findAll();
    const complains = await Complains.findAll();
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ user, hostels, payments, complains });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


