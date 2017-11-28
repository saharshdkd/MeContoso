var request = require('request');
var balance = require('../controller/AccountBalance')

exports.getAccountBalance = function getData(url, session, customer, account, callback) {
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetResponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, customer, account);
        }
    });
}

exports.updateBalance = function updataData(session, id, amount) {
    var url = 'http://mecontoso.azurewebsites.net/tables/AccountBalance';
    // var amount = '7000';
    var option = {
        url: url + "\\" + id,
        method: 'PATCH',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type': 'application/json'
        },
        json: {
            "balance" : amount
        }
    };

    request(option, function(error, response, body){
        if(!error && response.statusCode == 200) {
            console.log('Balance updated');
        }
        else {
            console.log(error);
        }
    });
};

exports.postTransferData = function(session, customer, from, to, amount) {

    // console.log(from);
    // console.log(to);
    // console.log(customer);
    var url = 'http://mecontoso.azurewebsites.net/tables/TransferTransactions'
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "customerID" : customer,
            "transferFrom" : from.fromaccount,
            "transferFromOldBal": from.oldfrombal,
            "transferFromNewBal": from.newfrombal,
            "transferTo": to.toaccount,
            "transferToOldBal": to.oldbal,
            "transferToNewBal": to.newbal,
            "amount": amount
        }
        };
        
        request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('Transfer transaction posted');
        }
        else{
            console.log(error);
        }
        });

    
}

exports.getCurrencyList = function conversionData(url, session,callback){
    
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetResponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session);
        }
    });
}

exports.getCurrencyData = function conversionData(url, session, base, convertTo, amount, callback){
    
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetResponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, base, convertTo, amount);
            // balance.handleCurrencyConversion(body, session, base, convertTo);
        }
    });
}



// exports.deleteFavouriteFood = function deleteData(url,session, username ,favouriteFood, id, callback){
//     var options = {
//         url: url + "\\" + id,
//         method: 'DELETE',
//         headers: {
//             'ZUMO-API-VERSION': '2.0.0',
//             'Content-Type':'application/json'
//         }
//     };

//     request(options,function (err, res, body){
//         if( !err && res.statusCode === 200){
//             console.log(body);
//             callback(body,session,username, favouriteFood);
//         }else {
//             console.log(err);
//             console.log(res);
//         }
//     })

// };
/*exports.getFavouriteFood = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetResponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username);
        }
    });
};*/