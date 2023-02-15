const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Item = require("./models/inventory");
const methodOverride = require("method-override");

mongoose.connect('mongodb://127.0.0.1/med_inventory', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected")
    })
    .catch(err => {
        console.log("Error")
        console.log(err)
    })

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const categories = ['pill', 'utinsels'];

app.get('/item', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const items = await Item.find({ category });
        res.render('home', { items, category });
    } else {
        const items = await Item.find({})
        res.render('home', { items, category: 'All' });
    }
})

app.get('/item/new', (req, res) => {
    res.render('new', { categories });
})

app.post('/item', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.redirect(`/item/${newItem._id}`)
})

app.get('/item/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.render('show', { item });
})

app.get('/item/:id/edit', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    res.render('edit', { item, categories });
})

app.put('/item/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/item/${item._id}`)
})

app.delete('/item/:id', async (req, res) => {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    res.redirect('/item');
})

app.listen(3000, () => {
    console.log("Port 3000!");
})