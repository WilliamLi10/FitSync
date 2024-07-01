const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");


/* 
Get request to look for a user given a username
Params:
  username: username of the user

Returns:
  if user exists:
    {
      success: true,
      user: userData document
    }
  else:
    {
      success: false
    }
*/
router.get("/search-user", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Searching user...");
  const username = req.query.username;
  new Users()
    .getUserByUsername(username)
    .then((userExists) => {
      console.log("Searched user successfully");
      res.status(200);
      if (!userExists.exists) {
        return res.json({ success: userExists.exists });
      } else {
        return res.json({ success: userExists.exists, user: userExists.userData });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

/* 
Get endpoint for getting user data
Params:
  username: username of the user this request is querying for

Returns:
  userData document
*/

router.get("/get-user", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Getting user...");
  const username = req.query.username;
  if (req.username != username){
    
    return res.status(401).json({error: "User Not Authorized"});
  }
  new Users()
    .getUserByUsername(username)
    .then((user) => {
      if (!user.exists) {
        res.status(404).json({ error: "User Not Found" });
      } else {
        res.status(200);
        return res.json(user.userData);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
