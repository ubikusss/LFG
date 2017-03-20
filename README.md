# LFG
**Azure Logic Apps, Functions and cognitive services
example for understanding Logic Apps, Functions and Cognitive services.**

LogicApps - Template for deploying a logic app. It contains the following logic: 
- Request comes to logic app with the body being a JSON according to a JSON schema
- Continues to a function (checkImage) to verify whether the image contains a face or text or both
- Case with each of the cases:
    - Function to check and respond emotions in case the image contains a face (pictureEmotion)
    - Function to check and respond with the text if the image contains text (OCRFunction)
    - If both detected both functions are ran
- Results in the response being sent back

**Make sure to enter the cognitive services keys**

The flow should be the following: 
1. You send a JSON body to the Logic app as the one below (using Postman for example): 
{
  "url": "https://www.w3.org/TR/SVGTiny12/examples/textArea01.png"
}
2. You can use a sample payload to generate the schema for validation and it should look like this: 
{
  "properties": {
    "url": {
      "type": "string"
    }
  },
  "type": "object"
}
3. The body of the request will be sent to the checkImage function
4. The function will reply with one of this three options as the body of the message: face, text or both
5. Each branch of the **switch statement** will trigger another function or sequence of functions.
6. Each function will save the result (unaltered) in either storage tables (pictureEmotion function) or blob storage (OCRFunction)
7. At the end you will get the reply from the cognitive service(s) used. 
