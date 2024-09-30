"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";

export default function Home({ pageTitle }: any) {
  const dispatch = useDispatch();
  dispatch(pageTitleActions.setPageTitle(pageTitle));
  return <></>;
}
