import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { Star, Public } from "@mui/icons-material";
import React from "react";
import { ApiMember } from "../apiType";
import {
  lengthInTimeFromSeconds,
  localTimeFromSeconds,
  membersWithAccumulatedScorePerDayWithRank,
  scoreByDay,
} from "../helpers";
import { useAdventOfCodeJson } from "../useLocalStorage";
import { send } from "process";
import { useGetStatsQuery } from "../api";
import { BarChart } from "@mui/x-charts";
import { get } from "http";

interface IMemberDetailsProps {
  member: ApiMember;
}

const MemberDetails: React.FunctionComponent<IMemberDetailsProps> = ({
  member,
}) => {
  const stars = new Date().getDate() * 2;

  const { leaderboard } = useAdventOfCodeJson();

  if (!leaderboard?.members) return null;

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Star />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${member.stars} av ${stars}`}
          secondary={"Antal stjärnor"}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Public />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={member.global_score}
          secondary={"Global poäng"}
        />
      </ListItem>
      <ListItem>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Dag</TableCell>
                <TableCell>Tid 1 (rank)</TableCell>
                <TableCell>Tid 2 (rank)</TableCell>
                <TableCell>Diff</TableCell>
                <TableCell>Poäng</TableCell>
                <TableCell>Poäng Acc</TableCell>
                <TableCell>Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {member.completion_day_level &&
                Object.keys(member.completion_day_level).map((day) => {
                  const dayData = member.completion_day_level[day];
                  const part1 = dayData["1"];
                  const part2 = dayData["2"];
                  const { firstStarPoints, secondStarPoints } = scoreByDay(
                    leaderboard.members,
                    parseInt(day),
                    member
                  );

                  return (
                    <TableRow key={day}>
                      <TableCell>{day}</TableCell>
                      <TableCell>
                        {part1?.get_star_ts
                          ? localTimeFromSeconds(part1.get_star_ts, day) +
                            ` (${firstStarPoints})`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {part2?.get_star_ts
                          ? localTimeFromSeconds(part2.get_star_ts, day) +
                            ` (${secondStarPoints})`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {part1?.get_star_ts && part2?.get_star_ts
                          ? lengthInTimeFromSeconds(
                              part2.get_star_ts - part1.get_star_ts
                            )
                          : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </ListItem>
      <ListItem>
        <BarChart
          sx={{ width: "100%" }}
          height={300}
          xAxis={[
            {
              scaleType: "band",
              data: member.completion_day_level
                ? Object.keys(member.completion_day_level).map(
                    (day) => "Day " + day
                  )
                : [],
            },
          ]}
          series={[
            {
              label: "1st star",
              data: member.completion_day_level
                ? Object.keys(member.completion_day_level).map(
                    (day) =>
                      scoreByDay(leaderboard.members, parseInt(day), member)
                        .firstStarPoints
                  )
                : [],
            },
            {
              label: "2nd star",
              data: member.completion_day_level
                ? Object.keys(member.completion_day_level).map(
                    (day) =>
                      scoreByDay(leaderboard.members, parseInt(day), member)
                        .secondStarPoints
                  )
                : [],
            },
          ]}
        />
      </ListItem>
    </List>
  );
};

export default MemberDetails;
