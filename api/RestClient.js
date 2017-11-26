var request = require('request');

exports.getAccountBalance = function getData(url, session, customer, account, callback) {
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetResponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, customer, account);
        }
    });
}


/*exports.getFavouriteFood = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetResponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username);
        }
    });
};*/