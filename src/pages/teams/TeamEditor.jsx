import { useEffect, useState, useRef } from "react";

// store
import useAppStore from "src/stores/useAppStore";

// services
import teamService from "src/services/TeamService";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import { useNavigate, useParams } from "react-router-dom";

// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";
import FormSubmit from "src/components/FormSubmit";


// components
import ContentWrapper from "src/components/ContentWrapper";
import TextIcon from "src/components/TextIcon";

export default function TeamEditor() {
  usePageTitle("Edit Team");
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);

  const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);
  const appStore = useAppStore()

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
      reset(team);
    }
  }

  const onSubmit = (data) => {
    teamService.saveTeam({ ...data, teamId: team?.teamId });
    navigate("/teams");
  };

  return (
    <>
      <ContentWrapper>

        {team &&
          <TextIcon
            text={team.abbreviation ?? '?'}
            settings={{ color: team.color, textColor: team.textColor }} />
        }

        <form onSubmit={handleSubmit(onSubmit)}>

          <TextInput
            label="Year"
            name="year"
            register={register}
            error={errors.year}
            defaultValue={team?.year}
            rules={{
              required: "Year is required"
            }}
          />

          <TextInput
            label="Abbreviation"
            name="abbreviation"
            register={register}
            error={errors.abbreviation}
            defaultValue={team?.abbreviation}
            // onChange={handleChangeIcon}
            maxLength={4}
            rules={{
              required: "Abbreviation is required",
              maxLength: 4
            }}
          />

          <TextInput
            label="Location"
            name="location"
            register={register}
            error={errors.location}
            defaultValue={team?.location}
            rules={{
              required: "Location is required",
            }}
          />

          <TextInput
            label="Mascot"
            name="mascot"
            register={register}
            defaultValue={team?.mascot}
          />

          <TextInput
            label="Team Color (#000000 = black)"
            name="color"
            register={register}
            error={errors.color}
            defaultValue={team?.color}
            // onChange={handleChangeIcon}
            rules={{
              required: "Team Color is required",
            }}
          />

          <TextInput
            label="Text Color (#ffffff = white)"
            name="textColor"
            register={register}
            error={errors.textColor}
            defaultValue={team?.textColor}
            // onChange={handleChangeIcon}
            rules={{
              required: "Text Color is required",
            }}
          />

          <FormSubmit onCancel={(_) => navigate("/teams")} />

        </form>

      </ContentWrapper>
    </>
  );
}