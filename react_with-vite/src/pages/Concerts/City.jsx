import { useParams } from "react-router";

export default function City() {
  const { city } = useParams();
  return (
    <div>City: {city}</div>
  );
}