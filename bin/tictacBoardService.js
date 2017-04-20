System.register(["./model.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function check(arr) {
        var finalArr = [];
        var num;
        for (num in arr) {
            var num2 = void 0;
            var arr2 = void 0;
            arr2 = arr.slice(parseInt(num) + 1);
            for (num2 in arr2) {
                var num3 = void 0;
                var arr3 = arr2.slice(parseInt(num2) + 1);
                for (num3 in arr3) {
                    finalArr.push((arr[num] + arr2[num2] + arr3[num3]));
                }
            }
        }
        console.log(finalArr);
        return finalArr;
    }
    var model_js_1, empty, magicbox, boardService;
    return {
        setters: [
            function (model_js_1_1) {
                model_js_1 = model_js_1_1;
            }
        ],
        execute: function () {
            empty = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            magicbox = [8, 1, 6, 3, 5, 7, 4, 9, 2];
            boardService = (function () {
                function boardService(boardGameState) {
                    if (boardGameState === void 0) { boardGameState = empty; }
                    this.boardGameState = boardGameState;
                    this.phase = model_js_1.gamePhase.Inactive;
                    this.currentPlayers = [];
                }
                boardService.prototype.loadPlayer = function (player) {
                    if (this.currentPlayers.length < 2) {
                        player.currentlyPlaying = true;
                        this.currentPlayers.push(player);
                    }
                };
                boardService.prototype.declarePlayers = function () {
                    if (this.currentPlayers.length === 1) {
                        this.playerX = this.currentPlayers[0];
                        this.playerO = null;
                    }
                    else if (this.currentPlayers.length === 2) {
                        this.playerX = this.currentPlayers[0];
                        this.playerO = this.currentPlayers[1];
                    }
                };
                boardService.prototype.removeLoadedPlayer = function (id) {
                    this.currentPlayers = this.currentPlayers.filter(function (player) {
                        if (player.id !== id) {
                            return true;
                        }
                        player.currentlyPlaying = false;
                        return false;
                    });
                    this.declarePlayers();
                };
                boardService.prototype.validGame = function () {
                    return (this.currentPlayers.length === 2);
                };
                boardService.prototype.startGame = function () {
                    this.phase = model_js_1.gamePhase.xTurn;
                };
                boardService.prototype.validMove = function (move) {
                    if (this.boardGameState[move] === 0) {
                        return true;
                    }
                };
                boardService.prototype.makeMove = function (move) {
                    if (this.phase === model_js_1.gamePhase.xTurn) {
                        this.boardGameState[move] = 1;
                    }
                    else if (this.phase === model_js_1.gamePhase.oTurn) {
                        this.boardGameState[move] = 2;
                    }
                };
                boardService.prototype.nextPlayer = function () {
                    var currentPlayer;
                    if (this.phase === model_js_1.gamePhase.xTurn) {
                        this.phase = model_js_1.gamePhase.oTurn;
                        currentPlayer = this.currentPlayers[model_js_1.player.O];
                    }
                    else if (this.phase === model_js_1.gamePhase.oTurn) {
                        this.phase = model_js_1.gamePhase.xTurn;
                        currentPlayer = this.currentPlayers[model_js_1.player.X];
                    }
                    return currentPlayer;
                };
                boardService.prototype.checkForWinner = function (boardGameState) {
                    var tallyX = [];
                    var tallyO = [];
                    var countX = 0;
                    for (var place in boardGameState) {
                        if (boardGameState[place] === 1) {
                            tallyX.push(magicbox[place]);
                            countX++;
                        }
                        else if (boardGameState[place] === 2) {
                            tallyO.push(magicbox[place]);
                        }
                    }
                    if (tallyX.length < 3) {
                        return model_js_1.gamePhase.Active;
                    }
                    if (~check(tallyX).indexOf(15)) {
                        this.phase = model_js_1.gamePhase.xWinner;
                        return model_js_1.gamePhase.xWinner;
                    }
                    else if (~check(tallyO).indexOf(15)) {
                        this.phase = model_js_1.gamePhase.oWinner;
                        return model_js_1.gamePhase.oWinner;
                    }
                    else {
                        if (countX === 5) {
                            this.phase = model_js_1.gamePhase.Draw;
                            return model_js_1.gamePhase.Draw;
                        }
                        else {
                            return model_js_1.gamePhase.Active;
                        }
                    }
                };
                return boardService;
            }());
            exports_1("default", boardService);
        }
    };
});
//# sourceMappingURL=tictacBoardService.js.map