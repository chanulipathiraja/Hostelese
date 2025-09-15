import express from 'express';

import Payment from '../models/payment.js';

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

    


    