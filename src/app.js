const express=require("express");
const cookieParser=require("cookie-parser");

const authRouter=require("./routes/authentication.route");
const problemRouter=require("./routes/problem.route");
const submissionRouter=require("./routes/submission.route");

const app=express();

// parse JSON and urlencoded request bodies
app.use(express.json());
app.use(cookieParser()); 

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth/",authRouter);
app.use("/api/problems",problemRouter);
app.use("/api/submissions",submissionRouter);


module.exports=app;