const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card-controller");

router.get("/latest_id", cardController.getLatestCardId);
router.get("/", cardController.getAllCards);
router.get("/:id", cardController.getOneCard);
router.delete("/:id", cardController.deleteOneCard);
router.post("/", cardController.createCard);
router.put("/:id", cardController.updateCard);
router.patch("/:id", cardController.moveCard);

module.exports = router;
