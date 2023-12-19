import { Button, Table, TableFooter } from "@mui/material";
import React from "react";

import { useAdventOfCodeJson } from "../AdventOfCodeContext";
import MemberCard from "./MemberCard";

const Leaderboard: React.FunctionComponent = () => {
  const { members } = useAdventOfCodeJson();
  const [top, setTop] = React.useState(10);

  if (!members.length) {
    return <p>No data found...</p>;
  }

  return (
    <Table>
      {members.slice(0, top).map((member, index) => (
        <MemberCard key={member.id} member={member} rank={index + 1} />
      ))}
      <TableFooter>
        <Button
          onClick={() => setTop((prev) => prev + 10)}
          disabled={top >= members.length}
          sx={{ mt: 1 }}
          color="secondary"
        >
          Show more
        </Button>
      </TableFooter>
    </Table>
  );
};

export default Leaderboard;
