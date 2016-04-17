SetGameApp.directive('board', function () {
    return {
        restrict: 'EA',
        replace: 'false',
        templateUrl: 'Partials/board.html',
        controller: function ($scope, GameManager) {
            $scope.GameState = "Start";
            //Resets all game related properties to an initial state
            $scope.InitializeGame = function () {
                $scope.GameState = "Restart";
                $scope.SelectedCards = [];
                $scope.GameManager = GameManager;
                GameManager.NewGame();
                while (GameManager.active_cards.length < 12) {
                    GameManager.DrawCard();
                }
            }
            //Toggles selection of a card
            $scope.SelectCard = function (card) {
                $scope.Sets = [];
                //Pop an already selected card
                if ($scope.SelectedCards.indexOf(card) != -1) $scope.SelectedCards.splice($scope.SelectedCards.indexOf(card), 1);
                else $scope.SelectedCards.push(card);
                while ($scope.SelectedCards.length > 3) {
                    $scope.SelectedCards.splice(0, 1);
                }
                if ($scope.SelectedCards.length == 3) {
                    $scope.Sets = GameManager.GetSets($scope.SelectedCards);
                }
            }
            //Sets the selected cards
            $scope.SelectCards = function (cards) {
                $scope.Sets = [];
                $scope.SelectedCards = cards;
                if ($scope.SelectedCards.length == 3) {
                    $scope.Sets = GameManager.GetSets($scope.SelectedCards);
                }
            }
            //Plays a full gamne of Set
            $scope.PlayRound = function () {
                GameManager.FindAllSets();
                while (GameManager.active_sets.length > 0 || GameManager.deck.length > 0) {
                    $scope.PlaySingleHand();
                }
            }
            //plays a single round of set
            $scope.PlaySingleHand = function () {
                if (GameManager.active_sets.length > 0) {
                    GameManager.RemoveSet(GameManager.active_sets[0]);
                } else {
                    GameManager.DrawCard();
                    GameManager.DrawCard();
                    GameManager.DrawCard();
                }
                GameManager.FindAllSets();
            }
            //Finds, but does not claim a single hand of set
            $scope.FindSingleHand = function () {
                GameManager.FindAllSets();
                if (GameManager.active_sets.length > 0) {
                    $scope.SelectCards(GameManager.active_sets[Math.floor(Math.random() * GameManager.active_sets.length)]);
                }
            }
            //claims a hand of set
            $scope.ClaimSet = function () {
                if ($scope.SelectedCards.length == 3 && GameManager.GetSets($scope.SelectedCards).length == 4) {
                    GameManager.RemoveSet($scope.SelectedCards);
                    $scope.SelectedCards = [];
                    $scope.Sets = [];
                }
            }
        }
    }
});
