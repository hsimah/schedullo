/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON =
  "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421";
var WHITE_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg";
var BLACK_ICON =
  "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg";

var onBtnClick = function(t, opts) {
  fetch('https://schedullo.glitch.me/populate');
};

TrelloPowerUp.initialize({
  "list-sorters": function(t) {
    return t.list("name", "id").then(function(list) {
      return [
        {
          text: "Card Name",
          callback: function(t, opts) {
            console.log(opts.cards);
            // Trello will call this if the user clicks on this sort
            // opts.cards contains all card objects in the list
            var sortedCards = opts.cards.sort(function(a, b) {
              if (a.name > b.name) {
                return 1;
              } else if (b.name > a.name) {
                return -1;
              }
              return 0;
            });

            return {
              sortedIds: sortedCards.map(function(c) {
                return c.id;
              })
            };
          }
        }
      ];
    });
  },
  "board-buttons": function(t, opts) {
    return [
      {
        // we can either provide a button that has a callback function
        icon: {
          dark: WHITE_ICON,
          light: BLACK_ICON
        },
        text: "schedullo",
        callback: onBtnClick,
        condition: "edit"
      }
    ];
  },
  "show-settings": function(t, options) {
    // when a user clicks the gear icon by your Power-Up in the Power-Ups menu
    // what should Trello show. We highly recommend the popup in this case as
    // it is the least disruptive, and fits in well with the rest of Trello's UX
    return t.popup({
      title: "Custom Fields Settings",
      url: "../../views/settings.html",
      height: 184 // we can always resize later
    });
  }
});
