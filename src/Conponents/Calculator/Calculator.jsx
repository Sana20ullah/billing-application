import React, { useState, useEffect, useRef } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const calculatorRef = useRef(null);
  const [position, setPosition] = useState({ x: 200, y: 100 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      if (/[0-9+\-*/%.]/.test(key)) {
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        try {
          const evalResult = eval(input); // eslint-disable-line
          setResult(evalResult);
        } catch {
          setResult("Error");
        }
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key.toLowerCase() === "c" || key === "Delete") {
        setInput("");
        setResult("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "←") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        const evalResult = eval(input); // eslint-disable-line
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "C", "←", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=", " "
  ];

  return (
    <div
      ref={calculatorRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
        cursor: "move",
      }}
      className="bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c] p-5 rounded-3xl shadow-[0_0_40px_#a855f7] border border-purple-500"
    >
      <div className="w-80 bg-black bg-opacity-40 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border-2 border-fuchsia-500 text-white">
        {/* Display */}
        <div className="mb-5">
          <div className="rounded-xl p-4 bg-black bg-opacity-30 backdrop-blur-sm shadow-inner border border-purple-400 mb-2">
            <div className="text-right text-sm text-fuchsia-200 tracking-wide h-5 truncate opacity-80">
              {input || "0"}
            </div>
            <div className="text-right text-4xl font-extrabold text-green-300 h-10 truncate drop-shadow-[0_0_6px_#22c55e]">
              {result}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, i) => {
            if (btn === " ") return <div key={i} />;

            let style =
              "bg-gradient-to-br from-gray-100 via-gray-200 to-white text-black shadow-md border border-gray-300";

            if (btn === "=") {
              style =
                "col-span-2 bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 text-white text-xl font-bold shadow-lg border border-lime-400";
            } else if (btn === "C") {
              style =
                "bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white shadow-lg border border-rose-400";
            } else if (btn === "←") {
              style =
                "bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 text-black font-bold shadow-md border border-orange-400";
            } else if (["+", "-", "*", "/", "%"].includes(btn)) {
              style =
                "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 text-white shadow-lg border border-indigo-400";
            }

            return (
              <button
                key={i}
                onClick={() => handleClick(btn)}
                className={`rounded-xl py-3 text-lg font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 ${style}`}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
