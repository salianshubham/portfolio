const express = require("express");
const body_parser = require("body-parser")
const portfolioModel = require("./dbModel")
const connectToDatabase = require("./db")
const nodemailer = require("nodemailer")
const app = express();
const PORT = process.env.PORT || 3000;

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
        if (result) {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "shubhamsalian46@gmail.com",
                    pass: "potz opvi bfrx zfkf"
                }
            })
            var mailOption = {
                from: "shubhamsalian46@gmail.com",
                to: [email, "shubhamsalian46@gmail.com"],
                subject: "Thank You for Contacting Shubham Salian",

                text: `Dear ${name},

                Thank you for reaching out to me through my website's contact form. I appreciate your interest and the time you've taken to get in touch.

                I want to assure you that I have received your details, including your name, email address, and mobile number. Your message is important to me, and I will do my best to respond as soon as possible.

                If your inquiry is time-sensitive or requires immediate attention, please feel free to reach out to me directly at ${email} or ${mobileNumber}.

                Once again, thank you for considering me for your inquiry. I look forward to connecting with you and addressing your questions or requests.

                Best regards,

                Shubham Salian
                Software Engineer
                8747933283`

            };

            transporter.sendMail(mailOption, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log("email sent", info.response)
                }
            })
            res.render("contact.ejs", {
                response: "Thank you for showing intrest. You will receive an email as soon as poosible"
            })
        } else {
            res.send("error")
        }

    } catch (error) {
        res.status(500).json({ message: "error while saving data" })
    }
})

app.listen(PORT, () => {
    console.log(`Running in PORT ${PORT}`)
})