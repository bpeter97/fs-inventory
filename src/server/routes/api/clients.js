const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/clients");

// @route   api/clients
// @GET     Retrieves all clients.
// @POST    Creates a new client.
// @access  public
router.route("/").get(helpers.getClients).post(helpers.postClient);

// @route   api/clients/:id
// @GET     Creates a specific client.
// @PATCH   Updates a specific client.
// @DELETE  Deletes a specific client.
// @access  public
router.route("/:id").get(helpers.getClient).patch(helpers.patchClient).delete(helpers.deleteClient);

module.exports = router;
