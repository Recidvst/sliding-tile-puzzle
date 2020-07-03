// id generator
function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4());
}

// random shufflers
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
function shuffleItems(list) {
	for (var i = list.children.length; i >= 0; i--) {
			list.appendChild(list.children[Math.random() * i | 0]);
	}
}

// reset grid
function resetGrid(oldTiles, list) {
	const ul = list;
	for (var i = 0; i <= ul.children.length -1; i++) {
		const item = oldTiles[i];
		item.classList.remove('open');
		ul.appendChild(item);
	}
}

// set open tile
function setOpenTile(tiles) {
	const rand = Math.floor(Math.random() * tiles.length);
	tiles[rand].classList.add('open');
}

// set background positions
function setImagePositions(tiles) {
	const container = tiles[0].parentElement; // tile-container
	tiles.forEach( (tile) => {
		// set image size
		tile.style.backgroundSize = `${container.offsetWidth}px ${container.offsetHeight}px`;
// 		set image position
		tile.style.backgroundPosition = `-${tile.offsetLeft}px -${tile.offsetTop}px`;
	});
}

// setting memory
function setMemory(tiles) {
	let memObj = {};
	tiles.forEach( (tile, index) => {
		memObj[tile.getAttribute('id')] = {
			'index' : index,
			'id' : tile.getAttribute('id')
		};
	});
	return memObj; // returns memory object
}

// check against memory to confirm complete
function puzzleCompleteCheck(memory) {
	const tiles = [...document.querySelectorAll('.tile')];
	const result = tiles.every( (tile, index) => {
		// check if current position matches first position for all tiles
		const tileID = tile.getAttribute('id');
		return index === memory[tileID].index;
	});
	return result;
}

// check if the specified space is free
function isSpaceFree(index) {
	if (index === false ) return false;
	const currentTiles = [...document.querySelectorAll('.tile')];
	const ind = Math.floor(parseFloat(index)) - 1;
	if (currentTiles[ind].classList.contains('open')) {
			return {
				'result': true,
				'index': Math.floor(parseFloat(index)),
			};
	}
	return {
				'result': false,
				'index': Math.floor(parseFloat(index)),
	};
}

// functions to check if adjacent squares are on the same row or wrapped (e.g. shouldn't move to wrapped adjacent tiles!)
function recursiveFindLowest(index, currentTiles) {
	// keep taking the width of the row away from the current index until we hit below zero
	// when can't go any lower, test the index value
	// if this equals 1 (first tile), then the original tile was the left-most in it's row and so shouldn't accept left movements
	let cur = index - Math.sqrt(currentTiles.length);
	if (cur >= 0) {
			return recursiveFindLowest(cur, currentTiles);
	}
	else {
			if (index === 1) {
					return false; // this means its a left edge and so not allowed
			}
			else {
					return true;
			}
	}
}
function recursiveFindHighest(index, currentTiles) {
	// keep adding the width of the row away to the current index until we hit below the number of total tiles
	// when can't go any higher, test the index value
	// if this equals the total number of tiles, then the original tile was the right-most in it's row and so shouldn't accept right movements
	let cur = index + Math.sqrt(currentTiles.length);
	if (cur <= currentTiles.length) {
			return recursiveFindHighest(cur, currentTiles);
	}
	else {
			if (index === currentTiles.length) {
					return false; // this means its a right edge and so not allowed
			}
			else {
					return true;
			}
	}
}

// movement functionality fn
function swapTiles(currentIndex, swapIndex) {
	// container and tiles
	const tileContainer = document.querySelector('.tile-container');
	const currentTiles = [...document.querySelectorAll('.tile')];
	// reset to zero indexed
	const current = currentIndex - 1;
	const swap = swapIndex - 1;
	// items to swap
	let swapItemOne = currentTiles[current];
	let swapItemTwo =  currentTiles[swap];
	// fn
	function swapElements(obj1, obj2) {
    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);
    // move obj1 to right before obj2
    obj2.parentNode.insertBefore(obj1, obj2);
    // move obj2 to right before where obj1 used to be
    temp.parentNode.insertBefore(obj2, temp);
    // remove temporary marker node
		temp.parentNode.removeChild(temp);
	}
	swapElements(swapItemOne, swapItemTwo);
}

// movement trigger fn
function triggerTileMovement(thisTile, currentTiles) {
	// get current position with findIndex
	const currentIndex = currentTiles.findIndex( tile => tile.id === thisTile.id) + 1; // otherwise zero index
	// check for empty spaces
	const root = Math.sqrt(currentTiles.length); // get width of rows (always 3x3, 4x4 etc.)
	// status obj to be filled by promisified checking functions
	let movementStatuses = {
		'top': {
			'allow': false,
			'index': false,
		},
		'bottom': {
			'allow': false,
			'index': false,
		},
		'left': {
			'allow': false,
			'index': false,
		},
		'right': {
			'allow': false,
			'index': false,
		},
	}
	
	// try one tile above (basically go forward by width of rows unless that takes you off the grid)
	let checkTopPromise = new Promise(function(resolve) {
		resolve(isSpaceFree((currentIndex - root) >= 1 ? currentIndex - root : false));
	})
	.then( (results) => {
		movementStatuses.top.allow = results.result;
		movementStatuses.top.index = results.index;
	})
	.catch( err => console.error(err));
	
	// try one tile below (basically go backwards by width of rows unless that takes you off the grid)
	let checkBottomPromise = new Promise(function(resolve) {
		resolve(isSpaceFree((currentIndex + root) <= currentTiles.length ? currentIndex + root : false));
	})
	.then( (results) => {
		movementStatuses.bottom.allow = results.result;
		movementStatuses.bottom.index = results.index;
	})
	.catch( err => console.error(err));
	
	// try one tile to the left
	let checkLeftPromise = new Promise(function(resolve) {
		let leftTile = false; // default
		// prevent checking past lowest
		if ((currentIndex - 1) >= 1) {
			leftTile = currentIndex - 1;
			// don't allow wrap!!!!
			if (!recursiveFindLowest(currentIndex, currentTiles)) {
					leftTile = false;
			}
		}
		resolve(isSpaceFree(leftTile));
	})
	.then( (results) => {
		movementStatuses.left.allow = results.result;
		movementStatuses.left.index = results.index;
	})
	.catch( err => console.error(err));
	
	// try one tile to the right
	let checkRightPromise = new Promise(function(resolve) {
		let rightTile = false; // default
		// prevent checking past highest
		if ((currentIndex + 1) <= currentTiles.length) {
			rightTile = currentIndex + 1;
			// don't allow wrap!!!!
			if (!recursiveFindHighest(currentIndex, currentTiles)) {
					rightTile = false;
			}
		}
		resolve(isSpaceFree(rightTile));
	})
	.then( (results) => {
		movementStatuses.right.allow = results.result;
		movementStatuses.right.index = results.index;
	})
	.catch( err => console.error(err));
	
	// now try the available direction!
	Promise.all([checkTopPromise, checkBottomPromise, checkLeftPromise, checkRightPromise]).then(() => {
		// loop over movement status object to try moving
		if (Object.keys(movementStatuses).length > 0 && movementStatuses.constructor === Object) {
			for (const property in movementStatuses) {
				if (movementStatuses[property] && movementStatuses[property].allow === true) {
					// trigger tile swap!
					swapTiles(currentIndex, movementStatuses[property].index); // current tile index + tile index to swap with
				}
			}
		}
	});
	
}

// kick off functionality
window.addEventListener('load', () => {
	// init required vars
	const startTiles = [...document.querySelectorAll('.tile')];
	let memory = [];
	const tileContainer = document.querySelector('.tile-container');
	const startButton = document.getElementById('startButton');
	const resetButton = document.getElementById('resetButton');
	// set background image positions
	setImagePositions(startTiles);
	// tiles loop
	startTiles.forEach( (tile) => {
		tile.id = guidGenerator(); // give IDs
		// add tile click listener
		tile.addEventListener('click', (e) => {
			if (!e.target.classList.contains('open')) {
				const currentTiles = [...document.querySelectorAll('.tile')];
				// trigger tile moving to open space
				triggerTileMovement(e.target, currentTiles);
				// check if puzzle now complete
				setTimeout(() => {
					if (puzzleCompleteCheck(memory) && !tileContainer.classList.contains('complete')) {
						alert('Congratulations, you did it! 👏 🥳 🍾');
						tileContainer.classList.add('complete');
					}
				}, 1000);
			}
		});
	});
	// set memory
	memory = setMemory(startTiles);
	// button click listeners
	// start
	startButton.addEventListener('click', (e) => {
		if (!startButton.hasAttribute('disabled')) {
			shuffleItems(tileContainer);
			setOpenTile(startTiles);
			startButton.setAttribute('disabled', true);
		}
		if (resetButton.hasAttribute('disabled')) {
			resetButton.removeAttribute('disabled');
		}
		tileContainer.classList.remove('complete');
	});
	// reset
	resetButton.addEventListener('click', (e) => {
		const currentTiles = [...document.querySelectorAll('.tile')];
		if (!resetButton.hasAttribute('disabled')) {
			resetGrid(startTiles, tileContainer);
			resetButton.setAttribute('disabled', true);
		}
		if (startButton.hasAttribute('disabled')) {
			startButton.removeAttribute('disabled');
		}
		tileContainer.classList.add('complete');
	});
}, false);
