# LFG
**Azure Logic Apps, Functions and cognitive services
example for understanding Logic Apps, Functions and Cognitive services.**

LogicApps - Template for deploying a logic app. It contains the following logic: 
- Request comes to logic app with the body being a JSON according to a JSON schema
- Continues to a function (checkImage) to verify whether the image contains a face or text or both
- Case with each of the cases:
    - Function to check and respond emotions in case the image contains a face
    - Function to check and respond with the text if the image contains text
    - If both detected both functions are ran
- Results in the response being sent back

**Make sure to enter the cognitive services keys**
