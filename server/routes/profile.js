const express = require("express");
const router = express.Router();
var mongojs = require('mongojs');
var dbjs = mongojs('ecommerce');

router.post("/", (req, res, next) => {
  if(req.body.update[0]){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.current._id)}, {$set: {'name':req.body.update[0]}});
  }
  if(req.body.update[1]){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.current._id)}, {$set: {phone:req.body.update[1]}});
  }
  if(req.body.update[2]){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.current._id)}, {$set: {email:req.body.update[2]}});
  }
  if(req.body.update[3]){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.current._id)}, {$set:{'line1':req.body.update[3]}});
  }
  if(req.body.update[4]){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.current._id)}, {$set:{line2:req.body.update[4]}});
  }
  if(req.body.update[5]){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.current._id)}, {$set:{city:req.body.update[5]}});
  }
  if(req.body.update[6]){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.current._id)}, {$set:{state:req.body.update[6]}});
  }
  if(req.body.update[7]){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.current._id)}, {$set:{country:req.body.update[7]}});
  }
  if(req.body.update[8]){
    dbjs.users.update({_id:mongojs.ObjectId(req.body.current._id)}, {$set:{pincode:req.body.update[8]}});
  }
  // dbjs.on('error', function(err){
  //   return res.status(400).json({errors:"Database error! Records not updated"})
  // })
  return res.status(200).json({success:"Succesfully updated records!"})
});

module.exports = router;
