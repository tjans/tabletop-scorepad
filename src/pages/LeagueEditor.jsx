import { useEffect, useState, useRef } from "react";

// store
import useAppStore from "src/stores/useAppStore";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";

// forms
import { useForm } from "react-hook-form";
import { TextInput } from "src/components/TextInput";

// services
import gmService from "src/services/GeneralManagerService";
import playerService from "src/services/PlayerService";
import teamService from "src/services/TeamService";

// components
import DebugJson from "src/components/DebugJson";

export default function LeagueEditor() {

  usePageTitle("Edit League");
  const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);
  const appStore = useAppStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
  }

  let gm = gmService.generate();
  let pitcher = playerService.generatePitcher("CL");
  let player = playerService.generatePositionPlayer("C");
  let team = teamService.generateTeam();

  return (
    <>
      <ContentWrapper>
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
                    <td className="px-4 py-2 text-center">{player.hittingGrade}</td>
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
        </div>

      </ContentWrapper>
    </>
  );
}