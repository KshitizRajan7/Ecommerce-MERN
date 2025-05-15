import sellerModel from "../models/seller.model.js";

export const createSeller = async ({
    firstName,
    lastName,
    email,
    password
}) => {
    if(!firstName || !lastName || !email || !password) {
        throw new Error("All fields are required");
    }
    const seller = await sellerModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
    })
    return seller;
}