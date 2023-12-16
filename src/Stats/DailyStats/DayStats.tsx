import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import React from "react";
import {
  fastestFirstStar,
  fastestFromFirstStarToSecondsStar,
  fastestSecondStar,
  lengthInTimeFromSeconds,
  localTimeFromSeconds,
  timeFromFirstStarToSecondStar,
} from "../helpers";
import DailyTable from "./DailyTable";

interface IProps {
  day: number;
}

const DayStats: React.FC<IProps> = ({ day }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <Accordion expanded={isExpanded} sx={{ backgroundColor: "#eee" }}>
      <AccordionSummary onClick={handleClick}>
        <Typography variant="h5">Dag {day}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2} direction={{ md: "row" }}>
          <DailyTable
            heading={
              <>
                <Star />
                <StarBorder />
              </>
            }
            day={day}
            sort={fastestFirstStar}
            map={(member, index) => ({
              rank: index + 1,
              name: member.name ?? "???",
              time: localTimeFromSeconds(
                member.completion_day_level[day]?.[1]?.get_star_ts,
                day.toString()
              ),
            })}
            tableHeaderOrder={["rank", "name", "time"]}
            tableHeaders={{ rank: "Rank", name: "Namn", time: "Klocka" }}
          />

          <DailyTable
            heading={
              <>
                <StarBorder />
                <Star />
              </>
            }
            day={day}
            sort={fastestFromFirstStarToSecondsStar}
            map={(member, index) => ({
              rank: index + 1,
              name: member.name ?? "???",
              time:
                lengthInTimeFromSeconds(
                  timeFromFirstStarToSecondStar(day)(member) ?? Number.NaN
                ) ?? "-",
            })}
            tableHeaderOrder={["rank", "name", "time"]}
            tableHeaders={{ rank: "Rank", name: "Namn", time: "Tid" }}
          />
          <DailyTable
            heading={
              <>
                <Star />
                <Star />
              </>
            }
            day={day}
            sort={fastestSecondStar}
            map={(member, index) => ({
              rank: index + 1,
              name: member.name ?? "???",
              time: localTimeFromSeconds(
                member.completion_day_level[day]?.[2]?.get_star_ts,
                day.toString()
              ),
            })}
            tableHeaderOrder={["rank", "name", "time"]}
            tableHeaders={{ rank: "Rank", name: "Namn", time: "Klocka" }}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default DayStats;
