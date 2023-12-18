import { Stack, Button } from "@mui/material";
import React from "react";

import { useAdventOfCodeJson } from "../AdventOfCodeContext";
import MemberCard from "./MemberCard";

const Leaderboard: React.FunctionComponent = () => {
  const { members } = useAdventOfCodeJson();
  const [top, setTop] = React.useState(10);

  if (!members.length) {
    return <p>Kan inte ladda leaderboard</p>;
  }

  return (
    <Stack spacing={0}>
      {members.slice(0, top).map((member, index) => (
        <MemberCard key={member.id} member={member} rank={index + 1} />
      ))}
      <Button
        onClick={() => setTop((prev) => prev + 10)}
        disabled={top >= members.length}
        sx={{ mt: 1 }}
      >
        Visa fler
      </Button>
    </Stack>
  );
};

export default Leaderboard;
