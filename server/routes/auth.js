const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/register_login", (req, res, next) => {
  console.log('he');
  passport.authenticate(("local"), function(err, user, info) {
    if(err){
      return res.status(400).json({errors: err});
    }
    if(!user){
      return res.status(400).json({errors: "No user found!"});
    }
    req.logIn(user, function(err){
      if(err){
        return res.status(400).json({errors:err});
      }
      return res.status(200).json({success: `Logged in ${user.id}`});
    });
  })(req, res, next);
});

router.get("/logout", (req,res) => {
  req.logout();
  res.redirect('/');
})

router.get("/google",
  passport.authenticate(('google'), {
    scope: ['profile']
  })
);

router.get("/google-direct", passport.authenticate('google'), (req, res) =>{
  // console.log(req.user._id);
  var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
   responseHTML = responseHTML.replace('%value%', JSON.stringify({
       user: req.user._id
   }));
   res.status(200).send(responseHTML);
});

module.exports = router;
