"use client";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { faqItems } from "@/data/info";

export default function FAQ() {
  return (
    <Container
      id="faq"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {faqItems.map((item: any, index: number) => (
          <Box key={index} sx={{ mb: 1.5 }}>
            <Accordion elevation={2}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1d-content"
                id="panel1d-header"
                sx={{ fontSize: ".9rem" }}
              >
                {item.ques}
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: "1rem" }}>
                {item.ans}
              </AccordionDetails>
            </Accordion>
            {/* <Divider variant="middle" /> */}
          </Box>
        ))}
      </Box>
    </Container>
  );
}
