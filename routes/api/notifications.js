const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/notifications");

// @route   api/notifications
// @GET     Retrieves all notifications.
// @POST    Creates a new notification.
// @access  public
router.route("/").get(helpers.getNotifications).post(helpers.postNotification);

// @route   api/notifications/read/:id
// @GET     Retrieves all notifications.
// @POST    Creates a new notification.
// @access  public
router.route("/read/").patch(helpers.markNotificationsRead);

module.exports = router;
