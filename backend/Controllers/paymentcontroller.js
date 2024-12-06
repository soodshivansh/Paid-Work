import { razorpay } from "../config/razorpayPayement.js";
export const createPaymentLink=async (req,res)=>{
    try {
 
        const paymentLinkRequest = {
          amount: 200 *100,
          currency: "INR",
          customer: {
            name:"Charges for platform usage",
          
          },
          notify: {
            sms: true,
            
          },
          reminder_enable: true,
          callback_url: `http://localhost:3000/adopt/`,
         
        };
        
        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    
        const paymentLinkId = paymentLink.id;
        const paymentLinkUrl = paymentLink.short_url;
    
        const resData={
            paymentLinkId,
            paymentLinkUrl
        }
        return res.json({message:"Payment link created successfully",status:true,data:resData});
      } catch (err) {
        console.log(err);
        // throw new Error(err.message); 
        return res.status(400).json({message:err.message}); 
      }
}

// const updatePaymentInformation=async (req,res)=>{
//     try{
//         await paymentService.updatePaymentInformation(req.query); 
        
//         return res.status(200).json({message:"Payment information updated successfully",status:true});
//     }catch(err){
//         res.status(400).json({message:err.message});
//     }
// }

