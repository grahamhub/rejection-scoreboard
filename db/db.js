import { readFileSync, writeFileSync } from 'fs';

export default class Database {
    constructor() {
        this.scores = JSON.parse(readFileSync('./db/scores.json').toString());
    }

    update(user) {
        this.scores[user]++;
        this.writeToDB();
    }

    getScores() {
        return this.scores;
    }

    writeToDB() {
        writeFileSync('./db/scores.json', JSON.stringify(this.scores));
    }
}