var builder = require('botbuilder');

exports.displayTransferOptionsCard = function(session, accounts) {
    
    var accountOptions = [];
    
    for(var index in accounts){
        var accountItem = {};
        // var accountItem = {};
        // accountItem.title = accounts[index];
        // accountOptions.push(accountItem);

            accountItem.title = accounts[index];
            accountItem.value = accounts[index];

            //accountItem += "\"" + "title" + "\""  + ":" + "\"" + accounts[index] + "\"";
            accountOptions.push(accountItem);
    }
    //console.log('It is here');
    //console.log(accountOptions);
    
    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "size": "auto",
                                "items": [
                                    {
                                        "type": "Image",
                                        "url": "http://mecontosoweb.azurewebsites.net/img/logodark.png",
                                        "size": "small",
                                        "horizontalAlignment": "left"
                                    }
                                ]
                            },
                            {
                                "type": "Column",
                                "size": "auto",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": "Transfer Balance",
                                        "size": "large",
                                        "weight": "bolder"
                                    }
                                ]
                            }
                            
                        ]
                    },
                //   {
                //     "type": "TextBlock",
                //     "text": "Transfer Balance",
                //     "size": "large",
                //     "weight": "bolder"
                //   },
                 {
                     "type": "ColumnSet",
                     "columns": [
                         {
                             "type": "Column",
                             "width": "auto",
                             "items": [
                                {
                                    "type": "Input.ChoiceSet",
                                    "id": "fromAccount",
                                    "choices": accountOptions
                                  }
                             ]
                         },
                         {
                             "type": "Column",
                             "width": "auto",
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
                             "width": "auto",
                             "items": [
                                {
                                    "type": "Input.ChoiceSet",
                                    "id": "toAccount",
                                    "choices": accountOptions
                                  }
                             ]
                         },
                         {
                            "type": "Column",
                            "width": "auto",
                            "items": [
                               {
                                   "type": "Input.Text",
                                   "id": "amount",
                                   "placeholder": "amount"
                                 }
                            ]
                        }
                     ]
                 }
                ],
                "actions" : [
                    {
                        "type": "Action.Submit",
                        "title": "Transfer",
                    }
                ]
              }
    }));
}

exports.displayTransferCompleteCard = function(session, accounts) {

    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                  {
                    "type": "TextBlock",
                    "text": "Transfer Complete",
                    "size": "large",
                    "weight": "bolder"
                  },
                  {
                      "type": "Container",
                      "items": [
                          {
                              "type": "TextBlock",
                              "text": "Previous " + accounts.toaccount + " balance was: " + accounts.oldbal,
                              "isSubtle": true
                          },
                          {
                                "type": "TextBlock",
                                "text": "Your new " + accounts.toaccount + " balance is: " + accounts.newbal,
                                "weight": "bolder",
                                "size": "large"
                          }
                      ]
                  }
                ]
              }
    }));
}