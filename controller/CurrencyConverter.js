var builder = require('botbuilder');

exports.displayConverter = function(session, currencies) {

    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                  {
                    "type": "TextBlock",
                    "text": "Exchange Rate Converter",
                    "size": "large",
                    "weight": "bolder"
                  },
                 {
                     "type": "ColumnSet",
                     "columns": [
                         {
                             "type": "Column",
                             "items": [
                                {
                                    "type": "Input.ChoiceSet",
                                    "id": "base",
                                    // "separator": true,
                                    // "style":"expanded",
                                    "value": "5",
                                    "choices": currencies
                                  },
                                  {
                                    "type": "TextBlock",
                                    "text": "to",
                                    "size": "medium",
                                    "horizontalAlignment": "center"
                                },
                                {
                                    "type": "Input.ChoiceSet",
                                    "id": "conversionTo",
                                    // "separator": true,
                                    // "style":"expanded",
                                    "value": "5",
                                    "choices": currencies
                                },
                                {
                                    "type": "Input.Text",
                                    "id": "amount",
                                    "placeholder": "Amount",
                                }
                             ]
                         }
                     ]
                 }
                ],
                "actions" : [
                    {
                        "type": "Action.Submit",
                        "title": "Convert",
                        //"data": {
                            //"x": 13
                        //}
                    }
                ]
              }
    }));
}

exports.displayConversion = function displayConversionResult(session, result, base, convertTo, amount) {

    var baseCur = base.slice(0,-1);
    var convertToCur = convertTo.slice(0,-1);

    // var url = 'http://www.countryflags.io/'+ baseCur.toLowerCase() + '/flat/64.png';
    // console.log(url);
    // console.log(baseCur);

    // console.log(baseCur);
    //console.log(result);

    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                  {
                    "type": "TextBlock",
                    "text": "Currency Conversion",
                    "size": "large",
                    "weight": "bolder"
                  },
                  {
                      "type" : "ColumnSet",
                      "separator": true,
                      "columns": [
                          {
                              "type": "Column",
                              "width": 1,
                              "items": [
                                  {
                                      "type": "TextBlock",
                                      "text": base.toString(),
                                      "size": "extraLarge",
                                      "spacing": "none",
                                      "horizontalAlignment": "center"
                                  },
                                  {
                                      "type": "Image",
                                      "url": 'http://www.countryflags.io/'+ baseCur.toLowerCase() + '/flat/64.png',
                                      "spacing": "none",
                                      "horizontalAlignment": "center"
                                  }
                              ]
                          },
                          {
                              "type": "Column",
                              "separator": true,
                              "width": 1,
                              "items": [
                                  {
                                      "type": "TextBlock",
                                      "text": convertTo.toString(),
                                      "size": "extraLarge",
                                      "spacing": "none",
                                      "horizontalAlignment": "center"

                                  },
                                  {
                                      "type": "Image",
                                      "url": 'http://www.countryflags.io/'+ convertToCur.toLowerCase() + '/flat/64.png',
                                      "spacing": "none",
                                      "horizontalAlignment": "center"
                                  }
                              ]
                          }
                      ] 
                  },

                    {
                        "type": "TextBlock",
                        "text": amount.toString() + " " + base.toString() + " = " + result.toString().slice(0, -2) + " " + convertTo.toString(),
                        "size": "extraLarge",
                        "weight": "bolder",
                        "horizontalAlignment": "center"

                    }
                    

                ]
              }
    }));
}