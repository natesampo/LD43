var imported = document.createElement('script');
imported.src = '/jszip.js';
document.head.appendChild(imported);

imported = document.createElement('script');
imported.src = '/jszip-utils.js';
document.head.appendChild(imported);

var socket = io();

var debug = false;
var cameraBoundX = 0.2;
var cameraBoundY = 0.2;

var nameLength = 20;
var gameNameLength = 20;
var animationTimeLength = 5;
var spritesLength = 5;
var damageLength = 4;
var stunLength = 4;
var launchXLength = 3;
var launchYLength = 3;
var XEffectLength = 8;
var YEffectLength = 8;
var XVelEffectLength = 8;
var YVelEffectLength = 8;
var ProjectileLength = 20;
var ProjectileNameLength = 20;
var XRelLength = 8;
var YRelLength = 8;
var XVelLength = 8;
var YVelLength = 8;
var weightLength = 8;
var piercingLength = 8;
var fighterNameLength = 20;
var fighterJumpsLength = 4;
var fighterJumpStrengthLength = 8;
var fighterFallSpeedLength = 8;
var fighterWeightLength = 8;
var fighterRunSpeedLength = 8;
var fighterFrictionLength = 8;
var maxPlayers = 4;
var pingTime = 2000;
var gameSpeed = 30;
var demo = false;
var newDemoFighter = null;
var newDemoProjectiles = null;

var tempName = '';
var tempGameName = '';
var tempAnimationTime = '';
var tempSprites = '';
var tempDamage = '';
var tempStun = '';
var tempLaunchX = '';
var tempLaunchY = '';
var tempXEffect = '';
var tempYEffect = '';
var tempXVelEffect = '';
var tempYVelEffect = '';
var tempProjectile = '';
var tempProjectileName = '';
var tempXRel = '';
var tempYRel = '';
var tempXVel = '';
var tempYVel = '';
var tempWeight = '';
var tempPiercing = '';
var tempFighterName = '';
var tempFighterJumps = '';
var tempFighterJumpStrength = '';
var tempFighterFallSpeed = '';
var tempFighterWeight = '';
var tempFighterRunSpeed = '';
var tempFighterFriction = '';
var naming = false;
var namingGame = false;
var namingAnimationTime = false;
var namingSprites = false;
var namingDamage = -1;
var namingStun = -1;
var namingLaunchX = -1;
var namingLaunchY = -1;
var namingXEffect = false;
var namingYEffect = false;
var namingXVelEffect = false;
var namingYVelEffect = false;
var namingProjectile = false;
var namingProjectileName = false;
var namingXRel = false;
var namingYRel = false;
var namingXVel = false;
var namingYVel = false;
var namingWeight = false;
var namingPiercing = false;
var namingFighterName = false;
var namingFighterJumps = false;
var namingFighterJumpStrength = false;
var namingFighterFallSpeed = false;
var namingFighterWeight = false;
var namingFighterRunSpeed = false;
var namingFighterFriction = false;
var shift = false;
var fighterSelect = false;
var createFighter = false;
var uploadSelect = false;
var uploadNewFighter = false;
var spriteWidth = 0;
var spriteHeight = 0;
var ping = 0;
var sendPingTime = -1;
var newFighterFrame = 0;
var newFighterSprite = 0;
var newFighterAction = 'idle';
var newFighterXEffect = {'idle': {'0': 0}, 'stun': {'0': 0}, 'dodge': {'0': 0}, 'nair': {'0': 0}, 'neutral': {'0': 0}, 'run': {'0': 0}, 'airmove': {'0': 0}, 'forward': {'0': 0}, 'fair': {'0': 0}, 'uair': {'0': 0}, 'bair': {'0': 0}, 'dair': {'0': 0}, 'dtilt': {'0': 0}};
var newFighterYEffect = {'idle': {'0': 0}, 'stun': {'0': 0}, 'dodge': {'0': 0}, 'nair': {'0': 0}, 'neutral': {'0': 0}, 'run': {'0': 0}, 'airmove': {'0': 0}, 'forward': {'0': 0}, 'fair': {'0': 0}, 'uair': {'0': 0}, 'bair': {'0': 0}, 'dair': {'0': 0}, 'dtilt': {'0': 0}};
var newFighterXVelEffect = {'idle': {'0': 0}, 'stun': {'0': 0}, 'dodge': {'0': 0}, 'nair': {'0': 0}, 'neutral': {'0': 0}, 'run': {'0': 0}, 'airmove': {'0': 0}, 'forward': {'0': 0}, 'fair': {'0': 0}, 'uair': {'0': 0}, 'bair': {'0': 0}, 'dair': {'0': 0}, 'dtilt': {'0': 0}};
var newFighterYVelEffect = {'idle': {'0': 0}, 'stun': {'0': 0}, 'dodge': {'0': 0}, 'nair': {'0': 0}, 'neutral': {'0': 0}, 'run': {'0': 0}, 'airmove': {'0': 0}, 'forward': {'0': 0}, 'fair': {'0': 0}, 'uair': {'0': 0}, 'bair': {'0': 0}, 'dair': {'0': 0}, 'dtilt': {'0': 0}};
var newFighterProjectile = {'idle': {'0': ''}, 'stun': {'0': ''}, 'dodge': {'0': ''}, 'nair': {'0': ''}, 'neutral': {'0': ''}, 'run': {'0': ''}, 'airmove': {'0': ''}, 'forward': {'0': ''}, 'fair': {'0': ''}, 'uair': {'0': ''}, 'bair': {'0': ''}, 'dair': {'0': ''}, 'dtilt': {'0': ''}};
var newFighterProjectiles = 0;
var newFighterProjectileNum = 0;
var imgs = {};
var newFighterData = {};
var newFighterNewImage = false;
var newFighterNewSpriteSheet = false;
var newFighterDraw = '';
var newFighterView = ['hurtbox', 'hitbox', 'groundbox'];
var newFighterBoxSelected = [null, ''];
var mouseX = 0;
var mouseY = 0;
var dragging = false;
var cornerSelected = [null, null];
var newFighterPlay = false;
var newFighterAnimationFrame = 0;
var lobbyFrame = 0;
var spritesInSheet = 1;
var selectedSlider = null;
var actions = ['idle', 'stun', 'dodge', 'nair', 'neutral', 'run', 'airmove', 'forward', 'fair', 'uair', 'bair', 'dair', 'dtilt', 'entrance'];

var player;
var game;
var gamez;
var numPlayer;
var data;
var fighters;
var projectiles;
var stages;

class Button {
	constructor(id, getX, getY, getWidth, getHeight, lineWidth, onClick, canClick, getColor, getText, textColor, getFont, getImage, getVisible) {
		this.id = id;
		this.getX = getX;
		this.getY = getY;
		this.getWidth = getWidth;
		this.getHeight = getHeight;
		this.lineWidth = lineWidth;
		this.onClick = onClick;
		this.canClick = canClick;
		this.getColor = getColor;
		this.getText = getText;
		this.textColor = textColor;
		this.getFont = getFont;
		this.getImage = getImage;
		this.getVisible = getVisible;
	}
}

class Slider {
	constructor(id, getValue, setValue, min, max, getX, getY, getLineWidth, getLineHeight, getBoxWidth, getBoxHeight, getBoxThickness, getLineColor, getBoxColor, getVisible) {
		this.id = id;
		this.getValue = getValue;
		this.setValue = setValue;
		this.min = min;
		this.max = max;
		this.getX = getX;
		this.getY = getY;
		this.getLineWidth = getLineWidth;
		this.getLineHeight = getLineHeight;
		this.getBoxWidth = getBoxWidth;
		this.getBoxHeight = getBoxHeight;
		this.getBoxThickness = getBoxThickness;
		this.getLineColor = getLineColor;
		this.getBoxColor = getBoxColor;
		this.getVisible = getVisible;
	}
}

var createAttackInputs = [];

var createFighterButtons = [new Button('back', function() {return canvas.width/60;}, function() {return canvas.height/33.75;}, function() {return canvas.width/10;}, function() {return canvas.height/15;}, 3, function() {demo = false; fighterSelect = false; createFighter=false;}, function() {return true;}, function() {return 'white';}, function() {return ['Back'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('loadExistingFighter', function() {return 0.005*canvas.width;}, function() {return 0.94*canvas.height;}, function() {return canvas.width/7;}, function() {return canvas.height/20;}, 3, function() {fighterSelect = !fighterSelect;}, function() {return true;}, function() {return 'white';}, function() {return ['Load Existing Fighter'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('uploadFighter', function() {return 0.012*canvas.width + this.getWidth();}, function() {return 0.94*canvas.height;}, function() {return canvas.width/7;}, function() {return canvas.height/20;}, 3, function() {uploadNewFighter = true; document.getElementById('folderInputButton').click();}, function() {return true;}, function() {return 'white';}, function() {return ['Upload Fighter'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('demoFighter', function() {return 0.703*canvas.width;}, function() {return 0.94*canvas.height;}, function() {return canvas.width/7;}, function() {return canvas.height/20;}, 3, function() {newFighterPlay = false; var newFighterStr = encodeNewFighter(newFighterData); for(var i in newFighterData['projectiles']) {var found = false; for (var j in projectiles) {if (projectiles[j].name == i) {found = true; break;}} if (!found) {newFighterStr = newFighterStr.replace('projectile,' + i, 'projectile,' + encodeNewProjectile(i).replace(/\n/g, '\\').replace(/\@/g, '?').replace(/\;/g, '`').replace(/\:/g, '~').replace(/\,/g, '+').replace(/\=/g, '$').replace(/\_/g, '*'));}} socket.emit('createGame', false, newFighterStr, newFighterSprite); socket.emit('rename', newFighterData['name']);}, function() {return true;}, function() {return 'white';}, function() {return ['Demo Fighter'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('downloadFighter', function() {return 0.853*canvas.width;}, function() {return 0.94*canvas.height;}, function() {return canvas.width/7;}, function() {return canvas.height/20;}, 3, function() {downloadNewFighter();}, function() {return true;}, function() {return 'white';}, function() {return ['Download Fighter'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('newAttack', function() {return canvas.width/1.09 - this.getWidth()/2;}, function() {return canvas.height/16.5;}, function() {return canvas.width/10;}, function() {return canvas.height/25;}, 3, function() {newAttackInputs(); if (!newFighterData['attacks'][newFighterAction]) {newFighterData['attacks'][newFighterAction]=[];} newFighterData['attacks'][newFighterAction].push({'damage': 0, 'launch': [0, 0], 'stun': 0, 'frames': []});}, function() {return ((newFighterData['attacks'][newFighterAction]) ? newFighterData['attacks'][newFighterAction].length < 8 : true);}, function() {return 'white';}, function() {return ['New'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return newFighterAction != 'stock' && newFighterAction != 'entrance';}),
	new Button('removeAttack', function() {return canvas.width/1.09 - this.getWidth()/2;}, function() {return canvas.height/14 + this.getHeight() + ((newFighterData['attacks'][newFighterAction]) ? newFighterData['attacks'][newFighterAction].length*canvas.height/10 : 0);}, function() {return canvas.width/10;}, function() {return canvas.height/25;}, 3, function() {if (newFighterData['attacks'][newFighterAction]) {newFighterData['attacks'][newFighterAction].splice(-1, 1); createAttackInputs.splice(-4, 4);}}, function() {return ((newFighterData['attacks'][newFighterAction]) ? newFighterData['attacks'][newFighterAction].length > 0 : false);}, function() {return 'white';}, function() {return ['Remove'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return ((newFighterData['attacks'][newFighterAction]) ? newFighterData['attacks'][newFighterAction].length > 0 : false);}),
	new Button('addX', function() {return 0.657*canvas.width;}, function() {return 0.593*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] = newFighterXEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('setX', function() {return 0.707*canvas.width;}, function() {return 0.593*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] = newFighterXEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('addY', function() {return 0.657*canvas.width;}, function() {return 0.647*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] = newFighterYEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('setY', function() {return 0.707*canvas.width;}, function() {return 0.647*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] = newFighterYEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('addXVel', function() {return 0.657*canvas.width;}, function() {return 0.701*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] = newFighterXVelEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('setXVel', function() {return 0.707*canvas.width;}, function() {return 0.701*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] = newFighterXVelEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('addYVel', function() {return 0.657*canvas.width;}, function() {return 0.755*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] = newFighterYVelEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('setYVel', function() {return 0.707*canvas.width;}, function() {return 0.755*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] = newFighterYVelEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('facingX', function() {return 0.773*canvas.width;}, function() {return 0.593*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['facing'] == 0) {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['facing'] = 1;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['facing'] = 0;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['facing'] == 1) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('facingY', function() {return 0.773*canvas.width;}, function() {return 0.701*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['facing'] == 0) {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['facing'] = 1;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['facing'] = 0;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['facing'] == 1) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('lingeringLand', function() {return 0.707*canvas.width;}, function() {return 0.82*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'].includes('land')) {newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'] = newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'].replace(',land,', '').replace(',land', '').replace('land,', '').replace('land', '');} else {newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'] = newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'] + ((newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'].length > 0) ? ',land' : 'land');}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'].includes('land')) {return['x'];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('lingeringAttack', function() {return 0.773*canvas.width;}, function() {return 0.82*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'].includes('attack')) {newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'] = newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'].replace(',attack,', '').replace(',attack', '').replace('attack,', '').replace('attack', '');} else {newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'] = newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'] + ((newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'].length > 0) ? ',attack' : 'attack');}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['lingering'].includes('attack')) {return['x'];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('turnable', function() {return 0.707*canvas.width;}, function() {return 0.851*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {newFighterData['effects'][newFighterAction][newFighterFrame]['turnable'] = !newFighterData['effects'][newFighterAction][newFighterFrame]['turnable'];}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['turnable']) {return['x'];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('uploadImage', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return 3.05*canvas.height/4;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {newFighterNewImage=true; document.getElementById('inputButton').click();}, function() {return true;}, function() {return 'white';}, function() {return ['Upload Image'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('uploadSpriteSheet', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return 0.95*canvas.height/4 - this.getHeight();}, function() {return canvas.width/7;}, function() {return canvas.height/20;}, 3, function() {newFighterNewSpriteSheet=true; document.getElementById('inputButton').click();}, function() {return true;}, function() {return 'white';}, function() {return ['Upload Sprite Sheet'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return newFighterAction != 'stock';}),
	new Button('downloadAsSpriteSheet', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return 3.7*canvas.height/4;}, function() {return canvas.width/4;}, function() {return canvas.height/20;}, 3, function() {downloadAsSpriteSheet();}, function() {return true;}, function() {return 'white';}, function() {return ['Download Images As Sprite Sheet'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('play', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return 3.05*canvas.height/4 + canvas.height/135 + this.getHeight();}, function() {return canvas.width/36;}, function() {return canvas.height/20;}, 3, function() {newFighterPlay = !newFighterPlay;}, function() {return true;}, function() {return 'white';}, function() {return [];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return ((newFighterPlay) ? imgs['menu']['pause'] : imgs['menu']['play']);}, function() {return newFighterAction != 'stock';}),
	new Button('renameAnimationTime', function() {return canvas.width/2 - this.getWidth()/2 - context.measureText(' ticks per frame').width/2;}, function() {return 3.55*canvas.height/4;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingAnimationTime) ? context.measureText(tempAnimationTime).width + canvas.width/384 : context.measureText(newFighterData['animationTimes'][newFighterAction].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingAnimationTime) {tempAnimationTime = ''} namingAnimationTime = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingAnimationTime) ? newFighterData['animationTimes'][newFighterAction].toString() : tempAnimationTime)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {if(newFighterAction == 'stock') {return false;} context.fillStyle=this.textColor; context.font=this.getFont(); context.fillText(' ticks per frame', canvas.width/2 + this.getWidth()/2, this.getY() + canvas.height/60); context.fillStyle=this.getColor(); return true;}),
	new Button('renameSprites', function() {return canvas.width/2 - this.getWidth()/2 - context.measureText(' sprites in sheet').width/2;}, function() {return 0.62*canvas.height/4;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingSprites) ? context.measureText(tempSprites).width + canvas.width/384 : context.measureText(spritesInSheet).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingSprites) {tempSprites = '';} namingSprites = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingSprites) ? spritesInSheet : tempSprites)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {if(newFighterAction == 'stock') {return false;} context.fillStyle=this.textColor; context.font=this.getFont(); context.fillText(' sprites in sheet', canvas.width/2 + this.getWidth()/2, this.getY() + canvas.height/60); context.fillStyle=this.getColor(); return true;}),
	new Button('renameXEffect', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.587*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingXEffect) ? context.measureText(tempXEffect).width + canvas.width/384 : context.measureText(newFighterXEffect[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingXEffect) {tempXEffect = '';} namingXEffect = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingXEffect) ? newFighterXEffect[newFighterAction][newFighterFrame].toString() : tempXEffect)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('renameYEffect', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.639*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingYEffect) ? context.measureText(tempYEffect).width + canvas.width/384 : context.measureText(newFighterYEffect[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingYEffect) {tempYEffect = '';} namingYEffect = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingYEffect) ? newFighterYEffect[newFighterAction][newFighterFrame].toString() : tempYEffect)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('renameXVelEffect', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.693*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingXVelEffect) ? context.measureText(tempXVelEffect).width + canvas.width/384 : context.measureText(newFighterXVelEffect[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingXVelEffect) {tempXVelEffect = '';} namingXVelEffect = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingXVelEffect) ? newFighterXVelEffect[newFighterAction][newFighterFrame].toString() : tempXVelEffect)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('renameYVelEffect', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.747*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingYVelEffect) ? context.measureText(tempYVelEffect).width + canvas.width/384 : context.measureText(newFighterYVelEffect[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingYVelEffect) {tempYVelEffect = '';} namingYVelEffect = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingYVelEffect) ? newFighterYVelEffect[newFighterAction][newFighterFrame].toString() : tempYVelEffect)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('renameProjectile', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.782*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingProjectile) ? context.measureText(tempProjectile).width + canvas.width/384 : context.measureText(newFighterProjectile[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingProjectile) {tempProjectile = '';} namingProjectile = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingProjectile) ? newFighterProjectile[newFighterAction][newFighterFrame].toString() : tempProjectile)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance');}),
	new Button('renameProjectileName', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.562*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingProjectileName) ? context.measureText(tempProjectileName).width + canvas.width/384 : context.measureText(newFighterAction).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingProjectileName) {tempProjectileName = '';} namingProjectileName = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingProjectileName) ? newFighterAction : tempProjectileName)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && !(newFighterData['effects'][newFighterAction]));}),
	new Button('renameXRel', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.602*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingXRel) ? context.measureText(tempXRel).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['x'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingXRel) {tempXRel = '';} namingXRel = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingXRel) ? newFighterData['projectiles'][newFighterAction]['x'].toString() : tempXRel)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && !(newFighterData['effects'][newFighterAction]));}),
	new Button('renameYRel', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.642*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingYRel) ? context.measureText(tempYRel).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['y'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingYRel) {tempYRel = '';} namingYRel = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingYRel) ? newFighterData['projectiles'][newFighterAction]['y'].toString() : tempYRel)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && !(newFighterData['effects'][newFighterAction]));}),
	new Button('renameXVel', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.682*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingXVel) ? context.measureText(tempXVel).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['velX'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingXVel) {tempXVel = '';} namingXVel = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingXVel) ? newFighterData['projectiles'][newFighterAction]['velX'].toString() : tempXVel)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && !(newFighterData['effects'][newFighterAction]));}),
	new Button('renameYVel', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.722*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingYVel) ? context.measureText(tempYVel).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['velY'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingYVel) {tempYVel = '';} namingYVel = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingYVel) ? newFighterData['projectiles'][newFighterAction]['velY'].toString() : tempYVel)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && !(newFighterData['effects'][newFighterAction]));}),
	new Button('renameWeight', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.762*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingWeight) ? context.measureText(tempWeight).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['weight'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingWeight) {tempWeight = '';} namingWeight = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingWeight) ? newFighterData['projectiles'][newFighterAction]['weight'].toString() : tempWeight)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && !(newFighterData['effects'][newFighterAction]));}),
	new Button('renamePiercing', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.802*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingPiercing) ? context.measureText(tempPiercing).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['hitsLeft'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingPiercing) {tempPiercing = '';} namingPiercing = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingPiercing) ? newFighterData['projectiles'][newFighterAction]['hitsLeft'].toString() : tempPiercing)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && !(newFighterData['effects'][newFighterAction]));}),
	new Button('renameFighterName', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.174*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterName) ? context.measureText(tempFighterName).width + canvas.width/384 : context.measureText(newFighterData['name']).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterName) {tempFighterName = '';} namingFighterName = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterName) ? newFighterData['name'] : tempFighterName)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('renameFighterJumps', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.209*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterJumps) ? context.measureText(tempFighterJumps).width + canvas.width/384 : context.measureText(newFighterData['jumps'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterJumps) {tempFighterJumps = '';} namingFighterJumps = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterJumps) ? newFighterData['jumps'].toString() : tempFighterJumps)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('renameFighterJumpStrength', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.244*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterJumpStrength) ? context.measureText(tempFighterJumpStrength).width + canvas.width/384 : context.measureText(newFighterData['jumpStrength'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterJumpStrength) {tempFighterJumpStrength = '';} namingFighterJumpStrength = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterJumpStrength) ? newFighterData['jumpStrength'].toString() : tempFighterJumpStrength)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('renameFighterFallSpeed', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.279*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterFallSpeed) ? context.measureText(tempFighterFallSpeed).width + canvas.width/384 : context.measureText(newFighterData['terminalVelocity'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterFallSpeed) {tempFighterFallSpeed = '';} namingFighterFallSpeed = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterFallSpeed) ? newFighterData['terminalVelocity'].toString() : tempFighterFallSpeed)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('renameFighterWeight', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.314*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterWeight) ? context.measureText(tempFighterWeight).width + canvas.width/384 : context.measureText(newFighterData['weight'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterWeight) {tempFighterWeight = '';} namingFighterWeight = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterWeight) ? newFighterData['weight'].toString() : tempFighterWeight)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('renameFighterRunSpeed', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.349*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterRunSpeed) ? context.measureText(tempFighterRunSpeed).width + canvas.width/384 : context.measureText(newFighterData['runSpeed'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterRunSpeed) {tempFighterRunSpeed = '';} namingFighterRunSpeed = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterRunSpeed) ? newFighterData['runSpeed'].toString() : tempFighterRunSpeed)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('renameFighterFriction', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.384*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterFriction) ? context.measureText(tempFighterFriction).width + canvas.width/384 : context.measureText(newFighterData['friction'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterFriction) {tempFighterFriction = '';} namingFighterFriction = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterFriction) ? newFighterData['friction'].toString() : tempFighterFriction)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('addHurtbox', function() {return 2.52*canvas.width/4;}, function() {return canvas.height/4;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {newFighterDraw = 'hurtbox';}, function() {return true;}, function() {return ((newFighterDraw == 'hurtbox' || newFighterDraw.substring(0, 11) == 'hurtboxDraw') ? 'red' : 'white');}, function() {return ['Add Hurtbox'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && newFighterData['effects'][newFighterAction]);}),
	new Button('addHitbox', function() {return 2.52*canvas.width/4 + this.getWidth() + canvas.width/120;}, function() {return canvas.height/4;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {newFighterDraw = 'hitbox';}, function() {return true;}, function() {return ((newFighterDraw == 'hitbox' || newFighterDraw.substring(0, 10) == 'hitboxDraw') ? 'blue' : 'white');}, function() {return ['Add Hitbox'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance');}),
	new Button('addGroundbox', function() {return 0.686*canvas.width;}, function() {return canvas.height/14;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (newFighterData['groundboxes'][newFighterAction] && newFighterData['groundboxes'][newFighterAction][newFighterFrame] && newFighterData['groundboxes'][newFighterAction][newFighterFrame].length > 0) {delete newFighterData['groundboxes'][newFighterAction][newFighterFrame];} else {newFighterDraw = 'groundbox';}}, function() {return true;}, function() {return ((newFighterDraw == 'groundbox' || newFighterDraw.substring(0, 10) == 'groundboxDraw') ? 'rgba(181, 101, 29, 1)' : 'white');}, function() {return ((newFighterData['groundboxes'][newFighterAction] && newFighterData['groundboxes'][newFighterAction][newFighterFrame] && newFighterData['groundboxes'][newFighterAction][newFighterFrame].length > 0) ? ['Remove Groundbox'] : ['Add Groundbox']);}, 'black', function() {return (canvas.width/100).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterData['effects'][newFighterAction]);}),
	new Button('viewOnlyHurtbox', function() {return 2.52*canvas.width/4;}, function() {return canvas.height/4+this.getHeight()+canvas.height/120;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (contains(newFighterView, 'hurtbox')) {remove(newFighterView, 'hurtbox');} else {newFighterView.push('hurtbox');}}, function() {return true;}, function() {return ((contains(newFighterView, 'hurtbox')) ? 'red' : 'white');}, function() {return ['View Hurtboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && newFighterData['effects'][newFighterAction]);}),
	new Button('viewOnlyHitbox', function() {return 2.52*canvas.width/4 + this.getWidth() + canvas.width/120;}, function() {return canvas.height/4+this.getHeight()+canvas.height/120;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (contains(newFighterView, 'hitbox')) {remove(newFighterView, 'hitbox');} else {newFighterView.push('hitbox');}}, function() {return true;}, function() {return ((contains(newFighterView, 'hitbox')) ? 'blue' : 'white');}, function() {return ['View Hitboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance');}),
	new Button('viewOnlyGroundbox', function() {return 0.686*canvas.width;}, function() {return canvas.height/14+this.getHeight()+canvas.height/120;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (contains(newFighterView, 'groundbox')) {remove(newFighterView, 'groundbox');} else {newFighterView.push('groundbox');}}, function() {return true;}, function() {return ((contains(newFighterView, 'groundbox')) ? 'rgba(181, 101, 29, 1)' : 'white');}, function() {return ['View Groundbox'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterData['effects'][newFighterAction]);}),
	new Button('copyHurtbox', function() {return 2.52*canvas.width/4;}, function() {return canvas.height/4+2*(this.getHeight()+canvas.height/120);}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (!newFighterData['hurtboxes'][newFighterAction]) {newFighterData['hurtboxes'][newFighterAction] = {};} newFighterData['hurtboxes'][newFighterAction][newFighterFrame] = []; if (newFighterData['hurtboxes'][newFighterAction][newFighterFrame-1]) {for(var i in newFighterData['hurtboxes'][newFighterAction][newFighterFrame-1]) {newFighterData['hurtboxes'][newFighterAction][newFighterFrame].push(newFighterData['hurtboxes'][newFighterAction][newFighterFrame-1][i].slice());}}}, function() {return true;}, function() {return 'white';}, function() {return ['Copy Previous', 'Frame Hurtboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && newFighterData['effects'][newFighterAction]);}),
	new Button('copyHitbox', function() {return 2.52*canvas.width/4 + this.getWidth() + canvas.width/120;}, function() {return canvas.height/4+2*(this.getHeight()+canvas.height/120);}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (!newFighterData['hitboxes'][newFighterAction]) {newFighterData['hitboxes'][newFighterAction] = {};} newFighterData['hitboxes'][newFighterAction][newFighterFrame] = []; if (newFighterData['hitboxes'][newFighterAction][newFighterFrame-1]) {for(var i in newFighterData['hitboxes'][newFighterAction][newFighterFrame-1]) {newFighterData['hitboxes'][newFighterAction][newFighterFrame].push(newFighterData['hitboxes'][newFighterAction][newFighterFrame-1][i].slice());}}}, function() {return true;}, function() {return 'white';}, function() {return ['Copy Previous', 'Frame Hitboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance');}),
	new Button('copyGroundbox', function() {return 0.686*canvas.width;}, function() {return canvas.height/14+2*(this.getHeight()+canvas.height/120);}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (!newFighterData['groundboxes'][newFighterAction]) {newFighterData['groundboxes'][newFighterAction] = {};} newFighterData['groundboxes'][newFighterAction][newFighterFrame] = []; if (newFighterData['groundboxes'][newFighterAction][newFighterFrame-1]) {newFighterData['groundboxes'][newFighterAction][newFighterFrame] = newFighterData['groundboxes'][newFighterAction][newFighterFrame-1].slice();}}, function() {return true;}, function() {return 'white';}, function() {return ['Copy Previous', 'Frame Groundbox'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterData['effects'][newFighterAction]);}),
	new Button('clearHurtbox', function() {return 2.52*canvas.width/4;}, function() {return canvas.height/4+3*(this.getHeight()+canvas.height/120);}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (newFighterData['hurtboxes'][newFighterAction] && newFighterData['hurtboxes'][newFighterAction][newFighterFrame]) {newFighterData['hurtboxes'][newFighterAction][newFighterFrame] = [];}}, function() {return true;}, function() {return 'white';}, function() {return ['Clear Hurtboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance' && newFighterData['effects'][newFighterAction]);}),
	new Button('clearHitbox', function() {return 2.52*canvas.width/4 + this.getWidth() + canvas.width/120;}, function() {return canvas.height/4+3*(this.getHeight()+canvas.height/120);}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (newFighterData['hitboxes'][newFighterAction] && newFighterData['hitboxes'][newFighterAction][newFighterFrame]) {newFighterData['hitboxes'][newFighterAction][newFighterFrame] = [];}}, function() {return true;}, function() {return 'white';}, function() {return ['Clear Hitboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterAction != 'entrance');}),
	new Button('idle', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Idle'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('airmove', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Airmove'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('dodge', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 2*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Dodge'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('run', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 3*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Run'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('stun', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 4*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Stun'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('uair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 5*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Up Air'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('dair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 6*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Down Air'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('bair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 7*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Back Air'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('fair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 8*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Forward Air'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('nair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 9*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Up Tilt'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('dtilt', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 10*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Down Tilt'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('forward', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 11*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Dash Attack'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('neutral', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 12*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Neutral'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('stock', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 14.25*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Stock'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('entrance', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 13.25*this.getHeight();}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Entrance'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('newSkin', function() {return 0.335*canvas.width + ((imgs['new']) ? Object.keys(imgs['new']).length-1 : 0)*this.getWidth();}, function() {return 0.07*canvas.height;}, function() {return canvas.width/40;}, function() {return canvas.height/24;}, 3, function() {createFighterButtonsLength+=1; if(!imgs['new']) {imgs['new'] = {'0': {}};} imgs['new'][Object.keys(imgs['new']).length] = {}; newFighterSprite=Object.keys(imgs['new']).length-1; newSkinButton(newFighterSprite);}, function() {return true;}, function() {return 'white';}, function() {return ['+'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('deleteSkin', function() {return 0.275*canvas.width;}, function() {return 0.07*canvas.height;}, function() {return canvas.width/40;}, function() {return canvas.height/24;}, 3, function() {for (var i in createFighterButtons) {if (createFighterButtons[i].id.startsWith('skin_') && parseInt(createFighterButtons[i].id.split('_')[1]) == Object.keys(imgs['new']).length-1) {createFighterButtons.splice(i, 1); createFighterButtonsLength--; break;}} delete imgs['new'][Object.keys(imgs['new']).length-1]; newFighterSprite = Math.min(newFighterSprite, Object.keys(imgs['new']).length-1);}, function() {return imgs['new'] && Object.keys(imgs['new']).length > 1;}, function() {return 'white';}, function() {return ['-'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('skin_0', function() {return 0.305*canvas.width + this.getWidth()*this.id.split('_')[1];}, function() {return 0.07*canvas.height;}, function() {return canvas.width/40;}, function() {return canvas.height/24;}, 3, function() {newFighterSprite = parseInt(this.id.split('_')[1]);}, function() {return true;}, function() {return ((newFighterSprite == this.id.split('_')[1]) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return [this.id.split('_')[1]];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('newProjectile', function() {return 0.40625*canvas.width-this.getWidth()*2;}, function() {return canvas.height/4 + newFighterProjectiles*canvas.height/26;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {createFighterButtonsLength+=1; newFighterProjectiles+=1; newFighterProjectileNum+=1; newProjectileButton(); newFighterData['frames']['Projectile' + newFighterProjectileNum.toString()] = 1; newFighterData['projectiles']['Projectile' + newFighterProjectileNum.toString()] = {'x': 0, 'y': 0, 'width': 0.0166667, 'height': 0.05, 'velX': 0.015, 'velY': -0.015, 'weight': 0.001, 'hitsLeft': 1}; newFighterData['animationTimes']['Projectile' + newFighterProjectileNum.toString()] = 5;}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['New Projectile'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('deleteProjectile', function() {return 0.685*canvas.width;}, function() {return 0.865*canvas.height;}, function() {return canvas.width/10;}, function() {return canvas.height/30;}, 3, function() {if (Object.keys(newFighterData['projectiles']).length > 1) {var found; var marker = false; for (var i in newFighterData['projectiles']) {if (marker) {found = i; break;} if (i == newFighterAction) {marker = true;} else {found = i;}} delete newFighterData['projectiles'][newFighterAction]; delete newFighterData['hitboxes'][newFighterAction]; delete newFighterData['attacks'][newFighterAction]; newFighterProjectiles -= 1; for (var i in imgs['new']) {delete imgs['new'][i][newFighterAction];} var prevAction = newFighterAction; var projNum = 0; var hit = false; for (var i in createFighterButtons) {if (createFighterButtons[i].id == prevAction) {createFighterButtons.splice(i, 1); createFighterButtonsLength--; hit = true;} else {var gotcha = false; for (var j in newFighterData['projectiles']) {if (j == createFighterButtons[i].id) {gotcha = true; break;}} if (gotcha) {if (hit) {let num = projNum; createFighterButtons[i]['getY'] = function() {return canvas.height/4 + num*canvas.height/26;};} projNum += 1;} if (createFighterButtons[i].id == found) {createFighterButtons[i].onClick();}}}} else {delete newFighterData['projectiles'][newFighterAction]; delete newFighterData['hitboxes'][newFighterAction]; delete newFighterData['attacks'][newFighterAction]; newFighterProjectiles -= 1; for (var i in imgs['new']) {delete imgs['new'][i][newFighterAction];} var prevAction = newFighterAction; for (var i in createFighterButtons) {if (createFighterButtons[i].id == prevAction) {createFighterButtons.splice(i, 1); createFighterButtonsLength--;} else if (createFighterButtons[i].id == 'idle') {createFighterButtons[i].onClick();}}}}, function() {return true;}, function() {return 'white';}, function() {return ['Delete Projectile'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && !(newFighterData['effects'][newFighterAction]));}),
	new Button('+', function() {return 0.59375*canvas.width;}, function() {return 3*canvas.height/4 + canvas.height/70;}, function() {return 0.025*canvas.width;}, function() {return canvas.height/22.5;}, 3, function() {newFighterFrame = newFighterData['frames'][newFighterAction]; newFighterButton(); newFighterData['frames'][newFighterAction]++; if(newFighterData['effects'][newFighterAction]) {newFighterData['effects'][newFighterAction][newFighterFrame] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null, 'lingering': '', 'turnable': false}; newFighterXEffect[newFighterAction][newFighterFrame] = 0; newFighterYEffect[newFighterAction][newFighterFrame] = 0; newFighterXVelEffect[newFighterAction][newFighterFrame] = 0; newFighterYVelEffect[newFighterAction][newFighterFrame] = 0; newFighterProjectile[newFighterAction][newFighterFrame] = '';}}, function() {return true;}, function() {return 'white';}, function() {return ['+'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return newFighterAction != 'stock';}),
	new Button('-', function() {return 0.59375*canvas.width;}, function() {return canvas.height/4 - canvas.height/70 - this.getHeight();}, function() {return 0.025*canvas.width;}, function() {return canvas.height/22.5;}, 3, function() {if (contains(actions, newFighterAction)) {delete newFighterData['effects'][newFighterData['frames'][newFighterAction]-1]; delete newFighterXEffect[newFighterAction][newFighterData['frames'][newFighterAction]-1]; delete newFighterYEffect[newFighterAction][newFighterData['frames'][newFighterAction]-1]; delete newFighterXVelEffect[newFighterAction][newFighterData['frames'][newFighterAction]-1]; delete newFighterYVelEffect[newFighterAction][newFighterData['frames'][newFighterAction]-1]; delete newFighterProjectile[newFighterAction][newFighterData['frames'][newFighterAction]-1]; delete newFighterData['effects'][newFighterAction][newFighterData['frames'][newFighterAction]-1];} if(newFighterData['hitboxes'][newFighterAction] && newFighterData['hitboxes'][newFighterAction][newFighterData['frames'][newFighterAction]-1]) {delete newFighterData['hitboxes'][newFighterAction][newFighterData['frames'][newFighterAction]-1];} if(newFighterData['hurtboxes'][newFighterAction] && newFighterData['hurtboxes'][newFighterAction][newFighterData['frames'][newFighterAction]-1]) {delete newFighterData['hurtboxes'][newFighterAction][newFighterData['frames'][newFighterAction]-1];} if(newFighterData['groundboxes'][newFighterAction] && newFighterData['groundboxes'][newFighterAction][newFighterData['frames'][newFighterAction]-1]) {delete newFighterData['groundboxes'][newFighterAction][newFighterData['frames'][newFighterAction]-1];} if(imgs['new'] && imgs['new'][0] && imgs['new'][0][newFighterAction] && imgs['new'][0][newFighterAction][newFighterData['frames'][newFighterAction]-1]) {delete imgs['new'][0][newFighterAction][newFighterData['frames'][newFighterAction]-1];} newFighterData['frames'][newFighterAction]--; newFighterButtonRemove();}, function() {return createFighterButtons.length > createFighterButtonsLength+1;}, function() {return 'white';}, function() {return ['-'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return newFighterAction != 'stock';}),
	new Button('0', function() {return 0.59375*canvas.width;}, function() {return canvas.height/4+this.getHeight()*parseInt(this.id);}, function() {return 0.025*canvas.width;}, function() {return (canvas.height/2)/(createFighterButtons.length-createFighterButtonsLength);}, 3, function() {newFighterAnimationFrame = newFighterData['animationTimes'][newFighterAction]*parseInt(this.id); newFighterFrame=parseInt(this.id); if(newFighterData['effects'][newFighterAction] && newFighterData['effects'][newFighterAction][newFighterFrame] == null) {newFighterData['effects'][newFighterAction][newFighterFrame] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}; newFighterXEffect[newFighterAction][newFighterFrame] = 0; newFighterYEffect[newFighterAction][newFighterFrame] = 0; newFighterXVelEffect[newFighterAction][newFighterFrame] = 0; newFighterYVelEffect[newFighterAction][newFighterFrame] = 0; newFighterProjectile[newFighterAction][newFighterFrame] = '';}}, function() {return true;}, function() {return ((newFighterFrame == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return [this.id];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return newFighterAction != 'stock';})];

var createFighterSliders = [new Slider('width', function() {return ((newFighterAction == 'entrance' || newFighterData['effects'][newFighterAction]) ? newFighterData['spriteWidth'] : newFighterData['projectiles'][newFighterAction]['width']);}, function(percent) {if (newFighterAction == 'entrance' || newFighterData['effects'][newFighterAction]) {newFighterData['spriteWidth']=percent*(this.max-this.min)+this.min;} else {newFighterData['projectiles'][newFighterAction]['width']=percent*(this.max-this.min)+this.min;}}, 0.002, 0.1875, function() {return canvas.width/3.2;}, function() {return canvas.height/5.4;}, function() {return canvas.width/10;}, function() {return canvas.height/300;}, function() {return canvas.width/200;}, function() {return canvas.height/100;}, function() {return canvas.width/600;}, function() {return 'black';}, function() {return 'white';}, function() {return newFighterAction != 'stock';}),
	new Slider('height', function() {return ((newFighterAction == 'entrance' || newFighterData['effects'][newFighterAction]) ? newFighterData['spriteHeight'] : newFighterData['projectiles'][newFighterAction]['height']);}, function(percent) {if (newFighterAction == 'entrance' || newFighterData['effects'][newFighterAction]) {newFighterData['spriteHeight']=percent*(this.max-this.min)+this.min;} else {newFighterData['projectiles'][newFighterAction]['height']=percent*(this.max-this.min)+this.min;}}, 0.002, 0.5, function() {return canvas.width/3.2;}, function() {return canvas.height/4.35;}, function() {return canvas.width/10;}, function() {return canvas.height/300;}, function() {return canvas.width/200;}, function() {return canvas.height/100;}, function() {return canvas.width/600;}, function() {return 'black';}, function() {return 'white';}, function() {return newFighterAction != 'stock';})];

var lobbyButtons = [new Button('createGame', function() {return canvas.width/60;}, function() {return canvas.height/33.75;}, function() {return canvas.width/10;}, function() {return canvas.height/15;}, 3, function() {demo = false; lobbyFrame = 0; socket.emit('createGame', true);}, function() {return true;}, function() {return 'white';}, function() {return ['Create Game'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('createFighter', function() {return 59*canvas.width/60 - this.getWidth();}, function() {return canvas.height/33.75;}, function() {return canvas.width/10;}, function() {return canvas.height/15;}, 3, function() {if (Object.keys(newFighterData).length == 0) {newFighterData['name'] = 'New Fighter'; newFighterData['jumps'] = 2; newFighterData['jumpStrength'] = 0.03; newFighterData['terminalVelocity'] = 0.02; newFighterData['weight'] = 10000; newFighterData['runSpeed'] = 0.007; newFighterData['friction'] = 1; newFighterData['frames'] = {}; newFighterData['hurtboxes'] = {}; newFighterData['hitboxes'] = {}; newFighterData['groundboxes'] = {}; newFighterData['attacks'] = {}; newFighterData['animationTimes'] = {}; newFighterData['spriteWidth'] = 0.05; newFighterData['spriteHeight'] = 0.15; newFighterData['effects'] = {}; newFighterData['projectiles'] = {}; for(var i in actions) {newFighterData['frames'][actions[i]] = 1; newFighterData['effects'][actions[i]] = {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null, 'lingering': '', 'turnable': actions[i] == 'idle' || actions[i] == 'run'}}; newFighterData['animationTimes'][actions[i]] = 5;}} demo = true; fighterSelect = false; createFighter = true;}, function() {return true;}, function() {return 'white';}, function() {return ['Create Fighter'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;})];

var preGameButtons = [new Button('leaveLobby', function() {return canvas.width/60;}, function() {return canvas.height/33.75;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {fighterSelect = false; lobbyFrame = 0; socket.emit('leaveGame');}, function() {return true;}, function() {return 'white';}, function() {return ['Leave Lobby'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('startGame', function() {return canvas.width/2 - canvas.width/10;}, function() {return canvas.height/1.2;}, function() {return canvas.width/5;}, function() {return canvas.height/10;}, 6, function() {lobbyFrame = 0; socket.emit('startGame');}, function() {return true;}, function() {return 'green';}, function() {return ['Fight!'];}, 'black', function() {return (canvas.width/60).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
	new Button('renameGame', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return canvas.height/10;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingGame) ? context.measureText(tempGameName).width + canvas.width/384 : context.measureText(game.name).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingGame) {tempGameName = ''} namingGame = true;}, function() {return true;}, function() {return 'white';}, function() {return [((tempGameName == '' && !namingGame) ? game.name : tempGameName)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {if (game.players[game.host].id == player.id) {return true;} else {context.font = this.getFont(); context.fillStyle = 'black'; context.textAlign = 'center'; context.fillText(this.getText(), this.getX() + this.getWidth()/2, this.getY() + this.getHeight()/10 + parseInt(this.getFont().substring(0, 2)) - (this.getHeight()/6)*(this.getText().length-1)); return false;}}),
	new Button('rename', function() {context.font = 'bold ' + (canvas.width/106.67).toString() + 'px Arial'; var a = context.measureText('Name: ').width; context.font = this.getFont(); return canvas.width/7.5 + a;}, function() {return canvas.height/4.3;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((naming) ? context.measureText(tempName).width + canvas.width/384 : context.measureText(player.name).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!naming) {tempName = ''} naming = true;}, function() {return true;}, function() {return 'white';}, function() {context.font = 'bold ' + (canvas.width/106.67).toString() + 'px Arial'; context.font = this.getFont(); return [((tempName == '' && !naming) ? player.name : tempName)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {context.font = 'bold ' + (canvas.width/106.67).toString() + 'px Arial'; context.fillStyle = 'black'; context.textAlign = 'center'; context.fillText('Name: ', canvas.width/7, canvas.height/4.035); context.fillStyle = this.textColor; context.font = this.getFont(); return true;})];

var gameButtons = [new Button('lobby', function() {return canvas.width/2 - canvas.width/10;}, function() {return 2.75*canvas.height/4;}, function() {return canvas.width/5;}, function() {return canvas.height/10;}, 3, function() {debug = false; game = null; socket.emit('leaveGame');}, function() {return true;}, function() {return 'white';}, function() {return ['Leave Game'];}, 'black', function() {return (canvas.width/60).toString() + 'px Arial';}, function() {return null;}, function() {return (player.lost || player.won);}),
	new Button('back', function() {return canvas.width/60;}, function() {return canvas.height/33.75;}, function() {return canvas.width/10;}, function() {return canvas.height/15;}, 3, function() {debug = false; game = null; socket.emit('leaveGame');}, function() {return true;}, function() {return 'white';}, function() {return ['Back'];}, 'black', function() {return (canvas.width/60).toString() + 'px Arial';}, function() {return null;}, function() {return demo;}),
	new Button('debug', function() {return 59*canvas.width/60 - this.getWidth();}, function() {return canvas.height/33.75;}, function() {return canvas.width/9;}, function() {return canvas.height/15;}, 3, function() {debug = !debug;}, function() {return true;}, function() {return 'white';}, function() {return ['Toggle Debug'];}, 'black', function() {return (canvas.width/60).toString() + 'px Arial';}, function() {return null;}, function() {return demo;})];

var preGameButtonsLength = preGameButtons.length;
var lobbyButtonsLength = lobbyButtons.length;
var createFighterButtonsLength = createFighterButtons.length-1;

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
var context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

function getFighterFromName(name) {
	for (var i in fighters) {
		if (fighters[i].name == name) {
			return fighters[i];
		}
	}
}

function createFighterButtonIDExists(id) {
	for (var i in createFighterButtons) {
		if (createFighterButtons[i].id == id) {
			return true;
		}
	}

	return false;
}

function breakUpSpriteSheet(spriteSheet, x, y) {
	var return_imgs = {};

	for (var i=0; i<y; i++) {
		return_imgs[i] = {};
		for (var j=0; j<x; j++) {
			var tempCanvas = document.createElement('canvas');
			var tempContext = tempCanvas.getContext('2d');
			tempContext.imageSmoothingEnabled = false;
			tempCanvas.width = spriteSheet.width/x;
			tempCanvas.height = spriteSheet.height/y;

			tempContext.drawImage(spriteSheet, j*tempCanvas.width, i*tempCanvas.height, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);

			var img = new Image();
			img.src = tempCanvas.toDataURL('image/png');
			return_imgs[i][j] = img;
		}
	}

	return return_imgs;
}

function createFighterFromText(data) {
	var tempFrame;
	var tempBoxes;
	var tempBox;
	var rect;

	sprWidth = parseFloat(data['spriteWidth']);
	sprHeight = parseFloat(data['spriteHeight']);

	rawDataArray = data['frames'].split('|');
	var frames = {};
	var effects = {};
	for (var i=0; i<rawDataArray.length; i+=2) {
		var tempFrameNum = parseInt(rawDataArray[i+1]);
		frames[rawDataArray[i]] = tempFrameNum;
		effects[rawDataArray[i]] = {};

		for (var j=0; j<tempFrameNum; j++) {
			effects[rawDataArray[i]][j] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null, 'lingering': '', 'turnable': false};
		}
	}

	rawDataArray = data['attacks'].split('|');
	var attacks = {};
	for (var i=0; i<rawDataArray.length; i+=2) {
		attacks[rawDataArray[i]] = [];
		tempBox = rawDataArray[i+1].split('_');
		for (var j=0; j<tempBox.length; j+=2) {
			tempBox[j+1] = tempBox[j+1].split(';');
			attacks[rawDataArray[i]].push({'damage': parseFloat(tempBox[j+1][0]), 'launch': [parseFloat(tempBox[j+1][1].split(',')[0]), parseFloat(tempBox[j+1][1].split(',')[1])], 'stun': parseFloat(tempBox[j+1][2]), 'frames': []});
			for(var k=0; k<frames[rawDataArray[i]]; k++) {
				attacks[rawDataArray[i]][j/2]['frames'].push([]);
			}
		}
	}

	var rawDataArray = data['hitboxes'].split('|');
	var hitboxes = {};
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
				hitboxes[rawDataArray[i]][tempBoxes[0]].push([parseFloat(rect[0])*sprWidth + 0.5 - sprWidth/2, parseFloat(rect[1])*sprHeight + 0.5 - sprHeight/2, parseFloat(rect[2])*sprWidth + 0.5 - sprWidth/2, parseFloat(rect[3])*sprHeight + 0.5 - sprHeight/2]);
				attacks[rawDataArray[i]][tempBox[0]]['frames'][tempBoxes[0]].push((k-1).toString());
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
					hurtboxes[rawDataArray[i]][tempFrame[j]].push([parseFloat(rect[0])*sprWidth + 0.5 - sprWidth/2, parseFloat(rect[1])*sprHeight + 0.5 - sprHeight/2, parseFloat(rect[2])*sprWidth + 0.5 - sprWidth/2, parseFloat(rect[3])*sprHeight + 0.5 - sprHeight/2]);
				}
			}
		}
	}

	rawDataArray = data['groundboxes'].split('|');
	var groundboxes = {};
	for (var i=0; i<rawDataArray.length; i+=2) {
		groundboxes[rawDataArray[i]] = {};
		tempFrame = rawDataArray[i+1].split('_');
		for (var j=0; j<tempFrame.length; j+=2) {
			if(tempFrame.length > 1) {
				rect = tempFrame[j+1].split(',');
				groundboxes[rawDataArray[i]][tempFrame[j]] = [parseFloat(rect[0])*sprWidth + 0.5 - sprWidth/2, parseFloat(rect[1])*sprHeight + 0.5 - sprHeight/2, parseFloat(rect[2])*sprWidth + 0.5 - sprWidth/2, parseFloat(rect[3])*sprHeight + 0.5 - sprHeight/2];
			}
		}
	}

	rawDataArray = data['effects'].split('|');
	var tempEffects;
	for (var i=0; i<rawDataArray.length; i+=2) {
		tempEffects = rawDataArray[i+1].split('_');
		for (var j=0; j<tempEffects.length; j++) {
			let tempFrames = tempEffects[j].split('=');
			for (var k=1; k<tempFrames.length; k++) {
				let tempEffect = tempFrames[k].split(';');
				for (var l=0; l<tempEffect.length; l++) {
					let tempArg = tempEffect[l].split(',');
					if (tempArg[0] == 'projectile') {
						if (effects[rawDataArray[i]][tempFrames[0]]['projectile'] == null) {
							effects[rawDataArray[i]][tempFrames[0]]['projectile'] = '';
						}

						if (effects[rawDataArray[i]][tempFrames[0]]['projectile'] != '') {
							effects[rawDataArray[i]][tempFrames[0]]['projectile'] += ',';
						}

						effects[rawDataArray[i]][tempFrames[0]]['projectile'] += tempArg[1];
					} if (tempArg[0] == 'lingering') {
						effects[rawDataArray[i]][tempFrames[0]]['lingering'] = tempArg[1];
					} if (tempArg[0] == 'turnable') {
						effects[rawDataArray[i]][tempFrames[0]]['turnable'] = true;
					} else if (tempArg[0] == 'x' || tempArg[0] == 'velX' || tempArg[0] == 'y' || tempArg[0] == 'velY') {
						if (tempArg[1] == 'set') {
							effects[rawDataArray[i]][tempFrames[0]][tempArg[0]]['set'] = tempArg[2];
							effects[rawDataArray[i]][tempFrames[0]][tempArg[0]]['facing'] = tempArg[3];
						} else if (tempArg[1] == 'add') {
							effects[rawDataArray[i]][tempFrames[0]][tempArg[0]]['add'] = tempArg[2];
							effects[rawDataArray[i]][tempFrames[0]][tempArg[0]]['facing'] = tempArg[3];
						}
					}
				}
			}
		}
	}

	rawDataArray = data['animationTimes'].split('|');
	var animationTimes = {};
	for (var i=0; i<rawDataArray.length; i+=2) {
		animationTimes[rawDataArray[i]] = parseFloat(rawDataArray[i+1]);
	}

	return {
		'name': data['name'],
		'jumps': parseInt(data['jumps']),
		'jumpStrength': parseFloat(data['jumpStrength']),
		'terminalVelocity': parseFloat(data['terminalVelocity']),
		'weight': parseFloat(data['weight']),
		'runSpeed': parseFloat(data['runSpeed']),
		'friction': parseFloat(data['friction']),
		'hurtboxes': hurtboxes,
		'hitboxes': hitboxes,
		'groundboxes': groundboxes,
		'attacks': attacks,
		'spriteWidth': sprWidth,
		'spriteHeight': sprHeight,
		'frames': frames,
		'effects': effects,
		'animationTimes': animationTimes,
		'projectiles': {},
		'sprites': parseInt(data['sprites'])};
}

function createProjectileFromText(data) {
	var hitboxes = {};
	var attacks = {};
	var sprWidth = parseFloat(data['width']);
	var sprHeight = parseFloat(data['height']);
	var tempBox;

	if (data['hitboxes'].length > 0) {
		var rawDataArray = data['hitboxes'].split('_');
		for (var i=0; i<rawDataArray.length; i++) {
			hitboxes[i.toString()] = [];
			tempBox = rawDataArray[i].split(';');
			for (var j=0; j<tempBox.length; j+=2) {
				tempBox[j+1] = tempBox[j+1].split(',');
				hitboxes[i.toString()].push({'id': tempBox[j], 'hitbox': [parseFloat(tempBox[j+1][0])*sprWidth + 0.5 - sprWidth/2, parseFloat(tempBox[j+1][1])*sprHeight + 0.5 - sprHeight/2, parseFloat(tempBox[j+1][2])*sprWidth + 0.5 - sprWidth/2, parseFloat(tempBox[j+1][3])*sprHeight + 0.5 - sprHeight/2]});
			}
		}
	}

	if (data['attacks'].length > 0) {
		rawDataArray = data['attacks'].split('_');
		for (var i=0; i<rawDataArray.length; i++) {
			tempBox = rawDataArray[i].split('=');
			for (var j=0; j<tempBox.length; j+=2) {
				tempBox[j+1] = tempBox[j+1].split(';');
				attacks[tempBox[0]] = {'damage': parseFloat(tempBox[j+1][0]), 'launch': [parseFloat(tempBox[j+1][1].split(',')[0]), parseFloat(tempBox[j+1][1].split(',')[1])], 'stun': parseFloat(tempBox[j+1][2])};
			}
		}
	}

	return {'name': data['name'],
		'facing': data['facing'],
		'x': data['x'],
		'y': data['y'],
		'width': sprWidth,
		'height': sprHeight,
		'velX': data['velX'],
		'velY': data['velY'],
		'weight': parseFloat(data['weight']),
		'animationTime': parseFloat(data['animationTime']),
		'hitsLeft': parseFloat(data['hitsLeft']),
		'frames': parseInt(data['frames']),
		'hitboxes': hitboxes,
		'attacks': attacks};
}

function encodeNewProjectile(proj) {
	var newProjectileString = 'name@' + proj +
		'\nfacing@same\nx@player;' + newFighterData['projectiles'][proj]['x'].toString() +
		'\ny@player;' + newFighterData['projectiles'][proj]['y'].toString() +
		'\nwidth@' + newFighterData['projectiles'][proj]['width'].toString() +
		'\nheight@' + newFighterData['projectiles'][proj]['height'].toString() +
		'\nvelX@' + (-newFighterData['projectiles'][proj]['velX']).toString() + ':' + newFighterData['projectiles'][proj]['velX'].toString() +
		'\nvelY@' + newFighterData['projectiles'][proj]['velY'].toString() +
		'\nweight@' + newFighterData['projectiles'][proj]['weight'].toString() +
		'\nanimationTime@' + newFighterData['animationTimes'][proj] +
		'\nhitsLeft@' + newFighterData['projectiles'][proj]['hitsLeft'] +
		'\nframes@' + newFighterData['frames'][proj] +
		'\nhitboxes@';

	for(var j in newFighterData['hitboxes'][proj]) {
		for(var k in newFighterData['hitboxes'][proj][j]) {
			var tempAttack = null;
			for(var l in newFighterData['attacks'][proj]) {
				if (newFighterData['attacks'][proj][l].frames[j]) {
					for (var n in newFighterData['attacks'][proj][l].frames[j]) {
						if (!tempAttack && newFighterData['attacks'][proj][l].frames[j][n] == j) {
							tempAttack = l;
							break;
						}
					}
				}
			}

			newProjectileString = newProjectileString + ((tempAttack) ? tempAttack.toString() : '0') + ';';
			for(var l in newFighterData['hitboxes'][proj][j][k]) {
				newProjectileString = newProjectileString + ((newFighterData['hitboxes'][proj][j][k][l] - 0.5 + ((l%2 == 0) ? newFighterData['projectiles'][proj].width : newFighterData['projectiles'][proj].height)/2)/((l%2 == 0) ? newFighterData['projectiles'][proj].width : newFighterData['projectiles'][proj].height)).toFixed(4).toString() + ',';
			}

			if (newProjectileString[newProjectileString.length-1] != ';') {
				newProjectileString = newProjectileString.slice(0, -1);
			}
			newProjectileString = newProjectileString + ';';
		}

		if (newProjectileString[newProjectileString.length-1] != '@') {
			newProjectileString = newProjectileString.slice(0, -1);
		}
		newProjectileString = newProjectileString + '_';
	}
	if (newProjectileString[newProjectileString.length-1] != '@') {
		newProjectileString = newProjectileString.slice(0, -1);
	}

	newProjectileString = newProjectileString + '\nattacks@';
	for(var j in newFighterData['attacks'][proj]) {
		newProjectileString = newProjectileString + j + '=' + newFighterData['attacks'][proj][j].damage.toString() + ';' + newFighterData['attacks'][proj][j].launch[0].toString() + ',' + newFighterData['attacks'][proj][j].launch[1].toString() + ';' + newFighterData['attacks'][proj][j].stun.toString() + '_';
	}
	if (newProjectileString[newProjectileString.length-1] != '@') {
		newProjectileString = newProjectileString.slice(0, -1);
	}

	return newProjectileString;
}

function encodeNewFighter() {
	var newFighterString = 'name@' + newFighterData['name'] +
		'\nterminalVelocity@' + newFighterData['terminalVelocity'].toString() +
		'\nrunSpeed@' + newFighterData['runSpeed'].toString() +
		'\nfriction@' + newFighterData['friction'].toString() +
		'\njumps@' + newFighterData['jumps'].toString() +
		'\njumpStrength@' + newFighterData['jumpStrength'].toString() +
		'\nweight@' + newFighterData['weight'].toString() +
		'\nspriteWidth@' + newFighterData['spriteWidth'].toString() +
		'\nspriteHeight@' + newFighterData['spriteHeight'].toString() +
		'\nhurtboxes@';

	for(var i in newFighterData['hurtboxes']) {
		newFighterString = newFighterString + i + '|';
		for(var j in newFighterData['hurtboxes'][i]) {
			var fnd = false;
			for(var k in newFighterData['hurtboxes'][i][j]) {
				if(newFighterData['hurtboxes'][i][j][k].length > 0) {
					fnd = true;
				}
			}
			if(fnd) {
				newFighterString = newFighterString + j.toString() + '_';
				for(var k in newFighterData['hurtboxes'][i][j]) {
					for(var l in newFighterData['hurtboxes'][i][j][k]) {
						newFighterString = newFighterString + ((newFighterData['hurtboxes'][i][j][k][l] - 0.5 + ((l%2 == 0) ? newFighterData['spriteWidth'] : newFighterData['spriteHeight'])/2)/((l%2 == 0) ? newFighterData['spriteWidth'] : newFighterData['spriteHeight'])).toFixed(4).toString() + ',';
					}

					newFighterString = newFighterString.slice(0, -1);
					newFighterString = newFighterString + ';';
				}

				newFighterString = newFighterString.slice(0, -1);
				newFighterString = newFighterString + '_';
			}
		}

		if(newFighterString[newFighterString.length-1] != '|') {
			newFighterString = newFighterString.slice(0, -1);
		}
		newFighterString = newFighterString + '|';
	}
	if(newFighterString[newFighterString.length-1] != '@') {
		newFighterString = newFighterString.slice(0, -1);
	}

	newFighterString = newFighterString + '\nhitboxes@';
	for(var i in newFighterData['hitboxes']) {
		if(!contains(Object.keys(newFighterData['projectiles']), i)) {
			newFighterString = newFighterString + i + '|';
			for(var j in newFighterData['hitboxes'][i]) {
				newFighterString = newFighterString + j.toString();
				for(var k in newFighterData['hitboxes'][i][j]) {
					newFighterString = newFighterString + '=' + k.toString() + ';';
					for(var l in newFighterData['hitboxes'][i][j][k]) {
						newFighterString = newFighterString + ((newFighterData['hitboxes'][i][j][k][l] - 0.5 + ((l%2 == 0) ? newFighterData['spriteWidth'] : newFighterData['spriteHeight'])/2)/((l%2 == 0) ? newFighterData['spriteWidth'] : newFighterData['spriteHeight'])).toFixed(4).toString() + ',';
					}

					newFighterString = newFighterString.slice(0, -1);
				}

				newFighterString = newFighterString + '_';
			}

			if(newFighterString[newFighterString.length-1] != '|') {
				newFighterString = newFighterString.slice(0, -1);
			}
			newFighterString = newFighterString + '|';
		}
	}
	if(newFighterString[newFighterString.length-1] != '@') {
		newFighterString = newFighterString.slice(0, -1);
	}

	newFighterString = newFighterString + '\ngroundboxes@';
	for(var i in newFighterData['groundboxes']) {
		newFighterString = newFighterString + i + '|';
		for(var j in newFighterData['groundboxes'][i]) {
			if(newFighterData['groundboxes'][i][j].length > 0) {
				newFighterString = newFighterString + j.toString() + '_';
				for(var k in newFighterData['groundboxes'][i][j]) {
					newFighterString = newFighterString + ((newFighterData['groundboxes'][i][j][k] - 0.5 + ((k%2 == 0) ? newFighterData['spriteWidth'] : newFighterData['spriteHeight'])/2)/((k%2 == 0) ? newFighterData['spriteWidth'] : newFighterData['spriteHeight'])).toFixed(4).toString() + ',';
				}

				newFighterString = newFighterString.slice(0, -1);
				newFighterString = newFighterString + '_';
			}
		}

		if(newFighterString[newFighterString.length-1] != '|') {
			newFighterString = newFighterString.slice(0, -1);
		}
		newFighterString = newFighterString + '|';
	}
	if(newFighterString[newFighterString.length-1] != '@') {
		newFighterString = newFighterString.slice(0, -1);
	}

	newFighterString = newFighterString + '\nframes@';
	for(var i in actions) {
		newFighterString = newFighterString + actions[i] + '|' + newFighterData['frames'][actions[i]].toString() + '|';
	}
	if(newFighterString[newFighterString.length-1] != '@') {
		newFighterString = newFighterString.slice(0, -1);
	}

	newFighterString = newFighterString + '\nanimationTimes@';
	for(var i in actions) {
		newFighterString = newFighterString + actions[i] + '|' + newFighterData['animationTimes'][actions[i]] + '|';
	}
	if(newFighterString[newFighterString.length-1] != '@') {
		newFighterString = newFighterString.slice(0, -1);
	}

	newFighterString = newFighterString + '\nattacks@';
	for(var i in newFighterData['attacks']) {
		if(newFighterData['attacks'][i].length > 0 && contains(Object.keys(newFighterData['effects']), i)) {
			newFighterString = newFighterString + i + '|';
			for(var j in newFighterData['attacks'][i]) {
				newFighterString = newFighterString + j + '_' + newFighterData['attacks'][i][j].damage.toString() + ';' + newFighterData['attacks'][i][j].launch[0].toString() + ',' + newFighterData['attacks'][i][j].launch[1].toString() + ';' + newFighterData['attacks'][i][j].stun.toString() + '_';
			}

			if(newFighterString[newFighterString.length-1] != '|') {
				newFighterString = newFighterString.slice(0, -1);
			}
			newFighterString = newFighterString + '|';
		}
	}
	if(newFighterString[newFighterString.length-1] != '@') {
		newFighterString = newFighterString.slice(0, -1);
	}

	newFighterString = newFighterString + '\neffects@';
	for(var i in newFighterData['effects']) {
		newFighterString = newFighterString + i + '|';
		for(var j in newFighterData['effects'][i]) {
			var frameFound = false;
			for(var k in newFighterData['effects'][i][j]) {
				if(k == 'projectile') {
					if(newFighterData['effects'][i][j][k] != null) {
						newFighterString = newFighterString + ((frameFound) ? '' : (((j == 0) ? '' : '_') + j.toString() + '='));
						for (var l in newFighterData['effects'][i][j][k].split(',')) {
							newFighterString = newFighterString + k + ',' + newFighterData['effects'][i][j][k].split(',')[l] + ';';
							frameFound = true;
						}
					}
				} else if(k == 'lingering') {
					if(newFighterData['effects'][i][j][k].length > 0) {
						newFighterString = newFighterString + ((frameFound) ? '' : (((j == 0) ? '' : '_') + j.toString() + '=')) + k + ',' + newFighterData['effects'][i][j][k] + ';';
						frameFound = true;
					}
				} else if(k == 'turnable') {
					if(newFighterData['effects'][i][j][k]) {
						newFighterString = newFighterString + ((frameFound) ? '' : (((j == 0) ? '' : '_') + j.toString() + '=')) + k + ';';
						frameFound = true;
					}
				} else if(newFighterData['effects'][i][j][k].add != null) {
					newFighterString = newFighterString + ((frameFound) ? '' : (((j == 0) ? '' : '_') + j.toString() + '=')) + k + ',add,' + newFighterData['effects'][i][j][k].add.toString() + ',' + newFighterData['effects'][i][j][k].facing.toString() + ';';
					frameFound = true;
				} else if(newFighterData['effects'][i][j][k].set != null) {
					newFighterString = newFighterString + ((frameFound) ? '' : (((j == 0) ? '' : '_') + j.toString() + '=')) + k + ',set,' + newFighterData['effects'][i][j][k].set.toString() + ',' + newFighterData['effects'][i][j][k].facing.toString() + ';';
					frameFound = true;
				}
			}

			if(newFighterString[newFighterString.length-1] == ';') {
				newFighterString = newFighterString.slice(0, -1);
			}
		}

		newFighterString = newFighterString + '|';
	}
	if(newFighterString[newFighterString.length-1] != '@') {
		newFighterString = newFighterString.slice(0, -1);
	}

	newFighterString = newFighterString + '\nsprites@' + Object.keys(imgs['new']).length.toString();

	imgs['demo'] = compileNewFighterImages(imgs['new']);

	return newFighterString;
}

function compileNewFighterImagesHorizontally(data) {
	new_imgs = {};
	for(var i in data[newFighterSprite]) {
		if(data[newFighterSprite][i] && Object.keys(data[newFighterSprite][i]).length > 0) {
			var tempCanvas = document.createElement('canvas');
			var tempContext = tempCanvas.getContext('2d');
			tempContext.imageSmoothingEnabled = false;
			tempCanvas.width = data[newFighterSprite][i][0].width*Object.keys(data[newFighterSprite][i]).length;
			tempCanvas.height = data[newFighterSprite][i][0].height;

			for(var j in data[newFighterSprite][i]) {
				if(data[newFighterSprite][i][j] != null) {
					tempContext.drawImage(data[newFighterSprite][i][j], 0, 0, data[newFighterSprite][i][j].width, data[newFighterSprite][i][j].height, j*(tempCanvas.width/Object.keys(data[newFighterSprite][i]).length), 0, tempCanvas.width/Object.keys(data[newFighterSprite][i]).length, tempCanvas.height);
				}
			}

			var img = new Image();
			img.src = tempCanvas.toDataURL('image/png');
			new_imgs[i] = img;
		}
	}

	return new_imgs;
}

function compileNewFighterImages(data) {
	new_imgs = {};
	for(var j in data[0]) {
		if(data[0][j] && Object.keys(data[0][j]).length > 0) {
			var tempCanvas = document.createElement('canvas');
			var tempContext = tempCanvas.getContext('2d');
			tempContext.imageSmoothingEnabled = false;
			tempCanvas.width = data[0][j][0].width*Object.keys(data[0][j]).length;
			tempCanvas.height = data[0][j][0].height*Object.keys(data).length;

			for(var i in data) {
				for(var k in data[i][j]) {
					if(data[i][j][k] != null) {
						tempContext.drawImage(data[i][j][k], 0, 0, data[i][j][k].width, data[i][j][k].height, k*(tempCanvas.width/Object.keys(data[i][j]).length), i*(tempCanvas.height/Object.keys(data).length), tempCanvas.width/Object.keys(data[i][j]).length, tempCanvas.height/Object.keys(data).length);
					}
				}
			}

			var img = new Image();
			img.src = tempCanvas.toDataURL('image/png');
			new_imgs[j] = img;
		}
	}

	return new_imgs;
}

function newFighterLoadExisting(ind) {
	var fighter = fighters[ind];
	newFighterFrame = 0;
	newFighterAction = 'idle';
	newFighterProjectiles = 0;

	for (var i in newFighterData['projectiles']) {
		for (var j in createFighterButtons) {
			if (createFighterButtons[j].id == i) {
				createFighterButtons.splice(j, 1);
				createFighterButtonsLength--;
				break;
			}
		}
	}

	var max = 0;
	for (var j=0; j<createFighterButtons.length; j++) {
		if (createFighterButtons[j].id.startsWith('skin_')) {
			if (max != -1) {
				max = parseInt(createFighterButtons[j].id.split('_')[1]);
			}

			if (parseInt(createFighterButtons[j].id.split('_')[1]) > fighter.sprites-1) {
				createFighterButtons.splice(j, 1);
				createFighterButtonsLength--;
				max = -1;
				j--;
			}
		}
	}
	newFighterSprite = Math.min(newFighterSprite, fighter.sprites-1);

	if (max >= 0) {
		for (var j=max; j<fighter.sprites-1; j++) {
			createFighterButtonsLength++;
			newSkinButton(j+1);
		}
	}

	newFighterData['name'] = fighter.name + ' Copy';
	newFighterData['jumps'] = fighter.jumps;
	newFighterData['jumpStrength'] = fighter.jumpStrength;
	newFighterData['terminalVelocity'] = fighter.terminalVelocity;
	newFighterData['weight'] = fighter.weight;
	newFighterData['runSpeed'] = fighter.runSpeed;
	newFighterData['friction'] = fighter.friction;
	newFighterData['spriteWidth'] = fighter.spriteWidth;
	newFighterData['spriteHeight'] = fighter.spriteHeight;
	newFighterData['projectiles'] = {};

	newFighterData['frames'] = {};
	for(var i in fighter.frames) {
		newFighterData['frames'][i] = fighter.frames[i];
	}

	newFighterData['hurtboxes'] = {};
	for(var i in fighter.hurtboxes) {
		newFighterData['hurtboxes'][i] = {};
		for(var j in fighter.hurtboxes[i]) {
			newFighterData['hurtboxes'][i][j] = [];
			for(var k in fighter.hurtboxes[i][j]) {
				newFighterData['hurtboxes'][i][j][k] = [];
				newFighterData['hurtboxes'][i][j][k].push(fighter.hurtboxes[i][j][k][0]);
				newFighterData['hurtboxes'][i][j][k].push(fighter.hurtboxes[i][j][k][1]);
				newFighterData['hurtboxes'][i][j][k].push(fighter.hurtboxes[i][j][k][2]);
				newFighterData['hurtboxes'][i][j][k].push(fighter.hurtboxes[i][j][k][3]);
			}
		}
	}

	newFighterData['groundboxes'] = {};
	for(var i in fighter.groundboxes) {
		newFighterData['groundboxes'][i] = {};
		for(var j in fighter.groundboxes[i]) {
			newFighterData['groundboxes'][i][j] = [];
			newFighterData['groundboxes'][i][j].push(fighter.groundboxes[i][j][0]);
			newFighterData['groundboxes'][i][j].push(fighter.groundboxes[i][j][1]);
			newFighterData['groundboxes'][i][j].push(fighter.groundboxes[i][j][2]);
			newFighterData['groundboxes'][i][j].push(fighter.groundboxes[i][j][3]);
		}
	}

	newFighterData['animationTimes'] = {};
	for(var i in fighter.animationTimes) {
		newFighterData['animationTimes'][i] = fighter.animationTimes[i];
	}

	newFighterData['attacks'] = {};
	createAttackInputs = [];
	for(var i in fighter.attacks) {
		newFighterData['attacks'][i] = [];
		for(var j in fighter.attacks[i]) {
			newFighterData['attacks'][i].push({});
			newFighterData['attacks'][i][j]['damage'] = fighter.attacks[i][j].damage;
			newFighterData['attacks'][i][j]['launch'] = [fighter.attacks[i][j].launch[0], fighter.attacks[i][j].launch[1]];
			newFighterData['attacks'][i][j]['stun'] = fighter.attacks[i][j].stun;
			newFighterData['attacks'][i][j]['frames'] = [];
			for(var k=0; k<fighter.frames[i]; k++) {
				newFighterData['attacks'][i][j]['frames'].push([]);
			}
			if(i == newFighterAction) {
				newAttackInputs();
			}
		}
	}

	newFighterData['hitboxes'] = {};
	for(var i in fighter.hitboxes) {
		newFighterData['hitboxes'][i] = {};
		for(var j in fighter.hitboxes[i]) {
			newFighterData['hitboxes'][i][j] = [];
			for(var k in fighter.hitboxes[i][j]) {
				newFighterData['hitboxes'][i][j][k] = [];
				newFighterData['hitboxes'][i][j][k].push(fighter.hitboxes[i][j][k][0]);
				newFighterData['hitboxes'][i][j][k].push(fighter.hitboxes[i][j][k][1]);
				newFighterData['hitboxes'][i][j][k].push(fighter.hitboxes[i][j][k][2]);
				newFighterData['hitboxes'][i][j][k].push(fighter.hitboxes[i][j][k][3]);
			}
		}
	}

	imgs['new'] = {};
	for(var i=0; i<fighter.sprites; i++) {
		imgs['new'][i] = {};
		for(var j in imgs['fighters'][fighter.name]) {
			imgs['new'][i][j] = {};
			for(var k=0; k<fighter.frames[j]; k++) {
				var img = imgs['fighters'][fighter.name][j];
				var tempCanvas = document.createElement('canvas');
				var tempContext = tempCanvas.getContext('2d');
				tempContext.imageSmoothingEnabled = false;
				tempCanvas.width = img.width/fighter.frames[j];
				tempCanvas.height = img.height/fighter.sprites;

				tempContext.drawImage(img, k*tempCanvas.width, i*tempCanvas.height, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);

				var img1 = new Image();
				img1.src = tempCanvas.toDataURL('image/png');
				imgs['new'][i][j][k] = img1;
			}
		}

		var img = imgs['fighters'][fighter.name]['stock'];
		var tempCanvas = document.createElement('canvas');
		var tempContext = tempCanvas.getContext('2d');
		tempContext.imageSmoothingEnabled = false;
		tempCanvas.width = img.width;
		tempCanvas.height = img.height/fighter.sprites;

		tempContext.drawImage(img, 0, i*tempCanvas.height, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);

		var img1 = new Image();
		img1.src = tempCanvas.toDataURL('image/png');
		imgs['new'][i]['stock'][0] = img1;
	}

	newFighterData['effects'] = {};
	newFighterXEffect = {};
	newFighterYEffect = {};
	newFighterXVelEffect = {};
	newFighterYVelEffect = {};
	newFighterProjectile = {};
	for(var i in fighter.frames) {
		newFighterData['effects'][i] = {};
		newFighterXEffect[i] = {};
		newFighterYEffect[i] = {};
		newFighterXVelEffect[i] = {};
		newFighterYVelEffect[i] = {};
		newFighterProjectile[i] = {};
		for(var j=0; j<fighter.frames[i]; j++) {
			if (fighter['effects'][i] && fighter['effects'][i][j]) {
				newFighterData['effects'][i][j] = {'x': {'add': fighter['effects'][i][j]['x']['add'], 'set': fighter['effects'][i][j]['x']['set'], 'facing': fighter['effects'][i][j]['x']['facing']}, 'y': {'add': fighter['effects'][i][j]['y']['add'], 'set': fighter['effects'][i][j]['y']['set'], 'facing': fighter['effects'][i][j]['y']['facing']}, 'velX': {'add': fighter['effects'][i][j]['velX']['add'], 'set': fighter['effects'][i][j]['velX']['set'], 'facing': fighter['effects'][i][j]['velX']['facing']}, 'velY': {'add': fighter['effects'][i][j]['velY']['add'], 'set': fighter['effects'][i][j]['velY']['set'], 'facing': fighter['effects'][i][j]['velY']['facing']}, 'projectile': fighter['effects'][i][j]['projectile'], 'lingering': fighter['effects'][i][j]['lingering'], 'turnable': fighter['effects'][i][j]['turnable']};
				
				newFighterXEffect[i][j] = 0;
				newFighterYEffect[i][j] = 0;
				newFighterXVelEffect[i][j] = 0;
				newFighterYVelEffect[i][j] = 0;
				newFighterProjectile[i][j] = '';

				if (fighter['effects'][i][j]['x']['add'] != null && fighter['effects'][i][j]['x']['add'] != 0) {
					newFighterXEffect[i][j] = fighter['effects'][i][j]['x']['add'];
				} else if (fighter['effects'][i][j]['x']['set'] != null && fighter['effects'][i][j]['x']['set'] != 0) {
					newFighterXEffect[i][j] = fighter['effects'][i][j]['x']['set'];
				}

				if (fighter['effects'][i][j]['y']['add'] != null && fighter['effects'][i][j]['y']['add'] != 0) {
					newFighterYEffect[i][j] = fighter['effects'][i][j]['y']['add'];
				} else if (fighter['effects'][i][j]['y']['set'] != null && fighter['effects'][i][j]['y']['set'] != 0) {
					newFighterYEffect[i][j] = fighter['effects'][i][j]['y']['set'];
				}

				if (fighter['effects'][i][j]['velX']['add'] != null && fighter['effects'][i][j]['velX']['add'] != 0) {
					newFighterXVelEffect[i][j] = fighter['effects'][i][j]['velX']['add'];
				} else if (fighter['effects'][i][j]['velX']['set'] != null && fighter['effects'][i][j]['velX']['set'] != 0) {
					newFighterXVelEffect[i][j] = fighter['effects'][i][j]['velX']['set'];
				}

				if (fighter['effects'][i][j]['velY']['add'] != null && fighter['effects'][i][j]['velY']['add'] != 0) {
					newFighterYVelEffect[i][j] = fighter['effects'][i][j]['velY']['add'];
				} else if (fighter['effects'][i][j]['velY']['set'] != null && fighter['effects'][i][j]['velY']['set'] != 0) {
					newFighterYVelEffect[i][j] = fighter['effects'][i][j]['velY']['set'];
				}

				if (fighter['effects'][i][j]['projectile'] != null) {
					newFighterProjectile[i][j] = fighter['effects'][i][j]['projectile'];

					createFighterButtonsLength += 1;
					newFighterProjectiles += 1;
					newProjectileButton(fighter['effects'][i][j]['projectile']);

					for (var k in projectiles) {
						if(projectiles[k].name == fighter['effects'][i][j]['projectile']) {
							newFighterData['frames'][fighter['effects'][i][j]['projectile']] = projectiles[k].frames;
							newFighterData['projectiles'][fighter['effects'][i][j]['projectile']] = {'x': parseFloat(projectiles[k]['x'].split(';')[1]), 'y': parseFloat(projectiles[k]['y'].split(';')[1]), 'width': projectiles[k]['width'], 'height': projectiles[k]['height'], 'velX': parseFloat(projectiles[k]['velX'].split(':')[1]), 'velY': parseFloat(projectiles[k]['velY']), 'weight': projectiles[k]['weight'], 'hitsLeft': projectiles[k]['hitsLeft']};
							
							newFighterData['attacks'][projectiles[k].name] = [];
							for (var l in projectiles[j].attacks) {
								var tempFrames = [];
								for (var m=0; m<projectiles[k].frames; m++) {
									tempFrames.push([]);
								}

								newFighterData['attacks'][projectiles[k].name].push({
									'damage': projectiles[k].attacks[l].damage,
									'launch': [projectiles[k].attacks[l].launch[0], projectiles[k].attacks[l].launch[1]],
									'stun': projectiles[k].attacks[l].stun,
									'frames': tempFrames});
							}

							newFighterData['hitboxes'][projectiles[k].name] = {};
							for (var l in projectiles[k].hitboxes) {
								newFighterData['hitboxes'][projectiles[k].name][l] = [];
								for (var m in projectiles[k].hitboxes[l]) {
									var rect = projectiles[k].hitboxes[l][m].hitbox;
									newFighterData['hitboxes'][projectiles[k].name][l].push([parseFloat(rect[0])*projectiles[k].width + 0.5 - projectiles[k].width/2, parseFloat(rect[1])*projectiles[k].height + 0.5 - projectiles[k].height/2, parseFloat(rect[2])*projectiles[k].width + 0.5 - projectiles[k].width/2, parseFloat(rect[3])*projectiles[k].height + 0.5 - projectiles[k].height/2])
									newFighterData['attacks'][projectiles[k].name][projectiles[k].hitboxes[l][m].id]['frames'][l].push(m);
								}
							}

							newFighterData['animationTimes'][projectiles[k].name] = projectiles[k].animationTime;

							for (var l=0; l<fighter.sprites; l++) {
								imgs['new'][l][fighter['effects'][i][j]['projectile']] = {};
								for (var m=0; m<projectiles[k].frames; m++) {
									var img = imgs['projectiles'][projectiles[k].name];
									var tempCanvas = document.createElement('canvas');
									var tempContext = tempCanvas.getContext('2d');
									tempContext.imageSmoothingEnabled = false;
									tempCanvas.width = img.width/projectiles[k].frames;
									tempCanvas.height = img.height/fighter.sprites;

									tempContext.drawImage(img, m*tempCanvas.width, l*tempCanvas.height, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);

									var img1 = new Image();
									img1.src = tempCanvas.toDataURL('image/png');
									imgs['new'][l][fighter['effects'][i][j]['projectile']][m] = img1;
								}
							}

							break;
						}
					}

					if (!newFighterData['projectiles'][fighter['effects'][i][j]['projectile']]) {
						newFighterData['projectiles'][fighter['effects'][i][j]['projectile']] = {'x': 0, 'y': 0, 'width': 0.0166667, 'height': 0.05, 'velX': 0.01, 'velY': -0.01, 'weight': 1, 'hitsLeft': 1};
					}
				}

			} else {
				newFighterData['effects'][i][j] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null, 'lingering': '', 'turnable': false};
				newFighterXEffect[i][j] = 0;
				newFighterYEffect[i][j] = 0;
				newFighterXVelEffect[i][j] = 0;
				newFighterYVelEffect[i][j] = 0;
				newFighterProjectile[i][j] = '';
			}
		}
	}

	while(createFighterButtons.length != createFighterButtonsLength + newFighterData['frames'][newFighterAction]) {
		if (createFighterButtons.length > createFighterButtonsLength + newFighterData['frames'][newFighterAction]) {
			newFighterButtonRemove();
		} else {
			newFighterButton();
		}
	}
}

function downloadNewFighter() {
	var zip = new JSZip();
	var images = compileNewFighterImages(imgs['new']);

	var newFighterFolder = zip.folder('sprites');
	zip.file(newFighterData['name'] + '.txt', encodeNewFighter());

	var newProjectileFolder = zip.folder('projectiles');
	if(Object.keys(newFighterData['projectiles']).length > 0) {
		for(var i in newFighterData['projectiles']) {
			newProjectileFolder.file(i + '.txt', encodeNewProjectile(i));
		}
	}

	for(var i in images) {
		newFighterFolder.file(i + '.png', atob(images[i].src.substr(22)), {binary: true});
	}

	zip.generateAsync({type:"base64"}).then(function (base64) {
		location.href="data:application/zip;base64," + base64;
	});
}

function downloadAsSpriteSheet() {
	/*for (var action in actions) {
		if(actions[action] == 'dair' || actions[action] == 'dtilt') {
			var downloadCanvas = document.createElement('canvas');
			var downloadContext = downloadCanvas.getContext('2d');
			downloadContext.imageSmoothingEnabled = false;
			var downloader = document.createElement('a');

			downloadCanvas.width = imgs['fighters']['Vinny'][actions[action]].width;
			downloadCanvas.height = 198;

			for (var tempFrame=0; tempFrame<fighters[3].frames[actions[action]]; tempFrame++) {
				for (var i in fighters[3].hitboxes[actions[action]][tempFrame]) {
					var w = imgs['fighters']['Vinny'][actions[action]].width/fighters[3].frames[actions[action]];
					var h = imgs['fighters']['Vinny'][actions[action]].height;
					var hitbox = fighters[3].hitboxes[actions[action]][tempFrame][i]['hitbox'];
					downloadContext.lineWidth = 2;
					downloadContext.strokeStyle = 'rgba(0, 0, 255, 1)';
					downloadContext.beginPath();
					downloadContext.rect(Math.round(hitbox[0]*w + tempFrame*w), Math.round(hitbox[1]*h), Math.round((hitbox[2] - hitbox[0])*w), Math.round((hitbox[3] - hitbox[1])*h));
					downloadContext.stroke();
					downloadContext.closePath();
				}

				for (var i in fighters[3].hurtboxes[actions[action]][tempFrame]) {
					var w = imgs['fighters']['Vinny'][actions[action]].width/fighters[3].frames[actions[action]];
					var h = imgs['fighters']['Vinny'][actions[action]].height;
					var hitbox = fighters[3].hurtboxes[actions[action]][tempFrame][i];
					downloadContext.lineWidth = 2;
					downloadContext.strokeStyle = 'rgba(255, 0, 0, 1)';
					downloadContext.beginPath();
					downloadContext.rect(Math.round(hitbox[0]*w + tempFrame*w), Math.round(hitbox[1]*h), Math.round((hitbox[2] - hitbox[0])*w), Math.round((hitbox[3] - hitbox[1])*h));
					downloadContext.stroke();
					downloadContext.closePath();
				}
			}

			downloader.href = downloadCanvas.toDataURL('image/png');
			downloader.download = actions[action] + '.png';
			document.body.appendChild(downloadCanvas);
			downloader.click();
			document.body.removeChild(downloadCanvas);
		}
	}*/
	if (imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {
		var downloadCanvas = document.createElement('canvas');
		var downloadContext = downloadCanvas.getContext('2d');
		downloadContext.imageSmoothingEnabled = false;
		var downloader = document.createElement('a');
		downloadCanvas.width = 0;

		var largestY = 0;
		for (var i in imgs['new'][newFighterSprite][newFighterAction]) {
			if (imgs['new'][newFighterSprite][newFighterAction][i].width) {
				downloadCanvas.width += imgs['new'][newFighterSprite][newFighterAction][i].width;
			}

			if (imgs['new'][newFighterSprite][newFighterAction][i].height && imgs['new'][newFighterSprite][newFighterAction][i].height > largestY) {
				largestY = imgs['new'][newFighterSprite][newFighterAction][i].height;
			}
		}

		downloadCanvas.height = largestY;

		var currX = 0;
		for (var i in imgs['new'][newFighterSprite][newFighterAction]) {
			var tempImg = imgs['new'][newFighterSprite][newFighterAction][i];
			downloadContext.drawImage(tempImg, currX, 0, tempImg.width, tempImg.height);
			currX += tempImg.width;
		}

		downloader.href = downloadCanvas.toDataURL('image/png');
		downloader.download = newFighterAction + '.png';
		document.body.appendChild(downloadCanvas);
		downloader.click();
		document.body.removeChild(downloadCanvas);
	}
}

function newSkinButton(spriteNum) {
	createFighterButtons.splice(createFighterButtonsLength-5, 0, new Button('skin_' + spriteNum, function() {return 0.305*canvas.width + this.getWidth()*this.id.split('_')[1];}, function() {return 0.07*canvas.height;}, function() {return canvas.width/40;}, function() {return canvas.height/24;}, 3, function() {newFighterSprite = parseInt(this.id.split('_')[1]);}, function() {return true;}, function() {return ((newFighterSprite == this.id.split('_')[1]) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return [this.id.split('_')[1]];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}));
}

function newFighterButton() {
	createFighterButtons.push(new Button((parseInt(createFighterButtons[createFighterButtons.length-1].id)+1).toString(), function() {return 0.59375*canvas.width;}, function() {return canvas.height/4+this.getHeight()*parseInt(this.id);}, function() {return 0.025*canvas.width;}, function() {return (canvas.height/2)/(createFighterButtons.length-createFighterButtonsLength);}, 3, function() {newFighterAnimationFrame = newFighterData['animationTimes'][newFighterAction]*parseInt(this.id); newFighterFrame=parseInt(this.id); if(newFighterData['effects'][newFighterAction] && newFighterData['effects'][newFighterAction][newFighterFrame] == null) {newFighterData['effects'][newFighterAction][newFighterFrame] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null, 'lingering': '', 'turnable': false}; newFighterXEffect[newFighterAction][newFighterFrame] = 0; newFighterYEffect[newFighterAction][newFighterFrame] = 0; newFighterXVelEffect[newFighterAction][newFighterFrame] = 0; newFighterYVelEffect[newFighterAction][newFighterFrame] = 0; newFighterProjectile[newFighterAction][newFighterFrame] = '';}}, function() {return true;}, function() {return ((newFighterFrame == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return [this.id];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return newFighterAction != 'stock';}));
}

function newProjectileButton(name) {
	let num = newFighterProjectiles;
	createFighterButtons.splice(createFighterButtonsLength-3, 0, new Button(((name) ? name : 'Projectile' + newFighterProjectileNum.toString()), function() {return 0.40625*canvas.width-this.getWidth()*2;}, function() {return canvas.height/4 + (num-1)*canvas.height/26;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/26;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; newFighterAnimationFrame=0; switchFighterButtons(); switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return [this.id.toString()];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}));
}

function newFighterButtonRemove() {
	if (newFighterFrame == newFighterData['frames'][newFighterAction]) {
		newFighterFrame = newFighterData['frames'][newFighterAction]-1;
	}
	newFighterAnimationFrame = (newFighterAnimationFrame)%(newFighterData['animationTimes'][newFighterAction]*createFighterButtons.length-createFighterButtonsLength);

	createFighterButtons.splice(createFighterButtons.length-1, 1);
}

function switchFighterButtons() {
	while(createFighterButtons.length != createFighterButtonsLength + newFighterData['frames'][newFighterAction]) {
		if (createFighterButtons.length > createFighterButtonsLength + newFighterData['frames'][newFighterAction]) {
			newFighterButtonRemove();
		} else {
			newFighterButton();
		}
	}
}

function switchAttackInputs() {
	if (!newFighterData['attacks'][newFighterAction]) {
		newFighterData['attacks'][newFighterAction] = [];
	}

	if (createAttackInputs.length/4 > newFighterData['attacks'][newFighterAction].length) {
		createAttackInputs.splice(-(createAttackInputs.length - 4*newFighterData['attacks'][newFighterAction].length), createAttackInputs.length - 4*newFighterData['attacks'][newFighterAction].length);
	} else {
		for (var i=createAttackInputs.length/4; i<newFighterData['attacks'][newFighterAction].length; i++) {
			newAttackInputs();
		}
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

function newAttackInputs() {
	let numAttacks = createAttackInputs.length/4;
	createAttackInputs.push(new Button('renameDamage' + numAttacks, function() {return canvas.width/1.15;}, function() {return canvas.height/8 + (canvas.height/10)*numAttacks;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingDamage == numAttacks) ? context.measureText(tempDamage).width + canvas.width/384 : context.measureText(newFighterData['attacks'][newFighterAction][numAttacks]['damage'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!(namingDamage == numAttacks)) {tempDamage = '';} namingDamage = numAttacks;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!(namingDamage == numAttacks)) ? newFighterData['attacks'][newFighterAction][numAttacks]['damage'] : tempDamage)];}, 'black', function() {context.textAlign = 'left'; return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {context.fillStyle=this.textColor; context.font=this.getFont(); context.fillText(' damage', this.getX() + this.getWidth(), this.getY() + canvas.height/60); context.fillStyle=this.getColor(); return true;}));
	createAttackInputs.push(new Button('renameStun' + numAttacks, function() {return canvas.width/1.08;}, function() {return canvas.height/8 + (canvas.height/10)*numAttacks;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingStun == numAttacks) ? context.measureText(tempStun).width + canvas.width/384 : context.measureText(newFighterData['attacks'][newFighterAction][numAttacks]['stun'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!(namingStun == numAttacks)) {tempStun = '';} namingStun = numAttacks;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!(namingStun == numAttacks)) ? newFighterData['attacks'][newFighterAction][numAttacks]['stun'] : tempStun)];}, 'black', function() {context.textAlign = 'left'; return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {context.fillStyle=this.textColor; context.font=this.getFont(); context.fillText(' stun', this.getX() + this.getWidth(), this.getY() + canvas.height/60); context.fillStyle=this.getColor(); return true;}));
	createAttackInputs.push(new Button('renameLaunchX' + numAttacks, function() {return canvas.width/1.15;}, function() {return canvas.height/6.2 + (canvas.height/10)*numAttacks;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingLaunchX == numAttacks) ? context.measureText(tempLaunchX).width + canvas.width/384 : context.measureText(newFighterData['attacks'][newFighterAction][numAttacks]['launch'][0].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!(namingLaunchX == numAttacks)) {tempLaunchX = '';} namingLaunchX = numAttacks;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!(namingLaunchX == numAttacks)) ? newFighterData['attacks'][newFighterAction][numAttacks]['launch'][0] : tempLaunchX)];}, 'black', function() {context.textAlign = 'left'; return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {context.fillStyle=this.textColor; context.font=this.getFont(); context.fillText(' launch x, y', this.getX() + canvas.width/24, this.getY() + canvas.height/60); context.fillStyle=this.getColor(); return true;}));
	createAttackInputs.push(new Button('renameLaunchY' + numAttacks, function() {return canvas.width/1.15 + canvas.width/45;}, function() {return canvas.height/6.2 + (canvas.height/10)*numAttacks;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingLaunchY == numAttacks) ? context.measureText(tempLaunchY).width + canvas.width/384 : context.measureText(newFighterData['attacks'][newFighterAction][numAttacks]['launch'][1].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!(namingLaunchY == numAttacks)) {tempLaunchY = '';} namingLaunchY = numAttacks;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!(namingLaunchY == numAttacks)) ? newFighterData['attacks'][newFighterAction][numAttacks]['launch'][1] : tempLaunchY)];}, 'black', function() {context.textAlign = 'left'; return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}));
}

function contains(array, value) {
	for (var i in array) {
		if (array[i] == value) {
			return true;
		}
	}

	return false;
}

function remove(array, value) {
	for (var i in array) {
		if (array[i] == value) {
			array.splice(i, 1);
			return true;
		}
	}

	return false;
}

function flipHitbox(hitbox) {
	return [1-hitbox[2], hitbox[1], 1-hitbox[0], hitbox[3]];
}

function loadImages() {
	imgs['menu'] = {};	
	var img = new Image();
	img.src = data['menu']['host'];
	imgs['menu']['host'] = img;

	var img1 = new Image();
	img1.src = data['menu']['kick'];
	imgs['menu']['kick'] = img1;

	var img2 = new Image();
	img2.src = data['menu']['play'];
	imgs['menu']['play'] = img2;

	var img3 = new Image();
	img3.src = data['menu']['pause'];
	imgs['menu']['pause'] = img3;

	imgs['fighters'] = {};
	for (var i in data.fighters) {
		imgs['fighters'][i] = {};
		for (var j in data.fighters[i]) {
			var img = new Image();
			img.src = data.fighters[i][j];
			imgs['fighters'][i][j] = img;
		}
	}

	imgs['projectiles'] = {};
	for (var i in data['projectiles']) {
		var img = new Image();
		img.src = data['projectiles'][i];
		imgs['projectiles'][i] = img;
	}

	imgs['stages'] = {};
	for (var i in data.stages) {
		var img = new Image();
		img.src = data['stages'][i];
		imgs['stages'][i] = img;
	}
}

function uploadSprites(fileLoadedEvent, textData, projFrames, imgFound, i) {
	if (!imgs['new']) {
		imgs['new'] = {};
	}

	var tempName = imgFound[i].name.substring(0, imgFound[i].name.length - 4);

	if (contains(actions, tempName) || contains(Object.keys(newFighterData['projectiles']), tempName) || tempName == 'stock') {
		var actionFrames = 1;
		var tempSplit = textData['frames'].split('|');
		if (tempSplit && contains(tempSplit, tempName)) {
			for (var a in tempSplit) {
				if(tempSplit[a] == tempName) {
					actionFrames = parseInt(tempSplit[parseInt(a)+1]);
				}
			}
		} else if (contains(Object.keys(newFighterData['projectiles']), tempName) && contains(Object.keys(projFrames), tempName)) {
			actionFrames = projFrames[tempName];
		}

		for (var a=0; a<parseInt(textData['sprites']); a++) {
			if (!imgs['new'][a]) {
				imgs['new'][a] = {};
			}
		}

		var img = new Image();
		img.src = fileLoadedEvent.target.result;
		img.onload = function() {
			var new_imgs = breakUpSpriteSheet(img, actionFrames, parseInt(textData['sprites']));

			for (var a in new_imgs) {
				imgs['new'][a][tempName] = new_imgs[a];
			}
		};
	}

	if (i == imgFound.length-1) {
		document.getElementById('folderInputButton').value = '';
	} else {
		i++;
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {uploadSprites(fileLoadedEvent, textData, projFrames, imgFound, i)};
		fileReader.readAsDataURL(imgFound[i]);
	}
}

function uploadProjectiles(fileLoadedEvent, textData, projFrames, imgFound, projFound, i) {
	var tempProjectile = createProjectileFromText(splitData(fileLoadedEvent.target.result));

	createFighterButtonsLength += 1;
	newFighterProjectiles += 1;
	newFighterData['frames'][tempProjectile.name] = tempProjectile.frames;
	newProjectileButton(tempProjectile.name);

	newFighterData['projectiles'][tempProjectile.name] = {
		'x': parseFloat(tempProjectile['x'].split(';')[1]),
		'y': parseFloat(tempProjectile['y'].split(';')[1]),
		'width': tempProjectile['width'],
		'height': tempProjectile['height'],
		'velX': parseFloat(tempProjectile['velX'].split(':')[1]),
		'velY': tempProjectile['velY'],
		'weight': tempProjectile['weight'],
		'hitsLeft': tempProjectile['hitsLeft']};

	newFighterData['attacks'][tempProjectile.name] = [];
	for (var j in tempProjectile.attacks) {
		var tempFrames = [];
		for (var k=0; k<tempProjectile.frames; k++) {
			tempFrames.push([]);
		}

		newFighterData['attacks'][tempProjectile.name].push({
			'damage': tempProjectile.attacks[j]['damage'],
			'launch': [tempProjectile.attacks[j]['launch'][0], tempProjectile.attacks[j]['launch'][1]],
			'stun': tempProjectile.attacks[j]['stun'],
			'frames': tempFrames});
	}

	newFighterData['hitboxes'][tempProjectile.name] = {};
	for (var j in tempProjectile.hitboxes) {
		newFighterData['hitboxes'][tempProjectile.name][j] = [];
		for (var k in tempProjectile.hitboxes[j]) {
			newFighterData['hitboxes'][tempProjectile.name][j].push([tempProjectile.hitboxes[j][k].hitbox[0], tempProjectile.hitboxes[j][k].hitbox[1], tempProjectile.hitboxes[j][k].hitbox[2], tempProjectile.hitboxes[j][k].hitbox[3]]);
			newFighterData['attacks'][tempProjectile.name][tempProjectile.hitboxes[j][k].id]['frames'][j].push(k);
		}
	}

	newFighterData['animationTimes'][tempProjectile.name] = tempProjectile.animationTime;

	projFrames[tempProjectile.name] = tempProjectile.frames;

	if (i == projFound.length-1) {
		if (imgFound.length > 0) {
			var fileReader = new FileReader();
			fileReader.onload = function(fileLoadedEvent) {uploadSprites(fileLoadedEvent, textData, projFrames, imgFound, 0)};
			fileReader.readAsDataURL(imgFound[0]);
		}
	} else {
		i++;
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {uploadProjectiles(fileLoadedEvent, textData, projFrames, imgFound, projFound, i)};
		fileReader.readAsText(projFound[i], "UTF-8");
	}
}

function render() {
	if (game && game != null) {

		/*var cameraX = 0;
		var cameraY = 0;
		var cameraWidth = canvas.width;
		var cameraHeight = canvas.height;

		var farthestLeft = 1;
		var farthestRight = 0;
		var farthestUp = 1;
		var farthestDown = 0;
		for (var i in game.players) {
			if (game.players[i].x - game.players[i].fighter.spriteWidth/2 < farthestLeft) {
				farthestLeft = Math.max(game.players[i].x, 0);
			}

			if (game.players[i].x - game.players[i].fighter.spriteWidth/2 > farthestRight) {
				farthestRight = Math.min(game.players[i].x, 1);
			}

			if (game.players[i].y + game.players[i].fighter.spriteHeight/2 < farthestUp) {
				farthestUp = Math.max(game.players[i].y, 0);
			}

			if (game.players[i].y + game.players[i].fighter.spriteHeight/2 > farthestDown) {
				farthestDown = Math.min(game.players[i].y, 1);
			}

			context.fillStyle = 'black';
			context.fillRect(game.players);
		}

		if (game.players && game.players.length > 0) {
			var distanceX = farthestRight - farthestLeft;
			var distanceY = farthestDown - farthestUp;

			if (distanceX > distanceY) {
				cameraX = Math.min(Math.max(farthestLeft - cameraBoundX, 0), 1);
				cameraWidth = Math.max(farthestRight + cameraBoundX - cameraX, 0);
				cameraHeight = cameraWidth;
				cameraY = Math.min(Math.max(farthestUp - (cameraHeight - (farthestDown - farthestUp))/2, 0), 1 - cameraHeight);
			} else {
				cameraY = Math.min(Math.max(farthestUp - cameraBoundY, 0), 1);
				cameraHeight = Math.max(farthestDown + cameraBoundY - cameraY, 0);
				cameraWidth = cameraHeight;
				cameraX = Math.min(Math.max(farthestLeft - (cameraWidth - (farthestRight - farthestLeft))/2, 0), 1 - cameraWidth);
			}
		}

		var zoomFactorX = 1/cameraWidth;
		var zoomFactorY = 1/cameraHeight;*/

		if (game.started) {
			context.drawImage(imgs['stages'][game.stage.name], 0, 0, canvas.width, canvas.height);
			//cameraX*canvas.width, cameraY*canvas.height, cameraWidth*canvas.width, cameraHeight*canvas.height, 
		}

		/*context.lineWidth = 3;
		context.strokeStyle = 'black';
		context.beginPath();
		context.rect(cameraX * canvas.width, cameraY * canvas.height, cameraWidth * canvas.width, cameraHeight * canvas.height);
		context.stroke();
		context.closePath();*/

		if (player) {

			numPlayer = 0;
			for (var drawPlayer in ((game.started) ? game.players : [player])) {
				numPlayer ++;
				var tempPlayer = ((game.started) ? game.players[drawPlayer] : player);

				drawFrame = Math.floor(tempPlayer.animationFrame/tempPlayer.fighter.animationTimes[tempPlayer.action]).toString();
				spriteWidth = tempPlayer.fighter.spriteWidth*canvas.width;
				spriteHeight = tempPlayer.fighter.spriteHeight*canvas.height;

				if ((imgs['demo'] && demo) || (contains(Object.keys(imgs['fighters']), tempPlayer.fighter.name))) {
					var tempSheet = ((imgs['demo'] && demo) ? imgs['demo'][tempPlayer.action] : imgs['fighters'][tempPlayer.fighter.name][tempPlayer.action]);
					if (tempPlayer.facing == 'right') {
						context.drawImage(tempSheet, drawFrame*(tempSheet.width/tempPlayer.fighter.frames[tempPlayer.action]), tempPlayer.sprite*(tempSheet.height/tempPlayer.fighter.sprites), tempSheet.width/tempPlayer.fighter.frames[tempPlayer.action], tempSheet.height/tempPlayer.fighter.sprites, tempPlayer.x*canvas.width, tempPlayer.y*canvas.height, spriteWidth, spriteHeight);
					} else {
						context.translate(canvas.width, 0);
						context.scale(-1, 1);
						context.drawImage(tempSheet, drawFrame*(tempSheet.width/tempPlayer.fighter.frames[tempPlayer.action]), tempPlayer.sprite*(tempSheet.height/tempPlayer.fighter.sprites), tempSheet.width/tempPlayer.fighter.frames[tempPlayer.action], tempSheet.height/tempPlayer.fighter.sprites, canvas.width - tempPlayer.x*canvas.width - spriteWidth, tempPlayer.y*canvas.height, spriteWidth, spriteHeight);
						context.setTransform(1, 0, 0, 1, 0, 0);
					}
				}

				for (var i in tempPlayer.projectiles) {
					var projectile = tempPlayer.projectiles[i];
					var data = ((demo) ? newDemoProjectiles[projectile.index] : projectiles[projectile.index]);
					var tempSheet = ((demo && imgs['demo'] && imgs['demo'][data.name]) ? imgs['demo'][data.name] : imgs['projectiles'][data.name]);
					drawProjectileFrame = Math.floor(projectile.frame/data.animationTime);
					if (projectile.facing == 'right') {
						context.drawImage(tempSheet, drawProjectileFrame*(tempSheet.width/data.frames), tempPlayer.sprite*(tempSheet.height/tempPlayer.fighter.sprites), tempSheet.width/data.frames, tempSheet.height/tempPlayer.fighter.sprites, projectile.x*canvas.width, projectile.y*canvas.height, data.width*canvas.width, data.height*canvas.height);
					} else {
						context.translate(canvas.width, 0);
						context.scale(-1, 1);
						context.drawImage(tempSheet, drawProjectileFrame*(tempSheet.width/data.frames), tempPlayer.sprite*(tempSheet.height/tempPlayer.fighter.sprites), tempSheet.width/data.frames, tempSheet.height/tempPlayer.fighter.sprites, canvas.width - projectile.x*canvas.width - data.width, projectile.y*canvas.height, data.width*canvas.width, data.height*canvas.height);
						context.setTransform(1, 0, 0, 1, 0, 0);
					}
				}

				if (game.started) {
					context.fillStyle = 'black';
					context.textAlign = 'center';
					context.font = (canvas.width/106.67).toString() + 'px Arial';
					context.fillText(tempPlayer.name.substring(0, nameLength), tempPlayer.x*canvas.width + spriteWidth/2, tempPlayer.y*canvas.height - canvas.height/180);

					for (var i=0; i<tempPlayer.stock; i++) {
						if(imgs['demo'] && demo) {
							context.drawImage(imgs['demo']['stock'], 0, tempPlayer.sprite*imgs['demo']['stock'].height/tempPlayer.fighter.sprites, imgs['demo']['stock'].width, imgs['demo']['stock'].height/tempPlayer.fighter.sprites, i*(canvas.width/60) + numPlayer*(canvas.width/(Object.keys(game.players).length+1)), 3.5*canvas.height/4, canvas.width/71.111111, canvas.height/45);
						} else {
							context.drawImage(imgs['fighters'][tempPlayer.fighter.name]['stock'], 0, tempPlayer.sprite*(imgs['fighters'][tempPlayer.fighter.name]['stock'].height/tempPlayer.fighter.sprites), imgs['fighters'][tempPlayer.fighter.name]['stock'].width, imgs['fighters'][tempPlayer.fighter.name]['stock'].height/tempPlayer.fighter.sprites, i*(canvas.width/60) + numPlayer*(canvas.width/(Object.keys(game.players).length+1)), 3.5*canvas.height/4, canvas.width/71.111111, canvas.height/45);
						}
					}

					context.fillText(tempPlayer.name.substring(0, nameLength), numPlayer*(canvas.width/(Object.keys(game.players).length+1)) + canvas.width/50, 3.45*canvas.height/4);

					context.textAlign = 'left';
					context.font = (canvas.height/20).toString() + 'px Arial';
					context.fillText(tempPlayer.launch.toString() + '%', numPlayer*(canvas.width/(Object.keys(game.players).length+1)), 3.78*canvas.height/4);
				}

				if (debug) {
					for (var i in tempPlayer.fighter.hitboxes[tempPlayer.action][drawFrame]) {
						var hitbox = ((tempPlayer.facing == 'left') ? flipHitbox(tempPlayer.fighter.hitboxes[tempPlayer.action][drawFrame][i]['hitbox']) : tempPlayer.fighter.hitboxes[tempPlayer.action][drawFrame][i]['hitbox']);
						context.lineWidth = 2;
						context.strokeStyle = 'rgba(0, 0, 255, 1)';
						context.beginPath();
						context.rect(tempPlayer.x*canvas.width + hitbox[0]*spriteWidth, tempPlayer.y*canvas.height + hitbox[1]*spriteHeight, (hitbox[2] - hitbox[0])*spriteWidth, (hitbox[3] - hitbox[1])*spriteHeight);
						context.stroke();
						context.closePath();
					}

					for (var i in tempPlayer.fighter.hurtboxes[tempPlayer.action][drawFrame]) {
						var hitbox = ((tempPlayer.facing == 'left') ? flipHitbox(tempPlayer.fighter.hurtboxes[tempPlayer.action][drawFrame][i]) : tempPlayer.fighter.hurtboxes[tempPlayer.action][drawFrame][i]);
						context.lineWidth = 2;
						context.strokeStyle = 'rgba(255, 0, 0, 1)';
						context.beginPath();
						context.rect(tempPlayer.x*canvas.width + hitbox[0]*spriteWidth, tempPlayer.y*canvas.height + hitbox[1]*spriteHeight, (hitbox[2] - hitbox[0])*spriteWidth, (hitbox[3] - hitbox[1])*spriteHeight);
						context.stroke();
						context.closePath();
					}

					for (var i in tempPlayer.projectiles) {
						var projectile = tempPlayer.projectiles[i];
						drawProjectileFrame = Math.floor(projectile.frame/projectiles[projectile.index].animationTime);
						for (var j in projectiles[projectile.index].hitboxes[drawProjectileFrame]) {
							var hitbox = ((projectile.facing == 'left') ? flipHitbox(projectiles[projectile.index].hitboxes[drawProjectileFrame][j]['hitbox']) : projectiles[projectile.index].hitboxes[drawProjectileFrame][j]['hitbox']);
							context.lineWidth = 2;
							context.strokeStyle = 'rgba(0, 0, 255, 1)';
							context.beginPath();
							context.rect(projectile.x*canvas.width + hitbox[0]*projectiles[projectile.index].width*canvas.width, projectile.y*canvas.height + hitbox[1]*projectiles[projectile.index].height*canvas.height, (hitbox[2] - hitbox[0])*projectiles[projectile.index].width*canvas.width, (hitbox[3] - hitbox[1])*projectiles[projectile.index].height*canvas.height);
							context.stroke();
							context.closePath();
						}
					}
				}
			}
		}

		if (!game.started) {
			context.fillStyle = 'white';
			context.fillRect(0, 0, canvas.width/3, canvas.height);
			context.fillRect(canvas.width/3 + canvas.width/1.6, 0, canvas.width - canvas.width/3, canvas.height);
			context.fillRect(canvas.width/3, canvas.height/6 + 2.5*canvas.height/4, canvas.width/1.6, canvas.height - canvas.height/6 + 2.5*canvas.height/4);
			context.fillRect(canvas.width/3, 0, canvas.width/1.6, canvas.height/6);
		}

		if (player.lost) {
			context.fillStyle = 'black';
			context.textAlign = 'center';
			context.font = (canvas.width/30).toString() + 'px Arial';
			context.fillText('You Lose', canvas.width/2, canvas.height/2);
		} else if (player.won) {
			context.fillStyle = 'black';
			context.textAlign = 'center';
			context.font = (canvas.width/30).toString() + 'px Arial';
			context.fillText('Victory!', canvas.width/2, canvas.height/2);
		}

		for (var i in gameButtons) {
			var button = gameButtons[i];
			if (button.getVisible()) {
				context.strokeStyle = 'black';
				context.lineWidth = button.lineWidth;
				context.fillStyle = ((button.canClick()) ? button.getColor() : 'gray');
				context.fillRect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.beginPath();
				context.rect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.stroke();
				context.closePath();

				context.textAlign = 'center';
				context.fillStyle = button.textColor;
				context.font = button.getFont();
				for (var i=0; i<button.getText().length; i++) {
					context.fillText(button.getText()[i], button.getX() + button.getWidth()/2, button.getY() + button.getHeight()/2 + button.getHeight()/10 + i*parseInt(button.getFont().substring(0, 2)) - (button.getHeight()/6)*(button.getText().length-1));
				}
			}

			if (button.getImage() != null) {
				context.drawImage(button.getImage(), button.x, button.y, button.width, button.height);
			}
		}
	}

	if(game && game != null && !game.started) {
		context.fillStyle = 'rgba(255, 0, 0, 1)';
		context.fillRect(canvas.width*0.4, canvas.height*0.7, canvas.width*0.5, canvas.height*0.07);

		context.lineWidth = 3;
		context.strokeStyle = 'black';
		context.fillStyle = 'black';
		context.textAlign = 'center';
		context.font = (canvas.width/60).toString() + 'px Arial';
		context.fillText('Lobby', canvas.width/2, canvas.height/14);

		context.textAlign = 'left';
		context.font = (canvas.width/70).toString() + 'px Arial';
		context.fillText('Players:', canvas.width/7, canvas.height/3.3);

		context.font = (canvas.width/106.67).toString() + 'px Arial';
		var i = 0;
		for (var j in game.players) {
			context.textAlign = 'left';
			context.fillText(game.players[j].name, canvas.width/6, canvas.height/3.3 + canvas.height/38 + (canvas.height/50)*i);

			context.textAlign = 'right';
			context.fillText('Ready!', canvas.width/6 - canvas.width/80 - canvas.width/75, canvas.height/3.3 + canvas.height/38 + (canvas.height/50)*i);

			if (game.players[game.host].id == game.players[j].id) {
				context.drawImage(imgs['menu']['host'], canvas.width/6 - canvas.width/80 - canvas.width/192, canvas.height/3.3 + canvas.height/35 + (canvas.height/50)*i - canvas.height/45, canvas.width/80, canvas.height/45);
			}

			i++;
		}

		context.lineWidth = 6;
		context.beginPath();
		context.rect(canvas.width/3, canvas.height/6, canvas.width/1.6, 2.5*canvas.height/4);
		context.stroke();
		context.closePath();

		for (var i in preGameButtons) {
			var button = preGameButtons[i];
			if (button.getVisible()) {
				context.strokeStyle = 'black';
				context.lineWidth = button.lineWidth;
				context.fillStyle = ((button.canClick()) ? button.getColor() : 'gray');
				context.fillRect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.beginPath();
				context.rect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.stroke();
				context.closePath();

				context.textAlign = 'center';
				context.fillStyle = button.textColor;
				context.font = button.getFont();
				for (var i=0; i<button.getText().length; i++) {
					context.fillText(button.getText()[i], button.getX() + button.getWidth()/2, button.getY() + button.getHeight()/2 + button.getHeight()/10 + i*parseInt(button.getFont().substring(0, 2)) - (button.getHeight()/6)*(button.getText().length-1));
				}

				if (button.getImage() != null) {
					context.drawImage(button.getImage(), button.getX(), button.getY(), button.getWidth(), button.getHeight());
				}
			}
		}

		if (naming) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			var tempNameWidth = context.measureText(tempName).width;
			context.font = 'bold ' + (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(canvas.width/7.5 + tempNameWidth + canvas.width/384 + context.measureText('Name: ').width, canvas.height/4.3, canvas.width/128, canvas.height/43.2);
		}

		if (namingGame) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(canvas.width/2 + context.measureText(tempGameName).width/2 + canvas.width/640, canvas.height/10, canvas.width/128, canvas.height/43.2);
		}

	} else if ((!game || game == null) && !createFighter) {
		context.fillStyle = 'black';
		context.textAlign = 'center';
		context.font = (canvas.width/60).toString() + 'px Arial';
		context.fillText('Open Games', canvas.width/2, canvas.height/7);

		if(lobbyButtons.length == lobbyButtonsLength) {
			context.fillStyle = 'rgba(115, 115, 115, 1)';
			context.font = (canvas.width/80).toString() + 'px Arial';
			context.fillText('No Open Games', canvas.width/2, canvas.height/3);
		} else {
			for (var i=lobbyButtonsLength; i<lobbyButtons.length; i++) {
				context.lineWidth = 2;
				context.fillStyle = 'white';
				context.strokeStyle = 'black';
				context.fillRect(2*canvas.width/5, canvas.height/6 + i*(canvas.height/27) - canvas.height/270, canvas.width/5, canvas.height/54 + canvas.height/135);
				context.beginPath();
				context.rect(2*canvas.width/5, canvas.height/6 + i*(canvas.height/27) - canvas.height/270, canvas.width/5, canvas.height/54 + canvas.height/135);
				context.stroke();
				context.closePath();

				context.fillStyle = 'black';
				context.textAlign = 'left';
				context.font = 'bold ' + (canvas.width/120).toString() + 'px Arial';
				context.fillText(gamez[lobbyButtons[i].id].name.substring(0, 10) + ((gamez[lobbyButtons[i].id].name.length > 10) ? '...' : ''), 2*canvas.width/5 + canvas.width/480, canvas.height/6 + i*(canvas.height/27) + canvas.height/70);

				context.font = (canvas.width/120).toString() + 'px Arial';

				if (gamez[lobbyButtons[i].id].started) {
					context.fillText('Ongoing', 2*canvas.width/5 + canvas.width/12.4, canvas.height/6 + i*(canvas.height/27) + canvas.height/70);			
				} else {
					context.fillText(gamez[lobbyButtons[i].id].players + '/' + maxPlayers + ' Players', 2*canvas.width/5 + canvas.width/12.4, canvas.height/6 + i*(canvas.height/27) + canvas.height/70);			
				}
			}
		}

		for (var i in lobbyButtons) {
			var button = lobbyButtons[i];
			if (button.getVisible()) {
				context.strokeStyle = 'black';
				context.lineWidth = button.lineWidth;
				context.fillStyle = ((button.canClick()) ? button.getColor() : 'gray');
				context.fillRect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.beginPath();
				context.rect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.stroke();
				context.closePath();

				context.textAlign = 'center';
				context.fillStyle = button.textColor;
				context.font = button.getFont();
				for (var i=0; i<button.getText().length; i++) {
					context.fillText(button.getText()[i], button.getX() + button.getWidth()/2, button.getY() + button.getHeight()/2 + button.getHeight()/10 + i*parseInt(button.getFont().substring(0, 2)) - (button.getHeight()/6)*(button.getText().length-1) + canvas.height/360);
				}

				if (button.getImage() != null) {
					context.drawImage(button.getImage(), button.getX(), button.getY(), button.getWidth(), button.getHeight());
				}
			}
		}
	} else if ((!game || game == null) && createFighter) {

		if (newFighterNewImage && document.getElementById('inputButton').files.length > 0) {
			var file = document.getElementById('inputButton').files[0];
			var reader = new FileReader();
			reader.onload = function(event){
				var img = new Image();
				img.onload = function(){
					if (!imgs['new']) {
						imgs['new'] = {};
					}

					if (!imgs['new'][newFighterSprite]) {
						imgs['new'][newFighterSprite] = {};
					}

					if (!imgs['new'][newFighterSprite][newFighterAction]) {
						imgs['new'][newFighterSprite][newFighterAction] = {};
					}

					if (newFighterNewImage && ((imgs['new'][newFighterSprite][newFighterAction][newFighterFrame] && imgs['new'][newFighterSprite][newFighterAction][newFighterFrame].src != img.src) || !imgs['new'][newFighterSprite][newFighterAction][newFighterFrame])) {
						imgs['new'][newFighterSprite][newFighterAction][newFighterFrame] = img;
						newFighterNewImage = false;
						document.getElementById('inputButton').type = 'text';
						document.getElementById('inputButton').type = 'file';
					}
				}
				img.src = event.target.result;
			}
			reader.readAsDataURL(file);
		} else if (newFighterNewSpriteSheet && document.getElementById('inputButton').files.length > 0) {
			var file = document.getElementById('inputButton').files[0];
			var reader = new FileReader();
			reader.onload = function(event){
				var img = new Image();
				img.onload = function(){
					if (!imgs['new']) {
						imgs['new'] = {};
					}

					if (!imgs['new'][newFighterSprite]) {
						imgs['new'][newFighterSprite] = {};
					}

					if (!imgs['new'][newFighterSprite][newFighterAction]) {
						imgs['new'][newFighterSprite][newFighterAction] = {};
					}

					if (newFighterNewSpriteSheet) {
						for (var i=newFighterFrame; i<parseInt(newFighterFrame)+spritesInSheet; i++) {
							var tempCanvas = document.createElement('canvas');
							var tempContext = tempCanvas.getContext('2d');
							tempContext.imageSmoothingEnabled = false;
							tempCanvas.width = img.width/spritesInSheet;
							tempCanvas.height = img.height;

							tempContext.drawImage(img, (i - newFighterFrame)*tempCanvas.width, 0, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);

							var img1 = new Image();
							img1.src = tempCanvas.toDataURL('image/png');
							imgs['new'][newFighterSprite][newFighterAction][i] = img1;

							while (i>createFighterButtons.length - createFighterButtonsLength - 1) {
								newFighterButton();
								newFighterData['frames'][newFighterAction]++;

								if(newFighterData['effects'][newFighterAction]) {
									newFighterData['effects'][newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] =
										{'x': {'add': null, 'set': null, 'facing': 0},
										'y': {'add': null, 'set': null, 'facing': 0},
										'velX': {'add': null, 'set': null, 'facing': 0},
										'velY': {'add': null, 'set': null, 'facing': 0},
										'projectile': null,
										'lingering': '',
										'turnable': false};
									newFighterXEffect[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = 0;
									newFighterYEffect[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = 0;
									newFighterXVelEffect[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = 0;
									newFighterYVelEffect[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = 0;
									newFighterProjectile[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = '';
								}
							}
						}
						
						newFighterFrame = i-1;
						newFighterNewSpriteSheet = false;
						document.getElementById('inputButton').type = 'text';
						document.getElementById('inputButton').type = 'file';
					}
				}
				img.src = event.target.result;
			}
			reader.readAsDataURL(file);
		} else if(uploadNewFighter && document.getElementById('folderInputButton').files.length > 0) {
			uploadNewFighter = false;
			var files = document.getElementById('folderInputButton').files;
			var newFighterText;

			for(let i in Object.keys(files)) {
				if(files[i].type == 'text/plain' && !files[i].webkitRelativePath.includes('projectiles/') && !files[i].webkitRelativePath.includes('sprites/')) {
					var fileReader = new FileReader();
					fileReader.onload = function(fileLoadedEvent) {
						newFighterAction = 'idle';
						newFighterProjectiles = 0;
						newFighterSprite = 0;
						newFighterFrame = 0;
						newFighterAnimationFrame = 0;

						for (var j in newFighterData['projectiles']) {
							for (var k in createFighterButtons) {
								if (createFighterButtons[k].id == j) {
									createFighterButtons.splice(k, 1);
									createFighterButtonsLength--;
									break;
								}
							}
						}

						newFighterText = splitData(fileLoadedEvent.target.result);
						newFighterData = createFighterFromText(newFighterText);

						var max = 0;
						for (var j=0; j<createFighterButtons.length; j++) {
							if (createFighterButtons[j].id.startsWith('skin_')) {
								if (max != -1) {
									max = parseInt(createFighterButtons[j].id.split('_')[1]);
								}

								if (parseInt(createFighterButtons[j].id.split('_')[1]) > parseInt(newFighterText['sprites'])-1) {
									createFighterButtons.splice(j, 1);
									createFighterButtonsLength--;
									max = -1;
									j--;
								}
							}
						}
						newFighterSprite = Math.min(newFighterSprite, parseInt(newFighterText['sprites'])-1);

						if (max >= 0) {
							for (var j=max; j<parseInt(newFighterText['sprites'])-1; j++) {
								createFighterButtonsLength++;
								newSkinButton(j+1);
							}
						}

						newFighterXEffect = {};
						newFighterYEffect = {};
						newFighterXVelEffect = {};
						newFighterYVelEffect = {};
						newFighterProjectile = {};
						for(var j in newFighterData.frames) {
							newFighterXEffect[j] = {};
							newFighterYEffect[j] = {};
							newFighterXVelEffect[j] = {};
							newFighterYVelEffect[j] = {};
							newFighterProjectile[j] = {};
							for(var k=0; k<newFighterData.frames[j]; k++) {
								if (newFighterData['effects'][j] && newFighterData['effects'][j][k]) {
									
									newFighterXEffect[j][k] = 0;
									newFighterYEffect[j][k] = 0;
									newFighterXVelEffect[j][k] = 0;
									newFighterYVelEffect[j][k] = 0;
									newFighterProjectile[j][k] = '';

									if (newFighterData['effects'][j][k]['x']['add'] != null && newFighterData['effects'][j][k]['x']['add'] != 0) {
										newFighterXEffect[j][k] = newFighterData['effects'][j][k]['x']['add'];
									} else if (newFighterData['effects'][j][k]['x']['set'] != null && newFighterData['effects'][j][k]['x']['set'] != 0) {
										newFighterXEffect[j][k] = newFighterData['effects'][j][k]['x']['set'];
									}

									if (newFighterData['effects'][j][k]['y']['add'] != null && newFighterData['effects'][j][k]['y']['add'] != 0) {
										newFighterYEffect[j][k] = newFighterData['effects'][j][k]['y']['add'];
									} else if (newFighterData['effects'][j][k]['y']['set'] != null && newFighterData['effects'][j][k]['y']['set'] != 0) {
										newFighterYEffect[j][k] = newFighterData['effects'][j][k]['y']['set'];
									}

									if (newFighterData['effects'][j][k]['velX']['add'] != null && newFighterData['effects'][j][k]['velX']['add'] != 0) {
										newFighterXVelEffect[j][k] = newFighterData['effects'][j][k]['velX']['add'];
									} else if (newFighterData['effects'][j][k]['velX']['set'] != null && newFighterData['effects'][j][k]['velX']['set'] != 0) {
										newFighterXVelEffect[j][k] = newFighterData['effects'][j][k]['velX']['set'];
									}

									if (newFighterData['effects'][j][k]['velY']['add'] != null && newFighterData['effects'][j][k]['velY']['add'] != 0) {
										newFighterYVelEffect[j][k] = newFighterData['effects'][j][k]['velY']['add'];
									} else if (newFighterData['effects'][j][k]['velY']['set'] != null && newFighterData['effects'][j][k]['velY']['set'] != 0) {
										newFighterYVelEffect[j][k] = newFighterData['effects'][j][k]['velY']['set'];
									}

									if (newFighterData['effects'][j][k]['projectile'] != null) {
										newFighterProjectile[j][k] = newFighterData['effects'][j][k]['projectile'];

										if (!newFighterData['projectiles'][newFighterData['effects'][j][k]['projectile']]) {
											newFighterData['projectiles'][newFighterData['effects'][j][k]['projectile']] = {'x': 0, 'y': 0, 'width': 0.0166667, 'height': 0.05, 'velX': 0.01, 'velY': -0.01, 'weight': 1, 'hitsLeft': 1};
										}
									}

								} else {
									newFighterXEffect[j][k] = 0;
									newFighterYEffect[j][k] = 0;
									newFighterXVelEffect[j][k] = 0;
									newFighterYVelEffect[j][k] = 0;
									newFighterProjectile[j][k] = '';
								}
							}
						}

						var projFound = [];
						var imgFound = [];
						var projFrames = {};
						for (let i in Object.keys(files)) {
							if(files[i].type == 'text/plain' && files[i].webkitRelativePath.includes('projectiles/')) {
								projFound.push(files[i]);
							}
						}

						for (let i in Object.keys(files)) {
							if(files[i].type == 'image/png' && files[i].webkitRelativePath.includes('sprites/')) {
								imgFound.push(files[i]);
							}
						}

						if (projFound.length > 0) {
							var fileReader = new FileReader();
							fileReader.onload = function(fileLoadedEvent) {uploadProjectiles(fileLoadedEvent, newFighterText, projFrames, imgFound, projFound, 0)};
							fileReader.readAsText(projFound[0], "UTF-8");
						} else {
							if (imgFound.length > 0) {
								var fileReader = new FileReader();
								fileReader.onload = function(fileLoadedEvent) {uploadSprites(fileLoadedEvent, newFighterText, projFrames, imgFound, 0)};
								fileReader.readAsDataURL(imgFound[0]);
							}
						}
					};
					fileReader.readAsText(files[i], "UTF-8");
					break;
				}
			}
		}

		if (imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction] && imgs['new'][newFighterSprite][newFighterAction][newFighterFrame]) {
			context.drawImage(imgs['new'][newFighterSprite][newFighterAction][newFighterFrame], canvas.width/2 - (((newFighterData['effects'][newFighterAction]) ? newFighterData['spriteWidth'] : ((newFighterAction == 'stock') ? (1/71.111111) : newFighterData['projectiles'][newFighterAction]['width']))*canvas.width)/2, canvas.height/2 - (((newFighterData['effects'][newFighterAction]) ? newFighterData['spriteHeight'] : ((newFighterAction == 'stock') ? (1/45) : newFighterData['projectiles'][newFighterAction]['height']))*canvas.height)/2, ((newFighterData['effects'][newFighterAction]) ? newFighterData['spriteWidth'] : ((newFighterAction == 'stock') ? (1/71.111111) : newFighterData['projectiles'][newFighterAction]['width']))*canvas.width, ((newFighterData['effects'][newFighterAction]) ? newFighterData['spriteHeight'] : ((newFighterAction == 'stock') ? (1/45) : newFighterData['projectiles'][newFighterAction]['height']))*canvas.height);
		}

		if (contains(newFighterView, 'groundbox') && newFighterData['groundboxes'][newFighterAction] && newFighterData['groundboxes'][newFighterAction][newFighterFrame]) {
			var hitbox = newFighterData['groundboxes'][newFighterAction][newFighterFrame];
			context.fillStyle = ((newFighterBoxSelected[1] == 'groundbox') ? 'rgba(200, 200, 200, 0.6)' : 'rgba(181, 101, 29, 0.3)');
			context.fillRect(hitbox[0]*canvas.width, hitbox[1]*canvas.height, (hitbox[2]-hitbox[0])*canvas.width, (hitbox[3]-hitbox[1])*canvas.height);
			context.strokeStyle = ((newFighterBoxSelected[1] == 'groundbox') ? 'rgba(100, 100, 100, 1)' : 'rgba(181, 101, 29, 1)');
			context.lineWidth = 2;
			context.beginPath();
			context.rect(hitbox[0]*canvas.width, hitbox[1]*canvas.height, (hitbox[2]-hitbox[0])*canvas.width, (hitbox[3]-hitbox[1])*canvas.height);
			context.stroke();
			context.closePath();
		}

		if (contains(newFighterView, 'hurtbox') && newFighterData['hurtboxes'][newFighterAction] && newFighterData['hurtboxes'][newFighterAction][newFighterFrame]) {
			for (var i in newFighterData['hurtboxes'][newFighterAction][newFighterFrame]) {
				var hitbox = newFighterData['hurtboxes'][newFighterAction][newFighterFrame][i];
				context.fillStyle = ((newFighterBoxSelected[0] == i && newFighterBoxSelected[1] == 'hurtbox') ? 'rgba(200, 200, 200, 0.6)' : 'rgba(255, 0, 0, 0.3)');
				context.fillRect(hitbox[0]*canvas.width, hitbox[1]*canvas.height, (hitbox[2]-hitbox[0])*canvas.width, (hitbox[3]-hitbox[1])*canvas.height);
				context.strokeStyle = ((newFighterBoxSelected[0] == i && newFighterBoxSelected[1] == 'hurtbox') ? 'rgba(100, 100, 100, 1)' : 'red');
				context.lineWidth = 2;
				context.beginPath();
				context.rect(hitbox[0]*canvas.width, hitbox[1]*canvas.height, (hitbox[2]-hitbox[0])*canvas.width, (hitbox[3]-hitbox[1])*canvas.height);
				context.stroke();
				context.closePath();
			}
		}

		if (contains(newFighterView, 'hitbox') && newFighterData['hitboxes'][newFighterAction] && newFighterData['hitboxes'][newFighterAction][newFighterFrame]) {
			for (var i in newFighterData['hitboxes'][newFighterAction][newFighterFrame]) {
				var hitbox = newFighterData['hitboxes'][newFighterAction][newFighterFrame][i];
				context.fillStyle = ((newFighterBoxSelected[0] == i && newFighterBoxSelected[1] == 'hitbox') ? 'rgba(200, 200, 200, 0.6)' : 'rgba(0, 0, 255, 0.3)');
				context.fillRect(hitbox[0]*canvas.width, hitbox[1]*canvas.height, (hitbox[2]-hitbox[0])*canvas.width, (hitbox[3]-hitbox[1])*canvas.height);
				context.strokeStyle = ((newFighterBoxSelected[0] == i && newFighterBoxSelected[1] == 'hitbox') ? 'rgba(100, 100, 100, 1)' : 'blue');
				context.lineWidth = 2;
				context.beginPath();
				context.rect(hitbox[0]*canvas.width, hitbox[1]*canvas.height, (hitbox[2]-hitbox[0])*canvas.width, (hitbox[3]-hitbox[1])*canvas.height);
				context.stroke();
				context.closePath();
			}
		}

		if (newFighterAction != 'stock') {
			context.textAlign = 'center';
			context.fillStyle = 'black';
			context.font = '16px Arial';
			context.fillText('Width', canvas.width/3.2 + canvas.width/20, canvas.height/5.82);
			context.fillText('Height', canvas.width/3.2 + canvas.width/20, canvas.height/4.62);
		}

		if (newFighterAction != 'stock' && newFighterAction != 'entrance') {
			context.font = canvas.width/68 + 'px Arial';
			context.fillText('Attacks', canvas.width/1.09, canvas.height/20);
		}

		if (newFighterData['attacks'][newFighterAction]) {
			for (var i=0; i<newFighterData['attacks'][newFighterAction].length; i++) {
				if (newFighterData['attacks'][newFighterAction][i]['frames'][newFighterFrame] && newFighterBoxSelected[1]=='hitbox' && contains(newFighterData['attacks'][newFighterAction][i]['frames'][newFighterFrame], newFighterBoxSelected[0])) {
					context.strokeStyle = 'blue';
					context.lineWidth = 4;
				} else {
					context.strokeStyle = 'black';
					context.lineWidth = 2;
				}
				context.beginPath();
				context.rect(canvas.width/1.09 - canvas.width/20, canvas.height/9 + (canvas.height/10)*i, canvas.width/10, canvas.height/11);
				context.stroke();
				context.closePath();
			}
		}

		context.strokeStyle = 'black';
		context.lineWidth = 6;
		context.beginPath();
		context.rect(0.40625*canvas.width, canvas.height/4, 0.1875*canvas.width, canvas.height/2);
		context.stroke();
		context.closePath();

		if (newFighterAction != 'stock' && newFighterAction != 'entrance') {
			context.lineWidth = 2;
			context.beginPath();
			context.rect(0.651*canvas.width, 2.2*canvas.height/4, canvas.width/6, ((contains(actions, newFighterAction)) ? canvas.height/3.01 : canvas.height/3.45));
			context.stroke();
			context.closePath();
		}

		context.textAlign = 'center';
		context.fillText(((newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance') ? 'Effects' : ((newFighterAction != 'stock' && newFighterAction != 'entrance') ? 'Projectile Properties' : '')), 0.651*canvas.width + canvas.width/12, 2.15*canvas.height/4);

		if(newFighterData['effects'][newFighterAction] && newFighterAction != 'entrance') {
			context.textAlign = 'left';
			context.font = canvas.width/100 + 'px Arial';
			context.fillText('X Position', 0.651*canvas.width + canvas.width/200, 2.32*canvas.height/4);
			context.fillText('Y Position', 0.651*canvas.width + canvas.width/200, 2.54*canvas.height/4);
			context.fillText('X Velocity', 0.651*canvas.width + canvas.width/200, 2.76*canvas.height/4);
			context.fillText('Y Velocity', 0.651*canvas.width + canvas.width/200, 2.98*canvas.height/4);
			context.fillText('Projectile', 0.651*canvas.width + canvas.width/200, 3.2*canvas.height/4);
			context.fillText('Lingering', 0.651*canvas.width + canvas.width/200, 3.33*canvas.height/4);
			context.fillText('Turnable', 0.651*canvas.width + canvas.width/200, 3.46*canvas.height/4);

			context.font = canvas.width/140 + 'px Arial';
			context.fillText('Add', 0.662*canvas.width + canvas.width/200, 2.41*canvas.height/4);
			context.fillText('Set', 0.712*canvas.width + canvas.width/200, 2.41*canvas.height/4);
			context.fillText('Facing', 0.778*canvas.width + canvas.width/200, 2.41*canvas.height/4);
			context.fillText('Add', 0.662*canvas.width + canvas.width/200, 2.63*canvas.height/4);
			context.fillText('Set', 0.712*canvas.width + canvas.width/200, 2.63*canvas.height/4);
			context.fillText('Add', 0.662*canvas.width + canvas.width/200, 2.85*canvas.height/4);
			context.fillText('Set', 0.712*canvas.width + canvas.width/200, 2.85*canvas.height/4);
			context.fillText('Facing', 0.778*canvas.width + canvas.width/200, 2.85*canvas.height/4);
			context.fillText('Add', 0.662*canvas.width + canvas.width/200, 3.07*canvas.height/4);
			context.fillText('Set', 0.712*canvas.width + canvas.width/200, 3.07*canvas.height/4);
			context.fillText('Land', 0.712*canvas.width + canvas.width/200, 3.325*canvas.height/4);
			context.fillText('Attack', 0.778*canvas.width + canvas.width/200, 3.325*canvas.height/4);
		} else if(newFighterAction != 'stock' && newFighterAction != 'entrance') {
			context.textAlign = 'left';
			context.font = canvas.width/100 + 'px Arial';
			context.fillText('Name', 0.651*canvas.width + canvas.width/200, 2.32*canvas.height/4);
			context.fillText('Relative X', 0.651*canvas.width + canvas.width/200, 2.48*canvas.height/4);
			context.fillText('Relative Y', 0.651*canvas.width + canvas.width/200, 2.64*canvas.height/4);
			context.fillText('X Velocity', 0.651*canvas.width + canvas.width/200, 2.8*canvas.height/4);
			context.fillText('Y Velocity', 0.651*canvas.width + canvas.width/200, 2.96*canvas.height/4);
			context.fillText('Fall Speed', 0.651*canvas.width + canvas.width/200, 3.12*canvas.height/4);
			context.fillText('Piercing', 0.651*canvas.width + canvas.width/200, 3.28*canvas.height/4);
		}

		context.textAlign = 'center';
		context.font = canvas.width/68 + 'px Arial';
		context.fillText('Fighter Properties', 0.082*canvas.width, 0.15*canvas.height);

		context.textAlign = 'left';
		context.font = canvas.width/60 + 'px Arial';
		context.fillText('Skins:', 0.22*canvas.width, 0.1*canvas.height);

		context.textAlign = 'center';
		context.font = canvas.width/160 + 'px Arial';
		context.fillText('These will overwrite all current work', 0.143*canvas.width, 0.93*canvas.height);

		context.textAlign = 'left';
		context.font = canvas.width/100 + 'px Arial';
		context.fillText('Name', 0.015*canvas.width, 0.195*canvas.height);
		context.fillText('Jumps', 0.015*canvas.width, 0.23*canvas.height);
		context.fillText('Jump Strength', 0.015*canvas.width, 0.265*canvas.height);
		context.fillText('Fall Speed', 0.015*canvas.width, 0.3*canvas.height);
		context.fillText('Weight', 0.015*canvas.width, 0.335*canvas.height);
		context.fillText('Run Speed', 0.015*canvas.width, 0.37*canvas.height);
		context.fillText('Friction', 0.015*canvas.width, 0.405*canvas.height);


		for (var i in createFighterSliders) {
			var slider = createFighterSliders[i];
			if (slider.getVisible()) {
				context.fillStyle = slider.getLineColor();
				context.fillRect(slider.getX(), slider.getY(), slider.getLineWidth(), slider.getLineHeight());
				context.strokeStyle = slider.getLineColor();
				context.lineWidth = slider.getBoxThickness();
				context.fillStyle = slider.getBoxColor();
				context.fillRect(slider.getX() + slider.getLineWidth()*((slider.getValue()-slider.min)/(slider.max-slider.min)) - slider.getBoxWidth()/2, slider.getY() + slider.getLineHeight()/2 - slider.getBoxHeight()/2, slider.getBoxWidth(), slider.getBoxHeight());
				context.beginPath();
				context.rect(slider.getX() + slider.getLineWidth()*((slider.getValue()-slider.min)/(slider.max-slider.min)) - slider.getBoxWidth()/2, slider.getY() + slider.getLineHeight()/2 - slider.getBoxHeight()/2, slider.getBoxWidth(), slider.getBoxHeight());
				context.stroke();
				context.closePath();
			}
		}

		for (var j in createFighterButtons) {
			var button = createFighterButtons[j];
			if (button.getVisible()) {
				context.strokeStyle = 'black';
				context.lineWidth = button.lineWidth;
				context.fillStyle = ((button.canClick()) ? button.getColor() : 'gray');
				context.fillRect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.beginPath();
				context.rect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.stroke();
				context.closePath();

				context.textAlign = 'center';
				context.fillStyle = button.textColor;
				context.font = button.getFont();
				for (var i=0; i<button.getText().length; i++) {
					context.fillText(button.getText()[i], button.getX() + button.getWidth()/2, button.getY() + button.getHeight()/2 + button.getHeight()/10 + i*parseInt(button.getFont().substring(0, 2)) - (button.getHeight()/6)*(button.getText().length-1) + canvas.height/360);
				}

				if (button.getImage() != null) {
					context.drawImage(button.getImage(), button.getX(), button.getY(), button.getWidth(), button.getHeight());
				}
			}
		}

		for (var i in createAttackInputs) {
			var button = createAttackInputs[i];
			if (button.getVisible()) {
				context.strokeStyle = 'black';
				context.lineWidth = button.lineWidth;
				context.fillStyle = ((button.canClick()) ? button.getColor() : 'gray');
				context.fillRect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.beginPath();
				context.rect(button.getX(), button.getY(), button.getWidth(), button.getHeight());
				context.stroke();
				context.closePath();

				context.textAlign = 'left';
				context.fillStyle = button.textColor;
				context.font = button.getFont();
				for (var i=0; i<button.getText().length; i++) {
					context.fillText(button.getText()[i], button.getX() + canvas.width/700, button.getY() + button.getHeight()/2 + button.getHeight()/10 + i*parseInt(button.getFont().substring(0, 2)) - (button.getHeight()/6)*(button.getText().length-1) + canvas.height/360);
				}

				if (button.getImage() != null) {
					context.drawImage(button.getImage(), button.getX(), button.getY(), button.getWidth(), button.getHeight());
				}
			}
		}

		if (namingAnimationTime) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(canvas.width/2 - context.measureText(' ticks per frame').width/2 + (context.measureText(tempAnimationTime).width + canvas.width/384)/2, 3.55*canvas.height/4, canvas.width/128, canvas.height/43.2);
		}

		if (namingSprites) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(canvas.width/2 - context.measureText(' sprites in sheet').width/2 + (context.measureText(tempSprites).width + canvas.width/384)/2, 0.62*canvas.height/4, canvas.width/128, canvas.height/43.2);
		}

		if (namingDamage != -1) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(canvas.width/1.15 + context.measureText(tempDamage).width + canvas.width/384, canvas.height/8 + (canvas.height/10)*namingDamage, canvas.width/128, canvas.height/43.2);
		}

		if (namingStun != -1) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(canvas.width/1.08 + context.measureText(tempStun).width + canvas.width/384, canvas.height/8 + (canvas.height/10)*namingStun, canvas.width/128, canvas.height/43.2);
		}

		if (namingLaunchX != -1) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(canvas.width/1.15 + context.measureText(tempLaunchX).width + canvas.width/384, canvas.height/6.2 + (canvas.height/10)*namingLaunchX, canvas.width/128, canvas.height/43.2);
		}

		if (namingLaunchY != -1) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(canvas.width/1.15 + context.measureText(tempLaunchY).width + canvas.width/384 + canvas.width/45, canvas.height/6.2 + (canvas.height/10)*namingLaunchY, canvas.width/128, canvas.height/43.2);
		}

		if (namingXEffect) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempXEffect).width/2 + canvas.width/384 + canvas.width/45, 0.587*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingYEffect) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempYEffect).width/2 + canvas.width/384 + canvas.width/45, 0.639*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingXVelEffect) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempXVelEffect).width/2 + canvas.width/384 + canvas.width/45, 0.693*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingYVelEffect) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempYVelEffect).width/2 + canvas.width/384 + canvas.width/45, 0.747*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingProjectile) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempProjectile).width/2 + canvas.width/384 + canvas.width/45, 0.782*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingProjectileName) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempProjectileName).width/2 + canvas.width/384 + canvas.width/45, 0.562*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingXRel) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempXRel).width/2 + canvas.width/384 + canvas.width/45, 0.602*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingYRel) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempYRel).width/2 + canvas.width/384 + canvas.width/45, 0.642*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingXVel) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempXVel).width/2 + canvas.width/384 + canvas.width/45, 0.682*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingYVel) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempYVel).width/2 + canvas.width/384 + canvas.width/45, 0.722*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingWeight) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempWeight).width/2 + canvas.width/384 + canvas.width/45, 0.762*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingPiercing) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.726*canvas.width + context.measureText(tempPiercing).width/2 + canvas.width/384 + canvas.width/45, 0.802*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingFighterName) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.127*canvas.width + context.measureText(tempFighterName).width/2 + 1, 0.174*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingFighterJumps) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.127*canvas.width + context.measureText(tempFighterJumps).width/2 + 1, 0.209*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingFighterJumpStrength) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.127*canvas.width + context.measureText(tempFighterJumpStrength).width/2 + 1, 0.244*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingFighterFallSpeed) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.127*canvas.width + context.measureText(tempFighterFallSpeed).width/2 + 1, 0.279*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingFighterWeight) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.127*canvas.width + context.measureText(tempFighterWeight).width/2 + 1, 0.314*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingFighterRunSpeed) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.127*canvas.width + context.measureText(tempFighterRunSpeed).width/2 + 1, 0.349*canvas.height, canvas.width/128, canvas.height/43.2);
		}

		if (namingFighterFriction) {
			context.font = (canvas.width/106.67).toString() + 'px Arial';
			context.fillStyle = 'black';
			context.fillRect(0.127*canvas.width + context.measureText(tempFighterFriction).width/2 + 1, 0.384*canvas.height, canvas.width/128, canvas.height/43.2);
		}
	}

	if (!(ping === undefined)) {
		context.fillStyle = 'rgba(50, 50, 50, 0.6)';
		context.textAlign = 'right';
		context.font = 'bold ' + (canvas.width/160).toString() + 'px Arial';
		context.fillText('Ping: ' + ping, canvas.width/1.01, canvas.height/90);
	}
}

socket.on('data', function(getData, getFighters, getProjectiles, getStages) {
	data = getData;
	tempFighters = getFighters;
	projectiles = getProjectiles;
	stages = getStages;
	loadImages();

	fighters = [];
	var ind = 0;
	for(var l in tempFighters) {
		fighters.push(createFighterFromText(tempFighters[l]));

		let num = ind;
		createFighterButtons.unshift(new Button('Load' + fighters[num].name, function() {return 0.015*canvas.width;}, function() {return 0.94*canvas.height - (num+1)*this.getHeight();}, function() {return canvas.width/7 - 0.02*canvas.width;}, function() {return canvas.height/20;}, 2, function() {newFighterLoadExisting(num); fighterSelect = false;}, function() {return true;}, function() {return 'white';}, function() {return [fighters[num].name];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return fighterSelect;}));
		createFighterButtonsLength += 1;
		ind += 1;
	}
});

socket.on('demoFighterData', function(demoFighterData, demoProjectileData) {
	newDemoFighter = demoFighterData;
	newDemoProjectiles = demoProjectileData;
	socket.emit('startGame');
});

socket.on('state', function(gameString) {
	player = {};
	game = {};

	var length = +gameString.substring(0, 2);
	var index = 2;
	game['name'] = gameString.substring(index, index + length);
	index += length;
	game['started'] = !!+gameString.substring(index, index + 1);
	index += 1;
	game['stage'] = stages[+gameString.substring(index, index + 2)];
	index += 2;
	game['host'] = +gameString.substring(index, index + 1);
	index += 1;
	var player_count = +gameString.substring(index, index + 1);
	index += 1;
	game['players'] = [];
	for (var i=0; i<player_count; i++) {
		length = +gameString.substring(index, index + 2);
		index += 2;
		game['players'].push({'id': gameString.substring(index, index + length)});
		index += length;
		length = +gameString.substring(index, index + 2);
		index += 2;
		game['players'][i]['name'] = gameString.substring(index, index + length);
		index += length;
		game['players'][i]['win'] = !!+gameString.substring(index, index + 1);
		index += 1;
		game['players'][i]['lose'] = !!+gameString.substring(index, index + 1);
		index += 1;
		game['players'][i]['action'] = actions[+gameString.substring(index, index + 2)];
		index += 2;
		game['players'][i]['animationFrame'] = +gameString.substring(index, index + 2);
		index += 2;
		var playerFighter = +gameString.substring(index, index + 2);
		if (playerFighter == -1) {
			game['players'][i]['fighter'] = newDemoFighter;
		} else {
			game['players'][i]['fighter'] = fighters[+gameString.substring(index, index + 2)];
		}
		index += 2;
		game['players'][i]['sprite'] = +gameString.substring(index, index + 1);
		index += 1;
		game['players'][i]['stock'] = +gameString.substring(index, index + 1);
		index += 1;
		game['players'][i]['x'] = +gameString.substring(index, index + 6) - 4;
		index += 6;
		game['players'][i]['y'] = +gameString.substring(index, index + 6) - 4;
		index += 6;
		game['players'][i]['facing'] = ((+gameString.substring(index, index + 1)) ? 'right' : 'left');
		index += 1;
		game['players'][i]['launch'] = +gameString.substring(index, index + 3);
		index += 3;
		game['players'][i]['projectiles'] = [];
		length = +gameString.substring(index, index + 2);
		index += 2;
		for (var j=0; j<length; j++) {
			game['players'][i]['projectiles'].push({
				'index': +gameString.substring(index, index + 2),
				'frame': +gameString.substring(index + 2, index + 4),
				'x': +gameString.substring(index + 4, index + 10) - 4,
				'y': +gameString.substring(index + 10, index + 16) - 4,
				'facing': ((+gameString.substring(index + 16, index + 17)) ? 'right' : 'left')});
			index += 17;
		}

		if(game['players'][i]['id'] == socket.id) {
			player = game['players'][i];
		}
	}

	gamez = null;
});

socket.on('games', function(gamesString) {
	gamez = {};

	var game_count = +gamesString.substring(0, 2);
	var index = 2;

	for (var i=0; i<game_count; i++) {
		var length = +gamesString.substring(index, index + 2);
		index += 2;
		var curr_game = gamesString.substring(index, index + length);
		gamez[curr_game] = {};
		index += length;
		var length = +gamesString.substring(index, index + 2);
		index += 2;
		gamez[curr_game]['name'] = gamesString.substring(index, index + length);
		index += length;
		gamez[curr_game]['visible'] = !!+gamesString.substring(index, index + 1);
		index += 1;
		gamez[curr_game]['started'] = !!+gamesString.substring(index, index + 1);
		index += 1;
		gamez[curr_game]['players'] = +gamesString.substring(index, index + 1);
		index += 1;
	}

	player = null;
	game = null;

	for (var j=lobbyButtons.length-1; j>=lobbyButtonsLength; j--) {
		lobbyButtons.splice(j, 1);
	}

	for (var i in gamez) {
		if (gamez[i].visible) {
			lobbyButtons.push(new Button(i.toString(), function() {return 3*canvas.width/5 - this.getWidth() - canvas.width/480;}, function() {for (var k=0; k<lobbyButtons.length; k++) {if (lobbyButtons[k].id == this.id) {break;}} return canvas.height/6 + k*(this.getHeight()*2);}, function() {return canvas.width/20;}, function() {return canvas.height/54}, 1, function() {socket.emit('joinGame', this.id);}, function() {return !gamez[this.id].started && gamez[this.id].players < maxPlayers;}, function() {return 'white';}, function() {return ['Join Game'];}, 'black', function() {return (canvas.width/137.1429).toString() + 'px Arial';}, function() {return null;}, function() {return true;}));
		}
	}
});

setInterval(function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	//context.clearRect(0, 0, canvas.width, canvas.height);

	if (game && game != null && !demo && !game.started && preGameButtons.length == preGameButtonsLength) {
		for (var i=0; i<fighters[0].sprites; i++) {
			preGameButtons.push(new Button('sprite' + i.toString(), function() {return canvas.width/1.72 + (this.getWidth() + this.lineWidth*4)*(parseInt(this.id.substring(6))+1);}, function() {return canvas.height/1.21;}, function() {return canvas.width/19.2;}, function() {return canvas.height/7.2}, 3, function() {socket.emit('changeSprite', parseInt(this.id.substring(6)));}, function() {return true;}, function() {return 'rgba(235, 235, 235, 1)';}, function() {return [];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {context.drawImage(imgs['fighters'][player.fighter.name]['idle'], 0, parseInt(this.id.substring(6))*(imgs['fighters'][player.fighter.name]['idle'].height/player.fighter.sprites), imgs['fighters'][player.fighter.name]['idle'].width/player.fighter.frames['idle'], imgs['fighters'][player.fighter.name]['idle'].height/player.fighter.sprites, this.getX(), this.getY(), this.getWidth(), this.getHeight()); if(player && player.sprite == parseInt(this.id.substring(6))) {context.lineWidth = canvas.width*0.003125; context.strokeStyle = 'red'; context.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());} return null;}, function() {return true;}));
		}

		for (var i in fighters) {
			preGameButtons.push(new Button('fighter' + i, function() {return canvas.width/2.94;}, function() {return canvas.height/5.35 + parseInt(this.id.substring(7, 8))*(this.getHeight() + this.lineWidth*3.5);}, function() {return canvas.width/19.2;}, function() {return canvas.height/7.2}, 3, function() {
				player.fighter=fighters[this.id.substring(7)]; socket.emit('changeFighter', parseInt(this.id.substring(7))); for (var i=preGameButtons.length-1; i>=0; i--) {var tempButton = preGameButtons[i]; if (tempButton.id.substring(0, 6) == 'sprite') {if (parseInt(tempButton.id.substring(6)) > player.fighter.sprites-1) {preGameButtons.splice(i, 1)} else if (parseInt(tempButton.id.substring(6)) < player.fighter.sprites-1) {for (j=0; j<player.fighter.sprites-1-parseInt(tempButton.id.substring(6)); j++) {
				preGameButtons.push(new Button('sprite' + (parseInt(tempButton.id.substring(6))+j+1).toString(), function() {return canvas.width/1.72 + (this.getWidth() + this.lineWidth*4)*(parseInt(this.id.substring(6))+1);}, function() {return canvas.height/1.21;}, function() {return canvas.width/19.2;}, function() {return canvas.height/7.2}, 3, function() {socket.emit('changeSprite', parseInt(this.id.substring(6)));}, function() {return true;}, function() {return 'rgba(235, 235, 235, 1)';}, function() {return [];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {context.drawImage(imgs['fighters'][player.fighter.name]['idle'], 0, parseInt(this.id.substring(6))*(imgs['fighters'][player.fighter.name]['idle'].height/player.fighter.sprites), imgs['fighters'][player.fighter.name]['idle'].width/player.fighter.frames['idle'], imgs['fighters'][player.fighter.name]['idle'].height/player.fighter.sprites, this.getX(), this.getY(), this.getWidth(), this.getHeight()); if(player && player.sprite == parseInt(this.id.substring(6))) {context.lineWidth = canvas.width*0.003125; context.strokeStyle = 'red'; context.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());} return null;}, function() {return true;}));
				}} else {break;}}}},
				function() {return true;}, function() {return 'rgba(235, 235, 235, 1)';}, function() {return [];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {
				var tempSheet = imgs['fighters'][fighters[this.id.substring(7)].name]['idle'];
				context.drawImage(tempSheet, (Math.floor(lobbyFrame/fighters[this.id.substring(7)].animationTimes['idle'])%(fighters[this.id.substring(7)].frames['idle']))*(tempSheet.width/fighters[this.id.substring(7)].frames['idle']), 0, tempSheet.width/fighters[this.id.substring(7)].frames['idle'], tempSheet.height/fighters[this.id.substring(7)].sprites, this.getX(), this.getY(), ((fighters[this.id.substring(7)].spriteWidth*canvas.width > this.getWidth() || fighters[this.id.substring(7)].spriteHeight*canvas.height > this.getHeight()) ? this.getWidth() : fighters[this.id.substring(7)].spriteWidth*canvas.width), ((fighters[this.id.substring(7)].spriteWidth*canvas.width > this.getWidth() || fighters[this.id.substring(7)].spriteHeight*canvas.height > this.getHeight()) ? this.getHeight() : fighters[this.id.substring(7)].spriteHeight*canvas.height));
				if(player && player.fighter && player.fighter.name == fighters[this.id.substring(7)].name) {context.lineWidth = canvas.width*0.003125; context.strokeStyle = 'red'; context.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());} return null;}, function() {return true;}));
		}

		for (let i=0; i<Object.keys(imgs['stages']).length; i++) {
			preGameButtons.push(new Button(Object.keys(imgs['stages'])[i], function() {return canvas.width/19 + (this.getWidth() + this.lineWidth*10)*i;}, function() {return canvas.height/2;}, function() {return canvas.width/10;}, function() {return canvas.height/8}, 3, function() {socket.emit('changeStage', this.id);}, function() {return true;}, function() {return 'white';}, function() {return [];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {if(game && game.stage && game.stage.name == this.id) {context.lineWidth = canvas.width*0.003125; context.strokeStyle = 'red'; context.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());} return imgs['stages'][this.id];}, function() {return true;}));
		}
	}


	if (game && game != null && !game.started) {
		lobbyFrame += 1;

		for (var i=preGameButtons.length-1; i>=0; i--) {
			var button = preGameButtons[i];
			if (button.id.startsWith('kick_player ')) {
				var found = false;

				for (var j in game.players) {
					var tempPlayer = game.players[j];
					if (tempPlayer.id == button.id.substring(12)) {
						found = true;
						break;
					}
				}

				if (!found) {
					preGameButtons.splice(i, 1);
				}
			}
		}

		var a = 1;
		for (var i in game.players) {
			if (game.players[i].id != game.players[game.host].id) {
				var found = false;

				for (var j in preGameButtons) {
					if (preGameButtons[j].id.substring(12) == game.players[i].id) {
						found = true;
						break;
					}
				}

				if (!found) {
					preGameButtons.push(new Button('kick_player ' + game.players[i].id, function() {return canvas.width/4 - canvas.width/80 - canvas.width/192;}, function() {return canvas.height/3.3 + canvas.height/35 + (canvas.height/50)*this.textColor - canvas.height/25;}, function() {return canvas.width/80;}, function() {return canvas.height/45}, 0.01, function() {socket.emit('kickPlayer', this.id);}, function() {return true;}, function() {return 'rgba(255, 255, 255, 0)';}, function() {return [];}, a.toString(), function() {return '18px Arial';}, function() {return imgs['menu']['kick'];}, function() {return (game.players[game.host].id == player.id);}));
				}
			}

			a++;
		}
	}

	if (game && game != null) {
		if (naming && game.started) {
			if (tempName != '') {
				socket.emit('rename', tempName);
			}

			naming = false;
			tempName = '';
		}

		if (namingGame && game.started) {
			if (tempGameName != '') {
				socket.emit('rename', tempGameName);
			}

			namingGame = false;
			tempGameName = '';
		}
	}

	if (createFighter && newFighterPlay) {
		newFighterFrame = Math.floor(newFighterAnimationFrame/newFighterData['animationTimes'][newFighterAction]);
		newFighterAnimationFrame = (newFighterAnimationFrame + 1)%(newFighterData['animationTimes'][newFighterAction]*(createFighterButtons.length-createFighterButtonsLength));
	}

	render();
}, 1000 / gameSpeed);

setInterval(function() {
	if (sendPingTime == -1) {
		sendPingTime = new Date();
		socket.emit('pingToServer');
	}
}, pingTime);

socket.on('pingToClient', function() {
	ping = new Date() - sendPingTime;
	sendPingTime = -1;
});

document.addEventListener('mousedown', function(event) {
	if (createFighter) {
		for (var i in createFighterSliders) {
			var slider = createFighterSliders[i];
			if (event.clientX >= slider.getX() && event.clientX <= slider.getX() + slider.getLineWidth() && event.clientY >= slider.getY() + slider.getLineHeight()/2 - slider.getBoxHeight()/2 && event.clientY <= slider.getY() + slider.getLineHeight()/2 + slider.getBoxHeight()/2) {
				slider.setValue((event.clientX - slider.getX())/slider.getLineWidth());
				selectedSlider = slider;
				break;
			}
		}

		if (newFighterBoxSelected[1] && newFighterBoxSelected[1] != '') {
			if (newFighterBoxSelected[1] == 'groundbox') {
				hitboxResize = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame];
			}
			else {
				hitboxResize = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]];
			}
		}

		if (newFighterDraw == 'hurtbox') {
			if (!newFighterData['hurtboxes'][newFighterAction]) {
				newFighterData['hurtboxes'][newFighterAction] = {};
			}

			if (!newFighterData['hurtboxes'][newFighterAction][newFighterFrame]) {
				newFighterData['hurtboxes'][newFighterAction][newFighterFrame] = [];
			}

			newFighterDraw = 'hurtboxDraw' + newFighterData['hurtboxes'][newFighterAction][newFighterFrame].length.toString();

			newFighterData['hurtboxes'][newFighterAction][newFighterFrame].push([event.clientX/canvas.width, event.clientY/canvas.height, event.clientX/canvas.width, event.clientY/canvas.height]);
		} else if (newFighterDraw == 'hitbox') {
			if (!newFighterData['hitboxes'][newFighterAction]) {
				newFighterData['hitboxes'][newFighterAction] = {};
			}

			if (!newFighterData['hitboxes'][newFighterAction][newFighterFrame]) {
				newFighterData['hitboxes'][newFighterAction][newFighterFrame] = [];
			}

			newFighterDraw = 'hitboxDraw' + newFighterData['hitboxes'][newFighterAction][newFighterFrame].length.toString();

			newFighterData['hitboxes'][newFighterAction][newFighterFrame].push([event.clientX/canvas.width, event.clientY/canvas.height, event.clientX/canvas.width, event.clientY/canvas.height]);

			if (!newFighterData['attacks'][newFighterAction] || newFighterData['attacks'][newFighterAction].length == 0) {
				newAttackInputs();
				newFighterData['attacks'][newFighterAction]=[];
				newFighterData['attacks'][newFighterAction].push({'damage': 0, 'launch': [0, 0], 'stun': 0, 'frames': {}});
			}

			if (!newFighterData['attacks'][newFighterAction][0]['frames'][newFighterFrame]) {
				newFighterData['attacks'][newFighterAction][0]['frames'][newFighterFrame] = [];
			}

			newFighterData['attacks'][newFighterAction][0]['frames'][newFighterFrame].push(newFighterData['hitboxes'][newFighterAction][newFighterFrame].length-1);

		} else if (newFighterDraw == 'groundbox') {
			if (!newFighterData['groundboxes'][newFighterAction]) {
				newFighterData['groundboxes'][newFighterAction] = {};
			}

			newFighterDraw = 'groundboxDraw0';

			newFighterData['groundboxes'][newFighterAction][newFighterFrame] = [event.clientX/canvas.width, event.clientY/canvas.height, event.clientX/canvas.width, event.clientY/canvas.height];
		} else if (newFighterBoxSelected[0] != null && Math.abs(event.clientX - hitboxResize[0]*canvas.width) < canvas.width/180) {
				if (newFighterBoxSelected[0] != null && Math.abs(event.clientY - hitboxResize[1]*canvas.height) < canvas.height/90) {
					cornerSelected = [0, 1];
				} else if (newFighterBoxSelected[0] != null && Math.abs(event.clientY - hitboxResize[3]*canvas.height) < canvas.height/90) {
					cornerSelected = [0, 3];
				}
		} else if (newFighterBoxSelected[0] != null && Math.abs(event.clientX - hitboxResize[2]*canvas.width) < canvas.width/180) {
			if (newFighterBoxSelected[0] != null && Math.abs(event.clientY - hitboxResize[1]*canvas.height) < canvas.height/90) {
					cornerSelected = [2, 1];
				} else if (newFighterBoxSelected[0] != null && Math.abs(event.clientY - hitboxResize[3]*canvas.height) < canvas.height/90) {
					cornerSelected = [2, 3];
				}
		} else if (newFighterBoxSelected[0] != null && event.clientX < hitboxResize[2]*canvas.width && event.clientX > hitboxResize[0]*canvas.width && event.clientY < hitboxResize[3]*canvas.height && event.clientY > hitboxResize[1]*canvas.height) {
			dragging = true;
		} else if (newFighterBoxSelected[0] != null && newFighterBoxSelected[1] == 'hitbox') {
			if (newFighterData['attacks'][newFighterAction]) {
				for (var i=0; i<newFighterData['attacks'][newFighterAction].length; i++) {
					if (event.clientX > canvas.width/1.09 - canvas.width/20 && event.clientX < canvas.width/1.09 - canvas.width/20 + canvas.width/10 && event.clientY > canvas.height/9 + (canvas.height/10)*i && event.clientY < canvas.height/9 + (canvas.height/10)*i + canvas.height/11) {
						for (var j=0; j<newFighterData['attacks'][newFighterAction].length; j++) {
							if (newFighterData['attacks'][newFighterAction][j]['frames'][newFighterFrame] && remove(newFighterData['attacks'][newFighterAction][j]['frames'][newFighterFrame], newFighterBoxSelected[0])) {
								break;
							}
						}

						if (!newFighterData['attacks'][newFighterAction][i]['frames'][newFighterFrame]) {
							newFighterData['attacks'][newFighterAction][i]['frames'][newFighterFrame] = [];
						}

						newFighterData['attacks'][newFighterAction][i]['frames'][newFighterFrame].push(newFighterBoxSelected[0]);
					}
				}
			}
		}

		mouseX = event.clientX;
		mouseY = event.clientY;
	}
});

document.addEventListener('mouseup', function(event) {
	if (selectedSlider == null) {
		dragging = false;
		var letters = 0;
		var drawStyle = '';
		var hitboxDrawing;
		var hitboxResize;
		if (newFighterDraw.substring(0, 10) == 'hitboxDraw') {
			letters = 10;
			drawStyle = 'hitboxes';
			hitboxDrawing = newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)];
		} else if (newFighterDraw.substring(0, 11) == 'hurtboxDraw') {
			letters = 11;
			drawStyle = 'hurtboxes';
			hitboxDrawing = newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)];
		} else if (newFighterDraw.substring(0, 13) == 'groundboxDraw') {
			letters = 13;
			drawStyle = 'groundboxes';
			hitboxDrawing = newFighterData[drawStyle][newFighterAction][newFighterFrame];
		}

		if (newFighterBoxSelected[1] && newFighterBoxSelected[1] != '') {
			if (newFighterBoxSelected[1] == 'groundbox') {
				hitboxResize = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame];
			}
			else {
				hitboxResize = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]];
			}
		}

		if (drawStyle != '' && (hitboxDrawing[0]*canvas.width != event.clientX || hitboxDrawing[1]*canvas.height != event.clientY)) {
			if (hitboxDrawing[0] > hitboxDrawing[2]) {
				var temp = hitboxDrawing[0];
				hitboxDrawing[0] = hitboxDrawing[2];
				hitboxDrawing[2] = temp;
			}

			if (hitboxDrawing[1] > hitboxDrawing[3]) {
				var temp = hitboxDrawing[1];
				hitboxDrawing[1] = hitboxDrawing[3];
				hitboxDrawing[3] = temp;
			}

			newFighterDraw = '';
		} else if (cornerSelected[0] != null && cornerSelected[1] != null) {
			if (hitboxResize[0] > hitboxResize[2]) {
				var temp = hitboxResize[0];
				hitboxResize[0] = hitboxResize[2];
				hitboxResize[2] = temp;
			}

			if (hitboxResize[1] > hitboxResize[3]) {
				var temp = hitboxResize[1];
				hitboxResize[1] = hitboxResize[3];
				hitboxResize[3] = temp;
			}
		}

		if (tempName != '') {
			socket.emit('rename', tempName);
			tempName = '';
		}

		if (tempGameName != '') {
			socket.emit('renameGame', tempGameName);
			tempGameName = '';
		}

		if (tempAnimationTime != '' && !isNaN(parseFloat(tempAnimationTime))) {
			newFighterData['animationTimes'][newFighterAction] = parseFloat(tempAnimationTime);
		}
		tempAnimationTime = '';

		if (tempSprites != '' && !isNaN(parseFloat(tempSprites))) {
			spritesInSheet = parseFloat(tempSprites);
		}
		tempSprites = '';

		if (tempDamage != '' && !isNaN(parseFloat(tempDamage))) {
			newFighterData['attacks'][newFighterAction][namingDamage]['damage'] = parseFloat(tempDamage);
		}
		tempDamage = '';

		if (tempStun != '' && !isNaN(parseFloat(tempStun))) {
			newFighterData['attacks'][newFighterAction][namingStun]['stun'] = parseFloat(tempStun);
		}
		tempStun = '';

		if (tempLaunchX != '' && !isNaN(parseFloat(tempLaunchX))) {
			newFighterData['attacks'][newFighterAction][namingLaunchX]['launch'][0] = parseFloat(tempLaunchX);
		}
		tempLaunchX = '';

		if (tempLaunchY != '' && !isNaN(parseFloat(tempLaunchY))) {
			newFighterData['attacks'][newFighterAction][namingLaunchY]['launch'][1] = parseFloat(tempLaunchY);
		}
		tempLaunchY = '';

		if(namingXEffect && tempXEffect != '' && !isNaN(parseFloat(tempXEffect))) {
			newFighterXEffect[newFighterAction][newFighterFrame] = parseFloat(tempXEffect);
			tempXEffect = '';
			if(newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] != null) {
				newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] = newFighterXEffect[newFighterAction][newFighterFrame];
			} else if(newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] != null) {
				newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] = newFighterXEffect[newFighterAction][newFighterFrame];
			}
		}

		if(namingYEffect && tempYEffect != '' && !isNaN(parseFloat(tempYEffect))) {
			newFighterYEffect[newFighterAction][newFighterFrame] = parseFloat(tempYEffect);
			tempYEffect = '';
			if(newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] != null) {
				newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] = newFighterYEffect[newFighterAction][newFighterFrame];
			} else if(newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] != null) {
				newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] = newFighterYEffect[newFighterAction][newFighterFrame];
			}
		}

		if(namingXVelEffect && tempXVelEffect != '' && !isNaN(parseFloat(tempXVelEffect))) {
			newFighterXVelEffect[newFighterAction][newFighterFrame] = parseFloat(tempXVelEffect);
			tempXVelEffect = '';
			if(newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] != null) {
				newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] = newFighterXVelEffect[newFighterAction][newFighterFrame];
			} else if(newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] != null) {
				newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] = newFighterXVelEffect[newFighterAction][newFighterFrame];
			}
		}

		if(namingYVelEffect && tempYVelEffect != '' && !isNaN(parseFloat(tempYVelEffect))) {
			newFighterYVelEffect[newFighterAction][newFighterFrame] = parseFloat(tempYVelEffect);
			tempYVelEffect = '';
			if(newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] != null) {
				newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] = newFighterYVelEffect[newFighterAction][newFighterFrame];
			} else if(newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] != null) {
				newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] = newFighterYVelEffect[newFighterAction][newFighterFrame];
			}
		}

		if(namingProjectile) {
			newFighterProjectile[newFighterAction][newFighterFrame] = tempProjectile;
			tempProjectile = '';
			newFighterData['effects'][newFighterAction][newFighterFrame]['projectile'] = newFighterProjectile[newFighterAction][newFighterFrame];
		}

		if (tempXRel != '' && !isNaN(parseFloat(tempXRel))) {
			newFighterData['projectiles'][newFighterAction]['x'] = parseFloat(tempXRel);
		}
		tempXRel = '';

		if (tempYRel != '' && !isNaN(parseFloat(tempYRel))) {
			newFighterData['projectiles'][newFighterAction]['y'] = parseFloat(tempYRel);
		}
		tempYRel = '';

		if (tempXVel != '' && !isNaN(parseFloat(tempXVel))) {
			newFighterData['projectiles'][newFighterAction]['velX'] = parseFloat(tempXVel);
		}
		tempXVel = '';

		if (tempYVel != '' && !isNaN(parseFloat(tempYVel))) {
			newFighterData['projectiles'][newFighterAction]['velY'] = parseFloat(tempYVel);
		}
		tempYVel = '';

		if (tempWeight != '' && !isNaN(parseFloat(tempWeight))) {
			newFighterData['projectiles'][newFighterAction]['weight'] = parseFloat(tempWeight);
		}
		tempWeight = '';

		if (tempPiercing != '' && !isNaN(parseFloat(tempPiercing))) {
			newFighterData['projectiles'][newFighterAction]['hitsLeft'] = parseFloat(tempPiercing);
		}
		tempPiercing = '';

		if (tempFighterName != '' && !contains(Object.keys(imgs['fighters']), tempFighterName)) {
			newFighterData['name'] = tempFighterName;
		}
		tempFighterName = '';

		if (tempFighterJumps != '' && !isNaN(parseFloat(tempFighterJumps))) {
			newFighterData['jumps'] = parseFloat(tempFighterJumps);
		}
		tempFighterJumps = '';

		if (tempFighterJumpStrength != '' && !isNaN(parseFloat(tempFighterJumpStrength))) {
			newFighterData['jumpStrength'] = parseFloat(tempFighterJumpStrength);
		}
		tempFighterJumpStrength = '';

		if (tempFighterFallSpeed != '' && !isNaN(parseFloat(tempFighterFallSpeed))) {
			newFighterData['terminalVelocity'] = parseFloat(tempFighterFallSpeed);
		}
		tempFighterFallSpeed = '';

		if (tempFighterWeight != '' && !isNaN(parseFloat(tempFighterWeight))) {
			newFighterData['weight'] = parseFloat(tempFighterWeight);
		}
		tempFighterWeight = '';

		if (tempFighterRunSpeed != '' && !isNaN(parseFloat(tempFighterRunSpeed))) {
			newFighterData['runSpeed'] = parseFloat(tempFighterRunSpeed);
		}
		tempFighterRunSpeed = '';

		if (tempFighterFriction != '' && !isNaN(parseFloat(tempFighterFriction))) {
			newFighterData['friction'] = parseFloat(tempFighterFriction);
		}
		tempFighterFriction = '';

		if(namingProjectileName && tempProjectileName != '' && !contains(Object.keys(newFighterData['projectiles']), tempProjectileName) && !contains(Object.keys(newFighterData['effects']), tempProjectileName) && isNaN(tempProjectileName) && !createFighterButtonIDExists(tempProjectileName) && !tempProjectileName.includes(',')) {
			for(var i in newFighterData) {
				if(typeof newFighterData[i] === 'object' && contains(Object.keys(newFighterData[i]), newFighterAction)) {
					newFighterData[i][tempProjectileName] = newFighterData[i][newFighterAction];
					delete newFighterData[i][newFighterAction];
				}
			}

			for(var i in createFighterButtons) {
				if(createFighterButtons[i].id == newFighterAction) {
					createFighterButtons[i].id = tempProjectileName;
				}
			}

			if(imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {
				imgs['new'][newFighterSprite][tempProjectileName] = imgs['new'][newFighterSprite][newFighterAction];
				delete imgs['new'][newFighterSprite][newFighterAction];
			}

			newFighterAction = tempProjectileName;
			tempProjectileName = '';
		}

		naming = false;
		namingGame = false;
		namingSprites = false;
		namingAnimationTime = false;
		namingXEffect = false;
		namingYEffect = false;
		namingXVelEffect = false;
		namingYVelEffect = false;
		namingDamage = -1;
		namingStun = -1;
		namingLaunchX = -1;
		namingLaunchY = -1;
		namingProjectile = false;
		namingProjectileName = false;
		namingXVel = false;
		namingYVel = false;
		namingXRel = false;
		namingYRel = false;
		namingWeight = false;
		namingPiercing = false;
		namingFighterName = false;
		namingFighterJumps = false;
		namingFighterJumpStrength = false;
		namingFighterFallSpeed = false;
		namingFighterWeight = false;
		namingFighterRunSpeed = false;
		namingFighterFriction = false;

		if (game && game != null && game.started) {
			for (var i in gameButtons) {
				var button = gameButtons[i];
				if (button.canClick() && button.getVisible() && event.clientX > button.getX() && event.clientY > button.getY() && event.clientX < button.getX() + button.getWidth() && event.clientY < button.getY() + button.getHeight()) {
					button.onClick();
				}
			}
		} else if (game && game != null) {
			for (var i in preGameButtons) {
				var button = preGameButtons[i];
				if (button.canClick() && button.getVisible() && event.clientX > button.getX() && event.clientY > button.getY() && event.clientX < button.getX() + button.getWidth() && event.clientY < button.getY() + button.getHeight()) {
					button.onClick();
				}
			}
		} else if ((!game || game == null) && !createFighter) {
			for (var i in lobbyButtons) {
				var button = lobbyButtons[i];
				if (button.canClick() && button.getVisible() && event.clientX > button.getX() && event.clientY > button.getY() && event.clientX < button.getX() + button.getWidth() && event.clientY < button.getY() + button.getHeight()) {
					button.onClick();
				}
			}
		} else if ((!game || game == null) && createFighter) {
			if (cornerSelected[0] == null && cornerSelected[1] == null) {
				var clickedAttack = false;

				if (newFighterData['attacks'][newFighterAction]) {
					for (var i=0; i<newFighterData['attacks'][newFighterAction].length; i++) {
						if (event.clientX > canvas.width/1.09 - canvas.width/20 && event.clientX < canvas.width/1.09 - canvas.width/20 + canvas.width/10 && event.clientY > canvas.height/9 + (canvas.height/10)*i && event.clientY < canvas.height/9 + (canvas.height/10)*i + canvas.height/11) {
							clickedAttack = true;
						}
					}
				}

				if (!clickedAttack) {
					newFighterBoxSelected = [null, ''];
				}
			} else {
				cornerSelected = [null, null];
			}

			if (event.clientX < 0.40625*canvas.width || event.clientX > 0.59375*canvas.width || event.clientY < canvas.height/4 || event.clientY > 3*canvas.height/4) {
				newFighterDraw = '';
			} else if (newFighterDraw == '') {
				var selected = false;
				if (contains(newFighterView, 'hitbox') && newFighterData['hitboxes'][newFighterAction] && newFighterData['hitboxes'][newFighterAction][newFighterFrame]) {
					for (var i in newFighterData['hitboxes'][newFighterAction][newFighterFrame]) {
						var hitbox = newFighterData['hitboxes'][newFighterAction][newFighterFrame][i];
						if (event.clientX < hitbox[2]*canvas.width && event.clientX > hitbox[0]*canvas.width && event.clientY < hitbox[3]*canvas.height && event.clientY > hitbox[1]*canvas.height) {
							newFighterBoxSelected = [i, 'hitbox'];
							selected = true;
							break;
						}
					}
				}

				if (!selected && contains(newFighterView, 'hurtbox') && newFighterData['hurtboxes'][newFighterAction] && newFighterData['hurtboxes'][newFighterAction][newFighterFrame]) {
					for (var i in newFighterData['hurtboxes'][newFighterAction][newFighterFrame]) {
						var hitbox = newFighterData['hurtboxes'][newFighterAction][newFighterFrame][i];
						if (event.clientX < hitbox[2]*canvas.width && event.clientX > hitbox[0]*canvas.width && event.clientY < hitbox[3]*canvas.height && event.clientY > hitbox[1]*canvas.height) {
							newFighterBoxSelected = [i, 'hurtbox'];
							selected = true;
							break;
						}
					}
				}

				if (!selected && contains(newFighterView, 'groundbox') && newFighterData['groundboxes'][newFighterAction] && newFighterData['groundboxes'][newFighterAction][newFighterFrame]) {
					var hitbox = newFighterData['groundboxes'][newFighterAction][newFighterFrame];
					if (event.clientX < hitbox[2]*canvas.width && event.clientX > hitbox[0]*canvas.width && event.clientY < hitbox[3]*canvas.height && event.clientY > hitbox[1]*canvas.height) {
						newFighterBoxSelected = [0, 'groundbox'];
						selected = true;
					}
				}
			}

			for (var i in createFighterButtons) {
				var button = createFighterButtons[i];
				if (button.canClick() && button.getVisible() && event.clientX > button.getX() && event.clientY > button.getY() && event.clientX < button.getX() + button.getWidth() && event.clientY < button.getY() + button.getHeight()) {
					button.onClick();
				}
			}

			for (var i in createAttackInputs) {
				var button = createAttackInputs[i];
				if (button.canClick() && button.getVisible() && event.clientX > button.getX() && event.clientY > button.getY() && event.clientX < button.getX() + button.getWidth() && event.clientY < button.getY() + button.getHeight()) {
					button.onClick();
				}
			}
		}
	}

	selectedSlider = null;
});

document.addEventListener('mousemove', function(event) {
	var letters = 0;
	var drawStyle = '';
	var hitboxDrawing;
	var hitboxResize;
	if (newFighterDraw.substring(0, 10) == 'hitboxDraw') {
		letters = 10;
		drawStyle = 'hitboxes';
		hitboxDrawing = newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)];
	} else if (newFighterDraw.substring(0, 11) == 'hurtboxDraw') {
		letters = 11;
		drawStyle = 'hurtboxes';
		hitboxDrawing = newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)];
	} else if (newFighterDraw.substring(0, 13) == 'groundboxDraw') {
		letters = 13;
		drawStyle = 'groundboxes';
		hitboxDrawing = newFighterData[drawStyle][newFighterAction][newFighterFrame];
	}

	if (newFighterBoxSelected[1] && newFighterBoxSelected[1] != '') {
		if (newFighterBoxSelected[1] == 'groundbox') {
			hitboxResize = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame];
		}
		else {
			hitboxResize = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]];
		}
	}

	if (drawStyle != '') {
		hitboxDrawing[2] = event.clientX/canvas.width;
		hitboxDrawing[3] = event.clientY/canvas.height;

		if (event.clientX < 0.40625*canvas.width) {
			hitboxDrawing[2] = 0.40625;
		} else if (event.clientX > 0.59375*canvas.width) {
			hitboxDrawing[2] = 0.59375;
		}

		if (event.clientY < canvas.height/4) {
			hitboxDrawing[3] = 0.25;
		} else if (event.clientY > 3*canvas.height/4) {
			hitboxDrawing[3] = 0.75;
		}
	} else if (cornerSelected[0] != null && cornerSelected[1] != null) {
		hitboxResize[cornerSelected[0]] += (event.clientX - mouseX)/canvas.width;
		hitboxResize[cornerSelected[1]] += (event.clientY - mouseY)/canvas.height;

		if (hitboxResize[cornerSelected[0]] < 0.40625) {
			hitboxResize[cornerSelected[0]] = 0.40625;
		} else if (hitboxResize[cornerSelected[0]] > 0.59375) {
			hitboxResize[cornerSelected[0]] = 0.59375;
		}

		if (hitboxResize[cornerSelected[1]] < 0.25) {
			hitboxResize[cornerSelected[1]] = 0.25;
		} else if (hitboxResize[cornerSelected[1]] > 0.75) {
			hitboxResize[cornerSelected[1]] = 0.75;
		}
	} else if (dragging) {
		hitboxResize[0] += (event.clientX - mouseX)/canvas.width;
		hitboxResize[2] += (event.clientX - mouseX)/canvas.width;
		hitboxResize[1] += (event.clientY - mouseY)/canvas.height;
		hitboxResize[3] += (event.clientY - mouseY)/canvas.height;

		if (hitboxResize[0] < 0.40625) {
			hitboxResize[2] = 0.40625+(hitboxResize[2]-hitboxResize[0]);
			hitboxResize[0] = 0.40625;
		} else if (hitboxResize[2] > 0.59375) {
			hitboxResize[0] = 0.59375+(hitboxResize[0]-hitboxResize[2]);
			hitboxResize[2] = 0.59375;
		}

		if (hitboxResize[1] < 0.25) {
			hitboxResize[3] = 0.25+(hitboxResize[3]-hitboxResize[1]);
			hitboxResize[1] = 0.25;
		} else if (hitboxResize[3] > 0.75) {
			hitboxResize[1] = 0.75+(hitboxResize[1]-hitboxResize[3]);
			hitboxResize[3] = 0.75;
		}
	}

	if (selectedSlider != null) {
		selectedSlider.setValue(Math.max(Math.min((event.clientX - selectedSlider.getX())/selectedSlider.getLineWidth(), 1), 0));
	}

	mouseX = event.clientX;
	mouseY = event.clientY;
});

document.addEventListener('keydown', function(event) {
	if(naming && tempName.length < nameLength) {
		tempName = tempName + keycode(event.keyCode, shift);
	} else if(namingGame && tempGameName.length < gameNameLength) {
		tempGameName = tempGameName + keycode(event.keyCode, shift);
	} else if(namingAnimationTime && tempAnimationTime.length < animationTimeLength) {
		tempAnimationTime = tempAnimationTime + keycode(event.keyCode, shift);
	} else if(namingSprites && tempSprites.length < spritesLength) {
		tempSprites = tempSprites + keycode(event.keyCode, shift);
	} else if((namingDamage != -1) && tempDamage.length < damageLength) {
		tempDamage = tempDamage + keycode(event.keyCode, shift);
	} else if((namingStun != -1) && tempStun.length < stunLength) {
		tempStun = tempStun + keycode(event.keyCode, shift);
	} else if((namingLaunchX != -1) && tempLaunchX.length < launchXLength) {
		tempLaunchX = tempLaunchX + keycode(event.keyCode, shift);
	} else if((namingLaunchY != -1) && tempLaunchY.length < launchYLength) {
		tempLaunchY = tempLaunchY + keycode(event.keyCode, shift);
	} else if(namingXEffect && tempXEffect.length < XEffectLength) {
		tempXEffect = tempXEffect + keycode(event.keyCode, shift);
	} else if(namingYEffect && tempYEffect.length < YEffectLength) {
		tempYEffect = tempYEffect + keycode(event.keyCode, shift);
	} else if(namingXVelEffect && tempXVelEffect.length < XVelEffectLength) {
		tempXVelEffect = tempXVelEffect + keycode(event.keyCode, shift);
	} else if(namingYVelEffect && tempYVelEffect.length < YVelEffectLength) {
		tempYVelEffect = tempYVelEffect + keycode(event.keyCode, shift);
	} else if(namingProjectile && tempProjectile.length < ProjectileLength) {
		tempProjectile = tempProjectile + keycode(event.keyCode, shift);
	} else if(namingProjectileName && tempProjectileName.length < ProjectileNameLength) {
		tempProjectileName = tempProjectileName + keycode(event.keyCode, shift);
	} else if(namingXRel && tempXRel.length < XRelLength) {
		tempXRel = tempXRel + keycode(event.keyCode, shift);
	} else if(namingYRel && tempYRel.length < YRelLength) {
		tempYRel = tempYRel + keycode(event.keyCode, shift);
	} else if(namingXVel && tempXVel.length < XVelLength) {
		tempXVel = tempXVel + keycode(event.keyCode, shift);
	} else if(namingYVel && tempYVel.length < YVelLength) {
		tempYVel = tempYVel + keycode(event.keyCode, shift);
	} else if(namingWeight && tempWeight.length < weightLength) {
		tempWeight = tempWeight + keycode(event.keyCode, shift);
	} else if(namingPiercing && tempPiercing.length < piercingLength) {
		tempPiercing = tempPiercing + keycode(event.keyCode, shift);
	} else if(namingFighterName && tempFighterName.length < fighterNameLength) {
		tempFighterName = tempFighterName + keycode(event.keyCode, shift);
	} else if(namingFighterJumps && tempFighterJumps.length < fighterJumpsLength) {
		tempFighterJumps = tempFighterJumps + keycode(event.keyCode, shift);
	} else if(namingFighterJumpStrength && tempFighterJumpStrength.length < fighterJumpStrengthLength) {
		tempFighterJumpStrength = tempFighterJumpStrength + keycode(event.keyCode, shift);
	} else if(namingFighterFallSpeed && tempFighterFallSpeed.length < fighterFallSpeedLength) {
		tempFighterFallSpeed = tempFighterFallSpeed + keycode(event.keyCode, shift);
	} else if(namingFighterWeight && tempFighterWeight.length < fighterWeightLength) {
		tempFighterWeight = tempFighterWeight + keycode(event.keyCode, shift);
	} else if(namingFighterRunSpeed && tempFighterRunSpeed.length < fighterRunSpeedLength) {
		tempFighterRunSpeed = tempFighterRunSpeed + keycode(event.keyCode, shift);
	} else if(namingFighterFriction && tempFighterFriction.length < fighterFrictionLength) {
		tempFighterFriction = tempFighterFriction + keycode(event.keyCode, shift);
	}

	switch (event.keyCode) {
		case 8: // Backspace
			if(naming && tempName.length > 0) {
				tempName = tempName.slice(0, -1);
			} else if(namingGame && tempGameName.length > 0) {
				tempGameName = tempGameName.slice(0, -1);
			} else if(namingSprites && tempSprites.length > 0) {
				tempSprites = tempSprites.slice(0, -1);
			} else if(namingAnimationTime && tempAnimationTime.length > 0) {
				tempAnimationTime = tempAnimationTime.slice(0, -1);
			} else if((namingDamage != -1) && tempDamage.length > 0) {
				tempDamage = tempDamage.slice(0, -1);
			} else if((namingStun != -1) && tempStun.length > 0) {
				tempStun = tempStun.slice(0, -1);
			} else if((namingLaunchX != -1) && tempLaunchX.length > 0) {
				tempLaunchX = tempLaunchX.slice(0, -1);
			} else if((namingLaunchY != -1) && tempLaunchY.length > 0) {
				tempLaunchY = tempLaunchY.slice(0, -1);
			} else if(namingXEffect && tempXEffect.length > 0) {
				tempXEffect = tempXEffect.slice(0, -1);
			} else if(namingYEffect && tempYEffect.length > 0) {
				tempYEffect = tempYEffect.slice(0, -1);
			} else if(namingXVelEffect && tempXVelEffect.length > 0) {
				tempXVelEffect = tempXVelEffect.slice(0, -1);
			} else if(namingYVelEffect && tempYVelEffect.length > 0) {
				tempYVelEffect = tempYVelEffect.slice(0, -1);
			} else if(namingProjectile && tempProjectile.length > 0) {
				tempProjectile = tempProjectile.slice(0, -1);
			} else if(namingProjectileName && tempProjectileName.length > 0) {
				tempProjectileName = tempProjectileName.slice(0, -1);
			} else if(namingXRel && tempXRel.length > 0) {
				tempXRel = tempXRel.slice(0, -1);
			} else if(namingYRel && tempYRel.length > 0) {
				tempYRel = tempYRel.slice(0, -1);
			} else if(namingXVel && tempXVel.length > 0) {
				tempXVel = tempXVel.slice(0, -1);
			} else if(namingYVel && tempYVel.length > 0) {
				tempYVel = tempYVel.slice(0, -1);
			} else if(namingWeight && tempWeight.length > 0) {
				tempWeight = tempWeight.slice(0, -1);
			} else if(namingPiercing && tempPiercing.length > 0) {
				tempPiercing = tempPiercing.slice(0, -1);
			} else if(namingFighterName && tempFighterName.length > 0) {
				tempFighterName = tempFighterName.slice(0, -1);
			} else if(namingFighterJumps && tempFighterJumps.length > 0) {
				tempFighterJumps = tempFighterJumps.slice(0, -1);
			} else if(namingFighterJumpStrength && tempFighterJumpStrength.length > 0) {
				tempFighterJumpStrength = tempFighterJumpStrength.slice(0, -1);
			} else if(namingFighterFallSpeed && tempFighterFallSpeed.length > 0) {
				tempFighterFallSpeed = tempFighterFallSpeed.slice(0, -1);
			} else if(namingFighterWeight && tempFighterWeight.length > 0) {
				tempFighterWeight = tempFighterWeight.slice(0, -1);
			} else if(namingFighterRunSpeed && tempFighterRunSpeed.length > 0) {
				tempFighterRunSpeed = tempFighterRunSpeed.slice(0, -1);
			} else if(namingFighterFriction && tempFighterFriction.length > 0) {
				tempFighterFriction = tempFighterFriction.slice(0, -1);
			} else if(newFighterBoxSelected[0] != null) {
				if (newFighterBoxSelected[1] == 'groundbox') {
					delete newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame];
				} else {
					newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame].splice([newFighterBoxSelected[0]], 1);
				}

				newFighterBoxSelected[0] = null;
				newFighterBoxSelected[1] = '';
			}

			event.stopPropagation();
			event.returnValue = false;
			break;
		case 46: // Delete
			if(newFighterBoxSelected[0] != null) {
				if (newFighterBoxSelected[1] == 'groundbox') {
					delete newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame];
				} else {
					newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame].splice([newFighterBoxSelected[0]], 1);
				}

				newFighterBoxSelected[0] = null;
				newFighterBoxSelected[1] = '';
			}
			break;
		case 16: // Shift
			shift = true;
			break;
		case 13: // Enter
			if(naming && tempName != '') {
				socket.emit('rename', tempName);
				tempName = '';
			} else if(namingGame && tempGameName != '') {
				socket.emit('renameGame', tempGameName);
				tempGameName = '';
			} else if(namingAnimationTime && tempAnimationTime != '' && !isNaN(parseFloat(tempAnimationTime))) {
				newFighterData['animationTimes'][newFighterAction] = parseFloat(tempAnimationTime);
				tempAnimationTime = '';
			} else if(namingSprites && tempSprites != '' && !isNaN(parseFloat(tempSprites))) {
				spritesInSheet = parseFloat(tempSprites);
				tempSprites = '';
			} else if((namingDamage != -1) && tempDamage != '' && !isNaN(parseFloat(tempDamage))) {
				newFighterData['attacks'][newFighterAction][namingDamage]['damage'] = parseFloat(tempDamage);
				tempDamage = '';
			} else if((namingStun != -1) && tempStun != '' && !isNaN(parseFloat(tempStun))) {
				newFighterData['attacks'][newFighterAction][namingStun]['stun'] = parseFloat(tempStun);
				tempStun = '';
			} else if((namingLaunchX != -1) && tempLaunchX != '' && !isNaN(parseFloat(tempLaunchX))) {
				newFighterData['attacks'][newFighterAction][namingLaunchX]['launch'][0] = parseFloat(tempLaunchX);
				tempLaunchX = '';
			} else if((namingLaunchY != -1) && tempLaunchY != '' && !isNaN(parseFloat(tempLaunchY))) {
				newFighterData['attacks'][newFighterAction][namingLaunchY]['launch'][1] = parseFloat(tempLaunchY);
				tempLaunchY = '';
			} else if((namingXEffect != -1) && tempXEffect != '' && !isNaN(parseFloat(tempXEffect))) {
				newFighterXEffect[newFighterAction][newFighterFrame] = parseFloat(tempXEffect);
				tempXEffect = '';
				if(newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] != null) {
					newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] = newFighterXEffect[newFighterAction][newFighterFrame];
				} else if(newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] != null) {
					newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] = newFighterXEffect[newFighterAction][newFighterFrame];
				}
			} else if((namingYEffect != -1) && tempYEffect != '' && !isNaN(parseFloat(tempYEffect))) {
				newFighterYEffect[newFighterAction][newFighterFrame] = parseFloat(tempYEffect);
				tempYEffect = '';
				if(newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] != null) {
					newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] = newFighterYEffect[newFighterAction][newFighterFrame];
				} else if(newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] != null) {
					newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] = newFighterYEffect[newFighterAction][newFighterFrame];
				}
			} else if((namingXVelEffect != -1) && tempXVelEffect != '' && !isNaN(parseFloat(tempXVelEffect))) {
				newFighterXVelEffect[newFighterAction][newFighterFrame] = parseFloat(tempXVelEffect);
				tempXVelEffect = '';
				if(newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] != null) {
					newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] = newFighterXVelEffect[newFighterAction][newFighterFrame];
				} else if(newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] != null) {
					newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] = newFighterXVelEffect[newFighterAction][newFighterFrame];
				}
			} else if((namingYVelEffect != -1) && tempYVelEffect != '' && !isNaN(parseFloat(tempYVelEffect))) {
				newFighterYVelEffect[newFighterAction][newFighterFrame] = parseFloat(tempYVelEffect);
				tempYVelEffect = '';
				if(newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] != null) {
					newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] = newFighterYVelEffect[newFighterAction][newFighterFrame];
				} else if(newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] != null) {
					newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] = newFighterYVelEffect[newFighterAction][newFighterFrame];
				}
			} else if(namingProjectile) {
				newFighterProjectile[newFighterAction][newFighterFrame] = tempProjectile;
				tempProjectile = '';
				newFighterData['effects'][newFighterAction][newFighterFrame]['projectile'] = newFighterProjectile[newFighterAction][newFighterFrame];
			} else if(namingProjectileName && tempProjectileName != '' && !contains(Object.keys(newFighterData['projectiles']), tempProjectileName) && !contains(Object.keys(newFighterData['effects']), tempProjectileName) && isNaN(tempProjectileName) && !createFighterButtonIDExists(tempProjectileName) && !tempProjectileName.includes(',')) {
				for(var i in newFighterData) {
					if(typeof newFighterData[i] === 'object' && contains(Object.keys(newFighterData[i]), newFighterAction)) {
						newFighterData[i][tempProjectileName] = newFighterData[i][newFighterAction];
						delete newFighterData[i][newFighterAction];
					}
				}

				for(var i in createFighterButtons) {
					if(createFighterButtons[i].id == newFighterAction) {
						createFighterButtons[i].id = tempProjectileName;
					}
				}

				if(imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {
					imgs['new'][newFighterSprite][tempProjectileName] = imgs['new'][newFighterSprite][newFighterAction];
					delete imgs['new'][newFighterSprite][newFighterAction];
				}

				newFighterAction = tempProjectileName;
				tempProjectileName = '';
			} else if (tempXRel != '' && !isNaN(parseFloat(tempXRel))) {
				newFighterData['projectiles'][newFighterAction]['x'] = parseFloat(tempXRel);
				tempXRel = '';
			} else if (tempYRel != '' && !isNaN(parseFloat(tempYRel))) {
				newFighterData['projectiles'][newFighterAction]['y'] = parseFloat(tempYRel);
				tempYRel = '';
			} else if (tempXVel != '' && !isNaN(parseFloat(tempXVel))) {
				newFighterData['projectiles'][newFighterAction]['velX'] = parseFloat(tempXVel);
				tempXVel = '';
			} else if (tempYVel != '' && !isNaN(parseFloat(tempYVel))) {
				newFighterData['projectiles'][newFighterAction]['velY'] = parseFloat(tempYVel);
				tempYVel = '';
			} else if (tempWeight != '' && !isNaN(parseFloat(tempWeight))) {
				newFighterData['projectiles'][newFighterAction]['weight'] = parseFloat(tempWeight);
				tempWeight = '';
			} else if (tempPiercing != '' && !isNaN(parseFloat(tempPiercing))) {
				newFighterData['projectiles'][newFighterAction]['hitsLeft'] = parseFloat(tempPiercing);
				tempPiercing = '';
			} else if (tempFighterName != '' && !contains(Object.keys(imgs['fighters']), tempFighterName)) {
				newFighterData['name'] = tempFighterName;
				tempFighterName = '';
			} else if (tempFighterJumps != '' && !isNaN(parseFloat(tempFighterJumps))) {
				newFighterData['jumps'] = parseFloat(tempFighterJumps);
				tempFighterJumps = '';
			} else if (tempFighterJumpStrength != '' && !isNaN(parseFloat(tempFighterJumpStrength))) {
				newFighterData['jumpStrength'] = parseFloat(tempFighterJumpStrength);
				tempFighterJumpStrength = '';
			} else if (tempFighterFallSpeed != '' && !isNaN(parseFloat(tempFighterFallSpeed))) {
				newFighterData['terminalVelocity'] = parseFloat(tempFighterFallSpeed);
				tempFighterFallSpeed = '';
			} else if (tempFighterWeight != '' && !isNaN(parseFloat(tempFighterWeight))) {
				newFighterData['weight'] = parseFloat(tempFighterWeight);
				tempFighterWeight = '';
			} else if (tempFighterRunSpeed != '' && !isNaN(parseFloat(tempFighterRunSpeed))) {
				newFighterData['runSpeed'] = parseFloat(tempFighterRunSpeed);
				tempFighterRunSpeed = '';
			} else if (tempFighterFriction != '' && !isNaN(parseFloat(tempFighterFriction))) {
				newFighterData['friction'] = parseFloat(tempFighterFriction);
				tempFighterFriction = '';
			}

			naming = false;
			namingGame = false;
			namingAnimationTime = false;
			namingSprites = false;
			namingDamage = -1;
			namingStun = -1;
			namingLaunchX = -1;
			namingLaunchY = -1;
			namingXEffect = false;
			namingYEffect = false;
			namingXVelEffect = false;
			namingYVelEffect = false;
			namingProjectile = false;
			namingProjectileName = false;
			namingXRel = false;
			namingYRel = false;
			namingXVel = false;
			namingYVel = false;
			namingWeight = false;
			namingPiercing = false;
			namingFighterName = false;
			namingFighterJumps = false;
			namingFighterJumpStrength = false;
			namingFighterFallSpeed = false;
			namingFighterWeight = false;
			namingFighterRunSpeed = false;
			namingFighterFriction = false;
			break;
		case 32: // Space
			if (game && game != null && !naming && !namingGame) {
				socket.emit('attack', 'dodge');
			}
			break;
		case 37: // Left
			if (game && game != null && !naming && !namingGame) {
				socket.emit('attack', 'left');
			}
			break;
		case 38: // Up
			if (game && game != null && !naming && !namingGame) {
				socket.emit('attack', 'up');
			}
			break;
		case 39: // Right
			if (game && game != null && !naming && !namingGame) {
				socket.emit('attack', 'right');
			}
			break;
		case 40: // Down
			if (game && game != null && !naming && !namingGame) {
				socket.emit('attack', 'down');
			}
			break;
		case 65: // A
			if((game || game != null) && !naming && !namingGame) {
				socket.emit('a');
			}
			break;
		case 68: // D
			if((game || game != null) && !naming && !namingGame) {
				socket.emit('d');
			}
			break;
		case 83: // S
			if((game || game != null) && !naming && !namingGame) {
				socket.emit('s');
			}
			break;
		case 87: // W
			if((game || game != null) && !naming && !namingGame) {
				socket.emit('w');
			}
			break;
	}
});

document.addEventListener('keyup', function(event) {
	switch (event.keyCode) {
		case 16: // Shift
			shift = false;
			break;
		case 65: // A
			socket.emit('aUp');
			break;
		case 87: // W
			socket.emit('wUp');
			break;
		case 68: // D
			socket.emit('dUp');
			break;
		case 83: // S
			socket.emit('sUp');
			break;
	}
});

function keycode(keycode, shift) {
	switch (keycode) {
		case 32: // Space
			return ' ';
		case 48:
			return ((shift) ? ')' : '0');
			break;
		case 49:
			return ((shift) ? '!' : '1');
			break;
		case 50:
			return ((shift) ? '@' : '2');
			break;
		case 51:
			return ((shift) ? '#' : '3');
			break;
		case 52:
			return ((shift) ? '$' : '4');
			break;
		case 53:
			return ((shift) ? '%' : '5');
			break;
		case 54:
			return ((shift) ? '^' : '6');
			break;
		case 55:
			return ((shift) ? '&' : '7');
			break;
		case 56:
			return ((shift) ? '*' : '8');
			break;
		case 57:
			return ((shift) ? '(' : '9');
			break;
		case 65: // A
			return ((shift) ? 'A' : 'a');
			break;
		case 66:
			return ((shift) ? 'B' : 'b');
			break;
		case 67:
			return ((shift) ? 'C' : 'c');
			break;
		case 68:
			return ((shift) ? 'D' : 'd');
			break;
		case 69:
			return ((shift) ? 'E' : 'e');
			break;
		case 70:
			return ((shift) ? 'F' : 'f');
			break;
		case 71:
			return ((shift) ? 'G' : 'g');
			break;
		case 72:
			return ((shift) ? 'H' : 'h');
			break;
		case 73:
			return ((shift) ? 'I' : 'i');
			break;
		case 74:
			return ((shift) ? 'J' : 'j');
			break;
		case 75:
			return ((shift) ? 'K' : 'k');
			break;
		case 76:
			return ((shift) ? 'L' : 'l');
			break;
		case 77:
			return ((shift) ? 'M' : 'm');
			break;
		case 78:
			return ((shift) ? 'N' : 'n');
			break;
		case 79:
			return ((shift) ? 'O' : 'o');
			break;
		case 80:
			return ((shift) ? 'P' : 'p');
			break;
		case 81:
			return ((shift) ? 'Q' : 'q');
			break;
		case 82:
			return ((shift) ? 'R' : 'r');
			break;
		case 83:
			return ((shift) ? 'S' : 's');
			break;
		case 84:
			return ((shift) ? 'T' : 't');
			break;
		case 85:
			return ((shift) ? 'U' : 'u');
			break;
		case 86:
			return ((shift) ? 'V' : 'v');
			break;
		case 87:
			return ((shift) ? 'W' : 'w');
			break;
		case 88:
			return ((shift) ? 'X' : 'x');
			break;
		case 89:
			return ((shift) ? 'Y' : 'y');
			break;
		case 90:
			return ((shift) ? 'Z' : 'z');
			break;
		case 186:
			return ((shift) ? ':' : ';');
			break;
		case 187:
			return ((shift) ? '+' : '=');
			break;
		case 188:
			return ((shift) ? '<' : ',');
			break;
		case 173:
		case 189:
			return ((shift) ? '_' : '-');
			break;
		case 190:
			return ((shift) ? '>' : '.');
			break;
		case 191:
			return ((shift) ? '?' : '/');
			break;
		case 192:
			return ((shift) ? '~' : '`');
			break;
		case 219:
			return ((shift) ? '{' : '[');
			break;
		case 220:
			return ((shift) ? '|' : '\\');
			break;
		case 221:
			return ((shift) ? '}' : ']');
			break;
		case 222:
			return ((shift) ? '"' : "'");
			break;
		case 96: // NUMPAD begins here
			return '0';
			break;
		case 97:
			return '1';
			break;
		case 98:
			return '2';
			break;
		case 99:
			return '3';
			break;
		case 100:
			return '4';
			break;
		case 101:
			return '5';
			break;
		case 102:
			return '6';
			break;
		case 103:
			return '7';
			break;
		case 104:
			return '8';
			break;
		case 105:
			return '9';
			break;
		case 106:
			return '*';
			break;
		case 107:
			return '+';
			break;
		case 109:
			return '-';
			break;
		case 110:
			return '.';
			break;
		case 111:
			return '/';
			break;
		default:
			return '';
	}
}

socket.emit('new player');