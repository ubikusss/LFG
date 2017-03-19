#r "Newtonsoft.Json"

using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net;
using System.IO;

public static async Task<HttpResponseMessage> Run(TextWriter outputBlob, HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");
    // parse query parameter
    string url = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "url", true) == 0)
        .Value;
    // Get request body
    dynamic data = await req.Content.ReadAsAsync<object>();
    url = url ?? data?.url;

    var result = "";
    using (var client = new HttpClient())
        {
            var content = new StringContent(data.ToString());
            var url2 = "https://westus.api.cognitive.microsoft.com/vision/v1.0/ocr";
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", Environment.GetEnvironmentVariable("Vision_API_Subscription_Key"));
            content.Headers.ContentType = new MediaTypeWithQualityHeaderValue("application/json");
            var httpResponse = await client.PostAsync(url2, content);
            result = await httpResponse.Content.ReadAsStringAsync();
        }
    
    log.Info("result: " + result);

    outputBlob.Write(result);

    return url == null
        ? req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a name on the query string or in the request body")
        : req.CreateResponse(HttpStatusCode.OK, result);
}
