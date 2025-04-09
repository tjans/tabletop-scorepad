import { db } from "src/db";
import { v4 as uuidv4 } from 'uuid';

class SeasonTeamService {
  // SeasonTeamId, SeasonId, TeamId, GeneralManagerId
    static async saveSeasonTeam (seasonTeam) {
        seasonTeam = { ...seasonTeam, seasonTeamId: seasonTeam.seasonTeamId ?? uuidv4() };
        return await db.seasonTeams.put(seasonTeam);
      }

      static async getSeasonTeam(seasonTeamId) {
        let seasonTeam = await db.seasonTeams.where("seasonTeamId")
          .equals(seasonTeamId)
          .first();
        return seasonTeam;
      }

      static async getSeasonTeams(seasonId) {
        let seasonTeams = await db.seasonTeams.where("seasonId")
          .equals(seasonId)
          .toArray();
        return seasonTeams;
      }
}
  
export default SeasonTeamService;