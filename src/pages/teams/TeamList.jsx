import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// store
import useAppStore from "src/stores/useAppStore";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";

// icons
import { FaPeopleGroup } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";

// services
import teamService from "src/services/TeamService";

// components
import FloatingAddButton from "src/components/FloatingAddButton";
import Card from "src/components/Card";
import TextIcon from "src/components/TextIcon";

export default function TeamList() {
  usePageTitle("View Teams");
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const appStore = useAppStore()

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    let teams = await teamService.getTeams();
    setTeams(teams)
  }

  return (
    <>
      <ContentWrapper>
        <FloatingAddButton to="/teams/new" className="mb-3" />

        {teams.length > 0 ? teams.map(team => (
          <Card key={team.teamId} >
            <div className="flex items-center justify-between">

              <div className="flex items-center space-x-2">
                <TextIcon
                  text={team.abbreviation}
                  settings={{
                    color: team.color,
                    textColor: team.textColor,
                  }}
                />
                <h3 className="text-lg font-medium"><Link to={`/teams/${team.teamId}/edit`}>{team.year} - {team.location}</Link></h3>
              </div>

              <div className="flex space-x-2">
                <button onClick={() => navigate(`/teams/${team.teamId}/players`)}
                  className="text-2xl text-blue-500">
                  <FaPeopleGroup />
                </button>

                <button
                  onClick={() => handleDelete(team.id)}
                  className="text-2xl text-red-500"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </Card>
        )) : <div>No teams found, add your first one!</div>}

      </ContentWrapper>
    </>
  );
}