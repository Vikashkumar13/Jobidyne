import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

//ADMIN->REGISTER COMPANY
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        //validation-company name
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required.", success: false });
        }
        let company = await Company.findOne({ name: companyName });
        //validation-comapany
        if (company) {
            return res.status(400).json({ message: "You can't register same company.", success: false })
        };
        company = await Company.create({ name: companyName, userId: req.id });

        return res.status(201).json({ message: "Company registered successfully.", company, success: true })
    }
    catch (error) {
        console.log("Error while registering company : ", error);
    }
}
//ADMIN->GET COMPANY
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; //from authentication middleware
        const companies = await Company.find({ userId });
        //validation-company
        if (!companies) {
            return res.status(404).json({ message: "Companies not found.", success: false })
        }
        return res.status(200).json({ companies, success: true })
    }
    catch (error) {
        console.log("Error while getting all company : ", error);
    }
}
// ADMIN->GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        //validation-company
        if (!company) {
            return res.status(404).json({ message: "Company not found.", success: false })
        }
        return res.status(200).json({ company, success: true })
    }
    catch (error) {
        console.log("Error while getting company by id : ", error);
    }
}
//ADMIN->UPDATE COMPANY
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file; //company logo file

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        //validation-company
        if (!company) {
            return res.status(404).json({ message: "Company not found.", success: false })
        }
        return res.status(200).json({ message: "Company information updated.", success: true })
    }
    catch (error) {
        console.log("Error while updating company details : ", error);
    }
}