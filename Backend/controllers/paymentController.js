import express from 'express';


import {Payment} from '../models/index.js';

export const getPayment = async(req,res)=>{
   const payment = await Payment.findAll();
   res.json(payment);
}

export const deletePayment = async(req,res)=>{   
     const id = req.params.id;
    const deletepayment = await Payment.destroy({
    where: {
        id: id
    }
   })
   res.json(deletepayment);
   
}

export const updatePayment = async(req,res)=>{
    const id = req.params.id;

   const updatepayment = await Payment.update({
    userID: req.body.userID,
    paymentreference: req.body.paymentreference,
    paymentDate: req.body.paymentDate,
    paymentAmount: req.body.paymentAmount,
    paymentDescription: req.body.paymentDescription
    
    },  {
        where: {
        id: id
    }
    })     
    
   
   res.json(updatepayment);
   
}


export const postPayment =async(req,res)=>{
    //console.log(req.body)
    
    const newpayment = await Payment.create({
    userID: req.body.userID,
    paymentreference: req.body.paymentreference,
    paymentDate: req.body.paymentDate,
    paymentAmount: req.body.paymentAmount,
    paymentDescription: req.body.paymentDescription
    
    })

    console.log(newpayment);
    res.json(newpayment);
}

export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Payment.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};





    


    