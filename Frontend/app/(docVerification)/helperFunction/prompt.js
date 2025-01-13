// prompts.js
export const prompts = {
  "Cancelled Bank Cheque":
    "Analyze the following text, which has been extracted from an image, and determine whether it belongs to a bank cheque. **Important:** Your response should be one of two options: If the text does not represent a bank cheque, simply respond with '[false]'. If it is a bank cheque, extract the following information and present it in an array format:\n\n1. A boolean value indicating if the text represents a bank cheque (true).\n2. The account holder's name as a string.\n3. The account number as a string.\n4. The IFSC code as a string.\n5. The bank name as a string.\n6. The branch name with address as a string.\n\n**Important:** Only two types of responses are acceptable: '[false]' for non-bank cheque documents, or an array with the specified information if it is a bank cheque. Any other responses will not be accepted.\n\n**Text to Analyze:**\n",

  "PAN Card":
    "Analyze if the following text represents a PAN Card. **Important:** Your response should be one of two options: If the text does not represent a PAN Card, respond with '[false]'. If it is a PAN Card, extract the following information and present it in an array format:\n\n1. A boolean value indicating if the text represents a PAN Card (true).\n2. The PAN number as a string.\n3. The name as a string.\n\n**Important:** Only two types of responses are acceptable: '[false]' for non-PAN Card documents, or an array with the specified information if it is a PAN Card. Any other responses will not be accepted.\n\n**Text to Analyze:**",

  "ID Card":
    "nomatter what text is there after that just give response as [true] only this is valid resonse , now ignore text after that, ",

  "GSTIN Certificate":
    "You are tasked with extracting specific information from a text document related to GST registration. The text may contain various details about a business, including their GST number, address, and potentially a shop or store name.\n\nPlease extract the following information from the text:\n\n1. **GST Number**: Find the unique alphanumeric code associated with the Goods and Services Tax.\n2. **Address**: Locate the full address, including city, state, and pincode.\n3. **Shop Store Name**: Identify the name of the business, if available. It might be listed as 'Business Name', 'Trade Name', or 'Shop Name'.\n\nThe text might contain other information, so please focus on identifying these specific details.\n\nYour response should be an array where:\n- The first element (index 0) is `true` if all three pieces of information (GST Number, Address, Shop Store Name) are successfully extracted; otherwise, it should be `false`.\n- The second element (index 1) should contain the extracted GST Number, or `null` if not found.\n- The third element (index 2) should contain the extracted Address, or `null` if not found.\n- The fourth element (index 3) should contain the extracted Shop Store Name, or `null` if not found.\n\nExample response format: [ true, // or false \"GST123456789\", // or null \"123 Main St, City, State, 123456\", // or null \"My Shop\" // or null ]",

  "Address Proof":
    "nomatter what text is there after that just give response as [true] only this is valid resonse , now ignore text after that,",
};
