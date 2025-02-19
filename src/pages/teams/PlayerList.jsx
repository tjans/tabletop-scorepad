import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// store
import useAppStore from "src/stores/useAppStore";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";

// services
import playerService from "src/services/PlayerService";
import teamService from "src/services/TeamService";

// icons
import { MdDelete } from "react-icons/md";

// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";

// components
import FloatingAddButton from "src/components/FloatingAddButton";
import Card from "src/components/Card";
import Button from "src/components/Button";
import TextIcon from "src/components/TextIcon";
import ConfirmationModal from "src/components/ConfirmationModal";

export default function PlayerList() {
  usePageTitle("Team Roster");
  const navigate = useNavigate();
  const { teamId } = useParams();
  const appStore = useAppStore()
  const [players, setPlayers] = useState([]);
  const [isDeletePlayerConfirmationOpen, setIsDeletePlayerConfirmationOpen] = useState(false);
  const [team, setTeam] = useState(null);
  const [deletePlayerId, setDeletePlayerId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    let players = await playerService.getPlayers(teamId);
    setPlayers(players);

    let team = await teamService.getTeam(teamId)
    setTeam(team);
  }

  const handleDelete = async (playerId) => {
    setDeletePlayerId(null);
    await playerService.deletePlayer(deletePlayerId);
    setIsDeletePlayerConfirmationOpen(false);
    await load();
  }

  const handleEdit = (player) => {
    navigate(`/teams/${teamId}/players/${player.playerId}/edit`);
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
              <div key={player.playerId} className="flex items-center justify-between px-4 py-2 border-b border-gray-200 cursor-pointer last:border-b-0">
                <div onClick={_ => handleEdit(player)}>
                  {player.position} - {player.firstName} {player.lastName} ({player.hand})
                </div>

                <div>
                  <button
                    onClick={() => {
                      setDeletePlayerId(player.playerId);
                      setIsDeletePlayerConfirmationOpen(true);
                    }}
                    className="text-2xl text-red-500"
                  >
                    <MdDelete />
                  </button>
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

      <ConfirmationModal
        isModalOpen={isDeletePlayerConfirmationOpen}
        onReject={_ => setIsDeletePlayerConfirmationOpen(false)}
        onConfirm={_ => handleDelete()}
        title="Delete player?"
        message="Are you sure you want to delete this player?" />
    </>
  );
}