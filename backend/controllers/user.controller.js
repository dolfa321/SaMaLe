import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, lastname } = req.body;

    if (!name || !email || !password || !lastname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "-password -isAdmin -createdAt -updatedAt"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -createdAt -updatedAt -isAdmin"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by Email
export const getUserByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          throw err;
        }
        console.log(token);
        res.cookie("token", token, {}).json({
          id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
export const updateUserById = async (req, res) => {
  try {
    const { name, lastname, email } = req.body;
    const { userId } = req.params;

    if (!name && !email && !lastname) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: name,
          lastname: lastname,
          email: email,
        },
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserSession = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token provided, unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
    return res.status(200).json(user);
  });
};

export const removeUserSession = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0), // Set expiration to a past date
  });
  res.status(200).json({ message: "Logged out successfully" });
};
