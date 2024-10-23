import { Box } from "@mui/material";
import IndexDetails from "./IndexDetails";

// export async function generateStaticParams() {
//   return ["00DSEX", "00DSES", "00DS30"].map((item: any) => ({
//     tradingCode: item,
//   }));
// }

export default async function Page() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <IndexDetails />
    </Box>
  );
}
