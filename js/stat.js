'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var FONT_GAP = 20;
var GAP = 50;
var BAR_WIDTH = 40;
var maxBarHeight = 150; // max height
var myBarColor = 'rgba(255, 0, 0, 1)';

function getRandomColor(min, max) {
  return 'hsl(240,' + (Math.floor(Math.random() * (max - min + 1)) + min) + '%, 40%)';
}

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = 'PT Mono 16px';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, 'Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);
  renderText(ctx, 'Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 3);

  var maxTime = getMaxElement(times);


  for (var i = 0; i < names.length; i++) {
    var barHeight = (maxBarHeight * times[i]) / maxTime;
    renderText(ctx, Math.floor(times[i]), CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - barHeight - FONT_GAP - 10);
    if (names[i] === 'Вы') {
      ctx.fillStyle = myBarColor;
    } else {
      ctx.fillStyle = getRandomColor(0, 100);
    }
    ctx.fillRect(CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP, BAR_WIDTH, -barHeight);
    renderText(ctx, names[i], CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT);
  }
};
