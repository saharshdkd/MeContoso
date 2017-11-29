var builder = require('botbuilder');

exports.displayWelcomeCard = function(session){

    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "auto",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "https://openclipart.org/download/247324/abstract-user-flat-1.svg",
                                            "size": "medium",
                                            "style": "person"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Welcome,",
                                            "wrap": true,
                                            "size": "large",
                                            "horizontalAlignment": "left"
                                        },
                                        {
                                            "type": "TextBlock",
                                            "spacing": "small",
                                            "text": "Saharsh!",
                                            "size": "extraLarge",
                                            "weight": "bolder",
                                            "wrap": true
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
                    "title": "View Balance",
                    "data": {
                        "command": "view balance"
                    }
                },
                {
                    "type": "Action.Submit",
                    "title": "Transfer Balance",
                    "data": {
                        "command": "transfer balance"
                    }
                },
                {
                    "type": "Action.Submit",
                    "title": "Convert Currency",
                    "data": {
                        "command": "convert currency"
                    }
                }
            ]
            }
    }));
}