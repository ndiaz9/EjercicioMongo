const conn = require("../lib/MongoUtils");

const getMessages = (callback) => {
  conn.then((client) => {
    client
      .db("EjercicioMongo")
      .collection("messages")
      .find({})
      .toArray((err, data) => {
        callback(data);
      });
  });
};

const getMessage = (ts, callback) => {
  conn.then((client) => {
    client
      .db("EjercicioMongo")
      .collection("messages")
      .findOne({ ts })
      .then((data) => {
        callback(data);
      });
  });
};

const addMessage = (message, callback) => {
  conn.then((client) => {
    client
      .db("EjercicioMongo")
      .collection("messages")
      .insertOne(message)
      .then((data) => {
        callback(data);
      });
  });
};

const updateMessage = (ts, message, callback) => {
  conn.then((client) => {
    client
      .db("EjercicioMongo")
      .collection("messages")
      .updateOne({ ts }, { $set: message })
      .then((data) => {
        callback(data);
      });
  });
};

const deleteMessage = (ts, callback) => {
  conn.then((client) => {
    client
      .db("EjercicioMongo")
      .collection("messages")
      .deleteOne({ ts })
      .then((data) => {
        callback(data);
      });
  });
};

const message = {
  getMessages,
  getMessage,
  addMessage,
  updateMessage,
  deleteMessage,
};
module.exports = message;
