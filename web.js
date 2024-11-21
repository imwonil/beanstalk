const express = require("express")
const app = express();
const bodyParser = require('body-parser'); 

 app.set("views",__dirname+"/src/views") 
//  app.set('views',__dirname+'/views');




// app.set("views",  "./src/views") 
 
app.set("view engine" , "ejs")

app.use(express.static(__dirname+'/src/public'));


// app.set('view engine', 'ejs')
// app.get('/', (req, res) => {
//   res.render('index')
// })

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const home = require("./src/routers/home")
const kokoserver = require("./src/routers/home/kokoserver")
const inspect= require("./src/routers/home/inspect")
const Delete= require("./src/routers/home/delete")
app.use("/", home);


 module.exports = app;