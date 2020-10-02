const express = require("express");
const router = express.Router();
const Joi = require("joi");

const message = require("../controllers/message.js");

let validate = (body) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .regex(/^(\w)+\s{1}(\w)+$/)
      .required(),
  });
  const { error } = schema.validate(body);
  return error;
};

router.get("/", function (req, res, next) {
  message.getMessages((result) => {
    console.log(result);
    if (result[0] != 0) res.send(result);
    else return res.status(404).send("Error");
  });
});

router.get("/:ts", function (req, res, next) {
  message.getMessage(parseInt(req.params.ts), (result) => {
    console.log(result);
    if (result) res.send(result);
    else return res.status(404).send("Message not found");
  });
});

router.post("/", function (req, res, next) {
  error = validate(req.body);
  if (error) return res.status(400).send(error);
  else {
    newMessage = {
      message: req.body.message,
      author: req.body.author,
      ts: Date.now(),
    };
    message.addMessage(newMessage, (result) => {
      console.log(result);
      res.send(result);
    });
  }
});

router.put("/:ts", function (req, res, next) {
  error = validate(req.body);
  if (error) return res.status(400).send(error);
  else {
    modifiedMessage = {
      message: req.body.message,
      author: req.body.author,
      ts: parseInt(req.params.ts),
    };
    message.updateMessage(
      parseInt(req.params.ts),
      modifiedMessage,
      (result) => {
        if (result.result.nModified == 1 && result.result.ok == 1) res.send(result);
        else return res.status(404).send("Message not found or not updated");
      }
    );
  }
});

router.delete("/:ts", function (req, res, next) {
  message.deleteMessage(parseInt(req.params.ts), (result) => {
    if (result.result.n == 1 && result.result.ok == 1) res.send(result);
    else return res.status(404).send("Message not found");
  });
});

module.exports = router;
