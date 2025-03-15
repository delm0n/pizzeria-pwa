import { Engine, Instance } from "cooljs";
import { touchEventHandler } from "./utils";
import { background } from "./background";
import { lineAction, linePainter } from "./line";
import { hookAction, hookPainter } from "./hook";
import { startAnimate, endAnimate } from "./animateFuncs";
import * as constant from "./constant";

export const TowerGame = (option = {}) => {
  const { width, height, canvasId, soundOn } = option;
  const game = new Engine({
    canvasId,
    highResolution: true,
    width,
    height,
    soundOn,
  });
  const pathGenerator = (path) => `./images/game/${path}`;

  game.addImg("background", pathGenerator("background.png"));
  game.addImg("hook", pathGenerator("hook.png"));
  game.addImg("blockRope", pathGenerator("block-rope.png"));
  game.addImg("block", pathGenerator("block.png"));
  game.addImg("block-perfect", pathGenerator("block-perfect.png"));
  game.addLayer(constant.flightLayer);

  game.swapLayer(0, 1);
  game.addImg("score", pathGenerator("score.png"));

  game.addAudio("drop-perfect", pathGenerator("drop-perfect.mp3"));
  game.addAudio("drop", pathGenerator("drop.mp3"));
  game.addAudio("game-over", pathGenerator("game-over.mp3"));
  game.addAudio("rotate", pathGenerator("rotate.mp3"));

  game.setVariable(constant.blockWidth, game.width * 0.3);
  game.setVariable(constant.blockHeight, 40); // высота блока

  game.setVariable(constant.ropeHeight, game.height * 0.2); // скорость раскачки
  game.setVariable(constant.blockCount, 0);
  game.setVariable(constant.successCount, 0);
  game.setVariable(constant.failedCount, 0);
  game.setVariable(constant.gameScore, 0);
  game.setVariable(constant.hardMode, false);
  game.setVariable(constant.gameUserOption, option);

  const line = new Instance({
    name: "line",
    action: lineAction,
    painter: linePainter,
  });
  game.addInstance(line);
  const hook = new Instance({
    name: "hook",
    action: hookAction,
    painter: hookPainter,
  });
  game.addInstance(hook);

  game.startAnimate = startAnimate;
  game.endAnimate = endAnimate;
  game.paintUnderInstance = background;
  game.addKeyDownListener("enter", () => {
    if (game.debug) game.togglePaused();
  });
  game.touchStartListener = (event) => {
    const clickedElement = event.target;
    if (clickedElement.id === "game") {
      touchEventHandler(game);
    }
  };

  game.start = () => {
    game.setTimeMovement(constant.bgInitMovement, 500);
    game.setVariable(constant.gameStartNow, true);
  };

  return game;
};
