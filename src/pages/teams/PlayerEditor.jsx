import { useEffect, useState, useRef } from "react";

// store
import useAppStore from "src/stores/useAppStore";

// services
import playerService from "src/services/PlayerService";
import teamService from "src/services/TeamService";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";
import { SelectInput } from "src/components/SelectInput";
import FormSubmit from "src/components/FormSubmit";


// components
import ContentWrapper from "src/components/ContentWrapper";

export default function PlayerEditor() {
  usePageTitle("Edit Player");
  const navigate = useNavigate();
  const { teamId, playerId } = useParams();
  const [team, setTeam] = useState(null);
  const [player, setPlayer] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    if (teamId) {
      let team = await teamService.getTeam(teamId);
      setTeam(team)
    }

    if (playerId) {
      let player = await playerService.getPlayer(playerId);
      setPlayer(player)
      reset(player);
    }
  }

  const onSubmit = async (data) => {
    try {
      await playerService.savePlayer({ ...data, teamId: teamId, playerId: player?.playerId });
      toast.success("Player saved successfully!");
      navigate(`/teams/${teamId}/players`);
    } catch (error) {
      toast.error("Failed to save player.");
    }
  };

  return (
    <>
      <ContentWrapper>

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

          <TextInput
            label="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
            defaultValue={player?.firstName}
            rules={{
              required: "First Name is required"
            }}
          />

          <TextInput
            label="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
            defaultValue={player?.lastName}
            rules={{
              required: "Last Name is required"
            }}
          />

          <SelectInput
            label="Handedness"
            name="hand"
            register={register}
            rules={{ required: "Handedness is required" }}
            error={errors.hand}
          >
            <option value="">Select a Handedness...</option>
            <option value="L">Left</option>
            <option value="R">Right</option>
            <option value="S">Switch</option>
          </SelectInput>

          <SelectInput
            label="Position"
            name="position"
            register={register}
            rules={{ required: "Position is required" }}
            error={errors.position}
          >
            <option value="">Select a Position...</option>
            <option value="P">P - Pitcher</option>
            <option value="C">C - Catcher</option>
            <option value="1B">1B - First Base</option>
            <option value="2B">2B - Second Base</option>
            <option value="3B">3B - Third Base</option>
            <option value="SS">SS - Shortstop</option>
            <option value="LF">LF - Left Field</option>
            <option value="CF">CF - Center Field</option>
            <option value="RF">RF - Right Field</option>
            <option value="MI">MI - Middle Infield</option>
            <option value="CI">CI - Corner Infield</option>
            <option value="OF">OF - Outfield</option>
            <option value="DH">DH - Designated Hitter</option>
          </SelectInput>


          <FormSubmit onCancel={(_) => navigate(`/teams/${teamId}/players`)} />

        </form>

      </ContentWrapper>
    </>
  );
}