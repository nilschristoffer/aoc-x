import React from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { ApiMember } from "../apiType";
import MemberDetails from "./MemberDetails";

interface IMemberCardProps {
  member: ApiMember;
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

  return (
    <Accordion expanded={isExpanded} TransitionProps={{ mountOnEnter: true }}>
      <AccordionSummary onClick={handleClick}>
        <Typography sx={{ width: "30%", flexShrink: 0 }}>
          {`${rank}. `}
          {member.name ?? "???"}
        </Typography>
        <Typography
          sx={{ color: "text.secondary", width: "20%", flexShrink: 0 }}
        >
          {member.local_score}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MemberDetails member={member} />
      </AccordionDetails>
    </Accordion>
  );
};

export default MemberCard;
