import * as constant from "./constant";

export const checkMoveDown = (engine) =>
  engine.checkTimeMovement(constant.moveDownMovement);

export const getMoveDownValue = (engine, store) => {
  const pixelsPerFrame = store
    ? store.pixelsPerFrame
    : engine.pixelsPerFrame.bind(engine);
  const successCount = engine.getVariable(constant.successCount);
  const calHeight = engine.getVariable(constant.blockHeight) * 2;
  if (successCount <= 4) {
    return pixelsPerFrame(calHeight * 1.25);
  }
  return pixelsPerFrame(calHeight);
};

export const getAngleBase = (engine) => {
  const successCount = engine.getVariable(constant.successCount);
  const gameScore = engine.getVariable(constant.gameScore);
  const { hookAngle } = engine.getVariable(constant.gameUserOption);
  if (hookAngle) {
    return hookAngle(successCount, gameScore);
  }
  if (engine.getVariable(constant.hardMode)) {
    return 90;
  }
  switch (true) {
    case successCount < 10:
      return 30;
    case successCount < 20:
      return 60;
    default:
      return 80;
  }
};

export const getSwingBlockVelocity = (engine, time) => {
  const successCount = engine.getVariable(constant.successCount);
  const gameScore = engine.getVariable(constant.gameScore);
  const { hookSpeed } = engine.getVariable(constant.gameUserOption);
  if (hookSpeed) {
    return hookSpeed(successCount, gameScore);
  }
  let hard;
  switch (true) {
    case successCount < 1:
      hard = 0;
      break;
    case successCount < 10:
      hard = 1;
      break;
    case successCount < 20:
      hard = 0.8;
      break;
    case successCount < 30:
      hard = 0.7;
      break;
    default:
      hard = 0.74;
      break;
  }
  if (engine.getVariable(constant.hardMode)) {
    hard = 1.1;
  }
  return Math.sin(time / (200 / hard));
};

export const getLandBlockVelocity = (engine, time) => {
  const successCount = engine.getVariable(constant.successCount);
  const gameScore = engine.getVariable(constant.gameScore);
  const { landBlockSpeed } = engine.getVariable(constant.gameUserOption);
  if (landBlockSpeed) {
    return landBlockSpeed(successCount, gameScore);
  }
  const { width } = engine;

  let hard = 0;
  switch (true) {
    case successCount <= 10:
      hard = 0;
      break;
    case successCount > 10 && successCount <= 20:
      hard = 0.0005;
      break;
    case successCount > 20 && successCount <= 27:
      hard = 0.002;
      break;
    default:
      hard = 0.0035;
      break;
  }
  return Math.cos(time / 200) * hard * width;
};

export const getHookStatus = (engine) => {
  if (engine.checkTimeMovement(constant.hookDownMovement)) {
    return constant.hookDown;
  }
  if (engine.checkTimeMovement(constant.hookUpMovement)) {
    return constant.hookUp;
  }
  return constant.hookNormal;
};

export const touchEventHandler = (engine) => {
  if (!engine.getVariable(constant.gameStartNow)) return;
  if (engine.debug && engine.paused) {
    return;
  }
  if (getHookStatus(engine) !== constant.hookNormal) {
    return;
  }

  const b = engine.getInstance(
    `block_${engine.getVariable(constant.blockCount)}`
  );
  if (b && b.status === constant.swing) {
    engine.setTimeMovement(constant.hookUpMovement, 500);
    b.status = constant.beforeDrop;
  }
};

export const addSuccessCount = (engine) => {
  const { setGameSuccess } = engine.getVariable(constant.gameUserOption);
  const lastSuccessCount = engine.getVariable(constant.successCount);
  const success = lastSuccessCount + 1;
  engine.setVariable(constant.successCount, success);
  if (engine.getVariable(constant.hardMode)) {
    engine.setVariable(
      constant.ropeHeight,
      engine.height * engine.utils.random(0.35, 0.55)
    );
  }
  if (setGameSuccess) setGameSuccess(success);
};

export const addFailedCount = (engine) => {
  const { setGameFailed } = engine.getVariable(constant.gameUserOption);
  const lastFailedCount = engine.getVariable(constant.failedCount);
  const failed = lastFailedCount + 1;
  engine.setVariable(constant.failedCount, failed);
  engine.setVariable(constant.perfectCount, 0);
  if (setGameFailed) setGameFailed(failed);
  if (failed >= 1) {
    engine.pauseAudio("drop-perfect");
    engine.pauseAudio("drop");
    engine.playAudio("rotate");
    engine.setVariable(constant.gameStartNow, false);
  }
};

// isPerfect
export const addScore = (engine, isPerfect) => {
  const { setGameScore, successScore, perfectScore } = engine.getVariable(
    constant.gameUserOption
  );
  const lastGameScore = engine.getVariable(constant.gameScore);
  const perfect = isPerfect ? 1 : 0;

  const score = lastGameScore + 1 + 3 * perfect;
  if (score >= 100) {
    engine.setVariable(constant.gameScore, 100);
  } else {
    engine.setVariable(constant.gameScore, score);
  }
  engine.setVariable(constant.perfectCount, perfect);
  if (setGameScore) setGameScore(score);
};

export const drawString = (engine, option) => {
  const {
    string,
    size,
    x,
    y,
    textAlign,
    fontName = "Montserrat",
    fontWeight = "500",
  } = option;
  const { ctx } = engine;
  const fontSize = size;
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "#f4576d";
  ctx.textAlign = textAlign || "center";
  ctx.font = `${fontWeight} ${fontSize}px ${fontName}`;
  ctx.fillText(string, x, y);
  ctx.restore();
};
