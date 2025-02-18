import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

// store
import useAppStore from "src/stores/useAppStore";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";

// services
import playerService from "src/services/PlayerService";
import teamService from "src/services/TeamService";

// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";

// components
import FloatingAddButton from "src/components/FloatingAddButton";
import Card from "src/components/Card";
import Button from "src/components/Button";
import TextIcon from "src/components/TextIcon";

export default function PlayerList() {
  usePageTitle("Team Roster");
  const { teamId } = useParams();
  const appStore = useAppStore()
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    let players = await playerService.getPlayers(teamId);
    setPlayers(players);

    let team = await teamService.getTeam(teamId)
    setTeam(team);
  }

  return (
    <>
      <ContentWrapper noPadding={true}>
        <TextIcon
          text={team?.abbreviation}
          settings={{ color: team?.color, textColor: team?.textColor }}
        />

        {players.length > 0 ? (
          <div className="mt-4 border-t border-b border-gray-200">
            {players.map((player, index) => (
              <div key={player.playerId} className="flex items-center justify-between px-4 py-2 border-b border-gray-200 last:border-b-0">
                <div>
                  {player.firstName} {player.lastName}
                </div>
                <div>
                  {player.position}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No players found</div>
        )}

        <FloatingAddButton to={`/teams/${teamId}/players/new`} className="my-3" />

        <Button to={`/teams`} className="inline-block mt-3" text="&laquo; Back to teams" />

      </ContentWrapper>
    </>
  );
}