import { Composition, registerRoot } from "remotion";
import { Excelr8 } from "./compositions/Excelr8";
import { Zippit } from "./compositions/Zippit";

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Excelr8"
        component={Excelr8}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
        props={{}}
      />
      <Composition
        id="Zippit"
        component={Zippit}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
        props={{}}
      />
    </>
  );
};

registerRoot(RemotionRoot);
