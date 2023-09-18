const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'harold.romero.albarado99@gmail.com',
        pass: 'extrqvemwvkfppfn',
    },
});

transporter.verify().then(() => {
    console.log('Ready for send email');
})

module.exports =  { transporter };