import { db } from "src/db";
import { v4 as uuidv4 } from "uuid";

export default {
  savePlayer: async function (player) {
    player = { ...player, playerId: player.playerId ?? uuidv4() };
    return await db.players.put(player);
  },
  getPlayers: async function (teamId) {
    let players = await db.players.where({ teamId }).toArray();
    return players.sort(this.positionSorter);
  },
  getPlayer: async function (playerId) {
    return await db.players.get(playerId);
  },
  getByTeam: async function (teamId) {
    const players = await db.players.where({ teamId }).toArray();
    return players;
  },

  getPlayers: async function (teamId) {
    const players = await this.getByTeam(teamId);
    return players.sort(this.positionSorter)
  },

  getKeepers: async function (teamId) {
    return (await this.getByTeam(teamId)).filter((p) => p.position === "GK");
  },

  // private
  positionSorter: function (a, b) {
    var ordering = {}, // map for efficient lookup of sortIndex
      sortOrder = ["C", "1B", "2B", "3B", "SS", "LF", "RF", "CF", "MI", "CI", "OF", "DH", "P"];
    for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
    return (
      ordering[a.position] - ordering[b.position] ||
      a.lastName.localeCompare(b.lastName)
    );
  },



  globalPositionSorter(sortOrder) {
    return function (a, b) {
      var ordering = {};
      for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
      return (
        ordering[a.position] - ordering[b.position] ||
        a.lastName.localeCompare(b.lastName)
      );
    }
  },

  deleteRoster: async function (teamId) {
    return await db.players.where({ teamId }).delete();
  },
  deletePlayer: async function (playerId) {
    return await db.players.delete(playerId);
  },
}