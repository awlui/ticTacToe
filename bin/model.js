System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var gamePhase, player;
    return {
        setters: [],
        execute: function () {
            (function (gamePhase) {
                gamePhase[gamePhase["gameInactive"] = 1] = "gameInactive";
                gamePhase[gamePhase["gameActive"] = 2] = "gameActive";
                gamePhase[gamePhase["xTurn"] = 3] = "xTurn";
                gamePhase[gamePhase["oTurn"] = 4] = "oTurn";
                gamePhase[gamePhase["outcome"] = 5] = "outcome";
            })(gamePhase || (gamePhase = {}));
            exports_1("gamePhase", gamePhase);
            (function (player) {
                player[player["X"] = 1] = "X";
                player[player["O"] = 2] = "O";
            })(player || (player = {}));
            exports_1("player", player);
        }
    };
});
//# sourceMappingURL=model.js.map