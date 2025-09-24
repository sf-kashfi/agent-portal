import { Typography } from "@mui/material";
import useOrientation from "../hooks/useOrientation";

function LandScape({ children }) {
  const isPortrait = useOrientation();

  if (!isPortrait) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          background: "#111",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Typography>
          برای استفاده از اپلیکیشن گوشی خود را عمودی بگیرید
        </Typography>
      </div>
    );
  }

  return children;
}

export default LandScape;
