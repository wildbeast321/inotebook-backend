const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/"

const connecttomongo =()=>{
mongoose.connect(mongoURI, ()=>{
    console.log("connected to mondoDB")
})
}
module.exports= connecttomongo;