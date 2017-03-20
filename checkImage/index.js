module.exports = function (context, data) {
    const http = require('http');
    var input = data;
    var postData = JSON.stringify(data);
    var request = require('request');

    var hasFace;
    var hasText;

    faceDetect();

    //POST for image detection
    function faceDetect() {
        request.post({
            url: 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect',
            headers: {
                "Ocp-Apim-Subscription-Key": "XXXXXXXX",
                "Content-Type": "application/json"
            },
            encoding: "utf8",
            body: postData
        }, function (e, r, b) {
            if (b == "[]") {
                hasFace = 0;
            }
            else {
                hasFace = 1;
            }
            textDetect();
        });
    }

    //POST for OCR
    function textDetect() {
        request.post({
            url: 'https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk',
            headers: {
                "Ocp-Apim-Subscription-Key": "7032c572c9c44c2281187ce791bc286c",
                "Content-Type": "application/json"
            },
            encoding: "utf8",
            body: postData
        }, function (e, r, b) {
            b = JSON.parse(b);
            if (b.regions.length == 0) {
                hasText = 0;
            }
            else {
                hasText = 1;
            }
            close();
        });
    }

    function close() {
        var r = "nothing";
        if (hasText == 1 && hasFace == 1) { r = "both" } else {
            if (hasText == 1) { r = "text" }
            if (hasFace == 1) { r = "face" }
        }
        context.res = {
            //body: "text"
            body: r
        };
        context.done();
    }
};
