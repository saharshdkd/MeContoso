var builder = require('botbuilder');

exports.displayBalanceCard = function(session, balance, account) {
    
    
    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                  {
                    "type": "TextBlock",
                    "text": "Your Balance!",
                    "size": "large",
                    "weight": "bolder"
                  },
                  {
                      "type": "ColumnSet",
                      "columns": [
                          {
                              "type": "Column",
                              "width": "auto",
                              "items": [
                                  {
                                      "type": "TextBlock",
                                      "text": "Account: " + account,
                                      "isSubtle": true,
                                      "horizontalAlignment": "middle"
                                  }
                              ]
                          },
                          {
                              "type": "Column",
                              "width": "stretch",
                              "items": [
                                  {
                                      "type": "TextBlock",
                                      "text": balance,
                                      "size": "extraLarge",
                                      "weight": "bold",
                                      "horizontalAlignment": "left"
                                  }
                              ]
                          }
                      ]
                  }
                ]
              }
    }));

}

// exports.displayBalanceOptions = function(session) {

//     session.send(new builder.Message(session).addAttachment({
//         contentType: "application/vnd.microsoft.card.adaptive",
//         content: {
//                 "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
//                 "type": "AdaptiveCard",
//                 "version": "1.0",
//                 "body": [
//                   {
//                     "type": "TextBlock",
//                     "text": "Account Balance",
//                     "size": "large",
//                     "weight": "bolder"
//                   },
//                   {
//                       "type": "Input.ChoiceSet",
//                       "id": "selectedAccount",
//                       "choices": [
//                           "title": 
//                       ]
//                   }
//                 ]
//               }
//     }));

// }

// {
//     "type": "Input.ChoiceSet",
//     "id": "base",
//     "style":"compact",
//     "value": "5",
//     "choices": [
//       {
//         "title": "New Zealand",
//         "value": "NZD",
//         "isSelected": true
//       },
//       {
//         "title": "Australia",
//         "value": "AUD"
//       },
//       {
//         "title": "United States",
//         "value": "USD"
//       }
//     ]
//   }