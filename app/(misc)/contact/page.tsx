import PageTitleSetter from "@/components/shared/PageTitleSetter";
import { Box, Typography } from "@mui/material";
import Contact from "./Contact";

export default async function FaqPage() {
  return (
    <Box
      component="main"
      sx={{ bgcolor: "background.default", height: "90vh" }}
    >
      <PageTitleSetter pageTitle="Contact" />
      <Contact />
    </Box>
  );
}
