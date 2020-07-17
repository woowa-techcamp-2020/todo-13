const express = require("express");
const router = express.Router();
const cardController = require("../controllers/CardController");

router.get("/", cardController.getAllCards);
router.get("/:id", cardController.getOneCard);
router.delete("/:id", cardController.deleteOneCard);
router.post("/", cardController.createCard);

// TODO: PUT, PATCH, DELETE 메소드 api 구현하기
// router.put("/");
// router.patch("/");
// router.delete("/");

module.exports = router;
