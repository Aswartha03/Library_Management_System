let express = require("express") 
const connectToDb = require("./configs/mongoDB")
const userRouter = require("./routes/userRoutes")
let app = express()
const cors = require('cors');
const bookRouter = require("./routes/bookRoutes");
const borrowRouter = require("./routes/borrowRoutes");
app.use(cors());
app.use(express.json())

require("dotenv").config() 

let PORT = process.env.PORT || 3000 

connectToDb()


app.get("/test",(req,res)=>{
    res.status(200).json({message:"Test Route is Working"})
})

// user Routes 
app.use("/user",userRouter)
// book routes 
app.use("/book",bookRouter)
// borrow routes 
app.use("/borrow",borrowRouter)

// any un-handled route 
app.use((req,res)=>{
    res.status(404).json({message:"404,Route is not found"})
})
app.listen(PORT,()=>{
    console.log(`Server is Running on the ${PORT} port`)
})