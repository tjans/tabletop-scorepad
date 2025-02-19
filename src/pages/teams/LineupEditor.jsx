import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";
import { toast } from "react-toastify";

// services
import teamService from "src/services/TeamService";
import lineupService from "src/services/LineupService";

// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";
import FormSubmit from "src/components/FormSubmit";

export default function LineupEditor() {
  usePageTitle("Lineup Editor");
  const { teamId, lineupId } = useParams();
  const [team, setTeam] = useState(null);
  const [lineup, setLineup] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    load();
  }, [lineupId]);

  const load = async () => {
    let team = await teamService.getTeam(teamId);
    setTeam(team);

    if (lineupId) {
      let lineup = await lineupService.getLineup(lineupId);
      setLineup(lineup);
    }
  }

  // ocalhost:5173/teams/52d25131-8aa8-4d97-992a-62cb4ea10274/lineups/new

  const onSubmit = async (data) => {
    try {
      let insertedLineupId = await lineupService.saveLineup({ ...data, lineupId: lineupId ?? null, teamId: teamId });
      toast.success("Lineup name saved successfully!");
      navigate(`/teams/${teamId}/lineups/${insertedLineupId}/edit`);
    } catch (error) {
      toast.error("Failed to save lineup.");
      console.log(error)
    }
  };

  return (
    <>
      <ContentWrapper noPadding={true}>
        <div className="flex justify-center">
          {
            <div
              className="flex items-center justify-center text-xl font-bold rounded-full"
              style={{ color: team?.textColor ?? '#000', background: team?.color ?? '#CECECE', height: '70px', width: '70px' }}>
              {team?.abbreviation}
            </div>
          }
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mx-4">
            <TextInput
              label="Lineup Name"
              name="name"
              register={register}
              error={errors.name}
              defaultValue={lineup?.name}
              rules={{
                required: "Lineup Name is required"
              }}
            />

            <FormSubmit text="Set Lineup Name" onCancel={(_) => navigate(`/teams/${teamId}/lineups`)} />
          </div>

          {lineup &&
            <div className="mt-6">
              <h3 className="ml-3 font-bold text-start">Lineup</h3>

              {[...Array(9)].map((_, index) => (
                <div key={index} className="flex items-center px-4 py-2 border-b border-gray-200 cursor-pointer justify-content-center last:border-b-0">
                  <div>
                    <span className="font-bold">{index + 1}.&nbsp;&nbsp;&nbsp;</span>
                    <span className=""><a href="#">LF - Player Name (R)</a></span>
                  </div>
                </div>
              ))}
            </div>
          }

        </form>
      </ContentWrapper>
    </>
  );
}