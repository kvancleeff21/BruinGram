const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User");
const Conversation = require("../../models/Conversation");

// @route   POST api/message
// @desc    Create new conversation
// @access  Private
router.post("/",
  passport.authenticate("jwt", { session: false}),
  (req, res) => {
    let errors = {};
    //Participants list must be more 2 or more than 2 people
    if (req.body.participants.length <= 1) {
      errors.participants = "Participants must be more than 2";
      return res.status(400).json(errors);
    }

    //Check if each value of participants array (which is also an userId) is existed in User collection
    req.body.participants.map(participant => {
      User.findById(participant)
        .then(user => {
          if (!user) {
            errors.participants = "Participant doesn't exist";
            return res.status(400).json(errors);
          }
        })
        .catch(err => console.log(err));
    });

    //Sort array
    req.body.participants.sort();

    //Check if list participants have existed in conversation collection - if no, create new conversation and save to database
    Conversation.findOne({participants: req.body.participants})
      .then(conversation => {
        if (conversation) {
          return res.status(400).json({participants: "Participants list has existed"});
        }

        const newConversation = new Conversation({
          participants: req.body.participants
        })
    
        newConversation.save()
          .then(conversation => res.json(conversation))
          .catch(err => console.log(err));
      });
  }
);

// @route   GET api/message/conversation/:conversation_id
// @desc    GET conversation by id
// @access  Private
router.get("/conversation/:conversation_id",
 passport.authenticate("jwt", {session: false}),
 (req, res) => {
   Conversation.findById(req.params.conversation_id)
    .populate("participants", ["name", "avatar"])
    .then(conversation => {
      if (!conversation) {
        return res.status(400).json({noconversationfound: "No conversation found"});
      }
      //Check if current user (req.user.id) is a participant in this conversation
      const index = conversation.participants.map(participant => participant._id).indexOf(req.user.id);
      if (index < 0) {
        return res.status(400).json({usernotauthorized: "User is not authorized"});
      }
      return res.json(conversation);

    })
    .catch(err => console.log(err))
 }
)

// @route   POST /api/message/:conversation_id
// @desc    create message 
// @access  Private

router.post("/:conversation_id", passport.authenticate("jwt", {session:false}), (req,res) => {
  Conversation.findById(req.params.conversation_id).then(conversation => {
    if (!conversation) {
      return res.status(400).json({ noconversationfound: "No conversation found" });
    }
    const index = conversation.participants.map(participant => participant._id).indexOf(req.user.id);
    if (index < 0) {
      return res.status(400).json({ usernotauthorized: "User is not authorized" });
    }
    // Create new message
    const newMessage = {
      text: req.body.text,
      name: req.user.name,
      avatar:req.user.avatar,
      user: req.user.id
    }
    // add messages to array
    conversation.messages.unshift(newMessage);
    //save
    conversation.save().then(conversation => res.json(conversation));
  }).catch((err) => {
    console.log(err.message);
    res.status(500).json({ createMsg: "Server Error" })
  });
});

// @route   DELETE /api/message/:conversation_id
// @desc    delete conversation 
// @access  Private
  router.delete(
    "/:conversation_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    
      Conversation.findById(req.params.conversation_id)
      .then(conversation => {
          if (!conversation) {
            return res.status(400).json({ noconversationfound: "No conversation found" });
          }
          // Check if the user is authorized to delete the conversation
          if(conversation.participants.filter(participant => 
            
            participant.toString() === req.user.id).length == 0){
            return res
            .status(401)
            .json({ notauthorized: "User not authorized" });
          }
            // Delete
            conversation.remove().then(() => res.json({ success: true }));
            })
          
    .catch((err) => {
      console.log(err.message);
      res.status(404).json({ msg: "Server Error" });
    });
    });
// @route   DELETE /api/message/:conversation_id/:message_id
// @desc    delete message
// @access  Private
router.delete(
  "/:conversation_id/:message_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Conversation.findById(req.params.conversation_id)
      .then((conversation) => {
        // Check to see if conversation exists
        if (!conversation) {
          return res.status(400).json({ noconversationfound: "No conversation found" });
        }
       
        
        if (
          conversation.messages.filter(
            (message) => message._id.toString() === req.params.message_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ msg: "Message does not exist" });
        }
        // Check if the user is authorized to delete the message
        if (conversation.messages.filter(message => message._id.toString() === req.params.message_id && message.user.toString() === req.user.id).length === 0) {
          return res
            .status(401)
            .json({ notauthorized: "User not authorized" });
        }

        // Get remove index
        const removeIndex = conversation.messages
          .map((item) => item._id.toString())
          .indexOf(req.params.message_id);

        // Splice comment out of array
        conversation.messages.splice(removeIndex, 1);
        
        conversation.save().then((conversation) => res.json(conversation));
      }).catch((err) => {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  });
  });

module.exports = router;