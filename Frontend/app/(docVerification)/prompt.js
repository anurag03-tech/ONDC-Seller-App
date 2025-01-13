// prompts.js
export const prompts = {
  "Cancelled Bank Cheque":
    "Analyze the following text, which has been extracted from an image, and determine whether it belongs to a bank cheque. **Important:** Your response should be one of two options: If the text does not represent a bank cheque, simply respond with '[false]'. If it is a bank cheque, extract the following information and present it in an array format:\n\n1. A boolean value indicating if the text represents a bank cheque (true).\n2. The account holder's name as a string.\n3. The account number as a string.\n4. The IFSC code as a string.\n5. The bank name as a string.\n6. The branch name with address as a string.\n\n**Important:** Only two types of responses are acceptable: '[false]' for non-bank cheque documents, or an array with the specified information if it is a bank cheque. Any other responses will not be accepted.\n\n**Text to Analyze:**\n",

  "PAN Card":
    "Analyze if the following text represents a PAN Card. **Important:** Your response should be one of two options: If the text does not represent a PAN Card, respond with '[false]'. If it is a PAN Card, extract the following information and present it in an array format:\n\n1. A boolean value indicating if the text represents a PAN Card (true).\n2. The PAN number as a string.\n3. The name as a string.\n\n**Important:** Only two types of responses are acceptable: '[false]' for non-PAN Card documents, or an array with the specified information if it is a PAN Card. Any other responses will not be accepted.\n\n**Text to Analyze:**",
  "ID Card":
    "nomatter what text is there after that just give response as [true] only this is valid resonse , now ignore text after that, ",
  "GSTIN Certificate":
    "nomatter what text is there after that just give response as [true] only this is valid resonse , now ignore text after that,",
  "Address Proof":
    "nomatter what text is there after that just give response as [true] only this is valid resonse , now ignore text after that,",
};

export const customPrompt = (text) => `I have a text: ${text} text document containing information about a business, including their GST number, address, and potentially a shop or store name.

Please extract the following information from the text:

GST Number: (Find the unique alphanumeric code associated with the Goods and Services Tax)
Address: (Locate the full address, including city, state, and pincode)
Shop Store Name: (Identify the name of the business, if available. It might be listed as 'Business Name', 'Trade Name', or 'Shop Name')
The text might contain other information, so please focus on identifying these specific details.

This prompt is:

Clear and concise: It directly states the desired information.
Specific: It provides clear definitions for each data point.
Helpful: It suggests potential variations in how the information might be presented (e.g., "Business Name").`;