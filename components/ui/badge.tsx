import * as React from "react";

interface BadgeProps {
  children: React.ReactNode;
  counter: number;
}

const Badge: React.FC<BadgeProps> = ({ children, counter }) => {
  const badgeCounter = counter > 99 ? "99+" : counter;

  return (
    <div className={"flex items-center gap-2"}>
      {children}
      {counter > 0 && (
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {badgeCounter}
        </span>
      )}
    </div>
  );
};

export { Badge };
