var builder = require('botbuilder');

exports.displayWelcomeCard = function(session){

    var showWelcome = new builder.HeroCard(session)
    .title('Welcome, Saharsh!')
    .subtitle('Some quick option to get started:')
    .images([
        builder.CardImage.create(session, 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png')
    ])
    .buttons([
        builder.CardAction.postBack(session, 'view balance', 'View Balance'),
        builder.CardAction.postBack(session, 'transfer balance', 'Transfer Balance'),
        builder.CardAction.postBack(session, 'convert currency', 'Convert Currency')
        
    ]);
    session.send(new builder.Message(session).addAttachment(showWelcome));

    // session.send(new builder.Message(session).addAttachment({
    //     contentType: "application/vnd.microsoft.card.adaptive",
    //     content: {
    //         "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    //         "type": "AdaptiveCard",
    //         "version": "1.0",
    //         "body": [
    //             {
    //                 "type": "Container",
    //                 "items": [
    //                     {
    //                         "type": "ColumnSet",
    //                         "columns": [
    //                             {
    //                                 "type": "Column",
    //                                 "width": "auto",
    //                                 "items": [
    //                                     {
    //                                         "type": "Image",
    //                                         "url": "https://openclipart.org/download/247324/abstract-user-flat-1.svg",
    //                                         "size": "medium",
    //                                         "style": "person"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "type": "Column",
    //                                 "width": "stretch",
    //                                 "items": [
    //                                     {
    //                                         "type": "TextBlock",
    //                                         "text": "Welcome,",
    //                                         "wrap": true,
    //                                         "size": "large",
    //                                         "horizontalAlignment": "left"
    //                                     },
    //                                     {
    //                                         "type": "TextBlock",
    //                                         "spacing": "small",
    //                                         "text": "Saharsh!",
    //                                         "size": "extraLarge",
    //                                         "weight": "bolder",
    //                                         "wrap": true
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ],
    //         "actions" : [
    //             {
    //                 "type": "Action.Submit",
    //                 "title": "View Balance",
    //                 "data": {
    //                     "command": "ViewBalance"
    //                 }
    //             },
    //             {
    //                 "type": "Action.Submit",
    //                 "title": "Transfer Balance",
    //                 "data": {
    //                     "command": "TransferBalance"
    //                 }
    //             },
    //             {
    //                 "type": "Action.Submit",
    //                 "title": "Convert Currency",
    //                 "data": {
    //                     "command": "ExchangeCurrency"
    //                 }
    //             }
    //         ]
    //         }
    // }));
}