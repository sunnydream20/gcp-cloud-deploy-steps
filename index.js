/** @format */

const axios = require("axios");
const admin = require("firebase-admin");

admin.initializeApp();

exports.processFeed = async (message, context) => {
  // Decode the Pub/Sub message
  // const data = Buffer.from(message.data, "base64").toString();
  // console.log(`Received message: ${data}`);

  try {
    // Call the third-party API to get news feed
    const response = await axios.get(
      "https://financialmodelingprep.com/api/v3/stock_news?limit=20&apikey=08ff1e568700b58df0141e0cebc45f34"
    );
    const newsFeed = response.data;
    const docRef = admin.firestore().collection("financial-news").doc("one");
    await docRef.set(
      {
        newsFeed,
        time: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    res.status(200).send("News fetched and stored successfully.");
  } catch (error) {
    console.error("Error fetching or storing news feed:", error);
  }
};
