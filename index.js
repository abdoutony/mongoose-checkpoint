const mongoose = require("mongoose");
const express = require('express');
const app = express();
require('dotenv').config();
const Person = require('./model/Person');

mongoose.connect(process.env.MONGO_URI, () => console.log('connected to mongoDB'), { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(4000, () => console.log('app is listening on port 4000'));

// creating and saving a record of a model
var RecordOfModel = new Person({ name: "khaled", age: 25, favoriteFoods: ["fries", "cheese"] });

RecordOfModel.save(function (err, person) {
    if (err) {
        console.log(err);
    } else {
        console.log("Saved Successfully");
        console.log(person);
    }
});

// creating many records with model.create()
Person.create(
    [{
        name: 'yahia', age: 28, favoriteFoods: ['chicken', 'kouskous']
    }, {
        name: 'ahmed', age: 32
    }, {
        name: 'mohamed', age: 40, favoriteFoods: ['fish']
    }, {
        name: 'ibrahim', age: 15, favoriteFoods: ['liver', 'olive']
    }, {
        name: 'salah', age: 28
    }], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log('all saved Successfuly');
            console.log(data);
        }
    });

// Using model.find() to search Database
Person.find({ name: 'ahmed' }, (err, data) => {
    if (err) {
        console.log(err);
    } else if (!data) {
        console.log('not found');
    } else {
        console.log('found successfully');
        console.log(data);
    }
});

// Using model.findOne() to return a single Matching document from Database
Person.findOne({ name: 'salah' }, (err, data) => {
    if (err) {
        console.log(err);
    } else if (!data) {
        console.log('not found');
    } else {
        console.log('found successfully');
        console.log(data);
    }
});

// Using model.findById() to search Database By _id
Person.findById('634ef30dac51f8562fe53bb9', (err, data) => {
    if (err) {
        console.log(err);
    } else if (!data) {
        console.log('not found');
    } else {
        console.log('found successfully');
        console.log(data);
    }
});

// Performing a classic updates by running find, edit, than save
Person.findById('634ef30dac51f8562fe53bbd', (err, data) => {
    if (err) {
        console.log(err);
    } else if (!data) {
        console.log('not found');
    } else {
        console.log('found successfully');
        data.favoriteFoods.push('hamburger');
        data.save();
        console.log(data);
    }
});


// Performing a new updates on a document using model.findOneAndUpdate()
Person.findOneAndUpdate({ name: 'mohamed' }, { age: 20 }, {
    new: true,
    useFindAndModify: false,
}, (err, data) => {
    if (err) {
        console.log(err);
    } else if (!data) {
        console.log('not found');
    } else {
        console.log('updated successfully')
        console.log(data);
    }
});


// Deleting one document using model.findByIdAndRemove
Person.findByIdAndRemove('634ef30dac51f8562fe53bbd', (err, data) => {
    if (err) {
        console.log(err);
    } else if (!data) {
        console.log('not founded');
    } else {
        console.log('removed successfully');
        console.log(data);
    }
});


// Deleting many documents with model.remove()
Person.remove({ name: 'ahmed' }, (err, data) => {
    if (err) {
        console.log(err);
    } else if (!data) {
        console.log('not founded');
    } else {
        console.log('removed successfully');
        console.log(data);
    }
});


// Chaining search query helpers to narrow the search results
Person.find({ favoriteFoods: { "$in": ["burritos"] } })
    .sort({ name: 1 })
    .limit(2)
    .select('name')
    .select('favoriteFoods')
    .exec()
    .then(docs => console.log(docs))
    .catch(err => console.log(err));