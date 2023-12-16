import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import React from "react";

export type ScoreBoardType = { [key: string]: string | number | null };

interface IProps<T extends ScoreBoardType> {
  data: T[];
  headers: { [key in keyof T]: string };
  sort?: (a: T, b: T) => number;
  headerOrder: (keyof T)[];
}

const ScoreTable = <T extends ScoreBoardType>(
  props: React.PropsWithChildren<IProps<T>>
) => {
  const { data, headers, sort, headerOrder } = props;

  sort && data.sort(sort);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {headerOrder.map((key) => (
            <TableCell key={key.toString()}>{headers[key]}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {headerOrder.map((key) => (
              <TableCell key={`row${i}-${key.toString()}`}>
                {row[key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScoreTable;
