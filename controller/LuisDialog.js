var builder = require('botbuilder');
var converter = require('./CurrencyConverter');
var balance = require('./AccountBalance');
var transfer = require('./TransferCard');
var balanceCard = require('./BalanceCard');
var customVision = require('./CustomVision');
var wishList = require('./WishList');
var rest = require('../API/Restclient');
var welcome = require('./WelcomeCard');


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

    //////

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

    //////

    bot.dialog('ExchangeCurrency', function (session, args) {
            

            //console.log(args.intent.entities[0]);
            //console.log(args.intent.entities[1]);
            // console.log('ExchangeCurrency intent found!');
        if(!isAttachment(session)) {
            if (session.message && session.message.value) {

                if(session.message.value.item){
                    rest.postListItem(session, session.message.value.item, session.message.value.selectedList);
                }
                else{
                // A Card's Submit Action obj was received
                console.log(session.message.value);
                // var details = session.message.value;
                balance.getCurrencyConversion(session, session.message.value);
                // balance.getCurrencyConversion(session, base, convertTo, amount);

                }
                // // A Card's Submit Action obj was received
                // console.log(session.message.value);
                // // var details = session.message.value;
                // balance.getCurrencyConversion(session, session.message.value);
                // // balance.getCurrencyConversion(session, base, convertTo, amount);
            }
            else {

                var baseEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'base');
                var convertToEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'convertTo');
                var amountEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'amount');

                console.log(args.intent.entities);
                // var random = JSON.parse(args.intent.entities);
                // console.log(random);

                // for(var index in args.intent.entities){

                //     if(args.intent.entities[index].type === 'currency'){
                //         console.log(args.intent.entities[index].entity);
                //         // cur.title = args.intent.entities[index].entity;
                //     }
                //    // console.log(cur);
                // }
                if(amountEntity && baseEntity && convertToEntity){
                    console.log('It reaches here');
                    balance.getSimpleConversion(session, baseEntity.entity.toUpperCase(), convertToEntity.entity.toUpperCase(), amountEntity.entity);
                }
                else{
                    //converter.displayConverter(session);
                    balance.displayCurrencyConverter(session)
                }
            }
        }

    }).triggerAction({
    matches: 'ExchangeCurrency'
    });

    //////

    bot.dialog('EditWish', function(session, args) {
        
        var customer = "2728827";

        if (!isAttachment(session)) {

            if (session.message && session.message.value) {
                // A Card's Submit Action obj was received
                //console.log(session.message.value);
                wishList.getListItems(session, session.message.value)
            }
            else {
                wishList.getWishList(session, customer);
            }
        }
    }).triggerAction({
        matches: 'EditWish'
    });

    bot.dialog('Welcome', function(session, args) {
        

        // if (session.message && session.message.value) {
        //     // A Card's Submit Action obj was received


        //     console.log(session.message.value.command);
        //     if(session.message.value.command)
        //         bot.dialog(session.message.value.command);
        // }
        // else {  
            welcome.displayWelcomeCard(session);
        // }

    }).triggerAction({
        matches: 'Welcome'
    });


    }

// Function is called when the user inputs an attachment
function isAttachment(session) { 
    var msg = session.message.text;
    if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
        
        //call custom vision here later
        customVision.retreiveMessage(session);

        return true;
    }
    else {
        return false;
    }
}

