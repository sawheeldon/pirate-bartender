// global variables

//ingredients

var theBar = {
    strong: ["whiskey", "rum", "tequila"],
    sexy: ["anne bonney", "mary read", "grace o’malley"],
    sweet: ["sugar cubes", "syrup", "sweetener"],
    bubbles: ["soda", "lemonade", "coke"],
    fruity: ["apple", "pineapple", "mango"],
};

//pirates choice

var Order = function (orderValues) {
    this.strong = orderValues[0];
    this.sexy = orderValues[1];
    this.sweet = orderValues[2];
    this.bubbles = orderValues[3];
    this.fruity = orderValues[4];
};


var Drink = function (theBar, drinkOrder) {
    var ingredientNumber = [];
    var ingredientsArray = [];

    for (var userPreference in drinkOrder) {
        ingredientNumber = generateRandomNumber(0, 2);
        if (drinkOrder[userPreference]) {
            //for each one of the ingredient categories chose one random ingredient
            ingredientsArray.push(theBar[userPreference][ingredientNumber]);
        }
    }
    return ingredientsArray;
};
//define functions

//change to uppercase the chosen ingredients

var toTitleCase = function (str) {
    // "/\w\S*/g" is a regular expression (http://www.regular-expressions.info/) which searches for all words in a phrase ignoring the spaces
    return str.replace(/\w\S*/g, function (txt) {
        //only the first letter in the word make Upper case and all the other letters apart from the first one ("substr(1)") to lower case
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var generateRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

var drinkNamer = function (concoction) {
    if (concoction.length > 0) {
        //split the concoction by space to be able to use the words
        var drinkNamerOutput = concoction[0].split(" ");
        //chose the last word of the first ingredient
        var lastWord = drinkNamerOutput[drinkNamerOutput.length - 1];
        //change the title case of the last word
        return toTitleCase(lastWord);
    } else {
        return false;
    }
};
//use functions

$(document).ready(function () {

    $(".output").hide();

    $('#submit').on('click', function () {

        orderValues = [];


        $('select').each(function () {
            if ($(this).val() === 'yes') {
                orderValues.push(true);
            } else {
                orderValues.push(false);
            }
        });



        drinkOrder = new Order(orderValues); // create new order from existing user choice
        concoction = new Drink(theBar, drinkOrder); // mix drink with Drink constructor

        if (concoction.length > 0) {

            //build the chosen ingredients from the ingredients array
            var buildTheHtmlOutput = "";
            $.each(concoction, function (key, value) {
                buildTheHtmlOutput += "<li>" + value + "</li>";
            });

            $('.output').show();

            // name the customer's beverage with drinkNamer();
            $(".output h3").html("Here be your " + drinkNamer(concoction) + " pint, ye scurvy scum!");

            //populate it with the ingredients
            $(".output ul").html(buildTheHtmlOutput);
        }
        //if there are no ingredients selected then show alert
        else {
            alert('Pick something for your poison!');
        }
    });
});
