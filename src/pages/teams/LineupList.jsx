import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";

// icons
import { MdDelete } from "react-icons/md";

// services
import lineupService from "src/services/LineupService";
import teamService from "src/services/TeamService";

// components
import FloatingAddButton from "src/components/FloatingAddButton";
import Card from "src/components/Card";
import TextIcon from "src/components/TextIcon";

export default function LineupList() {
  usePageTitle("Team Lineups");
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [lineups, setLineups] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    let team = await teamService.getTeam(teamId);
    let lineups = await lineupService.getLineups(teamId);
    setTeam(team)
    setLineups(lineups);
  }

  const handleEdit = (lineup) => {
    navigate(`/teams/${teamId}/lineups/${lineup.lineupId}/edit`);
  }

  return (
    <>
      <ContentWrapper noPadding={true}>

        <div className="mx-4">
          <TextIcon text={team?.abbreviation} settings={{ textColor: team?.textColor, color: team?.color }} />

          <div className="my-4 font-bold">Lineups</div>
        </div>

        {lineups.length > 0 ? (
          <div className="mt-4 border-t border-b border-gray-200">
            {lineups.map((lineup, index) => (
              <div key={lineup.lineupId} className="flex items-center justify-between px-4 py-2 border-b border-gray-200 cursor-pointer last:border-b-0">
                <div onClick={_ => handleEdit(lineup)}>
                  {lineup.name}
                </div>

                <div>
                  <button
                    onClick={() => {
                      setDeleteLineupId(lineup.lineupId);
                      setIsDeleteLineupConfirmationOpen(true);
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
          <div>No lineups found, add your first one!</div>
        )}

        <FloatingAddButton to={`/teams/${teamId}/lineups/new`} className="my-3" />
      </ContentWrapper>
    </>
  );
}