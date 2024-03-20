const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const fetch = require("node-fetch")



exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  // const { token } = req.cookies;
//   const opts = {
//     headers: {
//         cookie: 'accessToken=1234abc; userId=1234'
//     }
// };


// const realFetch = `http://localhost:4000/api/v1/token`;

// function cookieFetch(fetch, cookie) {
//   return (url, opts) => {
//     opts = opts || {};
//     return fetch(url, Object.assign(opts, {
//       headers: Object.assign(opts.headers || {}, { cookie })
//     }));
//   };
// }

// const kuki = req.headers.cookie;

// global.fetch = kuki ?
//     cookieFetch(realFetch, kuki) :
//     realFetch;

//     console.log(global.fetch)
    // next()
const response = await fetch(`http://localhost:4000/api/v1/token`, {
  credentials:'include'
})
  const data = await response.json();
  console.log(data)

  // console.log(response);

  // if (!token) {
  //   next(new ErrorHandler("Please Login to access this resource", 401));
  // } else {
   
  //   // const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  //   // req.user = await User.findById(decodeData.id);
  
  //   next();
  // }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
