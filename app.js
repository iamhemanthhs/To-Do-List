const express = require('express')
const bodyParser = require('body-parser')
 var path = require('path')
 const mongoose = require('mongoose');


 mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://admin-hemanth:admin123@cluster0.r0twu.mongodb.net/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const app = express()

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}))




const itemsSchema = new mongoose.Schema({
    name: String
  })

  const Item = mongoose.model("Item", itemsSchema);

  const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
name: "Hit the  + button to add a new item."
});

const item3 = new Item({
name: "<-- Hit this to delete an item"
});

const defaultItems =[item1,item2,item3]









var items=[]


app.get("/", function(req, res) {

  var options = { weekday: 'long', month: 'long', day: 'numeric' };
  var today  = new Date();

 dayname=(today.toLocaleDateString("en-US", options));
   Item.find(function(err, items) {
if (items.length===0) {
  Item.insertMany(defaultItems, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("sucess Bruh : )");
    }
  });
  res.redirect('/')
}
else {
     res.render('index', {    htoday: dayname, hlists:items});
}

   });
})

app.post("/", function(req,res){
itemx=req.body.newItem;
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

items.push(capitalizeFirstLetter(itemx))

const item = new Item({
name: capitalizeFirstLetter(itemx)
});
item.save()
  res.redirect('/');
})

app.post("/delete", function(req,res){
  Item.findByIdAndRemove( req.body.checkbox , function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});
res.redirect("/")
})






app.listen(port = process.env.PORT || 3000, function allgood() {
  console.log("All good Bruh!")
})
