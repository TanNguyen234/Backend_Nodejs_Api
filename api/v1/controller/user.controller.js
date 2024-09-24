const md5 = require("md5");
const User = require("../models/user.model");
const ForgotPassword = require('../models/forgot-password.model');
const generateHelper = require('../../../helpers/generate')
const sendMailHelper = require('../../../helpers/sendMail')

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

//[POST] /api/v1/users/register
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

//[POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email
  
  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if(!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại"
    })
    return;
  }

  const otp = generateHelper.generateRandomNumber(8);

  const timeExpire = 5;

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + timeExpire * 60
  }

  await ForgotPassword.deleteMany({
    email: email
  })

  const forgotPassword = new ForgotPassword(objectForgotPassword).save();

  //Nếu tồn tại email gửi mã OTP qua email
  const subject = "Mã xác minh lấy lại mật khẩu"
  const html = `
    <h1>Mã xác minh đổi mật khẩu</h1>
    <duv>Mã xác minh của bạn là: <b style='color: green'>${otp}<b></div>
    <p>Thời hạn sử dụng là 3 phút.</p>`//Muốn css phải style inline
  
  sendMailHelper.sendMail(email, subject, html)
  
  res.json({
      code: 200,
      message: "Mã OTP đã được gửi về email của bạn"
  })
}
//[POST] /api/v1/users/password/otp
module.exports.otpPassword = async (req, res) => {
  const otp = await ForgotPassword.findOne({
    email: req.body.email,
    otp: req.body.otp
  })

  if(otp) {
    const user = await User.findOne({
      email: req.body.email,
      deleted: false,
    })

    res.json({
      code: 200,
      message: "Mã OTP hợp lệ",
      token: user.token
    })
  } else {
    res.json({
      code: 400,
      message: "Mã OTP không hợp lệ"
    })
  }
}
//[POST] /api/v1/users/password/reset
module.exports.resetPassword = async (req, res) => {
  console.log(req.body)
  const user = await User.findOne({
    token: req.body.token
  })

  if(user.password === req.body.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu mới khác mật khẩu cũ"
    })
    return;
  }

  await User.updateOne({
    _id: user.id,
  },{
    password: md5(req.body.password)
  })

  res.json({
    code: 200,
    message: "Đặt mật mới khẩu thành công"
  })
}