import * as React from "react";

import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode;
  content: string | number;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, content, className }) => {
  return (
    <div className={"flex items-center gap-2"}>
      {children}
      {content  && (
        <span className={cn("inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full", className)}>
          {content}
        </span>
      )}
    </div>
  );
};

export { Badge };
