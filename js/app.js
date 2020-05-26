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
function puzzleCompleteCheck(tiles, memory) {
	const result = tiles.every( (tile, index) => {
		// check if current position matches first position for all tiles
		const tileID = tile.getAttribute('id');
		return index === memory[tileID].index;
	});
	return result;
}

// check if space free
function isSpaceFree(index) {
	if (index === false ) return false;
	const currentTiles = [...document.querySelectorAll('.tile')];
	const ind = Math.floor(parseFloat(index)) - 1;
	if (currentTiles[ind].classList.contains('open')) {
			return true;
	}
	return false;
}

// movement fn
function triggerTileMovement(thisTile, currentTiles) {
	// get current position with findIndex
	const currentIndex = currentTiles.findIndex( tile => tile.id === thisTile.id) + 1; // otherwise zero index
	// check for empty spaces
	const root = Math.sqrt(currentTiles.length); // get width of rows (always 3x3, 4x4 etc.)
	
// 	// try one tile above
// 	const goUp = isSpaceFree((currentIndex - root) >= 1 ? currentIndex - root : false);
	
// 	// try one tile below
// 	const goDown = isSpaceFree((currentIndex + root) <= currentTiles.length ? currentIndex + root : false);
	
// 	// try one tile to the left
// 	let leftTile = false; // default
// 	if ((currentIndex - 1) >= 1) {
// 		leftTile = currentIndex - 1;
// 		// don't allow wrap!!!!
// 	}
// 	const goLeft = isSpaceFree(leftTile);
	
// 	// try one tile to the right
// 	let rightTile = false; // default
// 	if ((currentIndex + 1) currentTiles.length) {
// 		rightTile = currentIndex + 1;
// 	}
// 	const goRight = isSpaceFree(rightTile);
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
			const currentTiles = [...document.querySelectorAll('.tile')];
			// trigger tile moving to open space
			triggerTileMovement(e.target, currentTiles);
			// check if puzzle now complete
			console.warn('complete? ', puzzleCompleteCheck(currentTiles, memory));
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
	});
}, false);
