System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var gamePhase, player;
    return {
        setters: [],
        execute: function () {
            (function (gamePhase) {
                gamePhase[gamePhase["xTurn"] = 0] = "xTurn";
                gamePhase[gamePhase["oTurn"] = 1] = "oTurn";
                gamePhase[gamePhase["Inactive"] = 2] = "Inactive";
                gamePhase[gamePhase["Active"] = 3] = "Active";
                gamePhase[gamePhase["outcome"] = 4] = "outcome";
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