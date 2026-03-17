import { TIP_MODULES } from "@/lib/conversion-tips-data";
import type { ReactNode } from "react";

export async function generateStaticParams() {
  return TIP_MODULES.map((m) => ({ module: m.key }));
}

export default function TipsModuleLayout({ children }: { children: ReactNode }) {
  return children;
}
