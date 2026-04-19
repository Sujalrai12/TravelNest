const express = require("express")
const router = express.Router()
const wrapasync = require("../utils/wrapasync")
const Listing = require("../models/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage  })
const { isLoggedin, isOwner, validateListing } = require("../middleware.js")
const { index, RenderNewform, ShowListing, createListing, renderEditform, updateListing, deleteListing } = require("../controllers/listing.js")




//index and create route
router.route("/")
    .get(wrapasync(index))
    .post(isLoggedin, validateListing,upload.single("listing[image]"), wrapasync(createListing))
  

//New Route   => to show the form to add new listing
router.get("/new", isLoggedin, RenderNewform)


//show , update and delete routes
router.route("/:id")
    .get(wrapasync(ShowListing))
    .put(validateListing, isLoggedin, isOwner,upload.single("listing[image]"), wrapasync(updateListing))
    .delete(isLoggedin, isOwner, wrapasync(deleteListing))




//edit route  => it serve the form to edit
router.get("/:id/edit", isLoggedin, isOwner, wrapasync(renderEditform))


module.exports = router;