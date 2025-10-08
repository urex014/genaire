import jwt from 'jsonwebtoken'
async function protectRoute(req, res, next){
    const token = req.header("Authorization").split(" ")[1];
    if(!token){
      return res.status(401).send("Access denied")
    }

    try{
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.user = decoded;
      next()
    }catch(err){
      res.status(500).send('invalid token')
    }
}

export default protectRoute