"use client";

import dynamic from "next/dynamic";

const View = dynamic(() => import("./view").then((mod) => mod.View), {
  ssr: false,
});

export function DynamicView() {
  return <View />;
}
