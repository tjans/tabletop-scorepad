import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";


// store
import useAppStore from "src/stores/useAppStore";

// foundation
import usePageTitle from 'src/hooks/usePageTitle'
import ContentWrapper from "src/components/ContentWrapper";

// services
import leagueService from "src/services/LeagueService";
import leagueFacade from "src/facades/LeagueFacade";
import { use } from "react";

export default function TeamList() {

    usePageTitle("Team List");
    const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);
    const [league, setLeague] = useState(null);
    const [teams, setTeams] = useState([]);
    const { leagueId } = useParams();

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const league = await leagueService.getLeague(leagueId);

        if (league) {
            setLeague(league);

            const teams = await leagueFacade.getCurrentTeams(league.currentSeason.seasonId);
            setTeams(teams)
        }
    }

    return (
        <>
            <ContentWrapper>
                <table className="text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">

                        <tr>
                            <th className="px-4 py-2 text-start">City</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">General Manager</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {teams && teams.length > 0 && teams.map((team) => {

                            return (

                                <tr key={team.seasonTeamId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {team.parent.city}
                                    </td>
                                    <td className="px-4 py-2">
                                        {team.parent.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {team.gm?.firstName} {team.gm?.lastName}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="px-3 py-1 text-xs font-bold text-white uppercase bg-blue-500 rounded-full hover:bg-blue-700">
                                            EDIT
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </ContentWrapper>
        </>
    );
}