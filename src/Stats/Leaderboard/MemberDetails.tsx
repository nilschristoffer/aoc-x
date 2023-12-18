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
import { Star, Public, StarOutline } from "@mui/icons-material";
import React from "react";
import { lengthInTimeFromSeconds, localTimeFromSeconds } from "../helpers";
import { Member } from "../AdventOfCodeContext";

import { BarChart } from "@mui/x-charts";

interface IMemberDetailsProps {
  member: Member;
}

const MemberDetails: React.FunctionComponent<IMemberDetailsProps> = ({
  member,
}) => {
  const stars = new Date().getDate() * 2;

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
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
          <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
            <Public />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={member.globalScore} secondary={"Global poäng"} />
      </ListItem>
      <ListItem>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Dag</TableCell>
                <TableCell>
                  <Star color="primary" />
                  <StarOutline color="primary" />
                </TableCell>
                <TableCell>
                  <StarOutline color="primary" />
                  <Star color="primary" />
                </TableCell>
                <TableCell>
                  <Star color="primary" />
                  <Star color="primary" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {member.dailyResults &&
                Object.keys(member.dailyResults).map((day) => {
                  const { part1, part2, diff, releaseDate } =
                    member.dailyResults[Number(day)];

                  return (
                    <TableRow key={day}>
                      <TableCell>{day}</TableCell>
                      <TableCell>
                        {part1?.time
                          ? localTimeFromSeconds(part1.time, releaseDate) +
                            ` (${part1.score}p, ${part1.rank})`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {diff.time ? lengthInTimeFromSeconds(diff.time) : "-"}
                      </TableCell>
                      <TableCell>
                        {part2?.time
                          ? localTimeFromSeconds(part2.time, releaseDate) +
                            ` (${part2.score}p, ${part2.rank})`
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
              data: member.dailyResults
                ? Object.keys(member.dailyResults).map((day) => "Day " + day)
                : [],
            },
          ]}
          series={[
            {
              label: "1st star",
              data: member.dailyResults
                ? Object.keys(member.dailyResults).map(
                    (day) => member.dailyResults[Number(day)]?.part1?.score ?? 0
                  )
                : [],
            },
            {
              label: "2nd star",
              data: member.dailyResults
                ? Object.keys(member.dailyResults).map(
                    (day) => member.dailyResults[Number(day)]?.part2?.score ?? 0
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
