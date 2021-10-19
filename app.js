const express = require("express");
const ExpressError = require("./utils/expressError");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname , "/public")));

app.get("/" , (req , res , next) => {
    res.sendFile(path.join(__dirname , "views/index.html"));
})

app.all("*" , (req , res , next) => {
    next(new ExpressError("Page Not Found" , 404));
})

app.use((err , req , res , next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = "Oh No something went wrong on the server side!";
    res.status(statusCode).sendFile(path.join(__dirname , "views/error.html"));
})

app.listen(3000 , () => {
    console.log("[INFO] The app is running on PORT 3000");
})