import React, { useEffect, useState } from "react";

const ConfettiClassList = [
  "bg-red-500 shadow-red-400",
  "bg-yellow-500 shadow-yellow-400",
  "bg-green-500 shadow-green-400",
  "bg-blue-500 shadow-blue-400",
  "bg-indigo-500 shadow-indigo-400",
  "bg-purple-500 shadow-purple-400",
  "bg-pink-500 shadow-pink-400",
];

const ConfettiComponent = ({ index }: { index: number }) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const duration = Math.random() * 2 + 2;
  const size = Math.floor(8 + Math.random() * 4);
  const delay = index * 100;
  const classname =
    ConfettiClassList[Math.floor(Math.random() * ConfettiClassList.length)];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimate(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  if (!isAnimate) {
    return null;
  }

  return (
    <div
      className={`confetti absolute -z-10 rounded-full shadow-lg ${classname}`}
      style={{
        animationDuration: `${duration}s`,
        left: `${Math.random() * 100}%`,
        height: `${size}px`,
        width: `${size}px`,
      }}
    ></div>
  );
};

const ConfettisComponent = () => {
  const confettis = Array.from({ length: 70 }, (_, index) => (
    <ConfettiComponent key={index} index={index} />
  ));

  return confettis.map((confetti) => confetti);
};

export default ConfettisComponent;
