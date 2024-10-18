import { Box } from "@mui/material";
import Dashboard from "./Dashboard";

// import { sectorList } from "@/data/dse";

// export async function generateStaticParams() {
//   return sectorList.map((item: any) => ({
//     sector: item.tag,
//   }));
// }

export default async function Sector({ searchParams }: any) {
  const { sector } = searchParams;

  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", minHeight: "100vh" }}
    >
      <Dashboard sectorTag={sector} />
    </Box>
  );
}
