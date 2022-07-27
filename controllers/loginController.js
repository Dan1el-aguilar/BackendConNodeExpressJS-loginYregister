const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const login = async(req, res) => {
  const { email, password } = req.body
  const searchEmail = await User.findOne({email})

//validacion para evitar que el back se caiga prque no encuentra el mail, se searchEmail existe hace la busqued< sino responder con un res.status(500)
  if ( searchEmail ) {
    const match = bcrypt.compareSync(password, searchEmail.password)
    
    if (match) {
    const payload = {
      id: searchEmail._id,
      email: searchEmail.email
    }
    
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: 600
    })

      res.status(200).json({msg: "usuario logeado", token: token})
    } else {
     res.status(401).json("verifica los datos")
    }
    
  } else {
    return res.status(404).json("usuario no econtrado")
  }
}


module.exports = {
  login
}