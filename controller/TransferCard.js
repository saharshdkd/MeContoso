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
                    "type": "TextBlock",
                    "text": "Transfer Balance",
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
                                    "id": "fromAccount",
                                    "choices": accountOptions
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

// exports.displayTransferComplete = fuction(session, accounts) {

// }