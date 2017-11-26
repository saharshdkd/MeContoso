var builder = require('botbuilder');
var converter = require('./CurrencyConverter');
var balance = require('./AccountBalance');


exports.startDialog = function (bot) {

    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/3e2eacec-6dc0-47f6-9697-3d4e366817af?subscription-key=1e54d467d9ea4261b797628fd848c2bd&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('CheckBalance', function (session, args) {

            // Pulls out the food entity from the session if it exists
            //var customer = builder.EntityRecognizer.findEntity(args.intent.entities, 'customerID');
            var customer = "2728827";
            var account = builder.EntityRecognizer.findEntity(args.intent.entities, 'account');

            // Checks if the food entity was found
            if (account) {
                session.send('Checking balance of %s', account.entity);    
                balance.displayAccountBalance(session, customer, account.entity);
                // Insert logic here later
            } else {
                session.send("No account balance identified! Please try again");
            
        }

    }).triggerAction({
        matches: 'CheckBalance'
    });

    bot.dialog('ExchangeCurrency', function (session, args) {

            // Pulls out the food entity from the session if it exists
            //var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');

            //console.log(args.intent.entities[0]);
            //console.log(args.intent.entities[1]);

            if (session.message && session.message.value) {
                // A Card's Submit Action obj was received
               console.log(session.message.value);
            }
            else {
                converter.displayConverter(session);
            }
    

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

