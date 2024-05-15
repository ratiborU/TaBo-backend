import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";
import User from "../models/User.js";
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDJmNmY4ZmFhMWYyYTBiM2NiZTEzOSIsImlhdCI6MTcxMTQ3MDM0NCwiZXhwIjoxNzExNTU2NzQ0fQ.GCTfm5S3agK_tuzRd_icMnR_4MGUWmTmSEi_s-sR3JY


function authMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({message: "Пользователь не авторизован"});
    }
    const decodedData = jwt.verify(token, secretKey.secret);
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({message: "Пользователь не авторизован"});
  }
}

const tokenDecode = (req) => {
  const bearerToken = req.headers.authorization.split(' ')[1];
  if (!bearerToken) {
    return false;
  }
  try {
    const tokenDecoded = jwt.verify(bearerToken, secretKey.secret);
    return tokenDecoded;
  } catch (e) {
    return false;
  }
}

const verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req)
  if (!tokenDecoded) {
    res.status(401).json('Unathorized')
  } 
  const user = await User.findById(tokenDecoded.id)
  if (!user) {
    return res.status(401).json('Unathorized')
  } 
  req.user = user;
  next()
}

export { authMiddleware, verifyToken };