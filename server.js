var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var users = {};
var games = {};
var lobby = {};
var port = 5000;
var maxPlayers = 4;
var totalPlayers = 0;
var stockTotal = 5;
var gameSpeed = 30;
var rawData = {};
var spriteData = {};
var fighters = [];
var stages = [];
var names = ['Tony', 'Vinny', 'Bruno', 'Frank', 'Mario', 'Vito', 'Al', 'Gerardo', 'Angelo', 'Giovanni', 'Salvatore', 'Carmine', 'Fabrizio', 'Dominic', 'Alphonse', 'Vic', 'Giuseppe', 'Joey', 'Tommaso', 'Johnny', 'Vincent', 'Nicolo', 'Michael', 'Phil', 'Victor', 'Vincenzo', 'Luigi', 'Stefano', 'Giacomo', 'Santo', 'Ignazio'];

app.use('/', express.static(__dirname + '/'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(process.env.PORT || port, function() {
	if (!process.env.PORT) {
		app.set('port', port);
		console.log('Game started on port ' + port + '\n');
	}
});

function contains(array, value) {
	for (var i in array) {
		if (array[i] == value) {
			return true;
		}
	}

	return false;
}

function setValue(val) {
	return function() {return val;};
}

class Stage {
	constructor(name, hitboxes, spawns, bounds) {
		this.name = name;

		//[[x0, y0, rx, ry], [x1, y1, rx, ry], ...]
		this.hitboxes = hitboxes;

		//[[x0, y0], [x1, y1], ...]
		this.spawns = spawns;

		//[x0, y0, x1, y1]
		this.bounds = bounds;
	}
}

var previewStage = new Stage('preview', [[0.4, 0.7, 0.9, 0.77]], [[0.45, 0.5]], [0.2, 0, 1, 0.85]);

class Projectile {
	constructor(id, name, facing, owner, x, y, width, height, velocity, weight, animationTime, hitsLeft, frames, hitboxes, attacks) {
		this.id = id;
		this.name = name;
		this.facing = facing;
		this.owner = owner;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.velocity = velocity;
		this.weight = weight;
		this.animationTime = animationTime;
		this.hitsLeft = hitsLeft;
		this.frames = frames;
		this.hitboxes = hitboxes;
		this.attacks = attacks;
		this.frame = 0;
	}
}

class Fighter {
	constructor(name, terminalVelocity, runSpeed, animationTime, jumps, jumpStrength, weight, spriteWidth, spriteHeight, hurtboxes, hitboxes, frames, attacks, effects, sprites) {
		this.name = name;
		this.terminalVelocity = terminalVelocity;
		this.runSpeed = runSpeed;
		this.animationTime = animationTime;
		this.jumps = jumps;
		this.jumpStrength = jumpStrength;
		this.weight = weight;
		this.spriteWidth = spriteWidth;
		this.spriteHeight = spriteHeight;
		this.hurtboxes = hurtboxes;
		this.hitboxes = hitboxes;
		this.frames = frames;
		this.attacks = attacks;
		this.effects = effects;
		this.sprites = sprites;
	}
}

function splitData(data) {
	data = data.split(/\r?\n/);
	output = {};
	for (var j=0; j<data.length; j++) {
		var temprawDataSplit = data[j].split('@');
		output[temprawDataSplit[0]] = temprawDataSplit[1];
	}

	return output;
}

rawData['projectiles'] = {};
spriteData['projectiles'] = {};
fs.readdir('static/projectiles', function(err, items) {
	for (var i=0; i<items.length; i++) {
		console.log('Loading ' + items[i]);
		rawData['projectiles'][items[i].slice(0, -4)] = {};
		var temprawData = fs.readFileSync('static/projectiles/' + items[i], 'utf8');

		rawData['projectiles'][items[i].slice(0, -4)] = splitData(temprawData);

		spriteData['projectiles'][items[i].slice(0, -4)] = '/static/sprites/projectiles/' + items[i].slice(0, -4) + '/' + items[i].slice(0, -4) + '.png';
	}

	console.log('Projectiles Loaded \n');
});

rawData['fighters'] = {};
spriteData['fighters'] = {};
fs.readdir('static/fighters', function(err, items) {
	for (var i=0; i<items.length; i++) {
		console.log('Loading ' + items[i]);
		var temprawData = fs.readFileSync('static/fighters/' + items[i], 'utf8');

		rawData['fighters'][items[i].slice(0, -4)] = splitData(temprawData);

		fighters.push(createFighter(rawData['fighters'][items[i].slice(0, -4)]));

		spriteData['fighters'][fighters[i].name] = {};
		spriteData['fighters'][fighters[i].name]['stock'] = '/static/sprites/fighters/' + fighters[i].name + '/stock.png';
		for (var j in fighters[i]['frames']) {
			spriteData['fighters'][fighters[i].name][j] = '/static/sprites/fighters/' + fighters[i].name + '/' + j + '.png';
		}
	}

	console.log('Fighters Loaded \n');
});

rawData['stages'] = {};
spriteData['stages'] = {};
fs.readdir('static/stages', function(err, items) {
	for (var i=0; i<items.length; i++) {
		console.log('Loading ' + items[i]);
		var temprawData = fs.readFileSync('static/stages/' + items[i], 'utf8');

		rawData['stages'][items[i].slice(0, -4)] = splitData(temprawData);

		stages.push(createStage(rawData['stages'][items[i].slice(0, -4)]));

		spriteData['stages'][stages[i].name] = '/static/sprites/stages/' + stages[i].name + '.png';;
	}

	console.log('Stages Loaded \n');
});

spriteData['menu'] = {};
spriteData['menu']['host'] = '/static/sprites/menu/host.png';
spriteData['menu']['kick'] = '/static/sprites/menu/kick.png';
spriteData['menu']['play'] = '/static/sprites/menu/play.png';
spriteData['menu']['pause'] = '/static/sprites/menu/pause.png';

function shootProjectile(user, projectile) {
	var tempProjectile = ((projectile.length > 5 && projectile.substring(0, 5) == 'name?') ? splitData(projectile.replace(/\\/g, '\n').replace(/\?/g, '@').replace(/\`/g, ';').replace(/\~/g, ':').replace(/\+/g, ',').replace(/\$/g, '=').replace(/\*/, '_')) : rawData['projectiles'][projectile]);

	var rawDataArray = tempProjectile['hitboxes'].split('_');
	var hitboxes = {};
	var tempBox;
	for (var i=0; i<rawDataArray.length; i++) {
		hitboxes[i.toString()] = [];
		tempBox = rawDataArray[i].split(';');
		for (var j=0; j<tempBox.length; j+=2) {
			tempBox[j+1] = tempBox[j+1].split(',');
			hitboxes[i.toString()].push({'id': tempBox[j], 'hitbox': [parseFloat(tempBox[j+1][0]), parseFloat(tempBox[j+1][1]), parseFloat(tempBox[j+1][2]), parseFloat(tempBox[j+1][3])], 'alreadyHit':[]});
		}
	}

	rawDataArray = tempProjectile['attacks'].split('_');
	var attacks = {};
	for (var i=0; i<rawDataArray.length; i++) {
		tempBox = rawDataArray[i].split('=');
		for (var j=0; j<tempBox.length; j+=2) {
			tempBox[j+1] = tempBox[j+1].split(';');
			attacks[tempBox[0]] = {'damage': parseFloat(tempBox[j+1][0]), 'launch': [parseFloat(tempBox[j+1][1].split(',')[0]), parseFloat(tempBox[j+1][1].split(',')[1])], 'stun': parseFloat(tempBox[j+1][2])};
		}
	}

	user.projectiles.push(new Projectile(
		user.projectileID,
		tempProjectile['name'],
		((tempProjectile['facing'] == 'same') ? user.facing : ((user.facing == 'right') ? 'left' : 'right')),
		user.id,
		((tempProjectile['x'].split(';').length>1 && tempProjectile['x'].split(';')[0] == 'player') ? user.x + parseFloat(tempProjectile['x'].split(';')[1]) + user.fighter.spriteWidth/4 + ((user.facing == 'right') ? 0 : parseFloat(tempProjectile['width'])) : parseFloat(tempProjectile['x'])),
		((tempProjectile['y'].split(';').length>1 && tempProjectile['y'].split(';')[0] == 'player') ? user.y + parseFloat(tempProjectile['y'].split(';')[1]) + user.fighter.spriteHeight/4 : parseFloat(tempProjectile['y'])),
		parseFloat(tempProjectile['width']),
		parseFloat(tempProjectile['height']),
		[((((tempProjectile['facing'] == 'same') ? user.facing : ((user.facing == 'right') ? 'left' : 'right')) == 'left') ? parseFloat(tempProjectile['velX'].split(':')[0]) : parseFloat(tempProjectile['velX'].split(':')[1]))*(60/gameSpeed), parseFloat(tempProjectile['velY'])*(60/gameSpeed)],
		parseFloat(tempProjectile['weight']),
		parseFloat(tempProjectile['animationTime']),
		parseFloat(tempProjectile['hitsLeft']),
		parseFloat(tempProjectile['frames']),
		hitboxes,
		attacks));

	user.projectileID++;
}

function createFighter(data) {
	var rawDataArray = data['hitboxes'].split('|');
	var hitboxes = {};
	var tempFrame;
	var tempBoxes;
	var tempBox;
	var rect;
	for (var i=0; i<rawDataArray.length; i+=2) {
		hitboxes[rawDataArray[i]] = {};
		tempFrame = rawDataArray[i+1].split('_');
		for (var j=0; j<tempFrame.length; j++) {
			tempBoxes = tempFrame[j].split('=');
			if (tempBoxes.length > 1) {
				hitboxes[rawDataArray[i]][tempBoxes[0]] = [];
			}
			for (var k=1; k<tempBoxes.length; k++) {
				tempBox = tempBoxes[k].split(';');
				rect = tempBox[1].split(',');
				hitboxes[rawDataArray[i]][tempBoxes[0]].push({'id': tempBox[0], 'hitbox': [parseFloat(rect[0]), parseFloat(rect[1]), parseFloat(rect[2]), parseFloat(rect[3])], 'alreadyHit':[]});
			}
		}
	}

	rawDataArray = data['hurtboxes'].split('|');
	var hurtboxes = {};
	for (var i=0; i<rawDataArray.length; i+=2) {
		hurtboxes[rawDataArray[i]] = {};
		tempFrame = rawDataArray[i+1].split('_');
		for (var j=0; j<tempFrame.length; j+=2) {
			if(tempFrame.length > 1) {
				tempBoxes = tempFrame[j+1].split(';');
				hurtboxes[rawDataArray[i]][tempFrame[j]] = [];
				for (var k=0; k<tempBoxes.length; k++) {
					rect = tempBoxes[k].split(',');
					hurtboxes[rawDataArray[i]][tempFrame[j]].push([parseFloat(rect[0]), parseFloat(rect[1]), parseFloat(rect[2]), parseFloat(rect[3])]);
				}
			}
		}
	}

	rawDataArray = data['attacks'].split('|');
	var attacks = {};
	for (var i=0; i<rawDataArray.length; i+=2) {
		attacks[rawDataArray[i]] = {};
		tempBox = rawDataArray[i+1].split('_');
		for (var j=0; j<tempBox.length; j+=2) {
			tempBox[j+1] = tempBox[j+1].split(';');
			attacks[rawDataArray[i]][tempBox[j]] = {'damage': parseFloat(tempBox[j+1][0]), 'launch': [parseFloat(tempBox[j+1][1].split(',')[0]), parseFloat(tempBox[j+1][1].split(',')[1])], 'stun': parseFloat(tempBox[j+1][2])};
		}
	}

	rawDataArray = data['effects'].split('|');
	var effects = {};
	var tempEffects;
	for (var i=0; i<rawDataArray.length; i+=2) {
		tempEffects = rawDataArray[i+1].split('_');
		effects[rawDataArray[i]] = {};
		for (var j=0; j<tempEffects.length; j+=2) {
			let tempFrames = tempEffects[j].split('=');
			effects[rawDataArray[i]][tempFrames[j]] = [];
			for (var k=0; k<tempFrames.length; k++) {
				let tempEffect = tempFrames[k].split(';');
				for (var l=0; l<tempEffect.length; l++) {
					let tempArg = tempEffect[l].split(',');
					if (tempArg[0] == 'projectile') {
						effects[rawDataArray[i]][tempFrames[j]].push(function(user){shootProjectile(user,tempArg[1]);});
					} else if (tempArg[0] == 'x' || tempArg[0] == 'velX' || tempArg[0] == 'y' || tempArg[0] == 'velY') {
						if (tempArg[1] == 'set') {
							effects[rawDataArray[i]][tempFrames[j]].push(function(user){user[tempArg[0]]=((((tempArg[0] =='x'||tempArg[0]=='velX')&&user.facing=='left')&&(tempArg[3]==1)) ? -1 : 1)*parseFloat(tempArg[2])*(60/gameSpeed)});
						} else if (tempArg[1] == 'add') {
							effects[rawDataArray[i]][tempFrames[j]].push(function(user){user[tempArg[0]]+=((((tempArg[0] =='x'||tempArg[0]=='velX')&&user.facing=='left')&&(tempArg[3]==1)) ? -1 : 1)*parseFloat(tempArg[2])*(60/gameSpeed)});
						}
					}
				}
			}
		}
	}

	rawDataArray = data['frames'].split('|');
	var frames = {};
	for (var i=0; i<rawDataArray.length; i+=2) {
		frames[rawDataArray[i]] = rawDataArray[i+1];
	}

	return new Fighter(
		data['name'],
		parseFloat(data['terminalVelocity']),
		parseFloat(data['runSpeed']),
		parseFloat(data['animationTime']),
		parseFloat(data['jumps']),
		parseFloat(data['jumpStrength']),
		parseFloat(data['weight']),
		parseFloat(data['spriteWidth']),
		parseFloat(data['spriteHeight']),
		hurtboxes,
		hitboxes,
		frames,
		attacks,
		effects,
		parseInt(data['sprites']));
}

function createStage(data) {
	var rawDataArray = data['hitboxes'].split(';');
	var hitboxes = [];
	for (var i=0; i<rawDataArray.length; i++) {
		var tempHitbox = rawDataArray[i].split(',');
		hitboxes.push([]);
		for (var j=0; j<tempHitbox.length; j++) {
			hitboxes[i].push(parseFloat(tempHitbox[j]));
		}
	}

	rawDataArray = data['spawns'].split(';');
	var spawns = [];
	for (var i=0; i<rawDataArray.length; i++) {
		var tempSpawn = rawDataArray[i].split(',');
		spawns.push([]);
		for (var j=0; j<tempSpawn.length; j++) {
			spawns[i].push(parseFloat(tempSpawn[j]));
		}
	}

	rawDataArray = data['bounds'].split(',');
	var bounds = [];
	for (var i=0; i<rawDataArray.length; i++) {
		bounds.push(parseFloat(rawDataArray[i]));
	}
	
	return new Stage(data['name'], hitboxes, spawns, bounds);
}

io.on('connection', function(socket) {
	socket.on('new player', function() {
		users[socket.id] = {
			id: socket.id,
			name: names[totalPlayers%names.length],
			wins: 0,
			losses: 0,
			inGame: null
		}

		totalPlayers++;
		lobby[socket.id] = users[socket.id];

		io.to(socket.id).emit('data', spriteData, fighters);
	});
	socket.on('startGame', function() {
		try {
			var game = games[users[socket.id].inGame];
			game.started = true;
		}
		catch (e) {
			console.log(e);
		}
	});
	socket.on('leaveGame', function() {
		try {			
			delete games[users[socket.id].inGame].players[socket.id];

			if (Object.keys(games[users[socket.id].inGame].players).length == 0) {
				delete games[games[users[socket.id].inGame].id];
			} else {
				if (games[users[socket.id].inGame].host == socket.id) {
					games[users[socket.id].inGame].host = games[users[socket.id].inGame].players[Object.keys(games[users[socket.id].inGame].players)[0]].id;
				}
				renameGame(games[users[socket.id].inGame]);
			}

			users[socket.id].inGame = null;
			lobby[socket.id] = users[socket.id];
		}
		catch (e) {
			console.log(e);
		}
	});
	socket.on('pingToServer', function() {
		try {
			io.to(socket.id).emit('pingToClient');
		}
		catch (e) {
			console.log(e);
		}
	});
	socket.on('rename', function(newName) {
		try {
			var player = games[users[socket.id].inGame].players[socket.id];
			renamePlayer(newName, player);
		}
		catch (e) {
			console.log(e);
		}
	});
	socket.on('renameGame', function(newName) {
		try {
			var game = games[users[socket.id].inGame];
			game.name = newName;
		}
		catch (e) {
			console.log(e);
		}
	});
	socket.on('changeFighter', function(newFighter) {
		try {
			var player = games[users[socket.id].inGame].players[socket.id];
			player.fighter = games[users[socket.id].inGame].fighters[newFighter];
			player.sprite = 0;
			player.x = previewStage.spawns[0][0];
		    player.y = previewStage.spawns[0][1];
		    player.velX = 0;
		    player.velY = 0;
		    player.jumps = 0;
		}
		catch (e) {
			console.log(e);
		}
	});
	socket.on('changeSprite', function(newSprite) {
		try {
			var player = games[users[socket.id].inGame].players[socket.id];
			player.sprite = newSprite;
		}
		catch (e) {
			console.log(e);
		}
	});
	socket.on('changeStage', function(newStage) {
		try {
			var game = games[users[socket.id].inGame];
			for (var i in stages) {
				if (stages[i].name == newStage) {
					game.stage = stages[i];
					break;
				}
			}
		}
		catch (e) {
			console.log(e);
		}
	});
	socket.on('attack', function(direction) {
		try {
			var game = games[users[socket.id].inGame];
			var player = game.players[socket.id];
			if (player.lastAttack <= 0 && !player.lost && !player.won) {
				if (direction == 'left') {
					if (player.grounded) {
						if (player.action == 'run') {
							player.action = 'forward';
							player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
							player.animationFrame = 0;
						} else {
							player.facing = 'left';
							player.action = 'neutral';
							player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
							player.animationFrame = 0;
						}
					} else {
						if (player.facing == 'left') {
							player.action = 'fair';
							player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
							player.animationFrame = 0;
						} else {
							player.action = 'bair';
							player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
							player.animationFrame = 0;
						}
					}
				} else if (direction == 'right') {
					if (player.grounded) {
						if (player.action == 'run') {
							player.action = 'forward';
							player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
							player.animationFrame = 0;
						} else {
							player.facing = 'right';
							player.action = 'neutral';
							player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
							player.animationFrame = 0;
						}
					} else {
						if (player.facing == 'right') {
							player.action = 'fair';
							player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
							player.animationFrame = 0;
						} else {
							player.action = 'bair';
							player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
							player.animationFrame = 0;
						}
					}
				} else if (direction == 'up') {
					if (player.grounded) {
						player.action = 'nair';
						player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
						player.animationFrame = 0;
					} else {
						player.action = 'uair';
						player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
						player.animationFrame = 0;
					}
				} else if (direction == 'down') {
					if (player.grounded) {
						player.action = 'dtilt';
						player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
						player.animationFrame = 0;
					} else {
						player.action = 'dair';
						player.lastAttack = player.fighter.animationTime*(parseInt(player.fighter.frames[player.action])+2);
						player.animationFrame = 0;
					}
				}
			}
		}
		catch (e) {
			console.log(e);
		}
	});
	socket.on('w', function() {
		try {
			if (users[socket.id]) {
				var player = games[users[socket.id].inGame].players[socket.id];
				player.movement.up = true;
			}
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('a', function() {
		try {
			if (users[socket.id]) {
				var player = games[users[socket.id].inGame].players[socket.id];
				player.movement.left = true;
			}
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('s', function() {
		try {
			if (users[socket.id]) {
				var player = games[users[socket.id].inGame].players[socket.id];
				player.movement.down = true;
			}
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('d', function() {
		try {
			if (users[socket.id]) {
				var player = games[users[socket.id].inGame].players[socket.id];
				player.movement.right = true;
			}
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('wUp', function() {
		try {
			if (users[socket.id]) {
				var player = games[users[socket.id].inGame].players[socket.id];
				player.movement.up = false;
			}
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('aUp', function() {
		try {
			if (users[socket.id]) {
				var player = games[users[socket.id].inGame].players[socket.id];
				player.movement.left = false;
			}
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('sUp', function() {
		try {
			if (users[socket.id]) {
				var player = games[users[socket.id].inGame].players[socket.id];
				player.movement.down = false;
			}
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('dUp', function() {
		try {
			if (users[socket.id]) {
				var player = games[users[socket.id].inGame].players[socket.id];
				player.movement.right = false;
			}
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('joinGame', function(gameID) {
		try {
			joinGame(socket.id, gameID);
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('kickPlayer', function(playerID) {
		try {
			var game = games[users[socket.id].inGame];
			if (game.players[playerID]) {
				delete game.players[playerID];

				lobby[playerID] = users[playerID];
			}
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
  	socket.on('createGame', function(visible, newFighter) {
		try {
			createGame(socket.id, visible, newFighter);
	    }
	    catch (e) {
	    	console.log(e);
	    }
  	});
	socket.on('disconnect', function() {
		if (users[socket.id]) {
			if (users[socket.id].inGame != null && games[users[socket.id].inGame]) {
				delete games[users[socket.id].inGame].players[socket.id];

				if (Object.keys(games[users[socket.id].inGame].players).length == 0) {
					delete games[games[users[socket.id].inGame].id];
				} else {
					renameGame(games[users[socket.id].inGame]);
				}
			}

			if (lobby[socket.id]) {
				delete lobby[socket.id];
			}

			delete users[socket.id];
		}
   	});
});

function flipHitbox(hitbox) {
  return [1-hitbox[2], hitbox[1], 1-hitbox[0], hitbox[3]];
}

function checkHit(hitbox1, hitbox2) {
  if (hitbox1[0] > hitbox2[2] || hitbox2[0] > hitbox1[2]) {
    return false;
  }

  if (hitbox1[1] > hitbox2[3] || hitbox2[1] > hitbox1[3]) {
    return false;
  }

  return true;
}

function checkOffstage(x, y, stage) {
	if(x < stage.bounds[0] || x > stage.bounds[2] || y < stage.bounds[1] || y > stage.bounds[3]) {
		return true;
	}
}

function renameGame(game) {
	delete games[game.id];
	var gameid = '';

	for (var j in game.players) {
		gameid = gameid + String(game.players[j].id);
	}

	for (var j in game.players) {
		users[game.players[j].id].inGame = gameid;
	}

	game.id = gameid;
	games[gameid] = game;
}

function renamePlayer(newName, player) {
	users[player.id].name = newName;
	games[users[player.id].inGame].players[player.id].name = newName;
}

function joinGame(socketID, gameID) {
	var game = games[gameID];
	if (!game.started && Object.keys(game.players).length < maxPlayers) {
		game.players[socketID] = {
		    id: socketID,
		    name: users[socketID].name,
		    x: previewStage.spawns[0][0],
		    y: previewStage.spawns[0][1],
		    velX: 0,
		    velY: 0,
		    fighter: game.fighters[0],
		    stock: 5,
		    launch: 0,
		    alive: false,
		    spawnCooldown: 500,
		    deathTime: new Date(),
		    action: 'idle',
		    grounded: false,
		    lastFrame: [0, 'idle'],
		    animationFrame: 0,
		    lastAttack: 0,
		    jumps: 0,
		    upPressed: false,
		    movement: {
			  up: false,
			  down: false,
			  left: false,
			  right: false
			},
		    facing: 'right',
		    stun: 0,
		    projectiles: [],
		    lost: false,
		    won: false,
		    projectileID: 0,
		    sprite: 0,
		    demo: false
		};

		renameGame(game);

		if (lobby[socketID]) {
			delete lobby[socketID];
		}
	}
}

function createGame(socketID, v, newFighter, newProjectiles) {
	games[socketID] = {
		id: socketID,
		name: users[socketID].name + "'s Game",
		host: socketID,
		started: false,
		time: new Date(),
		stage: stages[0],
		players: {},
		fighters: ((newFighter) ? [createFighter(splitData(newFighter))] : fighters),
		visible: v,
		demo: (newFighter != null)
	};

	games[socketID].players[socketID] = {
	    id: socketID,
	    name: users[socketID].name,
	    x: previewStage.spawns[0][0],
	    y: previewStage.spawns[0][1],
	    velX: 0,
	    velY: 0,
	    fighter: games[socketID].fighters[0],
	    stock: 5,
	    launch: 0,
	    alive: false,
	    spawnCooldown: 500,
	    deathTime: new Date(),
	    action: 'idle',
	    grounded: false,
	    lastFrame: [0, 'idle'],
	    animationFrame: 0,
	    lastAttack: 0,
	    jumps: 0,
	    upPressed: false,
	    movement: {
		  up: false,
		  down: false,
		  left: false,
		  right: false
		},
	    facing: 'right',
	    stun: 0,
	    projectiles: [],
	    lost: false,
		won: false,
		projectileID: 0,
		sprite: 0,
		demo: (newFighter != null)
	};

	users[socketID].inGame = socketID;

	if (lobby[socketID]) {
		delete lobby[socketID];
	}
}

setInterval(function() {
	try {
		var game;
		var stage;
		for (var i in games) {
			game = games[i];
			stage = game.stage;
			var player;
			var tempTime = game.time;
			game.time = new Date();
			var k = 0;
			for (var j in game.players) {
				player = game.players[j];

				spriteWidth = player.fighter.spriteWidth;
			    spriteHeight = player.fighter.spriteHeight;


			    frame = Math.floor(player.animationFrame/player.fighter.animationTime).toString();

			    if (player.lastAttack >= 0) {
			    	player.lastAttack -= (60/gameSpeed);
			    }

			    if(player && player.fighter && stage && stage.hitboxes && !player.grounded) {
			      	for (var hitbox1 in player.fighter.hurtboxes[player.action][frame]) {
			        	for (var j in ((game.started) ? stage.hitboxes : previewStage.hitboxes)) {
				          	hitbox2 = ((game.started) ? stage.hitboxes[j] : previewStage.hitboxes[j]);
				          	if (checkHit([player.x + player.fighter.hurtboxes[player.action][frame][hitbox1][0]*spriteWidth, player.y + player.fighter.hurtboxes[player.action][frame][hitbox1][1]*spriteHeight, player.x + player.fighter.hurtboxes[player.action][frame][hitbox1][2]*spriteWidth, player.y + player.fighter.hurtboxes[player.action][frame][hitbox1][3]*spriteHeight], hitbox2)) {
				            	if(player.x + player.fighter.hurtboxes[player.action][frame][hitbox1][0]*spriteWidth > hitbox2[0]) {
				              		if(player.x + player.fighter.hurtboxes[player.action][frame][hitbox1][2]*spriteWidth < hitbox2[2]) {
				                		//if(hitbox1 == 'leftleg' || hitbox1 == 'rightleg') {
			                 	 		player.y = hitbox2[1] - player.fighter.hurtboxes[player.action][frame][hitbox1][3]*spriteHeight;
										player.velY = 0;
										player.grounded = true;
										player.jumps = player.fighter.jumps;
				                		//}
				              		} else {
				                		if (hitbox2[2] - player.fighter.hurtboxes[player.action][frame][hitbox1][0]*spriteWidth != null) {
								 			if (player.velX < 0) {
												//player.x = hitbox2[2] - player.fighter.hurtboxes[player.action][frame][hitbox1][0]*spriteWidth;
											}
										}
				              		}
				    			} else {
				              		if (hitbox2[0] - player.fighter.hurtboxes[player.action][frame][hitbox1][2]*spriteWidth != null) {
							 			if (player.velX > 0) {
											//player.x = hitbox2[0] - player.fighter.hurtboxes[player.action][frame][hitbox1][2]*spriteWidth;
										}
									}
				            	}
				          	}
			        	}
			      	}
			    }

			    if(player && player.fighter && stage && stage.hitboxes && player.grounded) {
			    	player.grounded = false;
			      	for (var hitbox1 in player.fighter.hurtboxes[player.action][frame]) {
			        	for (var j in ((game.started) ? stage.hitboxes : previewStage.hitboxes)) {
			          		hitbox2 = ((game.started) ? stage.hitboxes[j] : previewStage.hitboxes[j]);
			          		if (checkHit([player.x + player.fighter.hurtboxes[player.action][frame][hitbox1][0]*spriteWidth, 0.05 + player.y + player.fighter.hurtboxes[player.action][frame][hitbox1][1]*spriteHeight, player.x + player.fighter.hurtboxes[player.action][frame][hitbox1][2]*spriteWidth, 0.05 + player.y + player.fighter.hurtboxes[player.action][frame][hitbox1][3]*spriteHeight], hitbox2)) {
			            		player.grounded = true;
			          		}
			        	}
			      	}
			    }

			    if (game.started) {
			      	for (var i in player.fighter.hitboxes[player.action][frame]) {
			        	var hitbox1 = ((player.facing == 'left') ? flipHitbox(player.fighter.hitboxes[player.action][frame][i]['hitbox']) : player.fighter.hitboxes[player.action][frame][i]['hitbox']);
			        	for (var j in game.players) {
			          		var otherPlayer = game.players[j];
			          		if (otherPlayer.id != player.id && !contains(player.fighter.hitboxes[player.action][frame][i]['alreadyHit'], otherPlayer.id)) {
			            		var otherFrame = Math.floor(otherPlayer.animationFrame/otherPlayer.fighter.animationTime).toString();
			            		for (var o in otherPlayer.fighter.hurtboxes[otherPlayer.action][otherFrame]) {
			        				var hitbox2 = ((player.facing == 'left') ? flipHitbox(otherPlayer.fighter.hurtboxes[otherPlayer.action][otherFrame][o]) : otherPlayer.fighter.hurtboxes[otherPlayer.action][otherFrame][o]);
			              			if (checkHit([player.x + hitbox1[0]*spriteWidth, player.y + hitbox1[1]*spriteHeight, player.x + hitbox1[2]*spriteWidth, player.y + hitbox1[3]*spriteHeight], [otherPlayer.x + hitbox2[0]*spriteWidth, otherPlayer.y + hitbox2[1]*spriteHeight, otherPlayer.x + hitbox2[2]*spriteWidth, otherPlayer.y + hitbox2[3]*spriteHeight])) {
			                			var cont = false;
										for (var l in player.fighter.hitboxes[player.action]) {
											var checkFrame = player.fighter.hitboxes[player.action][l];
											for (var m in checkFrame) {
											    var id = checkFrame[m]['id'];
											    if (id == player.fighter.hitboxes[player.action][frame][i]['id'] && !contains(checkFrame[m]['alreadyHit'], otherPlayer.id)) {
											        checkFrame[m]['alreadyHit'].push(otherPlayer.id);
											        cont = true;
											    }
											}
										}

										if (cont) {
											otherPlayer.launch += player.fighter.attacks[player.action][player.fighter.hitboxes[player.action][frame][i]['id']]['damage'];
											otherPlayer.velX = ((player.facing == 'left') ? -1 : 1) * ((otherPlayer.launch/30)*(otherPlayer.launch/30)*player.fighter.attacks[player.action][player.fighter.hitboxes[player.action][frame][i]['id']]['launch'][0]/otherPlayer.fighter.weight + 10*player.fighter.attacks[player.action][player.fighter.hitboxes[player.action][frame][i]['id']]['launch'][0]/otherPlayer.fighter.weight);
											otherPlayer.velY = (otherPlayer.launch/30)*(otherPlayer.launch/30)*player.fighter.attacks[player.action][player.fighter.hitboxes[player.action][frame][i]['id']]['launch'][1]/otherPlayer.fighter.weight + 10*player.fighter.attacks[player.action][player.fighter.hitboxes[player.action][frame][i]['id']]['launch'][1]/otherPlayer.fighter.weight;
											otherPlayer.stun += (player.fighter.attacks[player.action][player.fighter.hitboxes[player.action][frame][i]['id']]['stun']*150) + otherPlayer.launch;
											otherPlayer.facing = ((player.x > otherPlayer.x) ? 'right' : 'left');
										}
			              			}
			            		}
			          		}
			        	}
			      	}
			    }

		      	for (var a in player.projectiles) {
		        	var projectile = player.projectiles[a];
		        	projectile.frame = (projectile.frame + (60/gameSpeed))%(projectile.animationTime*projectile.frames);
		        	var projectileFrame = Math.floor(projectile.frame/projectile.animationTime).toString();
		        	for (var i in projectile.hitboxes[projectileFrame]) {
		          		var hitbox1 = ((projectile.facing == 'left') ? flipHitbox(projectile.hitboxes[projectileFrame][i]['hitbox']) : projectile.hitboxes[projectileFrame][i]['hitbox']);
		          		for (var j in game.players) {
		            		var otherPlayer = game.players[j];
		            		if (otherPlayer.id != player.id && !contains(projectile.hitboxes[projectileFrame][i]['alreadyHit'], otherPlayer.id)) {
		              			var otherFrame = Math.floor(otherPlayer.animationFrame/otherPlayer.fighter.animationTime).toString();
		              			for (var o in otherPlayer.fighter.hurtboxes[otherPlayer.action][otherFrame]) {
		                			var hitbox2 = ((otherPlayer.facing == 'left') ? flipHitbox(otherPlayer.fighter.hurtboxes[otherPlayer.action][otherFrame][o]) : otherPlayer.fighter.hurtboxes[otherPlayer.action][otherFrame][o]);
		                			if (checkHit([projectile.x + hitbox1[0]*projectile.width, projectile.y + hitbox1[1]*projectile.height, projectile.x + hitbox1[2]*projectile.width, projectile.y + hitbox1[3]*projectile.height], [otherPlayer.x + hitbox2[0]*spriteWidth, otherPlayer.y + hitbox2[1]*spriteHeight, otherPlayer.x + hitbox2[2]*spriteWidth, otherPlayer.y + hitbox2[3]*spriteHeight])) {
										var cont = false;
										for (var l in projectile.hitboxes) {
											var checkFrame = projectile.hitboxes[l];
											for (var m in checkFrame) {
											    var id = checkFrame[m]['id'];
											    if (id == projectile.hitboxes[projectileFrame][i]['id'] && !contains(checkFrame[m]['alreadyHit'], otherPlayer.id)) {
											        checkFrame[m]['alreadyHit'].push(otherPlayer.id);
											        cont = true;
											    }
											}
										}

										if (cont) {
											otherPlayer.launch += projectile.attacks[projectile.hitboxes[projectileFrame][i]['id']]['damage'];
											otherPlayer.velX = ((projectile.facing == 'left') ? -1 : 1) * ((otherPlayer.launch/30)*(otherPlayer.launch/30)*projectile.attacks[projectile.hitboxes[projectileFrame][i]['id']]['launch'][0]/otherPlayer.fighter.weight + 10*projectile.attacks[projectile.hitboxes[projectileFrame][i]['id']]['launch'][0]/otherPlayer.fighter.weight);
											otherPlayer.velY = (otherPlayer.launch/30)*(otherPlayer.launch/30)*projectile.attacks[projectile.hitboxes[projectileFrame][i]['id']]['launch'][1]/otherPlayer.fighter.weight + 10*projectile.attacks[projectile.hitboxes[projectileFrame][i]['id']]['launch'][1]/otherPlayer.fighter.weight;
											otherPlayer.stun += (projectile.attacks[projectile.hitboxes[projectileFrame][i]['id']]['stun']*150) + otherPlayer.launch;
											otherPlayer.facing = ((projectile.facing == 'left') ? 'right' : 'left');
											projectile.hitsLeft -= 1;
											if (projectile.hitsLeft <= 0) {
												for (var l in player.projectiles) {
													if (player.projectiles[l].id == projectile.id) {
														player.projectiles.splice(l, 1);
														break;
													}
												}
											}
										}
		                			}
		              			}
		            		}
		          		}
		        	}
		      	}

			    for (var i in player.projectiles) {
			      	var projectile = player.projectiles[i];
			      	for (var j in projectile.hitboxes[projectileFrame]) {
			        	var hitbox1 = ((projectile.facing == 'left') ? flipHitbox(projectile.hitboxes[projectileFrame][j]['hitbox']) : projectile.hitboxes[projectileFrame][j]['hitbox']);
			        	for (var o in ((game.started) ? stage.hitboxes : previewStage.hitboxes)) {
			          		var hitbox2 = ((game.started) ? stage.hitboxes[o] : previewStage.hitboxes[o]);
			          		if (checkHit([projectile.x + hitbox1[0]*projectile.width, projectile.y + hitbox1[1]*projectile.height, projectile.x + hitbox1[2]*projectile.width, projectile.y + hitbox1[3]*projectile.height], hitbox2)) {
			            		for (var i in player.projectiles) {
									if (player.projectiles[i].id == projectile.id) {
										player.projectiles.splice(i, 1);
										break;
									}
								}
			          		}
			        	}
			      	}
			    }

				for (var l in player.projectiles) {
					projectile = player.projectiles[l];
					projectile.x += projectile.velocity[0];
					projectile.y += projectile.velocity[1];
					projectile.velocity[1] += projectile.weight*0.00075*(60/gameSpeed)*(60/gameSpeed);

					if (checkOffstage(projectile.x, projectile.y, ((game.started) ? game.stage : previewStage))) {
						player.projectiles.splice(l, 1);
					}
				}

				if(!player.lost && !player.won) {
					if(game.started && !player.alive && player.stock > 0 && game.time - player.deathTime > player.spawnCooldown) {
					    player.x = game.stage.spawns[k][0];
					    player.y = game.stage.spawns[k][1];
					    player.velX = 0;
					    player.velY = 0;
					    player.alive = true;
					    player.grounded = false;
					    player.launch = 0;
					    player.action = 'idle';
					    player.animationFrame = 0;
					    player.jumps = player.fighter.jumps;
					} else if (game.started && !player.alive && player.stock <= 0) {
						player.lost = true;

						var leftAlive = [];
						for (var l in game.players) {
							if (!game.players[l].lost) {
								leftAlive.push(game.players[l]);
							}
						}

						if (leftAlive.length == 1) {
							leftAlive[0].won = true;
						}
					}
					k++

					if(game.started && player.alive && checkOffstage(player.x, player.y, game.stage)) {
						player.alive = false;
						player.stock -= 1;
						player.deathTime = game.time;
					} else if (!game.started && checkOffstage(player.x, player.y, previewStage)) {
						player.x = previewStage.spawns[0][0];
					    player.y = previewStage.spawns[0][1];
					    player.velX = 0;
					    player.velY = 0;
					    player.alive = true;
					    player.grounded = false;
					    player.launch = 0;
					    player.action = 'idle';
					    player.animationFrame = 0;
					    player.jumps = 0;
					}

					if((player.action == 'dtilt' || player.action == 'dair' || player.action == 'nair' || player.action == 'neutral' || player.action == 'forward' || player.action == 'bair' || player.action == 'fair' || player.action == 'uair') && frame == 0 && player.lastFrame[0] != 0 && player.lastFrame[1] == player.action) {
						for (var l in player.fighter.hitboxes[player.action]) {
							var checkFrame = player.fighter.hitboxes[player.action][l];
							for (var m in checkFrame) {
								checkFrame[m]['alreadyHit'] = [];
							}
						}

						player.action = 'idle';
						player.animationFrame = 0;
					}

					player.animationFrame = (player.animationFrame + (60/gameSpeed))%(player.fighter.animationTime*player.fighter.frames[player.action]);

					if (!player.grounded) {
						player.velY += (player.fighter.terminalVelocity/13.5)*(60/gameSpeed)*(60/gameSpeed);
					}

					if (player.velX > 0) {
						player.velX = Math.max(player.velX - (0.0002 + ((player.grounded) ? 0.0004 : 0))*(60/gameSpeed)*(60/gameSpeed), 0);
					} else if (player.velX < 0) {
						player.velX = Math.min(player.velX + (0.0002 + ((player.grounded) ? 0.0004 : 0))*(60/gameSpeed)*(60/gameSpeed), 0);
					}

					if (player.stun <= 0) {
						if (player.action == 'run' || player.action == 'airmove' || player.action == 'stun') {
							player.action = 'idle';
						}
						if (player.movement.left) {
							if (player.velX > -player.fighter.runSpeed*(60/gameSpeed)) {
					    		player.velX -= (player.fighter.runSpeed/1.31)*(60/gameSpeed);
					    	}
							if (player.action == 'idle' && player.grounded) {
								player.action = 'run';
								if (player.lastFrame[1] != 'run') {
									player.animationFrame = 0;
								}
							}
							if (player.action == 'idle' && !player.grounded) {
								player.action = 'airmove';
								if (player.lastFrame[1] != 'airmove') {
									player.animationFrame = 0;
								}
							}
							if (player.grounded) {
								player.facing = 'left';
							}
					    }
					    if (player.movement.up) {
					    	if (!player.upPressed) {
					      		if (player.jumps > 0) {
					      			player.grounded = false;
					      			player.velY = -player.fighter.jumpStrength*(60/gameSpeed);
					      			player.jumps -= 1;
					      		}
					      	}
					      	player.upPressed = true;
				    	} else {
				    		player.upPressed = false;
				    	}
				    	if (player.movement.right) {
				    		if (player.velX < player.fighter.runSpeed*(60/gameSpeed)) {
					    		player.velX += (player.fighter.runSpeed/1.31)*(60/gameSpeed);
					    	}
				      		if (player.action == 'idle' && player.grounded) {
								player.action = 'run';
								if (player.lastFrame[1] != 'run') {
									player.animationFrame = 0;
								}
							}
							if (player.action == 'idle' && !player.grounded) {
								player.action = 'airmove';
								if (player.lastFrame[1] != 'airmove') {
									player.animationFrame = 0;
								}
							}
							if (player.grounded) {
								player.facing = 'right';
							}
						}
				    	if (player.movement.down) {
				    		if (!player.grounded && player.velY < player.fighter.terminalVelocity*1.7*(60/gameSpeed)) {
					      		player.velY += (player.fighter.terminalVelocity/5)*(60/gameSpeed);
					      	}
				    	}
				    } else {
				    	player.action = 'stun';
				    	player.stun -= Math.max(0, game.time - tempTime);
				    	player.animationFrame = 0;
				    }

			    	if (player.action != 'stun' && player.velY > player.fighter.terminalVelocity*(60/gameSpeed)) {
			    		player.velY = Math.max(player.velY - (player.fighter.terminalVelocity/20)*(60/gameSpeed), player.fighter.terminalVelocity*(60/gameSpeed));
			    	}

			    	if (player.velY < 0) {
			    		player.grounded = false;
			    	}

			    	player.x += player.velX;
			    	player.y += player.velY;

				    if (frame != player.lastFrame[0] || player.action != player.lastFrame[1]) {
					    for (var effect in player.fighter.effects[player.action][frame]) {
							player.fighter.effects[player.action][frame][effect](player);
						}
					}

			    	if ((player.action == 'idle' || player.action == 'airmove') && player.lastFrame[1] != player.action) {
			    		player.animationFrame = 0;
			    	}

			    	player.lastFrame = [frame, player.action];
			    }
			}
		}
	} catch (e) {
		console.log(e);
	}

}, 1000 / gameSpeed);

setInterval(function() {
	try {
		for (var i in games) {
			for (var j in games[i].players) {
				io.to(games[i].players[j].id).emit('state', games[i]);
			}
		}

		for (var i in lobby) {
			io.to(lobby[i].id).emit('games', games);
		}
	}
	catch (e) {
		console.log(e);
	}
}, 1000 / 30);

setInterval(function() {
	try {
		for (var i in games) {
			for (var j in games[i].players) {
				io.to(games[i].players[j].id).emit('ping', (new Date()).getTime());
			}
		}

		for (var i in lobby) {
			io.to(lobby[i].id).emit('ping', (new Date()).getTime());
		}
	}
	catch (e) {
		console.log(e);
	}
}, 1000);