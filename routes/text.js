const router = require('express').Router();
const accountSid = process.env.authSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);

console.log(accountSid)
console.log(authToken)


router.post('/', (req, res) => {
  //for loop .split the numbers from the env to maintain the array
  client.messages
    .create({
      body: req.body.body,
      from: process.env.fromNumber,
      to: process.env.toNumber
    })
    .then(message => {
      console.log(message.sid)
      return res.json({ message: "Message Sent" })
    })
    // .catch(err => {
    //   res.status(500).json("Error sending message")
    // })
    // .done();
})

module.exports = router;
