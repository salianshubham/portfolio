const express = require("express");
const body_parser = require("body-parser")
const portfolioModel = require("./dbModel")
const connectToDatabase = require("./db")
const app = express();
const PORT = 3000;

app.use(express.static("public")); //adding css file
app.use(body_parser.urlencoded({ extended: true }))

connectToDatabase()


app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
})

app.post("/send", async (req, res) => {
    try {
        const name = req.body.name;
        const mobileNumber = req.body.mobileNumber;
        const email = req.body.email;
        const description = req.body.description;
        const saveData = new portfolioModel(
            {
                name: name,
                mobileNumber:
                    mobileNumber,
                email: email,
                description:
                    description,
                date: new Date()
            }
        )

        const result = await saveData.save();
        res.render("home.ejs")
    } catch (error) {
        res.status(500).json({ message: "error while saving data" })
    }
})

app.listen(PORT, () => {
    console.log(`Running in PORT ${PORT}`)
})