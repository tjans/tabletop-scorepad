import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// store
import useAppStore from "src/stores/useAppStore";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";

// icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";

// services
import teamService from "src/services/TeamService";

// components
import FloatingAddButton from "src/components/FloatingAddButton";
import Card from "src/components/Card";

export default function TeamList() {
  usePageTitle("View Teams");

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
          <Card to={`/teams/${team.teamId}/edit`} className="text-" >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{team.year} - {team.location}</h3>
              <button
                onClick={() => handleDelete(team.id)}
                className="text-2xl text-red-500"
              >
                <MdDelete />
              </button>
            </div>
          </Card>
        )) : <div>No teams found, add your first one!</div>}


      </ContentWrapper>
    </>
  );
}