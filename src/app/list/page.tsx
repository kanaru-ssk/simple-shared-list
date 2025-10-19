import { Suspense } from "react";
import { View } from "./view";

export default async function Page() {
  return (
    <Suspense>
      <View />
    </Suspense>
  );
}
