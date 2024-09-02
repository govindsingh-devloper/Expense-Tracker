// Import the required modules
const express = require("express")
const router = express.Router();

const {createTransaction,updateTransaction,deleteTransaction,showALLTransaction,getTransactoion}=require("../controllers/TransactionController");
const {auth,isUser,isAdmin}=require("../middlewares/auth")

router.post("/createTransaction",auth,createTransaction);
router.put("/updateTransaction",updateTransaction);
router.post("/getSingleTransaction",getTransactoion);
router.get("/showAllTransaction",showALLTransaction);
router.delete("/deleteTransaction",deleteTransaction);




// Export the router for use in the main application
module.exports = router