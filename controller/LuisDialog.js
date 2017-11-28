var builder = require('botbuilder');
var converter = require('./CurrencyConverter');
var balance = require('./AccountBalance');
var transfer = require('./TransferCard');
var balanceCard = require('./BalanceCard');


exports.startDialog = function (bot) {

    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/3e2eacec-6dc0-47f6-9697-3d4e366817af?subscription-key=1e54d467d9ea4261b797628fd848c2bd&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('ViewBalance', function (session, args) {

        var customer = "2728827";
        // console.log('ViewBalance intent found!');    
        
        if (session.message && session.message.value) {
            balance.displayAccountBalance(session, customer, session.message.value.selectedAccount);
                // A Card's Submit Action obj was received
            //console.log(session.message.value.selectedAccount);
        }
        else{

            // Pulls out the food entity from the session if it exists
            //var customer = builder.EntityRecognizer.findEntity(args.intent.entities, 'customerID');
            // var customer = "2728827";
            var account = builder.EntityRecognizer.findEntity(args.intent.entities, 'account');
            // Checks if the food entity was found
            if (account) {
                //session.send('Checking balance of %s', account.entity);
                //balanceCard.displayBalanceCard(session);    
                balance.displayAccountBalance(session, customer, account.entity);
            } else {
                //session.send("No account balance identified! Please try again");
                balance.displayBalanceOptions(session, customer);
            }

        }


    }).triggerAction({
        matches: 'ViewBalance'
    });

    // bot.dialog('ExchangeCurrency', function (session, args) {

    //         //var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');

    //         //console.log(args.intent.entities[0]);
    //         //console.log(args.intent.entities[1]);

    //         console.log('ExchangeCurrency intent found!');

    //         if (session.message && session.message.value) {
    //             // A Card's Submit Action obj was received
    //            //console.log(session.message.value);
    //            balance.getCurrencyConversion(session, session.message.value);
    //         }
    //         else {
    //             //converter.displayConverter(session);
    //             balance.displayCurrencyConverter(session)
    //         }

    // }).triggerAction({
    //     matches: 'ExchangeCurrency'
    // });

    bot.dialog('TransferBalance', function(session, args){

        var customer = "2728827";
        
        //console.log('Transfer Balance intent');

        if (session.message && session.message.value) {
            //balance.displayAccountBalance(session, customer, session.message.value.selectedAccount);
                // A Card's Submit Action obj was received
            balance.updateAccountBalance(session, customer, session.message.value);
            //console.log(session.message.value);
        }
        else{

            var account = builder.EntityRecognizer.findEntity(args.intent.entities, 'account');
            var amount = builder.EntityRecognizer.findEntity(args.intent.entities, 'amount');

            if(amount && account){
                console.log('Doing something random');
            }
            else{
                console.log('Trigger transfer options');
                balance.displayTransferOptions(session, customer);
            }
    }

    }).triggerAction({
        matches: 'TransferBalance'

    });


    bot.dialog('ExchangeCurrency', function (session, args) {
        

    //console.log(args.intent.entities[0]);
    //console.log(args.intent.entities[1]);
    // console.log('ExchangeCurrency intent found!');

    if (session.message && session.message.value) {
        // A Card's Submit Action obj was received
        //console.log(session.message.value);
        balance.getCurrencyConversion(session, session.message.value);
    }
    else {

        var currencyEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');
        var amountEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'amount');

        //console.log(args.intent.entities);

        for(var index in args.intent.entities){

            if(args.intent.entities[index].type === 'currency'){
                // console.log(args.intent.entities[index].entity);
            }
        }

        if(!currencyEntity && !amountEntity){
            console.log('It reaches here');
        }
        else{
            //converter.displayConverter(session);
            balance.displayCurrencyConverter(session)
        }
    }

    }).triggerAction({
    matches: 'ExchangeCurrency'
    });

}


// // Function is called when the user inputs an attachment
// function isAttachment(session) { 
//     var msg = session.message.text;
//     if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
        
//         //call custom vision here later
//         return true;
//     }
//     else {
//         return false;
//     }
// }

