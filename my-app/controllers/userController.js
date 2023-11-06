const express = require('express');
const User = require('../models/userModel.js'); 


// new user added
exports.addUser = async (req, res) => {
    try {
        console.log("User add");
        
        
        const existingUser = await User.findOne({ userId: req.body.userId });
        if (existingUser) {
            return res.status(200).send({ message: 'User already exists', user: existingUser });
        }
        
       
        const newUser = new User({
            userId: req.body.userId
        });
        await newUser.save();

        res.status(201).send(newUser);
    } catch (error) {
        console.error("Error adding suer");
        res.status(400).send({ message: error.message });
    }
};

//last pull from spotify api to not overlap 
exports.updateTime = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.lastPull = req.body.lastPull;
        await user.save();

        res.status(200).send(user);
    } catch (error) {
        console.log("error updating the time")
        res.status(400).send({ message: error.message });
    }
};

// pull the last time from database
exports.getTime = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user){
            res.status(404).send({message: 'user doesnt exist'})
        }
        res.status(200).send({ lastPull: user.lastPull });
    } catch (error) {
        console.log("error getting a time")
        res.status(400).send({ message: error.message });
    }
};


