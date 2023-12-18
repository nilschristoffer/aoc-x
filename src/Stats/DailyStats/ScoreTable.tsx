import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { PartScore } from "../AdventOfCodeContext";

interface IProps {
  data: PartScore[];
  timeConverter?: (time_ts: number) => string;
}

const ScoreTable = ({ data, timeConverter = (t) => t.toString() }: IProps) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={row.member.id} sx={{ width: "100%" }}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{row.member.name}</TableCell>
            <TableCell>{timeConverter(row.time_ts)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScoreTable;
