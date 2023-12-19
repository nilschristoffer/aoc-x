import React from "react";

import {
  Collapse,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import MemberDetails from "./MemberDetails";
import { Star } from "@mui/icons-material";
import { Member } from "../AdventOfCodeContext";

interface IMemberCardProps {
  member: Member;
  rank: number;
}

const MemberCard: React.FunctionComponent<IMemberCardProps> = ({
  member,
  rank,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const secondStarDays = Object.entries(member.dailyResults).map(([key, val]) =>
    val.part2.time ? Number(key) : null
  );

  const firstStarDays = Object.entries(member.dailyResults).map(([key, val]) =>
    val.part1.time && !val.part2.time ? Number(key) : null
  );

  return (
    <>
      <TableRow
        onClick={handleClick}
        sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}
      >
        <TableCell>
          <Typography>
            {`${rank}. `}
            {member.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ color: "text.secondary" }}>
            {member.localScore}
          </Typography>
        </TableCell>
        <TableCell>
          <Stack
            direction="row"
            spacing={0}
            alignItems="center"
            flexWrap="wrap"
          >
            {Array.from({ length: 25 }, (_, i) => i + 1).map((day) => (
              <Tooltip key={day} title={`Day ${day}`}>
                {secondStarDays.includes(day) ? (
                  <Star fontSize="small" color="primary" />
                ) : firstStarDays.includes(day) ? (
                  <Star fontSize="small" color="inherit" />
                ) : (
                  <Star fontSize="small" color="disabled" />
                )}
              </Tooltip>
            ))}
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} sx={{ pt: 0, pb: isExpanded ? 2 : 0 }}>
          <Collapse in={isExpanded} timeout="auto" mountOnEnter unmountOnExit>
            <MemberDetails member={member} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default MemberCard;
