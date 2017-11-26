var rest = require('../API/Restclient');

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

        if(customer === custIDRecieved && account.toLowerCase() === accType.toLowerCase()) {
            session.send("Your %s balance is %s", account, balance);
        }
    }
}


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