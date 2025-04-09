import { useEffect, useState, useRef } from "react";

// store
import useAppStore from "src/stores/useAppStore";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";
import { useNavigate } from "react-router-dom";


// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";
import ToggleButton from "src/components/ToggleButton";
import FormSubmit from "src/components/FormSubmit";

// services
import gmService from "src/services/GeneralManagerService";
import playerService from "src/services/PlayerService";
import teamService from "src/services/TeamService";
import leagueService from "src/services/LeagueService";
import seasonTeamService from "src/services/SeasonTeamService";
import SeasonService from "src/services/SeasonService";
import SeasonPlayerService from "src/services/SeasonPlayerService";
import nameService from "src/services/NameService";

// components
import DebugJson from "src/components/DebugJson";


export default function LeagueEditor() {

  usePageTitle("Edit League");
  const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);
  const appStore = useAppStore()
  const [numberOfTeams, setNumberOfTeams] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isDraftLeague, setIsDraftLeague] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleDraftLeagueChange = (e) => {
    setIsDraftLeague(e.target.checked);
  }

  const onSubmit = async (data) => {
    setNumberOfTeams(data.numberOfTeams);

    // empty the draft board and teams for this league
    // create a new league
    var leagueId = await leagueService.saveLeague({
      name: data.leagueName,
      numberOfTeams: data.numberOfTeams,
      isDraftLeague: isDraftLeague
    });

    // create a new season
    var seasonId = await SeasonService.saveSeason({
      leagueId: leagueId,
      year: 1
    });

    // create a team, and then decide whether to place players on the team or in undrafted state based on isDraftLeague
    for (let i = 0; i < data.numberOfTeams; i++) {
      // Create the team record
      let team = {
        city: `City ${i + 1}`,
        name: `Team`,
        leagueId: leagueId,
        abbreviation: `TM${i + 1}`,
      }

      let teamId = await teamService.saveTeam(team);

      // Create the general manager record
      let gm = await gmService.generate();
      let names = await nameService.generateName();

      gm.firstName = names.firstName;
      gm.lastName = names.lastName;
      let gmId = await gmService.saveGeneralManager(gm);

      // Add the team to the current season
      let seasonTeam = {
        seasonId: seasonId,
        teamId: teamId,
        generalManagerId: gmId
      };
      let seasonTeamId = await seasonTeamService.saveSeasonTeam(seasonTeam);


      // create the players and attach them to the team
      ["C", "1B", "2B", "SS", "3B", "OF", "OF", "OF", "DH"].map(async (position) => {

        let names = await nameService.generateName();
        let player = {
          position: position,
          firstName: names.firstName,
          lastName: names.lastName,
          position
        }

        // saves main player record
        let playerId = await playerService.savePlayer(player);

        // generates the position player
        let positionPlayer = await playerService.generatePositionPlayer(position);

        // saves the player to a team in the current season
        await SeasonPlayerService.saveSeasonPlayer({
          ...positionPlayer,
          seasonId: seasonId,
          seasonTeamId: isDraftLeague ? null : seasonTeamId,
          playerId: playerId
        });

      });

      for (let i = 0; i < 6; i++) {

        let names = await nameService.generateName();
        let player = {
          firstName: names.firstName,
          lastName: names.lastName,
          position: "SP"
        }
        let playerId = await playerService.savePlayer(player);

        let pitcher = await playerService.generatePitcher("SP");
        await SeasonPlayerService.saveSeasonPlayer({
          ...pitcher,
          seasonId: seasonId,
          seasonTeamId: isDraftLeague ? null : seasonTeamId,
          playerId: playerId
        });
      }

      for (let i = 0; i < 4; i++) {
        let names = await nameService.generateName();
        let player = {
          firstName: names.firstName,
          lastName: names.lastName,
          position: "RP"
        }
        let playerId = await playerService.savePlayer(player);
        let pitcher = await playerService.generatePitcher("RP");
        await SeasonPlayerService.saveSeasonPlayer({
          ...pitcher,
          seasonId: seasonId,
          seasonTeamId: isDraftLeague ? null : seasonTeamId,
          playerId: playerId
        });
      }

      let closerName = await nameService.generateName();
      let player = {
        firstName: closerName.firstName,
        lastName: closerName.lastName,
        position: "CL"
      }
      let playerId = await playerService.savePlayer(player);
      let pitcher = await playerService.generatePitcher("CL")
      await SeasonPlayerService.saveSeasonPlayer({
        ...pitcher,
        seasonId: seasonId,
        seasonTeamId: isDraftLeague ? null : seasonTeamId,
        playerId: playerId
      });
    }

    navigate(`/leagues/${leagueId}`);
  }

  return (
    <>
      <ContentWrapper align="start">



        {!numberOfTeams &&
          <form onSubmit={handleSubmit(onSubmit)}>

            <TextInput
              label="What is the league name?"
              name="leagueName"
              register={register}
              error={errors.leagueName}
              rules={{
                required: "League name is required"
              }}
            />

            <TextInput
              label="How many teams are in your league?"
              name="numberOfTeams"
              register={register}
              error={errors.numberOfTeams}
              rules={{
                required: "Number of teams is required"
              }}
            />

            <TextInput
              label="How many games will each team play?"
              name="numberOfGames"
              register={register}
              error={errors.numberOfGames}
              rules={{
                required: "Number of games is required"
              }}
            />



            <ToggleButton
              label="Draft league?"
              checked={isDraftLeague}
              onChange={handleDraftLeagueChange}
            />
            {isDraftLeague && <small>Players will be left in an undrafted state, allowing you to run your own draft</small>}
            {!isDraftLeague && <small>Players will be automatically added to your teams as they are created</small>}

            <FormSubmit
              onCancel={(_) => navigate("/")}
            />

          </form>
        }

        {numberOfTeams && 1 == 2 &&
          <>
            <div className="mt-4 text-center">
              <strong>General Manager</strong>
              <DebugJson json={gm} />
            </div>

            <div className="relative w-3/5 mx-auto overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-center">Player</th>
                    <th className="px-4 py-2 text-center">Position</th>
                    <th className="px-4 py-2 text-center">Age</th>
                    <th className="px-4 py-2 text-center">Archetype</th>
                    <th className="px-4 py-2 text-center">Hitting</th>
                    <th className="px-4 py-2 text-center">Power</th>
                    <th className="px-4 py-2 text-center">Clutch</th>
                    <th className="px-4 py-2 text-center">Defense</th>
                  </tr>
                </thead>
                <tbody>


                  {team.positionPlayers.map((player, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-4 py-2 text-center">Player {index + 1}</td>
                        <td className="px-4 py-2 text-center">{player.position}</td>
                        <td className="px-4 py-2 text-center">{player.age}</td>
                        <td className="px-4 py-2 text-center">{player.archetype}</td>
                        <td className="px-4 py-2 text-center">{player.grade}</td>
                        <td className="px-4 py-2 text-center">{player.powerGrade}</td>
                        <td className="px-4 py-2 text-center">{player.clutchGrade}</td>
                        <td className="px-4 py-2 text-center">{player.defenseGrade}</td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>

            <DebugJson json={team.qualities} />

            <div className="relative w-3/5 mx-auto mt-4 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-center">Player</th>
                    <th className="px-4 py-2 text-center">Position</th>
                    <th className="px-4 py-2 text-center">Age</th>
                    <th className="px-4 py-2 text-center">Grade</th>
                    <th className="px-4 py-2 text-center">Power Tend</th>
                    <th className="px-4 py-2 text-center">Stamina</th>
                  </tr>
                </thead>
                <tbody>


                  {team.pitchers.map((player, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-4 py-2 text-center">Player {index + 1}</td>
                        <td className="px-4 py-2 text-center">{player.position}</td>
                        <td className="px-4 py-2 text-center">{player.age}</td>
                        <td className="px-4 py-2 text-center">{player.grade}</td>
                        <td className="px-4 py-2 text-center">{player.powerTendency}</td>
                        <td className="px-4 py-2 text-center">{player.stamina}</td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>

              <div>Bullpen Grade: {team.bullpenGrade}</div>
            </div>
          </>
        }

      </ContentWrapper>
    </>
  );
}