const { verify } = require("jsonwebtoken")
 
//add in the route, make sure that the conditions are checked before the request, and continue using next()
const validateToken = (req, res, next) => {
   //grab token from the front end that were passed to the header
   const accessToken = req.header("accessToken")
   //check if it exist
   if (!accessToken) return res.json({error: "User not logged in"})
   //check if the token is valid
   try {
       const validToken = verify(accessToken, "importantsecret")
 
       if (validToken) {
           return next();
       }
   } catch(err) {
       return res.json({error: err})
   }
}
 
module.exports = { validateToken }
