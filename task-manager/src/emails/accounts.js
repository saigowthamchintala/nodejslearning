const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//     to: '121810402057@gitam.in', // Change to your recipient
//     from: '121810402057@gitam.in', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail.send(msg).then(() => {
//     console.log('Email sent')
// }).catch((error) => {
//     console.error(error)
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '121810402057@gitam.in',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    }).then(() => {
        console.log('Email sent')
    }).catch((error) => {
        console.error(error)
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: '121810402057@gitam.in',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`//This syntax is only when template string is in within ``
    }).then(() => {
        console.log('Email sent')
    }).catch((error) => {
        console.error(error)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}