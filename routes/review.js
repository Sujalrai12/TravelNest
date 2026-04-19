const express = require("express")
const router = express.Router({ mergeParams: true})
const wrapasync = require("../utils/wrapasync")

const Listing = require("../models/listing.js")
const {validateReview, isLoggedin,isreviewauthor} = require("../middleware.js")
const {createRoute,deleteReview} = require("../controllers/review.js")

//post route
router.post("/",isLoggedin,validateReview,wrapasync(createRoute))

//Delete Review Route   

router.delete("/:reviewId" ,isLoggedin,isreviewauthor,wrapasync(deleteReview))

module.exports = router;