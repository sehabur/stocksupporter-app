"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

export default async function Dashboard() {
  const searchParams = useSearchParams();

  const redirect: any = searchParams.get("redirect");

  const router = useRouter();

  router.push(decodeURIComponent(redirect));

  return <></>;
}
