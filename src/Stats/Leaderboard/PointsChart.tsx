import { LineChart } from "@mui/x-charts";
import {
  lastDayCompleted,
  membersWithAccumulatedScorePerDayWithRank,
} from "../helpers";
import { useAdventOfCodeJson } from "../useLocalStorage";

const PointsChart: React.FC = () => {
  const { leaderboard } = useAdventOfCodeJson();

  const members = leaderboard?.members;

  if (!members) {
    return null;
  }

  const acc = membersWithAccumulatedScorePerDayWithRank(members);
  acc.sort(
    (a, b) =>
      b.accumulatedScores[b.accumulatedScores.length - 1] -
      a.accumulatedScores[a.accumulatedScores.length - 1]
  );

  const top = 10;

  const maxPerDay = Array.from(
    { length: lastDayCompleted(members) },
    (_, i) => (i + 1) * acc.length * 2
  );

  return (
    <LineChart
      width={1000}
      height={1000}
      xAxis={acc.slice(0, top).map(({ accumulatedScores }) => ({
        data: Array.from({ length: accumulatedScores.length }, (_, i) => i + 1),
      }))}
      series={acc.slice(0, top).map(({ accumulatedScores, member }) => ({
        data: accumulatedScores.map((score, i) => score - maxPerDay[i]),
        label: member.name ?? undefined,
      }))}
      tooltip={{
        trigger: "item",
      }}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
    />
  );
};

export default PointsChart;
