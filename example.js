const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",{useNewUrlParser: true});
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review:"solid"
})
// fruit.save();
const personSchema = new mongoose.Schema({
    name: String,
    age: Number

});
const Person = mongoose.model("Person", personSchema);
const person = new Person({
    name: "Ayush",
    age: 20
});
// person.save()

// Fruit.find(function(err, fruits){
//     if (err){
//         console.log(err);
//     }else{
//         console.log(fruits);
//     }
// });
Fruit.find().then(function(fruits){
    mongoose.connection.close();
    fruits.forEach(function(fruit){
        console.log(fruit.name);
        
    });
    
    })
