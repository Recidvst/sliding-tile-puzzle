// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/app.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// id generator
function guidGenerator() {
  var S4 = function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  };

  return S4() + S4();
} // random shufflers


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
}

function shuffleItems(list) {
  for (var i = list.children.length; i >= 0; i--) {
    list.appendChild(list.children[Math.random() * i | 0]);
  }
} // reset grid


function resetGrid(oldTiles, list) {
  var ul = list;

  for (var i = 0; i <= ul.children.length - 1; i++) {
    var item = oldTiles[i];
    item.classList.remove('open');
    ul.appendChild(item);
  }
} // set open tile


function setOpenTile(tiles) {
  var rand = Math.floor(Math.random() * tiles.length);
  tiles[rand].classList.add('open');
} // set background positions


function setImagePositions(tiles) {
  var container = tiles[0].parentElement; // tile-container

  tiles.forEach(function (tile) {
    // set image size
    tile.style.backgroundSize = "".concat(container.offsetWidth, "px ").concat(container.offsetHeight, "px"); // 		set image position

    tile.style.backgroundPosition = "-".concat(tile.offsetLeft, "px -").concat(tile.offsetTop, "px");
  });
} // setting memory


function setMemory(tiles) {
  var memObj = {};
  tiles.forEach(function (tile, index) {
    memObj[tile.getAttribute('id')] = {
      'index': index,
      'id': tile.getAttribute('id')
    };
  });
  return memObj; // returns memory object
} // check against memory to confirm complete


function puzzleCompleteCheck(memory) {
  var tiles = _toConsumableArray(document.querySelectorAll('.tile'));

  var result = tiles.every(function (tile, index) {
    // check if current position matches first position for all tiles
    var tileID = tile.getAttribute('id');
    return index === memory[tileID].index;
  });
  return result;
} // check if the specified space is free


function isSpaceFree(index) {
  if (index === false) return false;

  var currentTiles = _toConsumableArray(document.querySelectorAll('.tile'));

  var ind = Math.floor(parseFloat(index)) - 1;

  if (currentTiles[ind].classList.contains('open')) {
    return {
      'result': true,
      'index': Math.floor(parseFloat(index))
    };
  }

  return {
    'result': false,
    'index': Math.floor(parseFloat(index))
  };
} // functions to check if adjacent squares are on the same row or wrapped (e.g. shouldn't move to wrapped adjacent tiles!)


function recursiveFindLowest(index, currentTiles) {
  // keep taking the width of the row away from the current index until we hit below zero
  // when can't go any lower, test the index value
  // if this equals 1 (first tile), then the original tile was the left-most in it's row and so shouldn't accept left movements
  var cur = index - Math.sqrt(currentTiles.length);

  if (cur >= 0) {
    return recursiveFindLowest(cur, currentTiles);
  } else {
    if (index === 1) {
      return false; // this means its a left edge and so not allowed
    } else {
      return true;
    }
  }
}

function recursiveFindHighest(index, currentTiles) {
  // keep adding the width of the row away to the current index until we hit below the number of total tiles
  // when can't go any higher, test the index value
  // if this equals the total number of tiles, then the original tile was the right-most in it's row and so shouldn't accept right movements
  var cur = index + Math.sqrt(currentTiles.length);

  if (cur <= currentTiles.length) {
    return recursiveFindHighest(cur, currentTiles);
  } else {
    if (index === currentTiles.length) {
      return false; // this means its a right edge and so not allowed
    } else {
      return true;
    }
  }
} // movement functionality fn


function swapTiles(currentIndex, swapIndex) {
  // container and tiles
  var tileContainer = document.querySelector('.tile-container');

  var currentTiles = _toConsumableArray(document.querySelectorAll('.tile')); // reset to zero indexed


  var current = currentIndex - 1;
  var swap = swapIndex - 1; // items to swap

  var swapItemOne = currentTiles[current];
  var swapItemTwo = currentTiles[swap]; // fn

  function swapElements(obj1, obj2) {
    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1); // move obj1 to right before obj2

    obj2.parentNode.insertBefore(obj1, obj2); // move obj2 to right before where obj1 used to be

    temp.parentNode.insertBefore(obj2, temp); // remove temporary marker node

    temp.parentNode.removeChild(temp);
  }

  swapElements(swapItemOne, swapItemTwo);
} // movement trigger fn


function triggerTileMovement(thisTile, currentTiles) {
  // get current position with findIndex
  var currentIndex = currentTiles.findIndex(function (tile) {
    return tile.id === thisTile.id;
  }) + 1; // otherwise zero index
  // check for empty spaces

  var root = Math.sqrt(currentTiles.length); // get width of rows (always 3x3, 4x4 etc.)
  // status obj to be filled by promisified checking functions

  var movementStatuses = {
    'top': {
      'allow': false,
      'index': false
    },
    'bottom': {
      'allow': false,
      'index': false
    },
    'left': {
      'allow': false,
      'index': false
    },
    'right': {
      'allow': false,
      'index': false
    }
  }; // try one tile above (basically go forward by width of rows unless that takes you off the grid)

  var checkTopPromise = new Promise(function (resolve) {
    resolve(isSpaceFree(currentIndex - root >= 1 ? currentIndex - root : false));
  }).then(function (results) {
    movementStatuses.top.allow = results.result;
    movementStatuses.top.index = results.index;
  }).catch(function (err) {
    return console.error(err);
  }); // try one tile below (basically go backwards by width of rows unless that takes you off the grid)

  var checkBottomPromise = new Promise(function (resolve) {
    resolve(isSpaceFree(currentIndex + root <= currentTiles.length ? currentIndex + root : false));
  }).then(function (results) {
    movementStatuses.bottom.allow = results.result;
    movementStatuses.bottom.index = results.index;
  }).catch(function (err) {
    return console.error(err);
  }); // try one tile to the left

  var checkLeftPromise = new Promise(function (resolve) {
    var leftTile = false; // default
    // prevent checking past lowest

    if (currentIndex - 1 >= 1) {
      leftTile = currentIndex - 1; // don't allow wrap!!!!

      if (!recursiveFindLowest(currentIndex, currentTiles)) {
        leftTile = false;
      }
    }

    resolve(isSpaceFree(leftTile));
  }).then(function (results) {
    movementStatuses.left.allow = results.result;
    movementStatuses.left.index = results.index;
  }).catch(function (err) {
    return console.error(err);
  }); // try one tile to the right

  var checkRightPromise = new Promise(function (resolve) {
    var rightTile = false; // default
    // prevent checking past highest

    if (currentIndex + 1 <= currentTiles.length) {
      rightTile = currentIndex + 1; // don't allow wrap!!!!

      if (!recursiveFindHighest(currentIndex, currentTiles)) {
        rightTile = false;
      }
    }

    resolve(isSpaceFree(rightTile));
  }).then(function (results) {
    movementStatuses.right.allow = results.result;
    movementStatuses.right.index = results.index;
  }).catch(function (err) {
    return console.error(err);
  }); // now try the available direction!

  Promise.all([checkTopPromise, checkBottomPromise, checkLeftPromise, checkRightPromise]).then(function () {
    // loop over movement status object to try moving
    if (Object.keys(movementStatuses).length > 0 && movementStatuses.constructor === Object) {
      for (var property in movementStatuses) {
        if (movementStatuses[property] && movementStatuses[property].allow === true) {
          // trigger tile swap!
          swapTiles(currentIndex, movementStatuses[property].index); // current tile index + tile index to swap with
        }
      }
    }
  });
} // shuffle animation


function shuffleAnimation() {
  var tl = new TimelineMax();
  tl.to(".sliding-tile-puzzle .tile", 1, {
    scale: 0.75,
    rotate: '360deg',
    opacity: 0,
    ease: "power3.easeIn",
    stagger: {
      grid: [4, 4],
      from: "random",
      amount: 1
    }
  });
  tl.to(".sliding-tile-puzzle .tile", 1, {
    scale: 1,
    rotate: '0deg',
    opacity: 1,
    ease: "power3.easeOut",
    stagger: {
      grid: [4, 4],
      from: "random",
      amount: 1
    }
  });
} // kick off functionality


window.addEventListener('load', function () {
  // load in animation
  var tl = new TimelineMax();
  tl.fromTo(".sliding-tile-puzzle", 1.5, {
    x: '-100%'
  }, {
    x: '0',
    ease: Power4.easeInOut
  }).fromTo(".sliding-tile-puzzle .tile", 1, {
    scale: '0',
    rotate: '-90deg'
  }, {
    scale: '1',
    rotate: '0deg',
    ease: Power4.easeInOut
  }, .5); // init required vars

  var startTiles = _toConsumableArray(document.querySelectorAll('.tile'));

  var memory = [];
  var tileContainer = document.querySelector('.tile-container');
  var startButton = document.getElementById('startButton');
  var resetButton = document.getElementById('resetButton'); // set background image positions

  setImagePositions(startTiles); // tiles loop

  startTiles.forEach(function (tile) {
    tile.id = guidGenerator(); // give IDs
    // add tile click listener

    tile.addEventListener('click', function (e) {
      if (!e.target.classList.contains('open')) {
        var currentTiles = _toConsumableArray(document.querySelectorAll('.tile')); // trigger tile moving to open space


        triggerTileMovement(e.target, currentTiles); // check if puzzle now complete

        setTimeout(function () {
          if (puzzleCompleteCheck(memory) && !tileContainer.classList.contains('complete')) {
            alert('Congratulations, you did it! 👏 🥳 🍾');
            tileContainer.classList.add('complete');
          }
        }, 1000);
      }
    });
  }); // set memory

  memory = setMemory(startTiles); // button click listeners
  // start

  startButton.addEventListener('click', function (e) {
    if (!startButton.hasAttribute('disabled')) {
      shuffleAnimation();
      setTimeout(function () {
        shuffleItems(tileContainer);
        setOpenTile(startTiles);
      }, 2000);
      startButton.setAttribute('disabled', true);
    }

    if (resetButton.hasAttribute('disabled')) {
      resetButton.removeAttribute('disabled');
    }

    tileContainer.classList.remove('complete');
  }); // reset

  resetButton.addEventListener('click', function (e) {
    var currentTiles = _toConsumableArray(document.querySelectorAll('.tile'));

    if (!resetButton.hasAttribute('disabled')) {
      shuffleAnimation();
      setTimeout(function () {
        resetGrid(startTiles, tileContainer);
      }, 2000);
      resetButton.setAttribute('disabled', true);
    }

    if (startButton.hasAttribute('disabled')) {
      startButton.removeAttribute('disabled');
    }

    tileContainer.classList.add('complete');
  });
}, false);
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58950" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map