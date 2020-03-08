const functions = require('firebase-functions');
const admin = require('firebase-admin');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { config } = require('./config');
const client = require('twilio')(config.TWILIO_ID, config.TWILIO_TOKEN);

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const auth = admin.auth();

exports.processMsg = functions.firestore
  .document('messages/{msgId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    try {
      await client.messages.create({
        body: data.message,
        to: '+12047928477',
        from: '+12053460645'
      });
    } catch (err) {
      console.log(err);
    }
  });

exports.processSms = functions.https.onRequest(async (req, res) => {
  const messageRefDoc = db.collection('messages');
  const twiml = new MessagingResponse();
  const phone = req.body.From;
  const message = req.body.Body;
  try {
    await messageRefDoc.add({
      message,
      phone, 
      severity: 'no'
    });
    return res.send(
      twiml
        .message('Your request is forwarded')
        .toString()
    );
  } catch (err) {
    console.log(err.messages);
    return res.send(twiml.message('Oops something went wrong').toString());
  }
});
