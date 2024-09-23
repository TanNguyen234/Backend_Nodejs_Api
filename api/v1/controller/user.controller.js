const md5 = require("md5");
const User = require("../models/user.model");

//[POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  var { fullName, email, password } = req.body;
  password = md5(password);

  const existEmail = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!existEmail) {
    const user = new User({
      fullName: fullName,
      email: email,
      password: password,
    });

    await user.save();

    const token = user.token;
    res.cookie("token", token);
    //Trả cookie về cho FE

    res.json({
      code: 200,
      message: "Đăng ký thành công",
      token: token
    });
  } else {
    res.json({
      code: 400,
      message: "Email đã tồn tại",
    });
  }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        email: email,
        deleted: false,
    })

    if(!user) {
        res.json({
            code: 400,
            message: "Email không tồn"
        })
        return;
    }

    if(md5(password) !== user.password) {
        res.json({
            code: 400,
            message: "Mật khẩu không đúng"
        })
        return;
    }

    const token = user.token;
    res.cookie("token", token);
    //Trả cookie về cho FE
    
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: token
    })
}