import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Icons } from "./icons";
import { Circle } from "./circle";

export function CircularNetwork({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBeams, setShowBeams] = useState(false);
  const [showNodes, setShowNodes] = useState(false);

  const nodeRefs = {
    openai: useRef<HTMLDivElement>(null),
    drive: useRef<HTMLDivElement>(null),
    docs: useRef<HTMLDivElement>(null),
    whatsapp: useRef<HTMLDivElement>(null),
    messenger: useRef<HTMLDivElement>(null),
    notion: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const nodesTimer = setTimeout(() => setShowNodes(true), 10);
    const beamsTimer = setTimeout(() => setShowBeams(true), 10);

    return () => {
      clearTimeout(nodesTimer);
      clearTimeout(beamsTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-[800px] w-full items-center justify-center overflow-hidden p-10",
        className
      )}
      ref={containerRef}
    >
      <div className="transform rotate-90 origin-center w-full h-full">
        <div className="flex flex-col items-center gap-16">
          {[
            { key: 'openai', icon: <Icons.openai />, delay: 100, ref: nodeRefs.openai },
            { key: 'drive', icon: <Icons.googleDrive />, delay: 200, ref: nodeRefs.drive },
            { key: 'docs', icon: <Icons.googleDocs />, delay: 300, ref: nodeRefs.docs },
            { key: 'whatsapp', icon: <Icons.whatsapp />, delay: 400, ref: nodeRefs.whatsapp },
            { key: 'messenger', icon: <Icons.messenger />, delay: 500, ref: nodeRefs.messenger },
            { key: 'notion', icon: <Icons.notion />, delay: 600, ref: nodeRefs.notion },
          ].map((node, index) => (
            <React.Fragment key={node.key}>
              <Circle
                ref={node.ref}
                className={cn(
                  index === 0 ? "size-16" : "size-12",
                  "opacity-0",
                  showNodes && "animate-fade-in",
                  showNodes && `animation-delay-${node.delay}`
                )}
              >
                {node.icon}
              </Circle>
              {showBeams && index > 0 && (
                <AnimatedBeam
                  containerRef={containerRef}
                  fromRef={nodeRefs.openai}
                  toRef={node.ref}
                  duration={1.5}
                  delay={(index - 1) * 0.2}
                  startXOffset={0} // Adjust as needed
                  endXOffset={0} // Adjust as needed
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}