import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// store
import useAppStore from "src/stores/useAppStore";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";

// icons
import { IoBaseballOutline } from "react-icons/io5";
import { PiBaseballCapDuotone } from "react-icons/pi";

// components
import ConfirmationModal from "src/components/ConfirmationModal";
import Card from "src/components/Card";
import { SelectInput } from "src/components/SelectInput";

// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";

export default function Home() {

  usePageTitle("Home");
  const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const appStore = useAppStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
  }

  return (
    <>
      <ContentWrapper>

        <div className="">



          <Card to="/leagues/0/edit" className="" >
            <div className="flex items-center gap-3">
              <PiBaseballCapDuotone className="mr-5 text-3xl text-defaultBlue" />
              <section className="text-left">
                <div className="font-bold">
                  Create League
                </div>
                <div className="text-sm">
                  Create GMs, teams, and players for a new league
                </div>
              </section >
            </div>
          </Card>


        </div>

      </ContentWrapper>

      <ConfirmationModal
        isModalOpen={isNotAvailableModalOpen}
        showYes={false}
        noText='Ok'
        onReject={_ => setIsNotAvailableModalOpen(false)}
        title="Not available"
        message="This is a modal message" />
    </>
  );
}