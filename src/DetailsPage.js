import { useLocation } from "react-router-dom";

function DetailsPage() {
  const { state } = useLocation();

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Submitted Form Details</h2>
      <pre style={{
        background: "#f0f0f0",
        padding: 15,
        borderRadius: 5
      }}>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
}
export default DetailsPage;
