const Users = require('../models/userModel')
// const UserVerification = require('../models/userVerificationModel')
// const nodemailer = require('nodemailer')
// const { v4: uuidv4 } = require('uuid')
// const { sendEmail } = require('../middleware/sendEmail')
const crypto = require('crypto')

// register ===========================================================================>
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, termCondition } =
      req.body

    // check if fields empty
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(200).json({
        success: false,
        message: 'Fields cannot be empty..',
      })
    }

    // check email format
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email.match(mailformat)) {
      return res.status(200).json({
        success: false,
        message: 'Invalid email address..',
      })
    }

    // find user is exits or not
    let user = await Users.findOne({ email })

    if (user) {
      return res.status(200).json({
        success: false,
        message: 'User already exits..',
      })
    }

    // check password and confirm password
    if (password !== confirmPassword) {
      return res.status(200).json({
        success: false,
        message: 'Password and Confirm Password does not matched..',
      })
    }

    // check term and conditions
    if (!termCondition) {
      return res.status(200).json({
        success: false,
        message: 'Please accepts Terms & Conditions..',
      })
    }

    user = await Users.create({
      name: fullName,
      email,
      password,
      avatar: {
        public_id: 'sample_id',
        url: 'sample_url',
      },
    })

    res.status(200).json({
      success: true,
      message: 'Successfully registered!!',
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// login ===============================================================================>
exports.login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body

    // check if fields empty
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: 'Fields cannot be empty..',
      })
    }

    // check email format
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email.match(mailformat)) {
      return res.status(200).json({
        success: false,
        message: 'Invalid email address..',
      })
    }

    const user = await Users.findOne({ email }).select('+password')
    if (!user) {
      return res.status(200).json({
        success: false,
        message: 'User does not exits..',
      })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(200).json({
        success: false,
        message: 'Incorrect Password..',
      })
    }

    const token = await user.generateToken()

    res.status(200).json({
      success: true,
      message: 'Logged In!!',
      token,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// logout ==========================================================================>
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out!!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// load user ======================================================================>
exports.loadUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate(
      'remainingTodoTasks completedTodoTasks deletedTodoTasks upcomingReminderEvents completedReminderEvents deletedReminderEvents'
    )

    const token = await user.generateToken()

    res.status(200).json({
      success: true,
      token,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// get user profile - pass id of any user, then return matched user ===================================================================>
exports.getUserProfile = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).populate(
      'remainingTodoTasks completedTodoTasks deletedTodoTasks'
    )

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found..',
      })
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// // get all users
// exports.getAllUser = async (req, res) => {
//   try {
//     const users = await Users.find({})

//     res.status(200).json({
//       success: true,
//       users,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // update password =================================================================>
// exports.updatePassword = async (req, res) => {
//   try {
//     const user = await Users.findById(req.user._id).select('+password')

//     const { oldPassword, newPassword } = req.body

//     const isMatch = await user.matchPassword(oldPassword)
//     if (!isMatch) {
//       return res.status(404).json({
//         success: false,
//         message: 'Incorrect old password..',
//       })
//     }

//     user.password = newPassword

//     await user.save()

//     res.status(200).json({
//       success: true,
//       message: 'Password updated',
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // forgot password =================================================================>
// exports.forgotPassword = async (req, res) => {
//   try {
//     const user = await Users.findOne({ email: req.body.email })

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found!!',
//       })
//     }

//     const resetPasswordToken = user.generateResetPasswordToken()

//     await user.save()

//     // send token to mail -- create reset link
//     const resetUrl = `${req.protocol}://${req.get(
//       'host'
//     )}/api/v1/password/reset/${resetPasswordToken}`
//     // send this message on email - with link
//     const message = `Reset your password by clicking on the link: ${resetUrl}`

//     try {
//       await sendEmail({
//         email: user.email,
//         subject: 'Reset Password',
//         message,
//       })

//       res.status(200).json({
//         success: true,
//         message: `Email sent to: ${user.email}`,
//       })
//     } catch (error) {
//       user.resetPasswordToken = undefined
//       user.resetPasswordExpire = undefined

//       await user.save()

//       res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // reset password ==================================================================>
// exports.resetPassword = async (req, res) => {
//   try {
//     const resetPasswordToken = crypto
//       .createHash('sha256')
//       .update(req.params.token)
//       .digest('hex')

//     const user = await Users.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     })

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Token is invalid or has expired..',
//       })
//     }

//     user.password = req.body.password

//     resetPasswordToken = undefined
//     resetPasswordExpire = undefined

//     await user.save()

//     res.status(200).json({
//       success: true,
//       message: 'Password updated successfully..',
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // update profile ==================================================================>
// exports.updateProfile = async (req, res) => {
//   try {
//     const user = await Users.findById(req.user._id)

//     const { name, email } = req.body

//     if (name) {
//       user.name = name
//     }
//     if (email) {
//       user.email = email
//     }

//     // user avatar

//     await user.save()
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // delete my profile
// exports.deleteMyProfile = async (req, res) => {
//   try {
//     const user = await Users.findById(req.user._id)
//     const posts = user.posts
//     const followers = user.followers
//     const following = user.following
//     const userId = user._id

//     await user.remove()

//     // logout user after deleting
//     // res
//     //   .cookie("token", null, {
//     //     expiresIn: new Date(Date.now()),
//     //     httpOnly: true,
//     //   })

//     // delete all posts of user
//     for (let i = 0; i < posts.length; i++) {
//       const post = await Posts.findById(posts[i])
//       await post.remove()
//     }

//     // removing user from followers following
//     for (let i = 0; i < followers.length; i++) {
//       const follower = await Users.findById(followers[i])

//       const index = follower.following.indexOf(userId)
//       follower.following.splice(index, 1)
//       await follower.save()
//     }

//     // removing user from following followers
//     for (let i = 0; i < following.length; i++) {
//       const follows = await Users.findById(following[i])

//       const index = follows.followers.indexOf(userId)
//       follows.followers.splice(index, 1)
//       await follows.save()
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Account deleted',
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // follow and unfollow user ========================================================>
// exports.followAndUnFollowUser = async (req, res) => {
//   try {
//     const userToFollow = await Users.findById(req.params.id);
//     const loggedInUser = await Users.findById(req.user._id);

//     if (!userToFollow) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found..",
//       });
//     }

//     if (loggedInUser.following.includes(userToFollow._id)) {
//       const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
//       loggedInUser.following.splice(indexFollowing, 1);

//       const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);
//       userToFollow.followers.splice(indexFollowers, 1);

//       await loggedInUser.save();
//       await userToFollow.save();

//       return res.status(404).json({
//         success: false,
//         message: "User  UnFollowed!!",
//       });
//     } else {
//       loggedInUser.following.push(userToFollow._id);
//       userToFollow.followers.push(loggedInUser._id);

//       await loggedInUser.save();
//       await userToFollow.save();

//       res.status(200).json({
//         success: true,
//         message: "User followed!!",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
