"use client";
import React, { useEffect, useState } from "react";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";
import { useSession } from "next-auth/react";

const EventMatchMaking = ({ teams }) => {
  const { data: session } = useSession();
  const [storage, setStorage] = useState(null);
  const [manager, setManager] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");

  const isAdmin = session?.user?.is_admin; // Check admin status

  useEffect(() => {
    const initializeTournament = async () => {
      const teamNames = teams.map((team) => team.name);
      if (teamNames.length < 2) {
        console.error("At least two teams are required.");
        return;
      }

      const strg = new InMemoryDatabase();
      const mgr = new BracketsManager(strg);

      await mgr.create.stage({
        tournamentId: 3,
        name: "Cricket Match",
        type: "single_elimination",
        seeding: teamNames,
        settings: { grandFinal: "double" },
      });

      setManager(mgr);
      setStorage(strg);
      updateFixtures(strg);
    };

    initializeTournament();
  }, [teams]);

  const updateFixtures = (storage) => {
    const formattedMatches = storage.data.match.map((match) => ({
      id: match.id,
      team1:
        storage.data.participant.find((p) => p.id === match.opponent1?.id)
          ?.name || "TBD",
      team2:
        storage.data.participant.find((p) => p.id === match.opponent2?.id)
          ?.name || "TBD",
      score1: match.opponent1?.score || "0",
      score2: match.opponent2?.score || "0",
      result: match.opponent1?.result || "TBD",
    }));

    setMatches(formattedMatches);
  };

  const updateMatch = async () => {
    if (
      !manager ||
      !storage ||
      !selectedMatch ||
      score1 === "" ||
      score2 === "" ||
      !isAdmin // Prevent non-admins from updating
    )
      return;

    const matchToUpdate = storage.data.match.find(
      (m) => m.id === selectedMatch
    );
    if (!matchToUpdate) {
      console.error("Match not found");
      return;
    }

    const winner = score1 > score2 ? "win" : score1 < score2 ? "loss" : "draw";

    await manager.update.match({
      id: selectedMatch,
      opponent1: {
        score: parseInt(score1),
        result: winner === "win" ? "win" : winner === "loss" ? "loss" : "draw",
      },
      opponent2: {
        score: parseInt(score2),
        result: winner === "loss" ? "win" : winner === "win" ? "loss" : "draw",
      },
    });

    updateFixtures(storage);
    setScore1("");
    setScore2("");
    setSelectedMatch(null);
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h2 className="text-xl font-bold mb-4">Cricket Tournament Bracket</h2>

      {/* Match Selection */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Match:</label>
        <select
          value={selectedMatch || ""}
          onChange={(e) => setSelectedMatch(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value="" disabled>
            Select a match
          </option>
          {matches.map((match) => (
            <option key={match.id} value={match.id}>
              {match.team1} vs {match.team2}
            </option>
          ))}
        </select>
      </div>

      {/* Admin-Only Score Input */}
      {isAdmin ? (
        selectedMatch && (
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block font-semibold">
                {matches.find((m) => m.id === selectedMatch)?.team1}
              </label>
              <input
                type="number"
                min="0"
                value={score1}
                onChange={(e) => setScore1(e.target.value)}
                className="border px-2 py-1 rounded w-20"
              />
            </div>
            <div>
              <label className="block font-semibold">
                {matches.find((m) => m.id === selectedMatch)?.team2}
              </label>
              <input
                type="number"
                min="0"
                value={score2}
                onChange={(e) => setScore2(e.target.value)}
                className="border px-2 py-1 rounded w-20"
              />
            </div>
          </div>
        )
      ) : (
        <p className="text-red-600 font-bold mt-4">Only admins can update scores.</p>
      )}

      {/* Update Button (Admins Only) */}
      {isAdmin && (
        <button
          onClick={updateMatch}
          className={`bg-black text-white px-4 py-2 rounded-md ${
            !selectedMatch ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!selectedMatch}
        >
          Update Score
        </button>
      )}

      {/* Bracket Structure */}
      <div className="grid grid-cols-2 gap-4 mt-10 mb-10">
        {matches.map((match) => (
          <div
            key={match.id}
            className="border p-4 rounded-lg shadow-md text-center"
          >
            <p className="font-bold">
              {match.team1} vs {match.team2}
            </p>
            <p>
              Score: {match.score1} - {match.score2}
            </p>
            <p>Result: {match.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventMatchMaking;
