export interface IplayerService {
    name: string;
    isHuman: boolean;
    score: number;
    id: number;
    currentlyPlaying: boolean;
    makeMove(): number;
}

export interface IboardService {
    boardGameState: number[];
    playerX: IplayerService;
    playerO: IplayerService;
    phase: gamePhase;
    currentPlayers: IplayerService[];

}

export interface Icomponent {
    el: HTMLElement;
}

export enum gamePhase {
    xTurn = 0,
    oTurn,
    Inactive,
    Active,
    xWinner,
    oWinner,
    Draw
}

export enum player {
    X = 0,
    O = 1
}
