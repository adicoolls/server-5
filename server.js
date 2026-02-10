const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const session = require("express-session");
const app = express();
const port = 8001;
const checkAuth = require("./middleware/auth");
const path = require("path");
const authRoutes = require("./routes/auth");


app.use(session({
    secret : "supersecretkey",
    resave : false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", authRoutes);
// simple request logger to trace incoming requests
app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.path);
    next();
});

   
// health check route



app.get("/create-url", checkAuth, (req, res) => {
    res.send("you are allowed ");
});
app.get("/login", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/signup", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "signup.html"));
})

// database connection
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected")) 
.catch((err) => console.error("MongoDB connection error:", err));

// routes


app.use("/url", urlRoute);
// test route (SSR-like HTML rendering)

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// server, routes , controllers , middlewares, models , public , database connections