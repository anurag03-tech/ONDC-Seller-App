// texts, sessionInfo, targetFlow, targetPage
const util = require("./util");
const Shop = require("../models/Shop.js");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const handleShopQuery = async (req) => {
  try {
    const shops = await Shop.find();
    // console.log(" query ", req.body );
    const userQuery = req.body.text;

    console.log("User Query:", userQuery);

    // Format shop data
    const shopResponses = shops.map(
      (shop) =>
        `Shop Details:\n
            Name: ${shop.name}
            Address: ${shop.address}
            Phone: ${shop.phone}
            Email: ${shop.support_email}
            Products: ${shop.supported_products.join(", ")}
            Logo URL: ${shop.shop_logo_url || "Not provided"}
            Created: ${shop.createdAt.toLocaleDateString()}
            Last Updated: ${shop.updatedAt.toLocaleDateString()}`
    );

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Create prompt for Gemini
    // Inside handleShopQuery function, update the prompt section
    const prompt = `Given this shop data: ${JSON.stringify(shopResponses)}
And this user question: "${userQuery}"
Focus on providing specific product information from the shops' supported_products.
If the question is about available products, list them clearly.
Keep the response natural and friendly, focusing only on factual information present in the shop data.
Do not mention any products that are not explicitly listed in the shops data.
End your response with "Would you like to know anything else about our shops?"`;

    // Get response from Gemini
    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.text();
    console.log("Gemini Response:", geminiResponse);

    return util.formatResponseForDialogflow([geminiResponse], "", "", "");
  } catch (error) {
    console.error("Database query error:", error);
    return util.getErrorMessage();
  }
};

const askEmailAndPassword = async (req) => {
  try {
    const passwordResetFlow =
      "projects/ondc-seller-app-447005/locations/asia-south1/agents/b3563bc0-3b20-46ce-b517-893726e02209/flows/00000000-0000-0000-0000-000000000000/pages/2b0d21b1-c03d-4510-bb16-23ee2f3528f7";

    return util.formatResponseForDialogflow(
      [
        "Please provide your email address and new password to reset your password.",
        "What is your email address?",
      ],
      "",
      passwordResetFlow,
      ""
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return util.getErrorMessage();
  }
};

const resetPassword = async (req) => {
  try {
    const sessionInfo = req.body.sessionInfo;
    const email = req.body.sessionInfo.parameters.email;
    const newPassword = req.body.sessionInfo.parameters.newPassword;

    // const email = dirtyEmail.replace("email", "", 1);
    const user = await User.findOne({ email });

    // Add validation to ensure newPassword exists

    if (!newPassword) {
      return util.formatResponseForDialogflow(
        ["Please provide a valid password"],
        "",
        "",
        ""
      );
    }
    if (!user) {
      return util.formatResponseForDialogflow(
        ["No user found with this email address."],
        "",
        "",
        ""
      );
    }

    // Only hash password if both newPassword and salt (10) are provided
    const hashedPassword = await bcrypt.hash(newPassword.toString(), 10);
    user.password = hashedPassword;
    await user.save();

    return util.formatResponseForDialogflow(
      ["Password has been successfully updated!"],
      "",
      "",
      ""
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return util.getErrorMessage();
  }
};

const handleSampleResponse = (req) => {
  console.log(req.body);

  return util.formatResponseForDialogflow(
    [
      "This is a sample response from webhook.",
      "Another sample response.",
      "Yet another sample response.",
    ],
    "",
    "",
    ""
  );
};

module.exports = {
  handleShopQuery,
  handleSampleResponse,
  resetPassword,
  askEmailAndPassword,
};
