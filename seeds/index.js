const mongoose = require("mongoose");
const Item = require("../models/inventory");

mongoose.connect('mongodb://127.0.0.1/med_inventory', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected")
    })
    .catch(err => {
        console.log("Error")
        console.log(err)
    })

const seedItems = [
    {
        title: "Advil",
        quantity: 10,
        category: 'pill',
        description: "Advil is used to relieve pain from various conditions such as headache, dental pain, menstrual cramps, muscle aches, or arthritis. It is also used to reduce fever and to relieve minor aches and pain due to the common cold or flu.",
    },
    {

        title: "Thermometer",
        quantity: 5,
        category: 'utinsels',
        description: "Clinical thermometer, digital, electronic, glass and mercury free, including battery.",
    },
    {
        title: "Melatonin",
        quantity: 4,
        category: 'pill',
        description: "Melatonin is the natural hormone your body secretes that helps to maintain your wake-sleep cycle (also called “biological clock”). ",
    },
    {
        title: "Lisinopril ",
        quantity: 13,
        category: 'pill',
        description: "Lisinopril is used to treat high blood pressure (hypertension) in adults and children who are at least 6 years old. Lisinopril is also used to treat congestive heart failure in adults, or to improve survival after a heart attack.",
    },
    {
        title: "Morphine",
        quantity: 20,
        category: 'pill',
        description: "Morphine is used to treat moderate to severe pain. The extended-release form of morphine is for around-the-clock treatment of pain. Short-acting formulations are taken as needed for pain.",
    }
]

Item.insertMany(seedItems)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })