import { LineChart } from "@mui/x-charts";
import { useAdventOfCodeJson } from "../AdventOfCodeContext";

interface RankChartProps {
  memberIds: { id: number; name?: string }[];
}

const RankChart: React.FC<RankChartProps> = ({ memberIds }) => {
  const { accumulativeScoreAndRankPerMember } = useAdventOfCodeJson();
  const accScoreAndRanks = memberIds.map(
    (m) => accumulativeScoreAndRankPerMember[m.id]
  );
  accScoreAndRanks.forEach((member) => {
    member.sort((a, b) => a.day - b.day);
  });

  const xAxis = accScoreAndRanks.map((m) => m.map((d) => d.day));
  const yAxis = accScoreAndRanks.map((m) => m.map((d) => -d.rank));

  return (
    <LineChart
      title="Rank"
      sx={{ width: "100%" }}
      height={500}
      xAxis={xAxis.map((data) => ({
        data,
        label: "Day",
        min: 1,
        max: data.length,
        tickMinStep: 1,
        tickMaxStep: 1,
        tickInterval: (v) => v > 0 && v % 1 === 0,
        tickLabelInterval: (v) => v > 0 && v % 1 === 0,
        valueFormatter: (v) => v.toString(),
      }))}
      series={yAxis.map((data, i) => ({
        data,
        valueFormatter: (v) => Math.abs(v).toString(),
        label: memberIds[i].name,
        showMarkers: true,
      }))}
      yAxis={[
        {
          max: -1,
          label: "Rank",
          tickLabelInterval: (v) => v > 0 && v % 1 === 0,
          tickInterval: (v) => v > 0 && v % 1 === 0,
          tickMinStep: 1,
          tickMaxStep: 1,
          valueFormatter: (v) => Math.abs(v).toString(),
        },
      ]}
    />
  );
};

export default RankChart;
