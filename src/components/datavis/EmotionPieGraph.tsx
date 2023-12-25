import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { Emotions } from "../face/constants";

export default function EmotionPieGraph({
  emotionData,
}: {
  emotionData: {
    emotion: Emotions;
    value: number;
  }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        {/* <Pie
        data={data01}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
      /> */}
        <Pie
          data={emotionData}
          dataKey="value"
          nameKey="emotion"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
