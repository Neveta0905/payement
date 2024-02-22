const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const port = 3001
require('dotenv').config()

if(!process.env.apiKey) throw new Error('Missing field "apiKey",from stripe doc, in your dotenv')
if(!process.env.priceKey) throw new Error('Missing field "priceKey",from stripe doc, in your dotenv')
  
const stripe = require('stripe')(process.env.apiKey);
app.use(express.static('public'));


const DOMAIN = 'http://localhost:3001';

app.post('/stripe',async (req,res) =>{
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price:process.env.priceKey,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${DOMAIN}/public/success.html`,
      cancel_url: `${DOMAIN}/public/cancel.html`,
    })
  res.json({url:session.url})
})
app.listen(port,()=>{
	console.log('running')
})