const User = require("../models/user");
const bcrypt = require("bcrypt");

async function handleUserSignup(req, res){
    const {email, password} = req.body;
  const existingUser = await User.findOne({ email });

  if(existingUser){
    return res.send("User already exists. Please login.");
}

    // hash passwords
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        email,
        password : hashedPassword,

    });

    res.send("user registered successfully");

}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if(!user){
        return res.send("User not found. Please signup.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
        return res.send("Invalid password");
    }

    res.send("user logged in successfully");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};