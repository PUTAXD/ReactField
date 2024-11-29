import React, { Component, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

const LapanganConfig = {
  width: 1016,
  height: 716,
  scale: {
    x: 1,
    y: 1,
  },
};
const LapanganImage = ({ image, config }) => {
  const [img] = useImage(image);
  return (
    <Image
      image={img}
      width={config.width}
      height={config.height}
      scale={config.scale}
    />
  );
};

const RobotImage = ({ image, config }) => {
  const [img] = useImage(image);
  return <Image image={img} x={config.x} y={config.y} offset={config.offset} />;
};

const App = () => {
  const [robotState, setRobotState] = useState({
    y: 58,
    x: 58,
    offset: {
      x: 40,
      y: 40,
    },
  });

  useEffect(() => {
    var anim = new Konva.Animation(function (frame) {
      setRobotState({
        ...robotState,
        y: (robotState.y += 1),
      });
    });

    anim.start(); // Mulai animasi
    const keyDownHandler = (event) => {
      const key = event.key.toLowerCase();

      switch (key) {
        case "w":
          setRobotState({
            ...robotState,
            y: (robotState.y -= 5),
          });
          break;
        case "a":
          setRobotState({
            ...robotState,
            x: (robotState.x -= 5),
          });
          break;
        case "s":
          setRobotState({
            ...robotState,
            y: (robotState.y += 5),
          });
          break;
        case "d":
          setRobotState({
            ...robotState,
            x: (robotState.x += 5),
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keypress", keyDownHandler);

    return () => {
      anim.stop();
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  return (
    <div className="w-100 ">
      <Stage width={1016} height={716} className="border border-primary">
        <Layer>
          <LapanganImage image="/Lapangan.png" config={LapanganConfig} />
          {/* <RobotImage image={"/Model_Robot/blue.png"} config={RobotConfig} /> */}
          <RobotImage image={"/Model_Robot/blue.png"} config={robotState} />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
