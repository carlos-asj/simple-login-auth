import { UserModel } from "../infra/postgres.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();

    if (users.length == 0){
      return res.status(200).json({
        message: "Users not found"
      });
    };

    return res.status(200).json({users});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        error: "Internal server error"
      });
  };
};

export const getUser = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await UserModel.findOne({
      where: {id: userID}
    });

    if (!user) {
      return res.status(200).json({
        message: "User not found"
      });
    };

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  };
};

export const addNewUser = async (req, res) => {
  const userObj = req.body;

  try {
    const user = await UserModel.findOne({
      where: {email: userObj.email}
    });

    if (user == null) {
      const pwdDB = await hashPassowrd(req.body.password);
      userObj.password = pwdDB;

      await UserModel.create(userObj);
      return res.status(201).json({
        message: "User created!"
      });
    };

    return res.status(200).json({
      message: "User already exists"
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error"
    })
  }
};

export const checkEmail = async (req, res) => {
  const userObj = req.body
  try {
    
    const userEmail = await UserModel.findOne({
      where: { email: userObj.email }
    });

    const user = await UserModel.findOne({
      where: { email: userObj.email }
    });

    if (!userEmail) {
      return res.status(404).json({
        message: "Email not found"
      });
    };

    return res.status(200).json({
      message: "Email found",
      user: user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
        error: "Internal server error"
      });
  };
};

export const userLogin = async (req, res) => {
  const userObj = req.body;
  try {
    const user = await UserModel.findOne({
      where: { email: userObj.email }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    };
    
    const response = await checkPassword(user.password, userObj.password);

    if(response === true) {
      return res.status(200).json({
        message: "Successfully logged in",
        user: user
      });
    } else {
      return res.status(401).json({
        message: "Wrong password"
      });
    };

    return res.status(404).json({
      message: "User not found"
    });

    
  } catch (error) {
    console.error(error);
  }
}

async function hashPassowrd (reqPwd) {
  const userPassword = reqPwd;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordDB = await bcrypt.hash(userPassword, salt);

    return passwordDB;
  } catch (error) {
    console.error(error);
  };
};

async function checkPassword (pwdDB, reqPwd) {
  try {
    const res = await bcrypt.compare(reqPwd, pwdDB);

    if (res == true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}