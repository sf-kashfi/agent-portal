import { Box, Card, CardContent } from "@mui/material";

function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "35%",
          bgcolor: "#017785",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          pt: "20%",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 380,
            borderRadius: 3,
            boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent sx={{ p: 3 }}>{children}</CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default AuthLayout;
