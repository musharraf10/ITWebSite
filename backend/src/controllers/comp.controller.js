import Company from "../models/companies.model.js";

export const getCompanies=async(req,res)=>{
    try {
        const company=await Company.find();

        if(company.length===0){
            return res.status(400).json({message:"No Companies found"});
        }
        res.status(200).json(company);
    }catch (e) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error occurred: ${e.message}` });
  }
}

// Creating Company here like Regisration 
export const postCompanies = async (req, res) => {
    try {
        const { name, address, contactEmail, thirdPartyUserId, status } = req.body;

        if (!name || !address || !contactEmail || !thirdPartyUserId || !status) {
            return res.status(400).json({ message: 'Enter All Fields' });
        }

        // Check if the company already exists with the provided email
        const existsCompany = await Company.findOne({ contactEmail });
        if (existsCompany) {
            return res.status(400).json({ message: 'Company with this contact email already exists' });
        }

        // Check if the third-party user is associated with any other company
        const thirdPartyCompany = await Company.findOne({ thirdPartyUserId });
        if (thirdPartyCompany) {
            return res.status(400).json({ message: 'This thirdParty User is already registered with another company' });
        }

        const newCompany = new Company({
            name,
            address,
            contactEmail,
            thirdPartyUserId,
            status,
        });

        await newCompany.save();

        return res.status(201).json({ message: 'Company successfully created', company: newCompany });

    } catch (e) {
        res.status(500).json({ message: `Error occurred: ${e.message}` });
    }
};

export const deleteCompanies=async(req,res)=>{
    try {
        const company=await Company.findByIdAndDelete(req.params.id);
        if(!company){
            return res.status(400).json({message:"Company not found"});
        }
        res.send(company);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};


export const getOneCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" }); 
        }

        res.status(200).json(company); 
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

export const updateCompany=async(req,res)=>{
    try{
        let company=await Company.updateOne({_id:req.params.id},{$set:req.body});
        if(!company){
            return res.status(400).json({message:"Company not found"});
            }
        res.send(company);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}