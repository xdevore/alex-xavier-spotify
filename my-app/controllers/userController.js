const express = require('express');
const User = require('../models/userModel.js'); 



exports.addUser = async (req, res) => {
    try {
        console.log("FUCKTHISSHITM8")
        const newUser = new User({
            userId: req.body.userId
        });

        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


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
        res.status(400).send({ message: error.message });
    }
};


exports.getTime = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ lastPull: user.lastPull });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


