"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationEvent() {
  const pathname = usePathname();

  // const searchParams = useSearchParams();
  // const scrollY = searchParams.get("scrollY");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <></>;
}
