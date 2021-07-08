const _ = require("lodash");
const mongoose = require("mongoose");

// Require models
const Notification = require("../../models/Notification");
const User = require("../../models/User");

const { ObjectID } = require("mongodb");

// @route   POST api/notifications/
// @desc    Creates a new notification.
// @access  Private
exports.postNotification = (req, res) => {
  let note_data = _.pick(req.body, ["description"]);
  note_data.users_read = [];

  User.findByToken(req.headers.authorization).then((user) => {
    note_data.created_by = user._id;
    note_data.date = new Date();

    let notification = new Notification(note_data);

    notification
      .save()
      .then((note) => {
        note.users_read.push(user._id);
        note
          .save()
          .then((n) => res.send(n))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

// @route   PATCH api/notifications/:id
// @desc    Marks a notification as read.
// @access  Private
exports.markNotificationsRead = (req, res) => {
  var results = [];

  User.findByToken(req.headers.authorization).then((user) => {
    Notification.updateMany(
      { users_read: { $nin: [user._id] } },
      { $push: { users_read: user._id } }
    ).then((notes) => {
      Notification.find({})
        .populate({ path: "created_by", model: User })
        .then((notifications) => {
          notifications.map((notification) => {
            if (
              notification.users_read.find((u) => {
                return u._id.toString() === user._id.toString();
              })
            ) {
              results.push({
                _id: notification._id,
                description: notification.description,
                date: notification.date,
                created_by: notification.created_by,
                read: true,
              });
            } else {
              results.push({
                _id: notification._id,
                description: notification.description,
                date: notification.date,
                created_by: notification.created_by,
                read: false,
              });
            }
          });

          res.send(results);
        })
        .catch((err) => console.log(err));
    });
  });
};

// @route   GET api/notifications/
// @desc    Retrieves all notifications.
// @access  Private
exports.getNotifications = (req, res) => {

  User.findByToken(req.headers.authorization).then((user) => {
    Notification.find({})
      .populate({ path: "created_by", model: User })
      .then((notifications) => {
        // check if user has read the notification
        res.send(notifications.map((notification) => {
            let note = {}

            if(notification.users_read.includes(user._id)) {
              note = {
                _id: notification._id,
                description: notification.description,
                date: notification.date,
                created_by: notification.created_by,
                users_read: notification.users_read,
                read: true,
              }
            } else {
              note = {
                _id: notification._id,
                description: notification.description,
                date: notification.date,
                created_by: notification.created_by,
                users_read: notification.users_read,
                read: false,
              }
            }

            return note;
          })
        );
      })
      .catch((err) => console.log(err));
  });
};
