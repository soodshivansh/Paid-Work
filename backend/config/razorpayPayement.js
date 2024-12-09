// const Razorpay = require('razorpay');
import Razorpay from 'razorpay';

const api_key="rzp_test_2IKlIi93il8iG9";
const api_Secret_key="SyoKg3oKIppH8DVqd4SvmYsi";

export const razorpay = new Razorpay({
  key_id:api_key,
  key_secret:api_Secret_key,
})

// module.exports=razorpay; 
