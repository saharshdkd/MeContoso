var builder = require('botbuilder');


exports.startDialog = function (bot) {

    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/3e2eacec-6dc0-47f6-9697-3d4e366817af?subscription-key=1e54d467d9ea4261b797628fd848c2bd&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('MakePayment', function (session, args) {

            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'amount');

            // Checks if the food entity was found
            if (foodEntity) {
                session.send('Making payment of %s', foodEntity.entity);
                // Insert logic here later
            } else {
                session.send("No payment identified! Please try again");
            
        }

    }).triggerAction({
        matches: 'MakePayment'
    });

    bot.dialog('ExchangeCurrency', function (session, args) {

            // Pulls out the food entity from the session if it exists
            //var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');

            //console.log(args.intent.entities[0]);
            //console.log(args.intent.entities[1]);

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
                                            "id": "snooze",
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
                                            "id": "snooze",
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
                                "data": {
                                    "x": 13
                                }
                            }
                        ]
                      }
            }));
    

            // Checks if the food entity was found
        /*    if (foodEntity) {
                session.send('Converting %s', foodEntity.entity);
                // Insert logic here later
            } else {
                session.send("No currency identified! Please try again");
            
        }*/

    }).triggerAction({
        matches: 'ExchangeCurrency'
    });

    /*bot.dialog('DeleteFavourite', [
        // Insert delete logic here later
    ]).triggerAction({
        matches: 'DeleteFavourite'

    });

    bot.dialog('GetCalories', function (session, args) {
        if (!isAttachment(session)) {

            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');

            // Checks if the for entity was found
            if (foodEntity) {
                session.send('Calculating calories in %s...', foodEntity.entity);
                // Insert logic here later

            } else {
                session.send("No food identified! Please try again");
            }
        }
    }).triggerAction({
        matches: 'GetCalories'
    });

    bot.dialog('GetFavouriteFood', [
        // Insert favourite food logic here later
    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });

    bot.dialog('LookForFavourite', [
        // Insert logic here later
    ]).triggerAction({
        matches: 'LookForFavourite'
    });


    bot.dialog('WelcomeIntent', [
        // Insert logic here later
    ]).triggerAction({
        matches: 'WelcomeIntent'
    });*/
}

// Function is called when the user inputs an attachment
function isAttachment(session) { 
    var msg = session.message.text;
    if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
        
        //call custom vision here later
        return true;
    }
    else {
        return false;
    }
}

