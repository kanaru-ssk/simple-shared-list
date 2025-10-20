import { Suspense } from "react";
import { DynamicView } from "./dynamic-view";

export default async function Page() {
  return (
    <Suspense>
      <DynamicView />
    </Suspense>
  );
}
