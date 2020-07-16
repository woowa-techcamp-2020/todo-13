const express = require("express");
const router = express.Router();
const cardController = require("../controllers/CardController");

router.get("/", cardController.getAllCards);
router.post("/", cardController.createCard);


// TODO: 나머지 api 구현하기
// router.put("/");
// router.patch("/");
// router.delete("/");

module.exports = router;
