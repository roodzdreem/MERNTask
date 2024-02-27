import UserModel from "./Models/UserModel.js";

export const create = async (req, res) => {
    try {
        const doc = new UserModel({
            id: req.body.id,
            name: req.body.name,
            password: req.body.password,
            comment:req.body.comment,
            changed: req.body.changed
    });
    const user = await doc.save();
    res.json(user);
    } catch(err){
        res.status(500).json({
            error : "Error 500: My log",
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const users = await UserModel.find().populate('userid').exec();
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось получить пользователей',
        });
      }
}


export const remove = async (req, res) => {
  try {
    await UserModel.deleteOne({ id: req.params.id })
    
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось получить пользователя',
      });
  }
};

export const update = async (req, res) => {
  try {
    await UserModel.updateOne({ id: req.params.id },
      {
        name: req.body.name,
      password: req.body.password,
      comment:req.body.comment,
      changed: req.body.changed
    })
    
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось получить пользователя',
      });
  }
};