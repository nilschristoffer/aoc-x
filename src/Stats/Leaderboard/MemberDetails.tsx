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
import {
  getOrderSuffix,
  lengthInTimeFromSeconds,
  localTimeFromSeconds,
} from "../helpers";
import { Member } from "../AdventOfCodeContext";

import { BarChart } from "@mui/x-charts";

interface IMemberDetailsProps {
  member: Member;
}

const MemberDetails: React.FunctionComponent<IMemberDetailsProps> = ({
  member,
}) => {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
            <Star />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={member.stars} secondary={"Stars collected"} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: (t) => t.palette.primary.main }}>
            <Public />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={member.globalScore} secondary={"Global score"} />
      </ListItem>
      <ListItem>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
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
                      <TableCell
                        sx={{
                          color:
                            part1?.rank === 1
                              ? "primary.main"
                              : part1.time
                              ? "inherit"
                              : "text.disabled",
                          textShadow: part1?.rank === 1 ? "0 0 5px" : "",
                        }}
                      >
                        {part1?.time
                          ? `${localTimeFromSeconds(
                              part1.time,
                              releaseDate
                            )} | ${
                              part1.rank ? getOrderSuffix(part1.rank) : ""
                            }`
                          : "Not completed"}
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            diff?.rank === 1
                              ? "primary.main"
                              : diff.time
                              ? "inherit"
                              : "text.disabled",
                          textShadow: diff?.rank === 1 ? "0 0 5px" : "",
                        }}
                      >
                        {diff.time
                          ? `${lengthInTimeFromSeconds(diff.time)} | ${
                              diff.rank ? getOrderSuffix(diff.rank) : ""
                            }`
                          : "Not completed"}
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            part2?.rank === 1
                              ? "primary.main"
                              : part2.time
                              ? "inherit"
                              : "text.disabled",
                          textShadow: part2?.rank === 1 ? "0 0 5px" : "",
                        }}
                      >
                        {part2?.time
                          ? `${localTimeFromSeconds(
                              part2.time,
                              releaseDate
                            )} | ${
                              part2.rank ? getOrderSuffix(part2.rank) : ""
                            }`
                          : "Not completed"}
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
