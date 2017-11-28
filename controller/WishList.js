var rest = require('../API/Restclient');
var wishCard = require('./WishListCard');

exports.getWishList = function getWish(session, customer){
    url = 'http://mecontoso.azurewebsites.net/tables/WishList';
    rest.getWishListData(url, session, customer, handleWishListData)
}

function handleWishListData(message, session, customer){
    var listOptions = JSON.parse(message);
    // console.log(listOptions);
    var wishList = [];
    for(var i=0; i < listOptions.length; i++) {
        var custIDReceived = listOptions[i].customerID;
        var listName = listOptions[i].wishListName;
        //var accounts = [];

        if(customer === custIDReceived){
            wishList.push(listName);
        }
    }
    // console.log(wishList);
    wishCard.displayEditCard(session, wishList);
}

exports.getListItems = function(session, list){

    url = 'http://mecontoso.azurewebsites.net/tables/WishListItems';
    // var choosenList = list.selectedList;
    // rest.getListItems(url, session, choosenList, handlegetListItems);


    if(list.selectedList){
        var choosenList = list.selectedList;
        //url = 'http://mecontoso.azurewebsites.net/tables/WishListItems';
        rest.getListItems(url, session, choosenList, handlegetListItems);
    }
    else{
        
        var itemSplit = list.selectedItem.split(";");
        //console.log(list.fromList);
        rest.getListItems(url, session, list.fromList, function(message, session, choosenList){
            var toDelete = JSON.parse(message);

            //console.log(toDelete);

            for (var i in toDelete){

                if(toDelete[i].wishListName === choosenList && toDelete[i].itemName == itemSplit[i]){
                    // console.log('We made it');
                    rest.deleteListItems(url, session, toDelete[i].id, handleDeleteResponse)
                }

            }
        });

    }


}

function handleDeleteResponse(body, session) {
    var itemsDeleted = JSON.parse(body);
    console.log(itemsDeleted);

    // var deletedItems = [];
    // for(var index in itemsDeleted){

    //     console.log(itemsDeleted[index].deleted.toString());
    //     // var deletedItem = {};
    //     if(itemsDeleted[index].deleted == true){

    //         var deletedItem = {};
    //         deletedItem.title = itemsDeleted[index].itemName;
    //         deletedItem.value = itemsDeleted[index].itemName;

    //         deletedItems.push(deletedItem);
    //     }

    // }
    // console.log(deletedItems);
    console.log('Over here');

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

function handlegetListItems(message, session, choosenList){

    var listItems = JSON.parse(message);
    var itemList = [];
    for(var i=0; i < listItems.length; i++) {
        var wishListName = listItems[i].wishListName;
        var listItem = listItems[i].itemName;

        if(choosenList === wishListName){
            itemList.push(listItem);
        }
    }
    // console.log(itemList);
    wishCard.displayListItems(session, choosenList, itemList)

}