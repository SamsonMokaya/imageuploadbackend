const express = require('express');
const uploadMiddleware = require('./middleware/uploadMiddleware');
const mongoose = require('mongoose');
const app = express();
const FormData = require('./models/FormData')
const cors = require('cors');
const dotenv  = require("dotenv").config();
const helmet = require("helmet")
const compression = require("compression")
const morgan = require("morgan")
const fs = require('fs')
const path = require('path'); 
const https = require("https")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'))





const privateKey = fs.readFileSync('server.key')
const certificate = fs.readFileSync('server.cert')




const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags : 'a'});

app.use(helmet())
app.use(compression())
app.use(morgan('combined', { stream: accessLogStream}))

app.post('/upload', uploadMiddleware, async (req, res) => {

    try {
      const formData = new FormData({
        name: req.body.full_name,
        phone_number: req.body.phone_no,
        alternative_phoneno: req.body.alternative_phoneno,
        email: req.body.email,
        county: req.body.county,
        constituency: req.body.constituency,
        educated: req.body.educated,
        course: req.body.course,
        year_of_study: req.body.year_of_study,
        years_experience: req.body.years_experience,
        employment_status: req.body.employment_status,
        business_profit: req.body.business_profit,
        gender: req.body.gender,    
        model_size: req.body.model_size,  
        product: req.body.product, 
        fabric_no: req.body.fabric_no,
        about_rivatex: req.body.about_rivatex,
        entry_reason: req.body.entry_reason,
        prize_question: req.body.prize_question,
        images: req.files.map(file => file.originalname)
      });

    
  
      await formData.save();
  
      return res.status(200).json({ message: 'File upload successful' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while saving the data' });
    }
  });


  app.get('/getFormData', async (req, res) => {
    try {
      const formData = await FormData.find({});
      res.status(200).json({ formData: formData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving data' });
    }
  });


  mongoose
   .connect(process.env.STRING)
   .then(result => {
    //  https
    //   .createServer({key: privateKey, cert: certificate}, app)
    //   .listen(process.env.PORT)
    console.log("DB COnnected !!")
    app.listen(process.env.PORT)
    console.log("Server running on port " + process.env.PORT)
   })
   .catch(err => {
      console.log(err)
   })