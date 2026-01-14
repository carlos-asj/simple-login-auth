import { UserModel } from "../infra/postgres.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();

    if (users.length == 0){
      return res.status(200).json({
        message: "Users not found"
      })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        error: "Internal server error"
      });
  };
};

export const addNewUser = async (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPwd = req.body.password;

  try {
    const user = await UserModel.findOne({
      where: {email: userEmail}
    });

    if (user == null) {
      await UserModel.create(req.body);
      return res.status(201).json({
        message: "User created!"
      });
    };

    return res.status(200).json({
      message: "User already exists"
    })

    
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}