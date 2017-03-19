$requestBody = Get-Content $req -Raw | ConvertFrom-Json
$url = $requestBody.url

if ($req_query_name) 
{
    $name = $req_query_name 
}

$response = Invoke-RestMethod -Uri "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize" -Body "{""url"":""$url""}" -Method Post -Headers @{"Content-Type" = "application/json"; "Ocp-Apim-Subscription-Key" = "eec504b7ca5346c6aea1579cf4b2ab84"} 
$return = $response | ConvertTo-Json

Set-Content $outputTable $return

Out-File -Encoding Ascii -FilePath $res -inputObject $return
