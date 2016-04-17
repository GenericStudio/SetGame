app.directive('board', function () {
    return {
        restrict: 'EA',
        replace: 'false',
        templateUrl: 'app/views/board.html',
        controller: function ($scope, SetGameFactory) {
            $scope.GameState = "Start";
            $scope.InitializeGame = function () {
                $scope.GameState = "Restart";
                $scope.SelectedCards = [];
                $scope.SetGameFactory = SetGameFactory;
                SetGameFactory.NewGame();
                while (SetGameFactory.active_cards.length < 12) {
                    SetGameFactory.DrawCard();
                }
            }
            $scope.SelectCard = function (card) {
                $scope.Sets = [];
                //Pop an already selected card
                if ($scope.SelectedCards.indexOf(card) != -1) $scope.SelectedCards.splice($scope.SelectedCards.indexOf(card), 1);
                else $scope.SelectedCards.push(card);
                while ($scope.SelectedCards.length > 3) {
                    $scope.SelectedCards.splice(0, 1);
                }
                if ($scope.SelectedCards.length == 3) {
                    $scope.Sets = SetGameFactory.GetSets($scope.SelectedCards);
                }
            }

            $scope.SelectCards = function (cards) {
                $scope.Sets = [];
                $scope.SelectedCards = cards;
                if ($scope.SelectedCards.length == 3) {
                    $scope.Sets = SetGameFactory.GetSets($scope.SelectedCards);
                }
            }
            $scope.PlayRound = function () {
                SetGameFactory.FindAllSets();
                while (SetGameFactory.active_sets.length > 0 || SetGameFactory.deck.length > 0) {
                    $scope.PlaySingleHand();
                }
            }
            $scope.PlaySingleHand = function () {
                if (SetGameFactory.active_sets.length > 0) {
                    SetGameFactory.RemoveSet(SetGameFactory.active_sets[0]);
                } else {
                    SetGameFactory.DrawCard();
                    SetGameFactory.DrawCard();
                    SetGameFactory.DrawCard();
                }
                SetGameFactory.FindAllSets();
            }
            $scope.FindSingleHand = function(){
                SetGameFactory.FindAllSets();
                if(SetGameFactory.active_sets.length>0){
                    $scope.SelectCards(SetGameFactory.active_sets[Math.floor(Math.random() * SetGameFactory.active_sets.length)]);
                }
            }
        }
    }
});
