import React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
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
    <Accordion expanded={isExpanded} TransitionProps={{ mountOnEnter: true }}>
      <AccordionSummary onClick={handleClick}>
        <Typography sx={{ width: "30%", flexShrink: 0 }}>
          {`${rank}. `}
          {member.name}
        </Typography>
        <Typography
          sx={{ color: "text.secondary", width: "20%", flexShrink: 0 }}
        >
          {member.localScore}
        </Typography>
        <Stack direction="row" spacing={0} alignItems="center" flexWrap="wrap">
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
      </AccordionSummary>
      <AccordionDetails>
        <MemberDetails member={member} />
      </AccordionDetails>
    </Accordion>
  );
};

export default MemberCard;
