import sellerModel from "../models/seller.model.js";
import { createSeller } from "../services/seller.services.js";
import {validationResult} from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerSeller = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const{fullName, email, password} = req.body;
    const isSellerExist = await sellerModel.findOne({email});
    if(isSellerExist) {
        return res.status(400).json({error: "Seller already exists"});
    }

    const hashedPassword = await sellerModel.hashPassword(password);
    const seller = await createSeller({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
    });
    const token = await seller.generateAuthToken();
    res.status(201).json({token,seller});
}

export const loginSeller = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const {email, password} = req.body;
    const seller = await sellerModel.findOne({email});
    if(!seller) {
        return res.status(400).json({error: "Invalid credentials"});
    }
    const isMatch = await seller.comparePassword(password);
    if(!isMatch) {
        return res.status(400).json({error: "Invalid credentials"});
    }
    const token = await seller.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,seller});
}

export const getSellerProfile = async (req, res) => {
    const seller = req.seller;
    if(!seller) {
        return res.status(401).json({error: "seller not found"});
    }
    res.status(200).json({seller});
}

export const logoutSeller = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokenModel.create({token});
    res.cookie('token');
    res.status(200).json({message: "Logged out successfully"});
}