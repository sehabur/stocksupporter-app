import React from "react";
import { Box } from "@mui/material";

import Profile from "./Profile";
import PageTitleSetter from "@/components/shared/PageTitleSetter";

// async function getUserById(id: any) {
//   const res = await fetch(
//     `${process.env.BACKEND_URL}/api/users/profile/${id}`,
//     {
//       next: { revalidate: 0 },
//     }
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

export default async function ProfilePage() {
  // const { id } = params;

  // const userDetails = await getUserById(id);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "background.default",
        minHeight: "90vh",
      }}
    >
      <PageTitleSetter pageTitle="Profile" />
      <Box sx={{ maxWidth: "850px", mx: "auto", pt: 2, pb: 4, px: 4 }}>
        <Profile />
      </Box>
    </Box>
  );
}
