var rest = require('../API/Restclient');
var balanceCard = require('./BalanceCard');

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



/////////////////// BELOW IS FOR THE UPDATE FUNCTION.

exports.updateAccountBalance = function updateData (session, customer, account) {
    var url = 'http://mecontoso.azurewebsites.net/tables/AccountBalance';

    //console.log(amount); //this one works
    rest.getAccountBalance(url, session, customer, account, handleUpdateBalanceResponse)
}

function handleUpdateBalanceResponse (message, session, customer, account) {

        var upBal = JSON.parse(message);

        for (var index in upBal) {
            var custIDRecieved = upBal[index].customerID;
            var accType = upBal[index].accountType;
    
            if(customer === custIDRecieved && account.toLowerCase() === accType.toLowerCase()) {
                console.log('beginning update');
                rest.updateBalance(session, upBal[index].id)
            }
        }

        
        //console.log(upBal);
        /*for (var index in upBal) {
            
            
            if(customer === upBal[index].customerID && account.toLowerCase() === upBal[index].accountType.toLowerCase()){
                
                console.log('Updating balance now');

                //rest.updateBalance(url, session, upBal[index].id, amount);
                rest.updateBalance(url, session, upBal[index].id);
            }
        }*/

}

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