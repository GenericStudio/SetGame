SetGameApp.factory('GameManager', function () {
    var game = {};
    game.colors = ["red", "green", "purple"];
    game.shapes = ["diamond", "squiggle", "oval"];
    game.shadings = ["solid", "empty", "striped"];
    game.numbers = ["one", "two", "three"];

    //Assuming a deck contains each unique card combination once
    //This function reinitializes the deck
    game.NewGame = function () {
      game.deck = [];
      game.active_cards = [];game.removed_sets=[];
      
      var index = 0;
      for (var color in game.colors) {
        color = game.colors[color];
        for (var shape in game.shapes) {
          shape = game.shapes[shape];
          for (var shading in game.shadings) {
            shading = game.shadings[shading];
            for (var number in game.numbers) {
              number = game.numbers[number];
              game.deck.push({ color: color, shape: shape, shading: shading, number: number, index: index++ })
            }
          }
        }
      }
      shuffle(game.deck);
    }
    //This function scans the active cards for sets
    game.FindAllSets = function () {
      game.active_sets = [];
      for (var card1 in game.active_cards) {
        card1 = game.active_cards[card1];
        for (var card2 in game.active_cards) {
          card2 = game.active_cards[card2];
          for (var card3 in game.active_cards) {
            card3 = game.active_cards[card3];
            if (card1 != card2 && card2 != card3 && card1 != card3) {
              if (game.GetSets([card1, card2, card3]).length == 4) {
                var set = [card1, card2, card3];
                set.sort(function (a, b) { return a.index - b.index });
                if (game.active_sets.length == 0) game.active_sets.push(set);
                var add = true;
                for (var existingSet in game.active_sets) {
                  existingSet = game.active_sets[existingSet];
                  if (existingSet[0].index == set[0].index &&
                    existingSet[1].index == set[1].index &&
                    existingSet[2].index == set[2].index) {
                    add = false;
                  } else {

                  }
                }
                if (add) {
                  game.active_sets.push(set);
                }

              }
            }
          }
        }
      }
      game.active_sets.sort(function (a, b) { return a[0].index - b[0].index });
    }
    //This function returns a card from the deck and removes that card from the deck
    game.DrawCard = function () {
      if (game.deck.length > 0) {
        game.active_cards.push(game.deck[0]);
        game.deck.splice(0, 1);
      }
    }
    //Stack overflow shuffle function
    function shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    }
    //Removes a set from the active cards, adds it to claimed sets, and draws new cards from deck to replace them
    game.RemoveSet = function (Set) {
      game.removed_sets.push(Set);
      for (var card in Set) {
        card = Set[card];
        game.active_cards.splice(game.active_cards.indexOf(card), 1);
        game.DrawCard();
      }
    }

    //Determines if 3 cards are part of a set
    game.GetSets = function (cards) {
      if(cards.length!=3) return;
      var set = {};
      var sets = [];
      set.colors = [];
      set.shapes = [];
      set.shadings = [];
      set.numbers = [];
      for (var card in cards) {
        card = cards[card];
        if (card.color != undefined && set.colors.indexOf(card.color) == -1) set.colors.push(card.color);
        if (card.shape != undefined && set.shapes.indexOf(card.shape) == -1) set.shapes.push(card.shape);
        if (card.shading != undefined && set.shadings.indexOf(card.shading) == -1) set.shadings.push(card.shading);
        if (card.number != undefined && set.numbers.indexOf(card.number) == -1) set.numbers.push(card.number);
      }
      if (set.colors.length != 2) sets.push('color');
      if (set.shapes.length != 2) sets.push('shape');
      if (set.shadings.length != 2) sets.push('shading');
      if (set.numbers.length != 2) sets.push('number');
      return sets;
    }
    game.NewGame();

    return game;
  });