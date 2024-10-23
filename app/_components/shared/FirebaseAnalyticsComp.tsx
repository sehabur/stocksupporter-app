// "use client";
// import React from "react";

// import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
// import { usePathname } from "next/navigation";
// import { Capacitor } from "@capacitor/core";

// export default function FirebaseAnalyticsComp() {
//   const pathname = usePathname();

//   React.useEffect(() => {
//     if (Capacitor.getPlatform() === "web") {
//       FirebaseAnalytics.initializeFirebase({

//       });

//       FirebaseAnalytics.logEvent({
//         name: "page_view",
//         params: {
//           path: pathname,
//           platform: "app",
//         },
//       });
//     }
//   }, [pathname]);

//   return <></>;
// }
