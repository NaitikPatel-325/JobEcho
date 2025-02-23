import { useRef } from "react";
import { Link } from "react-router-dom";
import Crosshair from "../Animation/CrossHair";

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex flex-col justify-center items-center overflow-hidden"
    >
      <Crosshair containerRef={containerRef} color="#ffffff" />

      <Link
        to="/home"
        className="text-white text-xl border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition"
      >
        JobEcho
      </Link>
    </div>
  );
};

export default Landing;
