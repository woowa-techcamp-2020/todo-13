const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card-controller");

router.get("/", cardController.getAllCards);
router.get("/:id", cardController.getOneCard);
router.delete("/:id", cardController.deleteOneCard);
router.post("/", cardController.createCard);
router.put("/:id", cardController.updateCard);

// TODO: 사용자의 action에 맞는 controller routing

module.exports = router;
