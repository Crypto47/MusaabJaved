import { Composition, Folder, registerRoot } from "remotion";
import { EquityPulse } from "./compositions/EquityPulse";
import { DossierBotFilm } from "./compositions/DossierBotFilm";
import { EquityPulseFilm } from "./compositions/EquityPulseFilm";
import { Excelr8 } from "./compositions/Excelr8";
import { Excelr8Film } from "./compositions/Excelr8Film";
import {
  FLOW_CANVAS_TEST_DURATION,
  FLOW_CANVAS_TEST_FPS,
  FLOW_CANVAS_TEST_HEIGHT,
  FLOW_CANVAS_TEST_WIDTH,
  FlowCanvasTest,
} from "./compositions/FlowCanvasTest";
import { Zippit } from "./compositions/Zippit";
import { ZippitFilm } from "./compositions/ZippitFilm";
import { FILM_DURATION, FILM_FPS, FILM_HEIGHT, FILM_WIDTH } from "./film/CaseStudyFilm";

const RemotionRoot = () => {
  return (
    <>
      {/* Case-study films: real n8n workflows, one composition per project. */}
      <Folder name="Films">
        <Composition
          id="EquityPulseFilm"
          component={EquityPulseFilm}
          durationInFrames={FILM_DURATION}
          fps={FILM_FPS}
          width={FILM_WIDTH}
          height={FILM_HEIGHT}
        />
        <Composition
          id="Excelr8Film"
          component={Excelr8Film}
          durationInFrames={FILM_DURATION}
          fps={FILM_FPS}
          width={FILM_WIDTH}
          height={FILM_HEIGHT}
        />
        <Composition
          id="ZippitFilm"
          component={ZippitFilm}
          durationInFrames={FILM_DURATION}
          fps={FILM_FPS}
          width={FILM_WIDTH}
          height={FILM_HEIGHT}
        />
        <Composition
          id="DossierBotFilm"
          component={DossierBotFilm}
          durationInFrames={FILM_DURATION}
          fps={FILM_FPS}
          width={FILM_WIDTH}
          height={FILM_HEIGHT}
        />
      </Folder>

      {/* The original typographic videos, superseded by the films above but
          kept so the old renders stay reproducible. EquityPulse was registered
          at 840 frames while its Series summed to 930, which silently cut 3s
          off its outro; corrected to 930. */}
      <Folder name="Legacy">
        <Composition
          id="Excelr8"
          component={Excelr8}
          durationInFrames={930}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Zippit"
          component={Zippit}
          durationInFrames={930}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EquityPulse"
          component={EquityPulse}
          durationInFrames={930}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Scratch">
        <Composition
          id="FlowCanvasTest"
          component={FlowCanvasTest}
          durationInFrames={FLOW_CANVAS_TEST_DURATION}
          fps={FLOW_CANVAS_TEST_FPS}
          width={FLOW_CANVAS_TEST_WIDTH}
          height={FLOW_CANVAS_TEST_HEIGHT}
        />
      </Folder>
    </>
  );
};

registerRoot(RemotionRoot);
