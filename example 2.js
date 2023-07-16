const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// var items = ["buy food", "cut food", "eat food"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{useNewUrlParser: true});
const itemsSchema = new mongoose.Schema({
    name: String,
});
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
    name: "Eat more",
});
const item2 = new Item({
    name: "gym more",
});
const item3 = new Item({
    name: "dance more",
});
const defaultItems = [item1, item2, item3];

// Item.insertMany(
//     defaultItems
//     ).then(function(){
//     console.log("Data inserted")  // Success
// }).catch(function(error){
//     console.log(error)      // Failure
// });

app.get("/", function(req, res){
    Item.find().then(function(founditems){
        // mongoose.connection.close();
        if (founditems.length === 0){
            Item.insertMany(
    defaultItems
    ).then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});
res.redirect("/");
            
        }
        else{
            res.render("list", {newListItems: founditems});

        }
        
    }).catch(function(error){
            console.log(error);
            
        });
    
});

app.get("/:customListName", function(req, res){
    const customListName = req.params.customListName;
    
})

app.post("/", function(req, res){
    var itemName = req.body.newItem;
    const item = new Item({
        name : itemName

    });
    item.save();

    res.redirect("/");
});
app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId).then(function(){
        console.log("data deleted");
        res.redirect("/");
    }).catch(function(error){
        console.log(error);
        
        
        })
});


app.listen(3000);