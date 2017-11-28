var builder = require('botbuilder');

exports.displayEditCard = function(session, wishList){

    var listOptions = [];
    
    for(var index in wishList){
        var listItem = {};

        listItem.title = wishList[index];
        listItem.value = wishList[index];

        listOptions.push(listItem);
    }

    console.log(listOptions);
    
    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                  {
                    "type": "TextBlock",
                    "text": "Edit Wishlist",
                    "size": "large",
                    "weight": "bolder"
                  },
                  {
                      "type": "TextBlock",
                      "text": "Choose a list to edit:",
                      "isSubtle": true,
                      "size": "small"
                  },
                  {
                      "type": "Input.ChoiceSet",
                      "id": "selectedList",
                      "choices": listOptions
                  }
                ],
                actions : [
                    {
                        "type": "Action.Submit",
                        "title": "Edit"
                    }
                ]
              }
    }));

}

exports.displayListItems = function(session, choosenList, itemList){
    
    var listOptions = [];
    
    for(var index in itemList){
        var listItem = {};

        listItem.title = itemList[index];
        listItem.value = itemList[index];
        // listItem.id = itemList[index];

        listOptions.push(listItem);
    }

    //console.log(listOptions);
    
    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                  {
                    "type": "TextBlock",
                    "text": "Edit Wishlist Items",
                    "size": "large",
                    "weight": "bolder"
                  },
                  {
                      "type": "TextBlock",
                      "text": "Choose items to remove:",
                      "isSubtle": true,
                      "size": "small"
                  },
                  {
                      "type": "Input.ChoiceSet",
                      "id": "selectedItem",
                      "isMultiSelect": true,
                      "choices": listOptions
                  }
                ],
                actions : [
                    {
                        "type": "Action.Submit",
                        "title": "Remove Item(s)",
                        "data": {
                            "fromList": choosenList
                        }
                    }
                ]
              }
    }));
}