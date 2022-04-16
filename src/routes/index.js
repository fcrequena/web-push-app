const { Router } = require('express');
const express = require('express')
const routes = express.Router();

const webpush = require('../conf/webpush')
let pushSubscription;

routes.post('/subscription', async (req, res) => {
    pushSubscription = req.body;
    res.status(200).json();
})

routes.post('/new-message', async (req, res) =>{
    const {message} = req.body;
    
    const payload = JSON.stringify({
        title: 'Fcrequena Web Notification',
        message: message
    });
    
    try{
        await webpush.sendNotification(
            pushSubscription, 
            payload
        )
    }catch(error){
        console.log(error);
    }
    
}); 
module.exports = routes