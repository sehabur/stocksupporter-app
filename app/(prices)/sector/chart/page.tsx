import { Box } from "@mui/material";
import Dashboard from "./Dashboard";

// import { sectorList } from "@/data/dse";

// export async function generateStaticParams() {
//   return sectorList.map((item: any) => ({
//     sector: item.tag,
//   }));
// }

export default async function Sector() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "100vh" }}
    >
      <Dashboard />
    </Box>
  );
}
