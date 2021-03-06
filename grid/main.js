'use strict';

var O = require('../framework');
var media = require('../media');
var {Canvas} = require('../media/node_modules/canvas');
var browser = require('../browser');
var logStatus = require('../log-status');

var w = 1920;
var h = 1080;
var fps = 60;
var hd = true;
var duration = 10;
var framesNum = fps * duration;

var url = '/?project=grid';

setTimeout(main);

function main(){
  var window = new browser.Window(w, h, url);

  window.on('_ready', () => {
    render(window);
  });
}

function render(window){
  var canvas = window._canvases[0];

  media.renderVideo('-vid/1.mp4', w, h, fps, hd, (w, h, g, f) => {
    logStatus(f, framesNum);

    g.drawImage(canvas, 0, 0);

    var t = (f - 1) % (fps * 3) + 1;

    if(t <= 179){
      if(Math.random() > .1){
        window.emit('mousedown', {button: [0, 2][O.rand(2)], clientX: Math.random() * w, clientY: Math.random() * h});
      }else{
        window.emit('mousemove', {clientX: Math.random() * w, clientY: Math.random() * h});
        window.emit('keydown', {code: `Key${'WBX'[O.rand(3)]}`});
      }
    }else{
      window.emit('keydown', {code: 'Enter'});
    }

    return f != framesNum;
  });
}