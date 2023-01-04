const express = require('express');

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate} = require("../../middlewares");

const { userJoiSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(userJoiSchema), ctrlWrapper(ctrl.register));
router.post("/login", validateBody(userJoiSchema), ctrlWrapper(ctrl.login));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;

