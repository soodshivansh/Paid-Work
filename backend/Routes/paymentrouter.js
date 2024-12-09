// const express=require('express');
import express from 'express';
const router=express.Router();

import {createPaymentLink} from "../Controllers/paymentcontroller.js";





router.post('/',createPaymentLink);
// router.get('/',authenticateJWT,paymentController.updatePaymentInformation);

// module.exports=router;

export default router;


