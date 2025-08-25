import React from "react";
import { clsx } from "clsx";

type Props = { color: string; className?: string };

export default function ColorDot({ color, className }: Props) {
  const bg = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
  }[color as keyof typeof color] || "bg-slate-400";
  return <span className={clsx("inline-block h-3 w-3 rounded-full", bg, className)} />;
}
