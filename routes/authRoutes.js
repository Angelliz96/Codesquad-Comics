const express = require("express");
const passport = require("passport");
const { loginLocalFailed, logoutRequest, signupRequest } = require("../controllers/authController");

const router = express.Router();

router.post("/login/local", passport.authenticate("local", { failureRedirect: "/login/local/failed" }), (req, res) => {
    res.status(200).json({ message: "User logged in", data: { username: req.user.username, firstName: req.user.firstName, lastName: req.user.lastName } });
});

router.get("/login/local/failed", loginLocalFailed);
router.get("/logout", logoutRequest);
router.post("/signup", signupRequest);

// GitHub Strategy
router.get("/login/github", passport.authenticate("github"));
router.get("/login/github/failed", (req, res) => {
    res.status(500).json({ message: "There is a problem with Github Authentication" });
});
router.get("/auth/github", passport.authenticate("github", { successRedirect: "/", failureRedirect: "/login/github/failed" }));

// Google Strategy
router.get("/login/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/login/google/failed", (req, res) => {
    res.status(500).json({ message: "There is a problem with Google Authentication" });
});
router.get("/auth/google", passport.authenticate("google", { successRedirect: "/", failureRedirect: "/login/local/failed" }));

module.exports = router;
