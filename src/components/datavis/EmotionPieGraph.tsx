import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { Emotions } from "../face/constants";
import { emotionColorMap } from "../constants";
import "./emotion-pie-graph.scss";

export default function EmotionPieGraph({
  emotionData,
}: {
  emotionData: {
    emotion: Emotions;
    value: number | null;
  }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={emotionData}
          dataKey="value"
          nameKey="emotion"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={100}
          fill="#82ca9d"
          label
          animationDuration={500}
        >
          {emotionData.map(({ emotion }) => (
            <Cell
              key={emotion}
              className={`emotion-pie-slice ${emotionColorMap[emotion]}`}
              style={{
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
