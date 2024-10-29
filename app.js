const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path')
const SparePart = require('./models/sparepartmodel')
const multer = require('multer')
const Review = require('./models/reviewmodel')
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static('uploads'));


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));



mongoose
  .connect("mongodb://localhost:27017/RoadRescue", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to database via mongoose"))
  .catch((err) => {
    console.error("error connectiong to database ",err);
  });
const User = require("./models/model");
const Booking = require("./models/adminmodel");
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/navbar", (req, res) => {
  res.render("navbar");
});
app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/about", (req, res) => {
  res.render("About");
});




app.post("/signup", async (req, res) => {
  try {
    const { name, address, mobile, password } = req.body;

    if (!name || !address || !mobile || !password) {
      return res.status(400).send("all fields are required");
    }
    const user = new User({
      name,
      address,
      mobile,
      password,
    });
    await user.save();

    res.render("./login");
  } catch (err) {
    console.error("error signining up ", err);
    res.render("signup");
  }
});
app.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  try {
    const user = await User.findOne({ name });
    if (user) {
      if (password === user.password) {
        res.render("userhome", { user: user });
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("user not found");
    }
  } catch (error) {
    res.status(500).send("error checking the credentials");
  }
});
app.post("/admin", async (req, res) => {
  const { name, password } = req.body;
  try {
    if (name === "Enosh") {
      if (password === "Enosh@123") {
        res.render("admin");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("Enter Correct Admin Name");
    }
  } catch {
    console((err) => {
      console.log(err);
    });
  }
});

app.post('/reviews',async(req,res)=>{
  const rating = req.body.rating;
  const review = req.body.review;
  const reviewText = req.body.reviewText;
  try{
    const newReview = new Review({
      reviewText,rating,review
    })
    await newReview.save()
    res.send('review added successfully')
    
  }
  catch(err){
    console.error("error saving your review ",err)
    res.send("error saviing your review")
  }
});
app.get('/viewreviews', async(req,res)=>{
  try{
  const allreviews = await Review.find()
  
      res.render("viewreviews",{review:allreviews})
  }
  catch(err){
    console.error("error opening reviews", err)
    res.send("error opening reviews")
  }
})
app.get("/carwash", (req, res) => {
  res.render("carwash");
});
app.get('/breakfailure',(req,res)=>{
  res.render('breakfailure')
});
app.get('/breakfailurebooking', (req,res)=>{
  res.render('breakfailurebooking')
});
app.get('/chainfail',(req,res)=>{
  res.render("chainfail")
})
app.get('/chainfailurebooking',(req,res)=>{
  res.render('chainfailurebooking')
})
app.post("/booking", async (req, res) => {
  const { name, location, mobile, vehicle } = req.body;
  try {
    const bookingdate = new Date();
    const newBooking = new Booking({
      name,
      location,
      mobile,
      vehicle,
    });
    await newBooking.save();
    res.render("bookingconfirmation");
  } catch (err) {
    console.error("error occured please try again", err);
    res.send("error occured");
  }
});
app.get("/booklockout", (req, res) => {
  res.render("booklockout");
});

app.get('/enginefail',(req,res)=>{
  res.render("enginefail")
})
app.get("/lockout", (req, res) => {
  res.render("lockout");
});
app.get('/enginefailurebooking',(req,res)=>{
  res.render("enginefailurebooking")
})
app.post("/puncturebooking", async (req, res) => {
  const { name, location, mobile, vehicle } = req.body;
  try {
    const newBooking = new Booking({
      name,
      location,
      mobile,
      vehicle,
    });
    await newBooking.save();
    res.render("bookingconfirmation");
  } catch (err) {
    console.log(err);
    res.send("error occured");
  }
});
app.get("/bikewash", (req, res) => {
  res.render("bikewash");
});
app.get("/bookingconfirmation", (req, res) => {
  res.render("bookingconfirmation");
});
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.render("bookings", { bookings });
  } catch (err) {
    console.error("error fetching data", err);
    res.status(500).send("internal server error");
  }
});
app.get("/bikewashbooking", (req, res) => {
  res.render("bikewashbooking");
});
app.get("/carwashbooking", (req, res) => {
  res.render("carwashbooking");
});
app.get("/adminlogin", (req, res) => {
  res.render("adminlogin");
});
app.get("/book", (req, res) => {
  res.render("book");
});
app.get("/waterwash", (req, res) => {
  res.render("waterwash");
});
app.get("/tyrepuncture", (req, res) => {
  res.render("tyrepuncture");
});
app.get("/puncturebooking", (req, res) => {
  res.render("puncturebooking");
});
app.get('/reviews',(req,res)=>{
  res.render('reviews')
})

app.get('/addspareparts',(req,res)=>{
  res.render("addspareparts")
});

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads');
  },
  filename: function(req,file,cb){
    cb(null,file. originalname);
  }
});
const upload = multer({storage:storage})

app.post('/addsparepart', upload.single('sparepartimage'), async(req,res)=>{
  try{
    const newSparePart = new SparePart({
      sparepartname:req.body.sparepartname,
      sparepartprice:req.body.sparepartprice,
      sparepartdescription:req.body.sparepartdescription,
      sparepartimage:req.file.path
    });
    await newSparePart.save();
    res.status(201).send("spare part added successfully ");
  }catch(err){
    console.log(err)
    res.status(500).send("Error adding the spare parts..")
  }
});
app.get('/spareparts', async(req,res)=>{
  try{
    const spareparts = await SparePart.find();
    res.render("spareparts",{spareparts})
  }
  catch(err){
    res.status(500).send("error fetching the data!!!",err.message)
  }
})
app.listen(3000, (req, res) => {
  console.log("Server connected to port 3000");
});
