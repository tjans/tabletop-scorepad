import { db } from "src/db";
import { v4 as uuidv4 } from 'uuid';

export default {
    getLineups: async function () {
        let lineups = await db.table('lineups').toArray();
        return lineups;
    },
    getLineup: async function (lineupId) {
        let lineup = await db.lineups.get(lineupId);
        return lineup;
    },
    saveLineup: async function (lineup) {
        lineup = { ...lineup, lineupId: lineup.lineupId ?? uuidv4() };
        await db.lineups.put(lineup);
        return lineup.lineupId;
    },


    // saveTeam: async function (team) {
    //     team = { ...team, teamId: team.teamId ?? uuidv4() };
    //     return await db.teams.put(team);
    // },
    // getTeams: async function () {
    //     let teams = await db.table('teams').toArray();
    //     return teams.sort(this.teamSorter)
    // },
    // getTeam: async function (teamId) {
    //     let team = await db.teams.get(teamId);
    //     return team;
    // },
    // deleteTeam: async function (teamId) {
    //     return await db.teams.delete(teamId);
    // },
    // // private
    // teamSorter: function (a, b) {

    //     const yearA = a.year.toString().toUpperCase();
    //     const yearB = b.year.toString().toUpperCase();

    //     if (yearA == yearB) {
    //         let cityA = a.location.toUpperCase();
    //         let cityB = b.location.toUpperCase();
    //         return (cityA > cityB) ? 1 : (cityA < cityB) ? -1 : 0;
    //     }
    //     return yearA.localeCompare(yearB);
    // }
}