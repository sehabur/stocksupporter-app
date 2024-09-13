"use client";
import React from "react";

import SignInComp from "./SignInComp";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "_store";

export default function Main() {
  const dispatch = useDispatch();

  dispatch(pageTitleActions.setPageTitle("Sign in"));

  return (
    <>
      <SignInComp />
    </>
  );
}
