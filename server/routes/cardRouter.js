const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

router.get("/", cardController.getAllCards);

module.exports = router;

// TODO: 나머지 api 구현하기
// router.post("/");
// router.put("/");
// router.patch("/");
// router.delete("/");
