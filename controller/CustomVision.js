var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/3ba768e7-d5e5-4778-9ed0-f3c6ca18429c/url?iterationId=d5f32f10-361c-43dd-bbba-ac913ae39de6',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'a94855ba2c904935a769fa0a429796a5'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}