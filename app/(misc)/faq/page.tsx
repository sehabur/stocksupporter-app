import { Box, Typography } from "@mui/material";
import FAQ from "./FAQ";
import PageTitleSetter from "@/components/shared/PageTitleSetter";

export default async function FaqPage() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", height: "90vh" }}
    >
      <PageTitleSetter pageTitle="FAQ" />
      <Box sx={{ pt: 2 }}>
        <FAQ />
      </Box>
    </Box>
  );
}
