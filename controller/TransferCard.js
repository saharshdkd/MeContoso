var builder = require('botbuilder');

exports.displayTransferCard = function(session) {
    
    
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
                                    "style":"compact",
                                    "value": "5",
                                    "choices": [
                                      {
                                        "title": "New Zealand",
                                        "value": "NZD",
                                        "isSelected": true
                                      },
                                      {
                                        "title": "Australia",
                                        "value": "AUD"
                                      },
                                      {
                                        "title": "United States",
                                        "value": "USD"
                                      }
                                    ]
                                  }
                             ]
                         },
                         {
                             "type": "Column",
                             "items": [
                                 {
                                     "type": "TextBlock",
                                     "text": "to",
                                     "size": "medium",
                                     "horizontalAlignment": "center"
                                 }
                            ]   
                         },
                         {
                             "type": "Column",
                             "items": [
                                {
                                    "type": "Input.ChoiceSet",
                                    "id": "conversionTo",
                                    "style":"compact",
                                    "value": "5",
                                    "choices": [
                                      {
                                        "title": "New Zealand",
                                        "value": "NZD",
                                        "isSelected": true
                                      },
                                      {
                                        "title": "Australia",
                                        "value": "AUD"
                                      },
                                      {
                                        "title": "United States",
                                        "value": "USD"
                                      }
                                    ]
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