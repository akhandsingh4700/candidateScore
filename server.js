const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

mongoose.connect("mongodb+srv://akhand:123@cluster0.2omze.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true })
.then( () => {console.log(`DataBase CONNECTED`)} )
.catch( (err) => {console.log(err)}  ) 

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));




app.use("/",require('./controllers/registrationController'));


app.listen(port, () => {
    console.log(`server started running on port ${port}`)
})