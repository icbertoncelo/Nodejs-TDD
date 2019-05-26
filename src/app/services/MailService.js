const nodemailer = require("nodemailer");
const Mail = require("../../config/mail");

class MailService {
  send(message) {
    const transporter = nodemailer.createTransport(Mail);

    return transporter.sendMail(message);
  }
}

module.exports = new MailService();
