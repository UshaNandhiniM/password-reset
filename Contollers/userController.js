import User from "../Models/userSchema.js";
import bcrpty from "bcryptjs";
import sendPasswordResetEmail from "../Services/Email.js";

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hash = await bcrpty.hash(password, 10);
    const newUser = new User({ userName, email, password: hash });
    await newUser.save();
    res.status(200).send({ message: "Successfully registered", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "register failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrpty.compare(password, userDetails.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Password incorrect" });
    }

    res.status(200).send({ message: "user Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "register failed" });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ Message: "User Not Found" });
  }
  const { success, error } = await sendPasswordResetEmail(user.email, user._id);

  if (success) {
    res.status(200).json({ Message: "Password reset email sent" });
  } else {
    res.status(500).json({ Message: "Error sending email", error });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const userid = req.params.id;
    const { newpassword, confirmpassword } = req.body;
    if (newpassword !== confirmpassword) {
      return res.status(401).json({ Message: "Pasword Doesn't Match" });
    }
    const hash = await bcrpty.hash(confirmpassword, 10);
    await User.findByIdAndUpdate({ _id: userid }, { password: hash });
    res.status(200).json({ Message: "Pasword Reset Successfully" });
  } catch (error) {
    res.status(500).json({ Message: "Internal Server Error" });
  }
};
