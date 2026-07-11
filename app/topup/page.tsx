import { Suspense } from "react";
import TopUpContent from "./TopUpContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <TopUpContent />
    </Suspense>
  );
}