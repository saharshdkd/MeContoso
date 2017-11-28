var rest = require('../API/Restclient');
var balanceCard = require('./BalanceCard');
var transferCard = require('./TransferCard');
var converter = require('./CurrencyConverter');

// The following block of function are for the View Balance feature.

exports.displayAccountBalance = function getBalanceData(session, customer, account) {
    var url = 'http://mecontoso.azurewebsites.net/tables/AccountBalance';
    rest.getAccountBalance(url, session, customer, account, handleAccountBalanceResponse)
    console.log('step 1');
};


function handleAccountBalanceResponse(message, session, customer, account){
    var balanceResponse = JSON.parse(message);

    for (var index in balanceResponse) {
        var custIDRecieved = balanceResponse[index].customerID;
        var balance = balanceResponse[index].balance;
        var accType = balanceResponse[index].accountType;

        //console.log(account);
        //console.log(account.toLowerCase());

        if(customer === custIDRecieved && account.toLowerCase() === accType.toLowerCase()) {
            //session.send("Your %s balance is %s", account, balance);
            balanceCard.displayBalanceCard(session, balance, accType);
        }
    }
}

exports.displayBalanceOptions = function getBalanceOptions(session, customer){
    var url = 'http://mecontoso.azurewebsites.net/tables/AccountBalance';
    var account = "empty";
    rest.getAccountBalance(url, session, customer, account, handleBalanceOptions)

}

function handleBalanceOptions(message, session, customer, account) {
    var balanceOptions = JSON.parse(message);
    //console.log(balanceOptions.length);
    //var l = balanceOptions.length;
    var accounts = [];
    for(var i=0; i < balanceOptions.length; i++) {
        var custIDReceived = balanceOptions[i].customerID;
        var accType = balanceOptions[i].accountType
        //var accounts = [];

        if(customer === custIDReceived){
            accounts.push(accType);
        }
        // balanceCard.displayBalanceOptions(session, accounts);
        
    }
    balanceCard.displayBalanceOptions(session, accounts);

}


//The following block of functions are for the Transfer Balance feature.

exports.updateAccountBalance = function updateData (session, customer, account) {
    var url = 'http://mecontoso.azurewebsites.net/tables/AccountBalance';

    //console.log(amount); //this one works
    rest.getAccountBalance(url, session, customer, account, handleUpdateBalanceResponse)
}

function handleUpdateBalanceResponse (message, session, customer, account) {

        var upBal = JSON.parse(message);

        // console.log(upBal);
        // console.log(account);

        var fromAcc = account.fromAccount;
        var toAcc = account.toAccount;
        var amount = account.amount;
        var transferTo = {};
        var transferFrom = {};

        // console.log(fromAcc);
        // console.log(toAcc);
        // console.log(amount);

        for (var index in upBal) {
            var custIDRecieved = upBal[index].customerID;
            var accType = upBal[index].accountType;
            var oldBal = upBal[index].balance;
    
            if(customer === custIDRecieved && fromAcc.toLowerCase() === accType.toLowerCase()) {
                
                // var transferFrom = {};
                var change = oldBal - amount;
                transferFrom.fromaccount = fromAcc;
                transferFrom.oldfrombal = oldBal;
                transferFrom.newfrombal = change;
                //console.log(change);
                rest.updateBalance(session, upBal[index].id, change);
            }

            if(customer === custIDRecieved && toAcc.toLowerCase() === accType.toLowerCase()) {
                
                // var transferTo = {};
                var change = parseInt(oldBal) + parseInt(amount);
                //console.log(change);
                transferTo.toaccount = toAcc;
                transferTo.oldbal = oldBal.toString();
                transferTo.newbal = change.toString();
                //console.log(display);
                rest.updateBalance(session, upBal[index].id, change);
            }
            // console.log(transferFrom);
            // console.log(transferTo);
        }
        transferCard.displayTransferCompleteCard(session, transferTo);
        rest.postTransferData(session, customer, transferFrom, transferTo, amount);

}

exports.displayTransferOptions = function getTransferOptions(session, customer) {
    var url = 'http://mecontoso.azurewebsites.net/tables/AccountBalance';
    var account = "empty";
    //console.log('Reached here');
    rest.getAccountBalance(url, session, customer, account, handleTransferOptions)
}

function handleTransferOptions(message, session, customer, account) {
    var transferOptions = JSON.parse(message);
    //console.log(balanceOptions.length);
    //var l = balanceOptions.length;
    //console.log(transferOptions);
    var accounts = [];
    for(var i=0; i < transferOptions.length; i++) {
        var custIDReceived = transferOptions[i].customerID;
        var accType = transferOptions[i].accountType
        //var accounts = [];

        if(customer === custIDReceived){
            accounts.push(accType);
        }
        // balanceCard.displayBalanceOptions(session, accounts);
        
    }
    //console.log(accounts);
    transferCard.displayTransferOptionsCard(session, accounts);

}

// The following block of functions are for the Currency Converter/Exchange feature.

exports.getCurrencyConversion = function getConversion(session, details){

    var amount = details.amount;
    var base = details.base;
    var convertTo = details.conversionTo;

    var url = 'http://apilayer.net/api/convert?access_key=247ee104e918787465cfd409201edfe2&from=' + base +  '&to=' + convertTo + '&amount=' + amount;
    console.log(details);
    // console.log(amount);
    // console.log(base);
    // console.log(convertTo);
    // rest.getCurrencyData(url, session, base, convertTo, handleCurrencyConversion);

    rest.getCurrencyData(url, session, base, convertTo, amount, handleCurrencyConversion);

}

function handleCurrencyConversion(conversion, session, base, convertTo, amount) {

    var converted = JSON.parse(conversion);
    // console.log(converted.result);

    converter.displayConversion(session, converted.result, base, convertTo, amount);

}










exports.displayCurrencyConverter = function getCurrencyData(session) {
    url = 'http://apilayer.net/api/list?access_key=247ee104e918787465cfd409201edfe2';  
    
    rest.getCurrencyList(url, session, handleCurrencyConverter);
    //'http://apilayer.net/api/list?access_key='
    // accesskey = '247ee104e918787465cfd409201edfe2';

    // converter.displayConverter()
}

function handleCurrencyConverter(message, session) {
    
    var currencylist = JSON.parse(message);
    //console.log(currencylist);
    
    // console.log(currencylist.currencies);
    // console.log(currencylist.currencies.length);

    // Will need to loop through the currencies and be able to separate the code (id) and currency (name)
    var currencies = [];
    for(var index in currencylist.currencies){
        var code = index;
        var currencyName = currencylist.currencies[index];

        // console.log(code);
        // console.log(currencyName);
        // console.log(currencylist.currencies);
       
        var currencyItem = {};

        currencyItem.title = currencyName + " " + "(" + code + ")";
        currencyItem.value = code;
        
        currencies.push(currencyItem);
    }
    // console.log(currencies);
    converter.displayConverter(session, currencies);

}













//console.log(upBal);
/*for (var index in upBal) {
    
    
    if(customer === upBal[index].customerID && account.toLowerCase() === upBal[index].accountType.toLowerCase()){
        
        console.log('Updating balance now');

        //rest.updateBalance(url, session, upBal[index].id, amount);
        rest.updateBalance(url, session, upBal[index].id);
    }
}*/

// exports.deleteFavouriteFood = function deleteFavouriteFood(session,username,favouriteFood){
//     var url  = 'https://msafood.azurewebsites.net/tables/msafood';


//     rest.getFavouriteFood(url,session, username,function(message,session,username){
//      var   allFoods = JSON.parse(message);

//         for(var i in allFoods) {

//             if (allFoods[i].favouriteFood === favouriteFood && allFoods[i].username === username) {

//                 console.log(allFoods[i]);

//                 rest.deleteFavouriteFood(url,session,username,favouriteFood, allFoods[i].id ,handleDeletedFoodResponse)

//             }
//         }


//     });


// };

/*exports.displayFavouriteFood = function getFavouriteFood(session, username){
    var url = 'https://msafood.azurewebsites.net/tables/msafood';
    rest.getFavouriteFood(url, session, username, handleFavouriteFoodResponse)
};

function handleFavouriteFoodResponse(message, session, username) {
    var favouriteFoodResponse = JSON.parse(message);
    var allFoods = [];
    for (var index in favouriteFoodResponse) {
        var usernameReceived = favouriteFoodResponse[index].username;
        var favouriteFood = favouriteFoodResponse[index].favouriteFood;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(favouriteFoodResponse.length - 1) {
                allFoods.push(favouriteFood);
            }
            else {
                allFoods.push(favouriteFood + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite foods are: %s", username, allFoods);                
    
}*/