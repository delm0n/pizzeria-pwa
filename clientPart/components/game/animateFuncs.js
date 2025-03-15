import { Instance } from "cooljs";
import { blockAction, blockPainter } from "./block";
import {
  checkMoveDown,
  getMoveDownValue,
  drawString,
  getAngleBase,
} from "./utils";
// import { addFlight } from "./flight";
import * as constant from "./constant";

export const endAnimate = (engine) => {
  const gameStartNow = engine.getVariable(constant.gameStartNow);
  if (!gameStartNow) return;
  const successCount = engine.getVariable(constant.successCount, 0);
  const failedCount = engine.getVariable(constant.failedCount);
  const gameScore = engine.getVariable(constant.gameScore, 0);
  const threeFiguresOffset = Number(successCount) > 99 ? engine.width * 0.1 : 0;

  drawString(engine, {
    string: successCount,
    size: engine.width * 0.12,
    x: engine.width * 0.22 + threeFiguresOffset,
    y: engine.width * 0.3,
    textAlign: "right",
  });
  const score = engine.getImg("score");
  const scoreWidth = score.width;
  const scoreHeight = score.height;
  const zoomedWidth = engine.width * 0.35;
  const zoomedHeight = (scoreHeight * zoomedWidth) / scoreWidth;
  engine.ctx.drawImage(
    score,
    engine.width * 0.61,
    engine.width * 0.038,
    zoomedWidth,
    zoomedHeight
  );
  drawString(engine, {
    string: gameScore,
    size: engine.width * 0.06,
    x: engine.width * 0.9,
    y: engine.width * 0.11,
    textAlign: "right",
  });
};

export const startAnimate = (engine) => {
  const gameStartNow = engine.getVariable(constant.gameStartNow);
  if (!gameStartNow) return;
  const lastBlock = engine.getInstance(
    `block_${engine.getVariable(constant.blockCount)}`
  );
  if (
    !lastBlock ||
    [constant.land, constant.out].indexOf(lastBlock.status) > -1
  ) {
    if (checkMoveDown(engine) && getMoveDownValue(engine)) return;
    if (engine.checkTimeMovement(constant.hookUpMovement)) return;
    const angleBase = getAngleBase(engine);
    const initialAngle =
      (Math.PI *
        engine.utils.random(angleBase, angleBase + 5) *
        engine.utils.randomPositiveNegative()) /
      180;
    engine.setVariable(
      constant.blockCount,
      engine.getVariable(constant.blockCount) + 1
    );
    engine.setVariable(constant.initialAngle, initialAngle);
    engine.setTimeMovement(constant.hookDownMovement, 500);
    const block = new Instance({
      name: `block_${engine.getVariable(constant.blockCount)}`,
      action: blockAction,
      painter: blockPainter,
    });
    engine.addInstance(block);
  }
};
