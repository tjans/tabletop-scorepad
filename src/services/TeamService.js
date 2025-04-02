import { db } from "src/db";
import { v4 as uuidv4 } from 'uuid';
import util from "src/custom/utilities/util";
import playerService from "src/services/PlayerService";

class TeamService {
  static generateTeam() {
  
    let positionCounts = {
      "C": 1,
      "1B": 1,
      "2B": 1,
      "SS": 1,
      "3B": 1,
      "OF": 3,
      "DH": 1
    }

    let pitcherCounts = {
      "SP": 6,
      "RP": 4,
      "CL": 1,
    }

    var powerTotal = 0;
    var hittingTotal = 0;

    // iterate over the position counts and run the generate player
    //let player = playerService.generatePositionPlayer("C");
    let positionPlayers = [];
    for (let position in positionCounts) {
      for (let i = 0; i < positionCounts[position]; i++) {
        let player = playerService.generatePositionPlayer(position);
        powerTotal += player.powerValue;
        hittingTotal += player.hittingValue;
        positionPlayers.push(player);
      }
    }

    let pitchers = [];
    for (let position in pitcherCounts) {
      for (let i = 0; i < pitcherCounts[position]; i++) {
        let player = playerService.generatePitcher(position);
        pitchers.push(player);
      }
    }

    var qualities = {
      powerTotal: this.getPowerQuality(powerTotal),
      hittingTotal: this.getScoringQuality(hittingTotal, powerTotal)
    }

    return {qualities, positionPlayers, pitchers};
  }

  static getScoringQuality(hittingPoints, powerPoints) {
    var powerBoost = 0;
    if(powerPoints == "STRONG") powerBoost = 6;
    else if(powerPoints == "STRONG•") powerBoost = 3;
    
   var adjustedHittingPoints = hittingPoints + powerBoost;
   var quality = "";
    if(adjustedHittingPoints > 42) quality = "HIGH";
    else if(adjustedHittingPoints >= 40 && adjustedHittingPoints <= 42) quality = "HIGH•";
    else if(adjustedHittingPoints >= 30 && adjustedHittingPoints <= 39) quality = "neutral";
    else if(adjustedHittingPoints >= 27 && adjustedHittingPoints <= 29) quality = "LOW•";
    else quality = "LOW";

    return quality;
  }

  static getPowerQuality(points) {
    if (points > 36) {
      return "STRONG";
    } else if (points >= 34 && points <= 36) {
      return "STRONG•";
    } else if (points >= 30 && points <= 33) {
      return "neutral";
    } else if (points >= 27 && points <= 29) {
      return "WEAK•";
    } else {
      return "WEAK";
    }
  }
}

export default TeamService;