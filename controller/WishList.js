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

    session.send('Item(s) removed/deleted successfully!');

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
    //console.log('Over here');

}

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

exports.addNewItem = function(item, session) {

    console.log(item);
    var customer = "2728827";
    url = 'http://mecontoso.azurewebsites.net/tables/WishList';
    rest.getWishList(url, session, customer, item, function(body, session, customer, item){
        
        var listOptions = JSON.parse(body);
        // console.log(item);
        var wishList = [];
        for(var i=0; i < listOptions.length; i++) {
            var custIDReceived = listOptions[i].customerID;
            var listName = listOptions[i].wishListName;
            //var accounts = [];
    
            if(customer === custIDReceived){
                wishList.push(listName);
            }
        }
        wishCard.addNewItemCard(session, wishList, item);

    })

}
