import React from "react";

export function Avatar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-10 h-10 overflow-hidden rounded-full bg-black ${className}`}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover rounded-full bg-black"
    />
  );
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black  rounded-full">
      {children}
    </div>
  );
}
