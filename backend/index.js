const express=require("express");
const app=express();

const userRoutes=require("./routes/User");
const transactionRoutes=require("./routes/Transaction");


const database=require("./config/database");

const cookieParser=require("cookie-parser");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config();

const PORT=process.env.PORT || 4000


//database Connect

database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"*",
        credentials:true
    })
)


//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/auth",transactionRoutes);


//default route

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and Runing...."
    })
});

//activeate Server
app.listen(PORT,()=>{
    console.log(`App is runing at${PORT}`)
});