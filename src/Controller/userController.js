const userModel = require("../Model/userModel");
const validator = require("validator");
const { uploadFiles } = require("../aws/aws");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const userCreate = async (req, res) => {
  try {
    const files = req.files;
    const { Name, Mobile, Password, Email } = req.body;
    if (!Name || !Mobile || !Password || !Email || Name.trim() == "" || Mobile.trim()=="" || Password.trim() == "" || Email.trim() == ""){
      return res.status(400).json({
        status: false,
        message: "Please enter a Mandatory Information",
      });
    }
    if (!validator.isEmail(Email)) {
      return res.status(400).json({
        status: false,
        message: " Please enter a valid email address ",
      });
    } else {
      const emailCheck = await userModel.findOne({
        $or: [{ Email }, { Mobile }],
      });
      if (emailCheck) {
        return res
          .status(400)
          .json({ status: false, message: "Email / Mobile already exists" });
      }
      const userDetails = {
        Name,
        Email,
        Mobile,
        Password,
      };
      if (files) {
        if (files.length == 0) {
          return res.status(400).json({
            status: false,
            message: "please provide a profile picture",
          });
        }
        const url = await uploadFiles(files[0]);
        userDetails.profilePicture = url;
      }
      // console.log(userDetails);
      const user = await userModel.create(userDetails);
      

      return res.status(201).json({ status: true, message: `User created successfully`, data: user});

    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};




const UserLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({
        status: false,
        message: " Please enter your email address and password",
      });
    }
    const user = await userModel.findOne({ Email: Email, Password: Password });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res
      .status(200)
      .json({ status: true, message: "User Logged in", token: token });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};



const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({isDeleted: false});
    res.status(200).json({status : true, message: "All Users", users: users});
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};




const updateUser = async (req, res) => {
  try {
    const files = req.files
    const userId = req.userId
    const paramId = req.params.userId
    const updateData = req.body
    if(Object.keys(updateData).length == 0){
      return res.status(400).json({ status: false, message: "Please enter a Data, What you want to update"})
    }
    const user = await userModel.findOne({_id : paramId, isDeleted : false})
    if(!user){
      return res.status(404).json({status : false, message : "User Not Found"})
    }
    if(userId !== String(paramId)){
      return res.status(403).json({status : false, message : "Unauthorized"})
    }
    const updateDetail = {
      isDeleted : false
    }

    if(updateData.Name && (updateData.Name).trim() !== ""){
      updateDetail.Name = updateData.Name
    }
    if(updateData.Email && (updateData.Email).trim() !== ""){
      if(!validator.isEmail(updateData.Email)){
        return res.status(400).json({status : false, message : "Invalid email"})
      }
      const email = await userModel.findOne({email: updateData.Email});
      if(email){
        return res.status(400).json({status : false, message :" email already exists"})
      }
      updateDetail.Email = updateData.Email
    }

    if(updateData.Password && (updateData.Password).trim()!==""){
      updateDetail.Password = updateData.Password
    }

    if(updateData.Mobile && (updateData.Mobile).trim()!==""){
      const mobile = await userModel.findOne({email: updateData.Mobile});
      if(mobile){
        return res.status(400).json({status : false, message :" Mobile Number already exists"})
      }
      updateDetail.Mobile = updateData.Mobile
    }
    if(files){
      const url = await uploadFiles(files[0])
      updateDetail.profilePicture = url
    }

    const newUser = await userModel.findByIdAndUpdate(userId, {$set : updateDetail}, {new : true})
    res.status(200).json({status :true, message : "User updated successfully", data : newUser});
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}




const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId
    if(!userId) {
      return res.status(400).json({status: false, message : "Provide userId" });
    }
    const user = await userModel.findOne({_id : userId, isDeleted : false})
    if(!user){
      return res.status(404).json({status: false, message : "User not found" });
    }
    if(String(userId) !== String(req.userId)){
      return res.status(403).json({status : false, message : "User unAuthorized" });
    }
    await userModel.findByIdAndUpdate(userId, {$set : {isDeleted : true}})
    .then(()=>{
      return res.status(200).json({status: true, message : "User Deleted" });
    })
    } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}
module.exports = {
  userCreate,
  UserLogin,
  getUsers,
  updateUser,
  deleteUser
};
