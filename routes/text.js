const router = require('express').Router();
const accountSid = process.env.authSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

console.log(accountSid)
console.log(authToken)


router.post('/', (req, res) => {
  const toNumbers = process.env.toNumber.split(',');

  const messagePromises = toNumbers.map((toNumber) => {
    return client.messages.create({
      body: req.body.body,
      from: process.env.fromNumber,
      to: toNumber.trim(),
    });
  });

  Promise.all(messagePromises)
    .then((messages) => {
      messages.forEach((message) => {
        console.log(`Message SID: ${message.sid}`);
      });
      return res.json({ message: "Messages Sent" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("Error sending messages");
    });
});

module.exports = router;
