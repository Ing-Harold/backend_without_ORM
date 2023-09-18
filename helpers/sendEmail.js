const { transporter } = require('../config/mailer');

const sendEmail = async (gmail, subject1, subject2, text) => {
    const recipients = gmail.map(entry => entry.email).join(', ');
    return await transporter.sendMail({
        from: '"FICCT-UAGRM 👻" <harold.romero.albarado99@gmail.com>',
        to: recipients, // list of receivers
        subject: subject1 + ' : ' + subject2, 
        html: `Saludos cordiales, estimado(a), tiene asignado un nuevo post <b>${subject2}</b> <p>${text}</p><a href="http://localhost:4200/login" target="_blank">Ir a confirmar WEB FICCT</a>
        `,
    });
}

module.exports = sendEmail;