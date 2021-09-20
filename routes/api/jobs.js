const router = require("express").Router();

// Require Helper
const helpers = require("../helpers/jobs");

// @route   api/Jobs
// @GET     Retrieves all Jobs.
// @POST    Creates a new Job.
// @access  public
router.route("/").get(helpers.getJobs).post(helpers.postJob);

// @route   api/Jobs/:id
// @GET     Creates a specific Job.
// @PATCH   Updates a specific Job.
// @DELETE  Deletes a specific Job.
// @access  public
router.route("/:id").get(helpers.getJob).patch(helpers.patchJob).delete(helpers.deleteJob);

module.exports = router;
