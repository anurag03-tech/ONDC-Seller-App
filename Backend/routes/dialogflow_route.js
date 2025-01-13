const express = require("express");
const router = express.Router();
const CONTROLLER = require("../controllers/export_controller");

router.post("/dialogflow", async (req, res) => {
  let tag = req.body.fulfillmentInfo.tag;

  console.log("A new request came...");
  console.log(tag);

  try {
    switch (tag) {
      case "sampleResponse":
        let responseData = CONTROLLER.dbController.handleSampleResponse(req);
        res.send(responseData);
        break;

      case "getShops": // New tag for getting shop data
        let shopData = await CONTROLLER.dbController.handleShopQuery(req);
        res.send(shopData);
        break;
        
      case "askEmailAndPassword": // New tag for getting shop data
        const emailAndPasswordRes = await CONTROLLER.dbController.handleShopQuery(req);
        res.send(emailAndPasswordRes);
        break;

      case "resetPassword":
        let passwordResetRes = await CONTROLLER.dbController.resetPassword(
          req
        );
        res.send(passwordResetRes);
        break;

      default:
        res.send(
          CONTROLLER.util.formatResponseForDialogflow(
            [
              "This is from the webhook.",
              "There is no tag set for this request.",
            ],
            "",
            "",
            ""
          )
        );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.send(CONTROLLER.util.getErrorMessage());
  }
});

module.exports = {
  router,
};
