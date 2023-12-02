export default function TextCounter({
  text,
  limit,
}: {
  text: string;
  limit: number;
}) {
  return (
    <div className={`counter ${text.length >= limit ? "over" : ""}`}>
      <p>
        {text.length}/{limit}
      </p>
    </div>
  );
}
