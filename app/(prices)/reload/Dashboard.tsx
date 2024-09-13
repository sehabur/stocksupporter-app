"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const redirect: any = searchParams.get("redirect");

  const router = useRouter();
  router.push(decodeURIComponent(redirect));

  return <></>;
}
