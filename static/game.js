var imported = document.createElement('script');
imported.src = '/jszip.js';
document.head.appendChild(imported);

imported = document.createElement('script');
imported.src = '/jszip-utils.js';
document.head.appendChild(imported);

var socket = io();

var debug = false;
var numSacrifices = 0;
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
var maxPlayers = 7;
var pingTime = 2000;
var gameSpeed = 30;
var demo = false;

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
var shift = false;
var fighterSelect = false;
var createFighter = false;
var uploadSelect = false;
var uploadNewFighter = false;
var spriteWidth = 0;
var spriteHeight = 0;
var ping = 0;
var sendPingTime = -1;
var newFighterFrame = '0';
var newFighterSprite = 0;
var newFighterSprites = 1;
var newFighterAction = 'idle';
var newFighterXEffect = {'idle': {'0': 0}, 'stun': {'0': 0}, 'nair': {'0': 0}, 'neutral': {'0': 0}, 'run': {'0': 0}, 'airmove': {'0': 0}, 'forward': {'0': 0}, 'fair': {'0': 0}, 'uair': {'0': 0}, 'bair': {'0': 0}, 'dair': {'0': 0}, 'dtilt': {'0': 0}};
var newFighterYEffect = {'idle': {'0': 0}, 'stun': {'0': 0}, 'nair': {'0': 0}, 'neutral': {'0': 0}, 'run': {'0': 0}, 'airmove': {'0': 0}, 'forward': {'0': 0}, 'fair': {'0': 0}, 'uair': {'0': 0}, 'bair': {'0': 0}, 'dair': {'0': 0}, 'dtilt': {'0': 0}};
var newFighterXVelEffect = {'idle': {'0': 0}, 'stun': {'0': 0}, 'nair': {'0': 0}, 'neutral': {'0': 0}, 'run': {'0': 0}, 'airmove': {'0': 0}, 'forward': {'0': 0}, 'fair': {'0': 0}, 'uair': {'0': 0}, 'bair': {'0': 0}, 'dair': {'0': 0}, 'dtilt': {'0': 0}};
var newFighterYVelEffect = {'idle': {'0': 0}, 'stun': {'0': 0}, 'nair': {'0': 0}, 'neutral': {'0': 0}, 'run': {'0': 0}, 'airmove': {'0': 0}, 'forward': {'0': 0}, 'fair': {'0': 0}, 'uair': {'0': 0}, 'bair': {'0': 0}, 'dair': {'0': 0}, 'dtilt': {'0': 0}};
var newFighterProjectile = {'idle': {'0': ''}, 'stun': {'0': ''}, 'nair': {'0': ''}, 'neutral': {'0': ''}, 'run': {'0': ''}, 'airmove': {'0': ''}, 'forward': {'0': ''}, 'fair': {'0': ''}, 'uair': {'0': ''}, 'bair': {'0': ''}, 'dair': {'0': ''}, 'dtilt': {'0': ''}};
var newFighterProjectiles = 0;
var imgs = {};
var newFighterData = {
  'name': 'New Fighter',
  'jumps': 2,
  'jumpStrength': 0.017,
  'terminalVelocity': 0.01,
  'weight': 10000,
  'runSpeed': 0.003,
  'hurtboxes': {},
  'hitboxes': {},
  'attacks': {},
  'animationTime': 5,
  'spriteWidth': 0.05,
  'spriteHeight': 0.15,
  'effects': {'idle': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'stun': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'nair': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'neutral': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}}, 
    'run': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'airmove': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'forward': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'fair': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'uair': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'bair': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'dair': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}},
    'dtilt': {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}}},
  'projectiles': {}};
var newFighterNewImage = false;
var newFighterNewSpriteSheet = false;
var newFighterDraw = '';
var newFighterView = ['hurtbox', 'hitbox'];
var newFighterBoxSelected = [null, ''];
var mouseX = 0;
var mouseY = 0;
var dragging = false;
var cornerSelected = [null, null];
var newFighterPlay = false;
var newFighterAnimationFrame = 0;
var spritesInSheet = 1;
var selectedSlider = null;
var actions = ['idle', 'stun', 'nair', 'neutral', 'run', 'airmove', 'forward', 'fair', 'uair', 'bair', 'dair', 'dtilt'];

var player;
var stage;
var frame;
var game;
var gamez;
var numPlayer;
var data;
var fighters;

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
  new Button('demoFighter', function() {return 0.703*canvas.width;}, function() {return 0.94*canvas.height;}, function() {return canvas.width/7;}, function() {return canvas.height/20;}, 3, function() {newFighterPlay = false; var newFighterStr = encodeNewFighter(newFighterData); for(var i in newFighterData['projectiles']) {newFighterStr = newFighterStr.replace(i, encodeNewProjectile(i).replace(/\n/g, '\\').replace(/\@/g, '?').replace(/\;/g, '`').replace(/\:/g, '~').replace(/\,/g, '+').replace(/\=/g, '$').replace(/\_/g, '*'));} socket.emit('createGame', false, newFighterStr); socket.emit('rename', newFighterData['name']); socket.emit('startGame');}, function() {return true;}, function() {return 'white';}, function() {return ['Demo Fighter'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('downloadFighter', function() {return 0.853*canvas.width;}, function() {return 0.94*canvas.height;}, function() {return canvas.width/7;}, function() {return canvas.height/20;}, 3, function() {downloadNewFighter();}, function() {return true;}, function() {return 'white';}, function() {return ['Download Fighter'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('newAttack', function() {return canvas.width/1.09 - this.getWidth()/2;}, function() {return canvas.height/16.5;}, function() {return canvas.width/10;}, function() {return canvas.height/25;}, 3, function() {newAttackInputs(); if (!newFighterData['attacks'][newFighterAction]) {newFighterData['attacks'][newFighterAction]=[];} newFighterData['attacks'][newFighterAction].push({'damage': 0, 'launch': [0, 0], 'stun': 0, 'frames': []});}, function() {return ((newFighterData['attacks'][newFighterAction]) ? newFighterData['attacks'][newFighterAction].length < 8 : true);}, function() {return 'white';}, function() {return ['New'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('removeAttack', function() {return canvas.width/1.09 - this.getWidth()/2;}, function() {return canvas.height/14 + this.getHeight() + ((newFighterData['attacks'][newFighterAction]) ? newFighterData['attacks'][newFighterAction].length*canvas.height/10 : 0);}, function() {return canvas.width/10;}, function() {return canvas.height/25;}, 3, function() {if (newFighterData['attacks'][newFighterAction]) {newFighterData['attacks'][newFighterAction].splice(-1, 1); createAttackInputs.splice(-4, 4);}}, function() {return ((newFighterData['attacks'][newFighterAction]) ? newFighterData['attacks'][newFighterAction].length > 0 : false);}, function() {return 'white';}, function() {return ['Remove'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return ((newFighterData['attacks'][newFighterAction]) ? newFighterData['attacks'][newFighterAction].length > 0 : false);}),
  new Button('addX', function() {return 0.657*canvas.width;}, function() {return 0.593*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] = newFighterXEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('setX', function() {return 0.707*canvas.width;}, function() {return 0.593*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] = newFighterXEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['x']['add'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['set'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('addY', function() {return 0.657*canvas.width;}, function() {return 0.647*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] = newFighterYEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('setY', function() {return 0.707*canvas.width;}, function() {return 0.647*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] = newFighterYEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['y']['add'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['y']['set'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('addXVel', function() {return 0.657*canvas.width;}, function() {return 0.701*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] = newFighterXVelEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('setXVel', function() {return 0.707*canvas.width;}, function() {return 0.701*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] = newFighterXVelEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['add'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['set'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('addYVel', function() {return 0.657*canvas.width;}, function() {return 0.755*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] = newFighterYVelEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('setYVel', function() {return 0.707*canvas.width;}, function() {return 0.755*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] == null) {newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] = newFighterYVelEffect[newFighterAction][newFighterFrame]; newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['add'] = null;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] = null;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velY']['set'] != null) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('facingX', function() {return 0.773*canvas.width;}, function() {return 0.593*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['facing'] == 0) {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['facing'] = 1;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['x']['facing'] = 0;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['x']['facing'] == 1) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('facingX', function() {return 0.773*canvas.width;}, function() {return 0.701*canvas.height;}, function() {return canvas.height/80;}, function() {return canvas.height/80;}, 1, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['facing'] == 0) {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['facing'] = 1;} else {newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['facing'] = 0;}}, function() {return true;}, function() {return 'white';}, function() {if (newFighterData['effects'][newFighterAction][newFighterFrame]['velX']['facing'] == 1) {return["x"];} else {return [''];}}, 'black', function() {return (canvas.width/140).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('uploadImage', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return 3.05*canvas.height/4;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {newFighterNewImage=true; document.getElementById('inputButton').click();}, function() {return true;}, function() {return 'white';}, function() {return ['Upload Image'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('uploadSpriteSheet', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return 0.95*canvas.height/4 - this.getHeight();}, function() {return canvas.width/7;}, function() {return canvas.height/20;}, 3, function() {newFighterNewSpriteSheet=true; document.getElementById('inputButton').click();}, function() {return true;}, function() {return 'white';}, function() {return ['Upload Sprite Sheet'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('downloadAsSpriteSheet', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return 3.7*canvas.height/4;}, function() {return canvas.width/4;}, function() {return canvas.height/20;}, 3, function() {downloadAsSpriteSheet();}, function() {return true;}, function() {return 'white';}, function() {return ['Download Images As Sprite Sheet'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('play', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return 3.05*canvas.height/4 + canvas.height/135 + this.getHeight();}, function() {return canvas.width/36;}, function() {return canvas.height/20;}, 3, function() {newFighterPlay = !newFighterPlay;}, function() {return true;}, function() {return 'white';}, function() {return [];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return ((newFighterPlay) ? imgs['menu']['pause'] : imgs['menu']['play']);}, function() {return true;}),
  new Button('renameAnimationTime', function() {return canvas.width/2 - this.getWidth()/2 - context.measureText(' ticks per frame').width/2;}, function() {return 3.55*canvas.height/4;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingAnimationTime) ? context.measureText(tempAnimationTime).width + canvas.width/384 : context.measureText(newFighterData['animationTime'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingAnimationTime) {tempAnimationTime = ''} namingAnimationTime = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingAnimationTime) ? newFighterData['animationTime'].toString() : tempAnimationTime)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {context.fillStyle=this.textColor; context.font=this.getFont(); context.fillText(' ticks per frame', canvas.width/2 + this.getWidth()/2, this.getY() + canvas.height/60); context.fillStyle=this.getColor(); return true;}),
  new Button('renameSprites', function() {return canvas.width/2 - this.getWidth()/2 - context.measureText(' sprites in sheet').width/2;}, function() {return 0.62*canvas.height/4;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingSprites) ? context.measureText(tempSprites).width + canvas.width/384 : context.measureText(spritesInSheet).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingSprites) {tempSprites = '';} namingSprites = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingSprites) ? spritesInSheet : tempSprites)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {context.fillStyle=this.textColor; context.font=this.getFont(); context.fillText(' sprites in sheet', canvas.width/2 + this.getWidth()/2, this.getY() + canvas.height/60); context.fillStyle=this.getColor(); return true;}),
  new Button('renameXEffect', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.587*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingXEffect) ? context.measureText(tempXEffect).width + canvas.width/384 : context.measureText(newFighterXEffect[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingXEffect) {tempXEffect = '';} namingXEffect = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingXEffect) ? newFighterXEffect[newFighterAction][newFighterFrame].toString() : tempXEffect)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('renameYEffect', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.639*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingYEffect) ? context.measureText(tempYEffect).width + canvas.width/384 : context.measureText(newFighterYEffect[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingYEffect) {tempYEffect = '';} namingYEffect = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingYEffect) ? newFighterYEffect[newFighterAction][newFighterFrame].toString() : tempYEffect)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('renameXVelEffect', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.693*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingXVelEffect) ? context.measureText(tempXVelEffect).width + canvas.width/384 : context.measureText(newFighterXVelEffect[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingXVelEffect) {tempXVelEffect = '';} namingXVelEffect = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingXVelEffect) ? newFighterXVelEffect[newFighterAction][newFighterFrame].toString() : tempXVelEffect)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('renameXVelEffect', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.747*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingYVelEffect) ? context.measureText(tempYVelEffect).width + canvas.width/384 : context.measureText(newFighterYVelEffect[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingYVelEffect) {tempYVelEffect = '';} namingYVelEffect = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingYVelEffect) ? newFighterYVelEffect[newFighterAction][newFighterFrame].toString() : tempYVelEffect)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('renameProjectile', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.782*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingProjectile) ? context.measureText(tempProjectile).width + canvas.width/384 : context.measureText(newFighterProjectile[newFighterAction][newFighterFrame].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingProjectile) {tempProjectile = '';} namingProjectile = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingProjectile) ? newFighterProjectile[newFighterAction][newFighterFrame].toString() : tempProjectile)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterData['effects'][newFighterAction]);}),
  new Button('renameProjectileName', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.562*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingProjectileName) ? context.measureText(tempProjectileName).width + canvas.width/384 : context.measureText(newFighterAction).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingProjectileName) {tempProjectileName = '';} namingProjectileName = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingProjectileName) ? newFighterAction : tempProjectileName)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && !(newFighterData['effects'][newFighterAction]));}),
  new Button('renameXRel', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.602*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingXRel) ? context.measureText(tempXRel).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['x'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingXRel) {tempXRel = '';} namingXRel = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingXRel) ? newFighterData['projectiles'][newFighterAction]['x'].toString() : tempXRel)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && !(newFighterData['effects'][newFighterAction]));}),
  new Button('renameYRel', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.642*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingYRel) ? context.measureText(tempYRel).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['y'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingYRel) {tempYRel = '';} namingYRel = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingYRel) ? newFighterData['projectiles'][newFighterAction]['y'].toString() : tempYRel)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && !(newFighterData['effects'][newFighterAction]));}),
  new Button('renameXVel', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.682*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingXVel) ? context.measureText(tempXVel).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['velX'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingXVel) {tempXVel = '';} namingXVel = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingXVel) ? newFighterData['projectiles'][newFighterAction]['velX'].toString() : tempXVel)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && !(newFighterData['effects'][newFighterAction]));}),
  new Button('renameYVel', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.722*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingYVel) ? context.measureText(tempYVel).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['velY'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingYVel) {tempYVel = '';} namingYVel = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingYVel) ? newFighterData['projectiles'][newFighterAction]['velY'].toString() : tempYVel)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && !(newFighterData['effects'][newFighterAction]));}),
  new Button('renameWeight', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.762*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingWeight) ? context.measureText(tempWeight).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['weight'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingWeight) {tempWeight = '';} namingWeight = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingWeight) ? newFighterData['projectiles'][newFighterAction]['weight'].toString() : tempWeight)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && !(newFighterData['effects'][newFighterAction]));}),
  new Button('renamePiercing', function() {return 0.75*canvas.width - this.getWidth()/2}, function() {return 0.802*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingPiercing) ? context.measureText(tempPiercing).width + canvas.width/384 : context.measureText(newFighterData['projectiles'][newFighterAction]['hitsLeft'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingPiercing) {tempPiercing = '';} namingPiercing = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingPiercing) ? newFighterData['projectiles'][newFighterAction]['hitsLeft'].toString() : tempPiercing)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && !(newFighterData['effects'][newFighterAction]));}),
  new Button('renameFighterName', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.174*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterName) ? context.measureText(tempFighterName).width + canvas.width/384 : context.measureText(newFighterData['name']).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterName) {tempFighterName = '';} namingFighterName = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterName) ? newFighterData['name'] : tempFighterName)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('renameFighterJumps', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.209*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterJumps) ? context.measureText(tempFighterJumps).width + canvas.width/384 : context.measureText(newFighterData['jumps'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterJumps) {tempFighterJumps = '';} namingFighterJumps = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterJumps) ? newFighterData['jumps'].toString() : tempFighterJumps)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('renameFighterJumpStrength', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.244*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterJumpStrength) ? context.measureText(tempFighterJumpStrength).width + canvas.width/384 : context.measureText(newFighterData['jumpStrength'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterJumpStrength) {tempFighterJumpStrength = '';} namingFighterJumpStrength = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterJumpStrength) ? newFighterData['jumpStrength'].toString() : tempFighterJumpStrength)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('renameFighterFallSpeed', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.279*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterFallSpeed) ? context.measureText(tempFighterFallSpeed).width + canvas.width/384 : context.measureText(newFighterData['terminalVelocity'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterFallSpeed) {tempFighterFallSpeed = '';} namingFighterFallSpeed = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterFallSpeed) ? newFighterData['terminalVelocity'].toString() : tempFighterFallSpeed)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('renameFighterWeight', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.314*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterWeight) ? context.measureText(tempFighterWeight).width + canvas.width/384 : context.measureText(newFighterData['weight'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterWeight) {tempFighterWeight = '';} namingFighterWeight = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterWeight) ? newFighterData['weight'].toString() : tempFighterWeight)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('renameFighterRunSpeed', function() {return 0.127*canvas.width - this.getWidth()/2}, function() {return 0.349*canvas.height;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingFighterRunSpeed) ? context.measureText(tempFighterRunSpeed).width + canvas.width/384 : context.measureText(newFighterData['runSpeed'].toString()).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingFighterRunSpeed) {tempFighterRunSpeed = '';} namingFighterRunSpeed = true;}, function() {return true;}, function() {return 'white';}, function() {context.fillStyle = this.textColor; return [((!namingFighterRunSpeed) ? newFighterData['runSpeed'].toString() : tempFighterRunSpeed)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('addHurtbox', function() {return 2.52*canvas.width/4;}, function() {return canvas.height/4;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {newFighterDraw = 'hurtbox';}, function() {return true;}, function() {return ((newFighterDraw == 'hurtbox' || newFighterDraw.substring(0, 11) == 'hurtboxDraw') ? 'red' : 'white');}, function() {return ['Add Hurtbox'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterData['effects'][newFighterAction]);}),
  new Button('addHitbox', function() {return 2.52*canvas.width/4 + this.getWidth() + canvas.width/120;}, function() {return canvas.height/4;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {newFighterDraw = 'hitbox';}, function() {return true;}, function() {return ((newFighterDraw == 'hitbox' || newFighterDraw.substring(0, 10) == 'hitboxDraw') ? 'blue' : 'white');}, function() {return ['Add Hitbox'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock');}),
  new Button('viewOnlyHurtbox', function() {return 2.52*canvas.width/4;}, function() {return canvas.height/4+this.getHeight()+canvas.height/120;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (contains(newFighterView, 'hurtbox')) {remove(newFighterView, 'hurtbox');} else {newFighterView.push('hurtbox');}}, function() {return true;}, function() {return ((contains(newFighterView, 'hurtbox')) ? 'red' : 'white');}, function() {return ['View Hurtboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterData['effects'][newFighterAction]);}),
  new Button('viewOnlyHitbox', function() {return 2.52*canvas.width/4 + this.getWidth() + canvas.width/120;}, function() {return canvas.height/4+this.getHeight()+canvas.height/120;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (contains(newFighterView, 'hitbox')) {remove(newFighterView, 'hitbox');} else {newFighterView.push('hitbox');}}, function() {return true;}, function() {return ((contains(newFighterView, 'hitbox')) ? 'blue' : 'white');}, function() {return ['View Hitboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock');}),
  new Button('copyHurtbox', function() {return 2.52*canvas.width/4;}, function() {return canvas.height/4+2*(this.getHeight()+canvas.height/120);}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (!newFighterData['hurtboxes'][newFighterAction]) {newFighterData['hurtboxes'][newFighterAction] = {};} newFighterData['hurtboxes'][newFighterAction][newFighterFrame] = []; if (newFighterData['hurtboxes'][newFighterAction][newFighterFrame-1]) {for(var i in newFighterData['hurtboxes'][newFighterAction][newFighterFrame-1]) {newFighterData['hurtboxes'][newFighterAction][newFighterFrame].push(newFighterData['hurtboxes'][newFighterAction][newFighterFrame-1][i].slice());}}}, function() {return true;}, function() {return 'white';}, function() {return ['Copy Previous', 'Frame Hurtboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterData['effects'][newFighterAction]);}),
  new Button('copyHitbox', function() {return 2.52*canvas.width/4 + this.getWidth() + canvas.width/120;}, function() {return canvas.height/4+2*(this.getHeight()+canvas.height/120);}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (!newFighterData['hitboxes'][newFighterAction]) {newFighterData['hitboxes'][newFighterAction] = {};} newFighterData['hitboxes'][newFighterAction][newFighterFrame] = []; if (newFighterData['hitboxes'][newFighterAction][newFighterFrame-1]) {for(var i in newFighterData['hitboxes'][newFighterAction][newFighterFrame-1]) {newFighterData['hitboxes'][newFighterAction][newFighterFrame].push(newFighterData['hitboxes'][newFighterAction][newFighterFrame-1][i].slice());}}}, function() {return true;}, function() {return 'white';}, function() {return ['Copy Previous', 'Frame Hitboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock');}),
  new Button('clearHurtbox', function() {return 2.52*canvas.width/4;}, function() {return canvas.height/4+3*(this.getHeight()+canvas.height/120);}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (newFighterData['hurtboxes'][newFighterAction] && newFighterData['hurtboxes'][newFighterAction][newFighterFrame]) {newFighterData['hurtboxes'][newFighterAction][newFighterFrame] = [];}}, function() {return true;}, function() {return 'white';}, function() {return ['Clear Hurtboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && newFighterData['effects'][newFighterAction]);}),
  new Button('clearHitbox', function() {return 2.52*canvas.width/4 + this.getWidth() + canvas.width/120;}, function() {return canvas.height/4+3*(this.getHeight()+canvas.height/120);}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {if (newFighterData['hitboxes'][newFighterAction] && newFighterData['hitboxes'][newFighterAction][newFighterFrame]) {newFighterData['hitboxes'][newFighterAction][newFighterFrame] = [];}}, function() {return true;}, function() {return 'white';}, function() {return ['Clear Hitboxes'];}, 'black', function() {return (canvas.width/90).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock');}),
  new Button('idle', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Idle'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('airmove', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Airmove'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('run', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 2*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Run'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('stun', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 3*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Stun'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('uair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 4*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Up Air'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('dair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 5*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Down Air'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('bair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 6*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Back Air'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('fair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 7*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Forward Air'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('nair', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 8*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Up Tilt'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('dtilt', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 9*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Down Tilt'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('forward', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 10*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Dash Attack'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('neutral', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 11*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Neutral'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('stock', function() {return 0.40625*canvas.width-this.getWidth();}, function() {return canvas.height/4 + 12.2*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['Stock'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('newProjectile', function() {return 0.40625*canvas.width-this.getWidth()*2;}, function() {return canvas.height/4 + newFighterProjectiles*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {createFighterButtonsLength+=1; newFighterProjectiles+=1; newProjectileButton(); newFighterData['projectiles']['Projectile' + newFighterProjectiles.toString()] = {'x': 0, 'y': 0, 'velX': 0.01, 'velY': -0.01, 'weight': 1, 'hitsLeft': 1};}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return ['New Projectile'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('deleteProjectile', function() {return 0.685*canvas.width;}, function() {return 0.865*canvas.height;}, function() {return canvas.width/10;}, function() {return canvas.height/30;}, 3, function() {console.log(createFighterButtons);}, function() {return true;}, function() {return 'white';}, function() {return ['Delete Projectile'];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return (newFighterAction != 'stock' && !newFighterData['effects'][newFighterAction]);}),
  new Button('+', function() {return 0.59375*canvas.width;}, function() {return 3*canvas.height/4 + canvas.height/70;}, function() {return 0.025*canvas.width;}, function() {return canvas.height/22.5;}, 3, function() {newFighterFrame = createFighterButtons.length - createFighterButtonsLength; newFighterButton(); if(newFighterData['effects'][newFighterAction]) {newFighterData['effects'][newFighterAction][newFighterFrame] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}; newFighterXEffect[newFighterAction][newFighterFrame] = 0; newFighterYEffect[newFighterAction][newFighterFrame] = 0; newFighterXVelEffect[newFighterAction][newFighterFrame] = 0; newFighterYVelEffect[newFighterAction][newFighterFrame] = 0; newFighterProjectile[newFighterAction][newFighterFrame] = '';}}, function() {return true;}, function() {return 'white';}, function() {return ['+'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return newFighterAction != 'stock';}),
  new Button('-', function() {return 0.59375*canvas.width;}, function() {return canvas.height/4 - canvas.height/70 - this.getHeight();}, function() {return 0.025*canvas.width;}, function() {return canvas.height/22.5;}, 3, function() {if (contains(actions, newFighterAction)) {delete newFighterData['effects'][Object.keys(newFighterData['effects'][newFighterAction]).length-1]; delete newFighterXEffect[newFighterAction][Object.keys(newFighterData['effects'][newFighterAction]).length-1]; delete newFighterYEffect[newFighterAction][Object.keys(newFighterData['effects'][newFighterAction]).length-1]; delete newFighterXVelEffect[newFighterAction][Object.keys(newFighterData['effects'][newFighterAction]).length-1]; delete newFighterYVelEffect[newFighterAction][Object.keys(newFighterData['effects'][newFighterAction]).length-1]; delete newFighterProjectile[newFighterAction][Object.keys(newFighterData['effects'][newFighterAction]).length-1]; delete newFighterData['effects'][newFighterAction][Object.keys(newFighterData['effects'][newFighterAction]).length-1];} if(newFighterData['hitboxes'][newFighterAction] && newFighterData['hitboxes'][newFighterAction][Object.keys(newFighterData['hitboxes'][newFighterAction]).length]) {delete newFighterData['hitboxes'][newFighterAction][Object.keys(newFighterData['hitboxes'][newFighterAction]).length];} if(newFighterData['hurtboxes'][newFighterAction] && newFighterData['hurtboxes'][newFighterAction][Object.keys(newFighterData['hurtboxes'][newFighterAction]).length]) {delete newFighterData['hurtboxes'][newFighterAction][Object.keys(newFighterData['hurtboxes'][newFighterAction]).length];} if(imgs['new'] && imgs['new'][0] && imgs['new'][0][newFighterAction] && imgs['new'][0][newFighterAction][Object.keys(imgs['new'][0][newFighterAction]).length-1]) {delete imgs['new'][0][newFighterAction][Object.keys(imgs['new'][0][newFighterAction]).length-1];} newFighterButtonRemove();}, function() {return createFighterButtons.length > createFighterButtonsLength+1;}, function() {return 'white';}, function() {return ['-'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('0', function() {return 0.59375*canvas.width;}, function() {return canvas.height/4+this.getHeight()*parseInt(this.id);}, function() {return 0.025*canvas.width;}, function() {return (canvas.height/2)/(createFighterButtons.length-createFighterButtonsLength);}, 3, function() {newFighterAnimationFrame = newFighterData['animationTime']*parseInt(this.id); newFighterFrame=parseInt(this.id); if(newFighterData['effects'][newFighterAction] && newFighterData['effects'][newFighterAction][newFighterFrame] == null) {newFighterData['effects'][newFighterAction][newFighterFrame] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}; newFighterXEffect[newFighterAction][newFighterFrame] = 0; newFighterYEffect[newFighterAction][newFighterFrame] = 0; newFighterXVelEffect[newFighterAction][newFighterFrame] = 0; newFighterYVelEffect[newFighterAction][newFighterFrame] = 0; newFighterProjectile[newFighterAction][newFighterFrame] = '';}}, function() {return true;}, function() {return ((newFighterFrame == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return [this.id];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;})];

var createFighterSliders = [new Slider('width', function() {return newFighterData['spriteWidth'];}, function(percent) {newFighterData['spriteWidth']=percent*(this.max-this.min)+this.min;}, 0.01, 0.1875, function() {return canvas.width/3.2;}, function() {return canvas.height/5.4;}, function() {return canvas.width/10;}, function() {return canvas.height/300;}, function() {return canvas.width/200;}, function() {return canvas.height/100;}, function() {return canvas.width/600;}, function() {return 'black';}, function() {return 'white';}, function() {return true;}),
  new Slider('width', function() {return newFighterData['spriteHeight'];}, function(percent) {newFighterData['spriteHeight']=percent*(this.max-this.min)+this.min;}, 0.01, 0.5, function() {return canvas.width/3.2;}, function() {return canvas.height/4.35;}, function() {return canvas.width/10;}, function() {return canvas.height/300;}, function() {return canvas.width/200;}, function() {return canvas.height/100;}, function() {return canvas.width/600;}, function() {return 'black';}, function() {return 'white';}, function() {return true;})];

var lobbyButtons = [new Button('createGame', function() {return canvas.width/60;}, function() {return canvas.height/33.75;}, function() {return canvas.width/10;}, function() {return canvas.height/15;}, 3, function() {demo = false; socket.emit('createGame', true);}, function() {return true;}, function() {return 'white';}, function() {return ['Create Game'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('createFighter', function() {return 59*canvas.width/60 - this.getWidth();}, function() {return canvas.height/33.75;}, function() {return canvas.width/10;}, function() {return canvas.height/15;}, 3, function() {demo = true; fighterSelect = false; createFighter = true;}, function() {return true;}, function() {return 'white';}, function() {return ['Create Fighter'];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;})];

var preGameButtons = [new Button('leaveLobby', function() {return canvas.width/60;}, function() {return canvas.height/33.75;}, function() {return canvas.width/10;}, function() {return canvas.height/20;}, 3, function() {fighterSelect = false; socket.emit('leaveGame');}, function() {return true;}, function() {return 'white';}, function() {return ['Leave Lobby'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('startGame', function() {return canvas.width/2 - canvas.width/10;}, function() {return 3.3*canvas.height/4;}, function() {return canvas.width/5;}, function() {return canvas.height/10;}, 6, function() {socket.emit('startGame');}, function() {return true;}, function() {return 'green';}, function() {return ['Fight!'];}, 'black', function() {return (canvas.width/60).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('renameGame', function() {return canvas.width/2 - this.getWidth()/2;}, function() {return canvas.height/10;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((namingGame) ? context.measureText(tempGameName).width + canvas.width/384 : context.measureText(game.name).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!namingGame) {tempGameName = ''} namingGame = true;}, function() {return true;}, function() {return 'white';}, function() {return [((tempGameName == '' && !namingGame) ? game.name : tempGameName)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {if (game.host == player.id) {return true;} else {context.font = this.getFont(); context.fillStyle = 'black'; context.textAlign = 'center'; context.fillText(this.getText(), this.getX() + this.getWidth()/2, this.getY() + this.getHeight()/10 + parseInt(this.getFont().substring(0, 2)) - (this.getHeight()/6)*(this.getText().length-1)); return false;}}),
  new Button('rename', function() {context.font = 'bold ' + (canvas.width/106.67).toString() + 'px Arial'; var a = context.measureText('Name: ').width; context.font = this.getFont(); return canvas.width/1.85 + canvas.width/75 + a;}, function() {return canvas.height/6 + canvas.height/40;}, function() {context.font = (canvas.width/106.67).toString() + 'px Arial'; return ((naming) ? context.measureText(tempName).width + canvas.width/384 : context.measureText(player.name).width + canvas.width/384);}, function() {return canvas.height/43.2;}, 1, function() {if (!naming) {tempName = ''} naming = true;}, function() {return true;}, function() {return 'white';}, function() {context.font = 'bold ' + (canvas.width/106.67).toString() + 'px Arial'; context.font = this.getFont(); return [((tempName == '' && !naming) ? player.name : tempName)];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {return null;}, function() {context.font = 'bold ' + (canvas.width/106.67).toString() + 'px Arial'; context.fillStyle = 'black'; context.textAlign = 'center'; context.fillText('Name: ', canvas.width/1.85 + canvas.width/36, canvas.height/6 + canvas.height/25); context.fillStyle = this.textColor; context.font = this.getFont(); return true;}),
  new Button('uair', function() {return canvas.width/1.85 + canvas.width/12;}, function() {return canvas.height/6 + canvas.height/6.5;}, function() {return canvas.width/19.2;}, function() {return canvas.height/10.8;}, 3, function() {socket.emit('sacrifice', 'uair');}, function() {return true;}, function() {return ((cantDoThat[this.id] > canDoThat[this.id]) ? 'rgba(255, 0, 0, ' + (cantDoThat[this.id]/100).toString() + ')' : 'rgba(0, 255, 0, ' + (canDoThat[this.id]/100).toString() + ')');}, function() {return ['Up Air'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('dair', function() {return canvas.width/1.85 + canvas.width/12;}, function() {return canvas.height/6 + canvas.height/6.5 + canvas.height/10.8;}, function() {return canvas.width/19.2;}, function() {return canvas.height/10.8;}, 3, function() {socket.emit('sacrifice', 'dair');}, function() {return true;}, function() {return ((cantDoThat[this.id] > canDoThat[this.id]) ? 'rgba(255, 0, 0, ' + (cantDoThat[this.id]/100).toString() + ')' : 'rgba(0, 255, 0, ' + (canDoThat[this.id]/100).toString() + ')');}, function() {return ['Down', 'Air'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('nair', function() {return canvas.width/1.85 + canvas.width/12;}, function() {return canvas.height/6 + canvas.height/6.5 + canvas.height/4.2;}, function() {return canvas.width/19.2;}, function() {return canvas.height/10.8;}, 3, function() {socket.emit('sacrifice', 'nair');}, function() {return true;}, function() {return ((cantDoThat[this.id] > canDoThat[this.id]) ? 'rgba(255, 0, 0, ' + (cantDoThat[this.id]/100).toString() + ')' : 'rgba(0, 255, 0, ' + (canDoThat[this.id]/100).toString() + ')');}, function() {return ['Up Tilt'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('dtilt', function() {return canvas.width/1.85 + canvas.width/12;}, function() {return canvas.height/6 + canvas.height/6.5 + canvas.height/4.2 + canvas.height/10.8;}, function() {return canvas.width/19.2;}, function() {return canvas.height/10.8;}, 3, function() {socket.emit('sacrifice', 'dtilt');}, function() {return true;}, function() {return ((cantDoThat[this.id] > canDoThat[this.id]) ? 'rgba(255, 0, 0, ' + (cantDoThat[this.id]/100).toString() + ')' : 'rgba(0, 255, 0, ' + (canDoThat[this.id]/100).toString() + ')');}, function() {return ['Down', 'Tilt'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('bair', function() {return canvas.width/1.85 + canvas.width/12 - canvas.width/19.2;}, function() {return canvas.height/6 + canvas.height/6.5 + canvas.height/10.8;}, function() {return canvas.width/19.2;}, function() {return canvas.height/10.8;}, 3, function() {socket.emit('sacrifice', 'bair');}, function() {return true;}, function() {return ((cantDoThat[this.id] > canDoThat[this.id]) ? 'rgba(255, 0, 0, ' + (cantDoThat[this.id]/100).toString() + ')' : 'rgba(0, 255, 0, ' + (canDoThat[this.id]/100).toString() + ')');}, function() {return ['Back', 'Air'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('fair', function() {return canvas.width/1.85 + canvas.width/12 + canvas.width/19.2;}, function() {return canvas.height/6 + canvas.height/6.5 + canvas.height/10.8;}, function() {return canvas.width/19.2;}, function() {return canvas.height/10.8;}, 3, function() {socket.emit('sacrifice', 'fair');}, function() {return true;}, function() {return ((cantDoThat[this.id] > canDoThat[this.id]) ? 'rgba(255, 0, 0, ' + (cantDoThat[this.id]/100).toString() + ')' : 'rgba(0, 255, 0, ' + (canDoThat[this.id]/100).toString() + ')');}, function() {return ['Forward', 'Air'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('neutral', function() {return canvas.width/1.85 + canvas.width/12 - canvas.width/19.2;}, function() {return canvas.height/6 + canvas.height/6.5 + canvas.height/4.2;}, function() {return canvas.width/19.2;}, function() {return canvas.height/10.8;}, 3, function() {socket.emit('sacrifice', 'neutral');}, function() {return true;}, function() {return ((cantDoThat[this.id] > canDoThat[this.id]) ? 'rgba(255, 0, 0, ' + (cantDoThat[this.id]/100).toString() + ')' : 'rgba(0, 255, 0, ' + (canDoThat[this.id]/100).toString() + ')');}, function() {return ['Neutral'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('forward', function() {return canvas.width/1.85 + canvas.width/12 + canvas.width/19.2;}, function() {return canvas.height/6 + canvas.height/6.5 + canvas.height/4.2;}, function() {return canvas.width/19.2;}, function() {return canvas.height/10.8;}, 3, function() {socket.emit('sacrifice', 'forward');}, function() {return true;}, function() {return ((cantDoThat[this.id] > canDoThat[this.id]) ? 'rgba(255, 0, 0, ' + (cantDoThat[this.id]/100).toString() + ')' : 'rgba(0, 255, 0, ' + (canDoThat[this.id]/100).toString() + ')');}, function() {return ['Dash', 'Attack'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('stock1', function() {return canvas.width/1.85 + canvas.width/4;}, function() {return canvas.height/6 + canvas.height/4.8;}, function() {return canvas.width/25.6;}, function() {return canvas.height/14.4;}, 3, function() {socket.emit('sacrifice', 'stock1');}, function() {return true;}, function() {return 'white';}, function() {return ['Stock'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('stock2', function() {return canvas.width/1.85 + canvas.width/4;}, function() {return canvas.height/6 + canvas.height/4.8 + canvas.height/14.4;}, function() {return canvas.width/25.6;}, function() {return canvas.height/14.4;}, 3, function() {socket.emit('sacrifice', 'stock2');}, function() {return true;}, function() {return 'white';}, function() {return ['Stock'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('stock3', function() {return canvas.width/1.85 + canvas.width/4;}, function() {return canvas.height/6 + canvas.height/4.8 + canvas.height/7.2;}, function() {return canvas.width/25.6;}, function() {return canvas.height/14.4;}, 3, function() {socket.emit('sacrifice', 'stock3');}, function() {return true;}, function() {return 'white';}, function() {return ['Stock'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('stock4', function() {return canvas.width/1.85 + canvas.width/4;}, function() {return canvas.height/6 + canvas.height/4.8 + canvas.height/4.8;}, function() {return canvas.width/25.6;}, function() {return canvas.height/14.4;}, 3, function() {socket.emit('sacrifice', 'stock4');}, function() {return true;}, function() {return 'white';}, function() {return ['Stock'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('stock5', function() {return canvas.width/1.85 + canvas.width/4;}, function() {return canvas.height/6 + canvas.height/4.8 + canvas.height/3.6;}, function() {return canvas.width/25.6;}, function() {return canvas.height/14.4;}, 3, function() {socket.emit('sacrifice', 'stock5');}, function() {return true;}, function() {return 'white';}, function() {return ['Stock'];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {return null;}, function() {return true;}),
  new Button('fighterSelect', function() {return canvas.width/1.85 + canvas.width/3.83;}, function() {return canvas.height/6 + canvas.height/50;}, function() {return canvas.width/19.2;}, function() {return canvas.height/6.5}, 3, function() {fighterSelect = !fighterSelect;}, function() {return true;}, function() {return 'rgba(0, 0, 0, 0)';}, function() {return [];}, 'black', function() {return (canvas.width/80).toString() + 'px Arial';}, function() {null;}, function() {return true;})];

var gameButtons = [new Button('lobby', function() {return canvas.width/2 - canvas.width/10;}, function() {return 2.75*canvas.height/4;}, function() {return canvas.width/5;}, function() {return canvas.height/10;}, 3, function() {debug = false; for (var i in cantDoThat) {cantDoThat[i]=0;} for (var i in canDoThat) {canDoThat[i]=0;} game = null; socket.emit('leaveGame');}, function() {return true;}, function() {return 'white';}, function() {return ['Leave Game'];}, 'black', function() {return (canvas.width/60).toString() + 'px Arial';}, function() {return null;}, function() {return (player.lost || player.won);}),
  new Button('back', function() {return canvas.width/60;}, function() {return canvas.height/33.75;}, function() {return canvas.width/10;}, function() {return canvas.height/15;}, 3, function() {debug = false; game = null; socket.emit('leaveGame');}, function() {return true;}, function() {return 'white';}, function() {return ['Back'];}, 'black', function() {return (canvas.width/60).toString() + 'px Arial';}, function() {return null;}, function() {return demo;}),
  new Button('debug', function() {return 59*canvas.width/60 - this.getWidth();}, function() {return canvas.height/33.75;}, function() {return canvas.width/9;}, function() {return canvas.height/15;}, 3, function() {debug = !debug;}, function() {return true;}, function() {return 'white';}, function() {return ['Toggle Debug'];}, 'black', function() {return (canvas.width/60).toString() + 'px Arial';}, function() {return null;}, function() {return demo;})];

var preGameButtonsLength = preGameButtons.length;
var lobbyButtonsLength = lobbyButtons.length;
var createFighterButtonsLength = createFighterButtons.length-1;

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

var cantDoThat = {
  'uair': 0,
  'dair': 0,
  'nair': 0,
  'dtilt': 0,
  'bair': 0,
  'fair': 0,
  'neutral': 0,
  'forward': 0
}

var canDoThat = {
  'uair': 0,
  'dair': 0,
  'nair': 0,
  'dtilt': 0,
  'bair': 0,
  'fair': 0,
  'neutral': 0,
  'forward': 0
}

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
var context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

function createFighterButtonIDExists(id) {
  for (var i in createFighterButtons) {
    if (createFighterButtons[i].id == id) {
      return true;
    }
  }

  return false;
}

function breakUpSpriteSheet(spriteSheet, num) {
  var return_imgs = {};

  for(var i=0; i<num; i++) {
    var tempCanvas = document.createElement('canvas');
    var tempContext = tempCanvas.getContext('2d');
    tempContext.imageSmoothingEnabled = false;
    tempCanvas.width = spriteSheet.width/num;
    tempCanvas.height = spriteSheet.height;

    tempContext.drawImage(spriteSheet, i*tempCanvas.width, 0, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);

    var img = new Image();
    img.src = tempCanvas.toDataURL('image/png');
    return_imgs[i] = img;
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
  for (var i=0; i<rawDataArray.length; i+=2) {
    frames[rawDataArray[i]] = rawDataArray[i+1];
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

  rawDataArray = data['effects'].split('|');
  var effects = {};
  var tempEffects;
  for (var i=0; i<rawDataArray.length; i+=2) {
    tempEffects = rawDataArray[i+1].split('_');
    effects[rawDataArray[i]] = {'0': {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}};
    for (var j=0; j<tempEffects.length; j+=2) {
      if(tempEffects[j].length == 0) {
        continue;
      }
      let tempFrames = tempEffects[j].split('=');
      effects[rawDataArray[i]][tempFrames[j]] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null};
      for (var k=0; k<tempFrames.length; k++) {
        let tempEffect = tempFrames[k].split(';');
        for (var l=0; l<tempEffect.length; l++) {
          let tempArg = tempEffect[l].split(',');
          if (tempArg[0] == 'projectile') {
            effects[rawDataArray[i]][tempFrames[j]]['projectile'] = tempArg[1];
          } else if (tempArg[0] == 'x' || tempArg[0] == 'velX' || tempArg[0] == 'y' || tempArg[0] == 'velY') {
            if (tempArg[1] == 'set') {
              effects[rawDataArray[i]][tempFrames[j]][tempArg[0]]['set'] = tempArg[2];
              effects[rawDataArray[i]][tempFrames[j]][tempArg[0]]['facing'] = tempArg[3];
            } else if (tempArg[1] == 'add') {
              effects[rawDataArray[i]][tempFrames[j]][tempArg[0]]['add'] = tempArg[2];
              effects[rawDataArray[i]][tempFrames[j]][tempArg[0]]['facing'] = tempArg[3];
            }
          }
        }
      }
    }
  }

  return {
    'name': data['name'],
    'jumps': parseInt(data['jumps']),
    'jumpStrength': parseFloat(data['jumpStrength']),
    'terminalVelocity': parseFloat(data['terminalVelocity']),
    'weight': parseFloat(data['weight']),
    'runSpeed': parseFloat(data['runSpeed']),
    'hurtboxes': hurtboxes,
    'hitboxes': hitboxes,
    'attacks': attacks,
    'animationTime': parseFloat(data['animationTime']),
    'spriteWidth': sprWidth,
    'spriteHeight': sprHeight,
    'effects': effects,
    'projectiles': {}};
}

function encodeNewProjectile(proj) {
  var newProjectileString = 'name@' + proj +
    '\nfacing@same\nx@player;' + newFighterData['projectiles'][proj]['x'].toString() +
    '\ny@player;' + newFighterData['projectiles'][proj]['y'].toString() +
    '\nwidth@' + newFighterData['spriteWidth'].toString() +
    '\nheight@' + newFighterData['spriteHeight'].toString() +
    '\nvelX@' + (-newFighterData['projectiles'][proj]['velX']).toString() + ':' + newFighterData['projectiles'][proj]['velX'].toString() +
    '\nvelY@' + newFighterData['projectiles'][proj]['velY'].toString() +
    '\nweight@' + newFighterData['projectiles'][proj]['weight'].toString() +
    '\nanimationTime@' + newFighterData['animationTime'] +
    '\nhitsLeft@' + newFighterData['projectiles'][proj]['hitsLeft'] +
    '\nframes@' + Object.keys(imgs['new'][0][proj]).length +
    '\nhitboxes@';

  for(var j in newFighterData['hitboxes'][proj]) {
    for(var k in newFighterData['hitboxes'][proj][j]) {
      newProjectileString = newProjectileString + k.toString() + ';';
      for(var l in newFighterData['hitboxes'][proj][j][k]) {
        newProjectileString = newProjectileString + ((newFighterData['hitboxes'][proj][j][k][l] - 0.5 + ((l%2 == 0) ? newFighterData['spriteWidth'] : newFighterData['spriteHeight'])/2)/((l%2 == 0) ? newFighterData['spriteWidth'] : newFighterData['spriteHeight'])).toFixed(4).toString() + ',';
      }

      newProjectileString = newProjectileString.slice(0, -1);
    }

    newProjectileString = newProjectileString + '_';
  }
  newProjectileString = newProjectileString.slice(0, -1);

  newProjectileString = newProjectileString + '\nattacks@';
  for(var j in newFighterData['attacks'][proj]) {
    newProjectileString = newProjectileString + j + '=' + newFighterData['attacks'][proj][j].damage.toString() + ';' + newFighterData['attacks'][proj][j].launch[0].toString() + ',' + newFighterData['attacks'][proj][j].launch[1].toString() + ';' + newFighterData['attacks'][proj][j].stun.toString() + '_';
  }
  newProjectileString = newProjectileString.slice(0, -1);

  return newProjectileString;
}

function encodeNewFighter() {
  var newFighterString = 'name@' + newFighterData['name'] +
    '\nterminalVelocity@' + newFighterData['terminalVelocity'].toString() +
    '\nrunSpeed@' + newFighterData['runSpeed'].toString() +
    '\nanimationTime@' + newFighterData['animationTime'].toString() +
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

  newFighterString = newFighterString + '\nframes@';
  for(var i in newFighterData['effects']) {
    newFighterString = newFighterString + i + '|' + Object.keys(newFighterData['effects'][i]).length.toString() + '|';
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
      var fnd = false;
      for(var k in newFighterData['effects'][i][j]) {
        if(k == 'projectile') {
          if(newFighterData['effects'][i][j][k] != null) {
            newFighterString = newFighterString + ((fnd) ? '' : (j.toString() + '=')) + k + ',' + newFighterData['effects'][i][j][k] + ';';
            fnd = true;
          }
        } else if(newFighterData['effects'][i][j][k].add != null) {
          newFighterString = newFighterString + ((fnd) ? '' : (j.toString() + '=')) + k + ',add,' + newFighterData['effects'][i][j][k].add.toString() + ',' + newFighterData['effects'][i][j][k].facing.toString() + ';';
          fnd = true;
        } else if(newFighterData['effects'][i][j][k].set != null) {
          newFighterString = newFighterString + ((fnd) ? '' : (j.toString() + '=')) + k + ',set,' + newFighterData['effects'][i][j][k].set.toString() + ',' + newFighterData['effects'][i][j][k].facing.toString() + ';';
          fnd = true;
        }
      }

      if(fnd) {
        newFighterString = newFighterString.slice(0, -1);
      }
    }

    newFighterString = newFighterString + '|';
  }
  if(newFighterString[newFighterString.length-1] != '@') {
    newFighterString = newFighterString.slice(0, -1);
  }

  newFighterString = newFighterString + '\nsprites@' + newFighterSprites.toString();

  imgs['demo'] = compileNewFighterImages();

  return newFighterString;
}

function compileNewFighterImages() {
  new_imgs = {};
  for(var i in imgs['new']) {
    new_imgs[i] = {};
    for(var j in imgs['new'][i]) {
      if(imgs['new'][i][j] && Object.keys(imgs['new'][i][j]).length > 0) {
        var tempCanvas = document.createElement('canvas');
        var tempContext = tempCanvas.getContext('2d');
        tempContext.imageSmoothingEnabled = false;
        tempCanvas.width = imgs['new'][i][j][0].width*Object.keys(imgs['new'][i][j]).length;
        tempCanvas.height = imgs['new'][i][j][0].height;

        for(var k in imgs['new'][i][j]) {
          if(imgs['new'][i][j] != null) {
            tempContext.drawImage(imgs['new'][i][j][k], 0, 0, imgs['new'][i][j][k].width, imgs['new'][i][j][k].height, k*(tempCanvas.width/Object.keys(imgs['new'][i][j]).length), 0, tempCanvas.width/Object.keys(imgs['new'][i][j]).length, tempCanvas.height);
          }
        }

        var img = new Image();
        img.src = tempCanvas.toDataURL('image/png');
        new_imgs[i][j] = img;
      }
    }
  }

  return new_imgs;
}

function newFighterLoadExisting(ind) {
  var fighter = fighters[ind];
  newFighterAction = 'idle';

  newFighterData['name'] = fighter.name + " Copy";
  newFighterData['jumps'] = fighter.jumps;
  newFighterData['jumpStrength'] = fighter.jumpStrength;
  newFighterData['terminalVelocity'] = fighter.terminalVelocity;
  newFighterData['weight'] = fighter.weight;
  newFighterData['runSpeed'] = fighter.runSpeed;
  newFighterData['animationTime'] = fighter.animationTime;
  newFighterData['spriteWidth'] = fighter.spriteWidth;
  newFighterData['spriteHeight'] = fighter.spriteHeight;

  newFighterData['hurtboxes'] = {};
  for(var i in fighter.hurtboxes) {
    newFighterData['hurtboxes'][i] = {};
    for(var j in fighter.hurtboxes[i]) {
      newFighterData['hurtboxes'][i][j] = [];
      for(var k in fighter.hurtboxes[i][j]) {
        newFighterData['hurtboxes'][i][j][k] = [];
        newFighterData['hurtboxes'][i][j][k].push(fighter.hurtboxes[i][j][k][0]*fighter.spriteWidth + 0.5 - fighter.spriteWidth/2);
        newFighterData['hurtboxes'][i][j][k].push(fighter.hurtboxes[i][j][k][1]*fighter.spriteHeight + 0.5 - fighter.spriteHeight/2);
        newFighterData['hurtboxes'][i][j][k].push(fighter.hurtboxes[i][j][k][2]*fighter.spriteWidth + 0.5 - fighter.spriteWidth/2);
        newFighterData['hurtboxes'][i][j][k].push(fighter.hurtboxes[i][j][k][3]*fighter.spriteHeight + 0.5 - fighter.spriteHeight/2);
      }
    }
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
        newFighterData['hitboxes'][i][j][k].push(fighter.hitboxes[i][j][k].hitbox[0]*fighter.spriteWidth + 0.5 - fighter.spriteWidth/2);
        newFighterData['hitboxes'][i][j][k].push(fighter.hitboxes[i][j][k].hitbox[1]*fighter.spriteHeight + 0.5 - fighter.spriteHeight/2);
        newFighterData['hitboxes'][i][j][k].push(fighter.hitboxes[i][j][k].hitbox[2]*fighter.spriteWidth + 0.5 - fighter.spriteWidth/2);
        newFighterData['hitboxes'][i][j][k].push(fighter.hitboxes[i][j][k].hitbox[3]*fighter.spriteHeight + 0.5 - fighter.spriteHeight/2);
        if(newFighterData['attacks'][i][fighter.hitboxes[i][j][k].id]) {
          newFighterData['attacks'][i][fighter.hitboxes[i][j][k].id]['frames'][j].push(k);
        }
      }
    }
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
      newFighterData['effects'][i][j] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null};
      newFighterXEffect[i][j] = 0;
      newFighterYEffect[i][j] = 0;
      newFighterXVelEffect[i][j] = 0;
      newFighterYVelEffect[i][j] = 0;
      newFighterProjectile[i][j] = '';
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

        tempContext.drawImage(img, k*tempCanvas.width, newFighterSprite*tempCanvas.height, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);

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

    tempContext.drawImage(img, tempCanvas.width, newFighterSprite*tempCanvas.height, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);

    var img1 = new Image();
    img1.src = tempCanvas.toDataURL('image/png');
    imgs['new'][i]['stock'][0] = img1;
  }

  while(createFighterButtons.length != createFighterButtonsLength+Object.keys(imgs['new'][0][newFighterAction]).length) {
    if (createFighterButtons.length > createFighterButtonsLength+Object.keys(imgs['new'][0][newFighterAction]).length) {
      newFighterButtonRemove();
    } else {
      newFighterButton();
    }
  }
}

function downloadNewFighter() {
  var zip = new JSZip();
  var images = compileNewFighterImages()[0];

  var newFighterFolder = zip.folder(newFighterData['name']);
  zip.file(newFighterData['name'] + '.txt', encodeNewFighter());

  if(Object.keys(newFighterData['projectiles']).length > 0) {
    var newProjectileFolder = zip.folder('Projectiles');

    for(var i in newFighterData['projectiles']) {
      newProjectileFolder.file('projectile_' + i + '.txt', encodeNewProjectile(i));
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

function newFighterButton() {
  createFighterButtons.push(new Button((parseInt(createFighterButtons[createFighterButtons.length-1].id)+1).toString(), function() {return 0.59375*canvas.width;}, function() {return canvas.height/4+this.getHeight()*parseInt(this.id);}, function() {return 0.025*canvas.width;}, function() {return (canvas.height/2)/(createFighterButtons.length-createFighterButtonsLength);}, 3, function() {newFighterAnimationFrame = newFighterData['animationTime']*parseInt(this.id); newFighterFrame=this.id; if(newFighterData['effects'][newFighterAction] && newFighterData['effects'][newFighterAction][newFighterFrame] == null) {newFighterData['effects'][newFighterAction][newFighterFrame] = {'x': {'add': null, 'set': null, 'facing': 0}, 'y': {'add': null, 'set': null, 'facing': 0}, 'velX': {'add': null, 'set': null, 'facing': 0}, 'velY': {'add': null, 'set': null, 'facing': 0}, 'projectile': null}; newFighterXEffect[newFighterAction][newFighterFrame] = 0; newFighterYEffect[newFighterAction][newFighterFrame] = 0; newFighterXVelEffect[newFighterAction][newFighterFrame] = 0; newFighterYVelEffect[newFighterAction][newFighterFrame] = 0; newFighterProjectile[newFighterAction][newFighterFrame] = '';}}, function() {return true;}, function() {return ((newFighterFrame == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return [this.id];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return true;}));
}

function newProjectileButton() {
  let num = newFighterProjectiles;
  createFighterButtons.splice(createFighterButtons.length-3, 0, new Button('Projectile' + num.toString(), function() {return 0.40625*canvas.width-this.getWidth()*2;}, function() {return canvas.height/4 + (num-1)*canvas.height/24;}, function() {return 0.09375*canvas.width;}, function() {return canvas.height/24;}, 3, function() {newFighterAction=this.id; newFighterFrame=0; var largest=0; if(imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction]) {for(var i in Object.keys(imgs['new'][newFighterSprite][newFighterAction])) {if (parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i])>largest) {largest=parseInt(Object.keys(imgs['new'][newFighterSprite][newFighterAction])[i]);}}} while(createFighterButtons.length != createFighterButtonsLength+largest+1) {if (createFighterButtons.length > createFighterButtonsLength+largest+1) {newFighterButtonRemove();} else {newFighterButton();}} switchAttackInputs();}, function() {return true;}, function() {return ((newFighterAction == this.id) ? 'white' : 'rgba(210, 210, 210, 1)');}, function() {return [this.id.toString()];}, 'black', function() {return (canvas.width/85).toString() + 'px Arial';}, function() {return null;}, function() {return true;}));
}

function newFighterButtonRemove() {
  if (imgs && imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction] && imgs['new'][newFighterSprite][newFighterAction][parseInt(createFighterButtons[createFighterButtons.length-1].id)]) {
    imgs['new'][newFighterSprite][newFighterAction][parseInt(createFighterButtons[createFighterButtons.length-1].id)] = null;
  }

  if (newFighterFrame == parseInt(createFighterButtons[createFighterButtons.length-1].id)) {
    newFighterFrame = parseInt(createFighterButtons[createFighterButtons.length-1].id)-1;
  }

  createFighterButtons.splice(createFighterButtons.length-1, 1);
  newFighterAnimationFrame = (newFighterAnimationFrame)%(newFighterData['animationTime']*createFighterButtons.length-createFighterButtonsLength);
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
}

function render() {
  if (game && game != null) {
    
    var hitbox;
    if (stage) {
      var bgImg = new Image();
      bgImg.src = '/fd_background.png';
      context.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      var stageImg = new Image();
      stageImg.src = '/fd.png';
      context.drawImage(stageImg, 0.5*canvas.width - (0.7*canvas.width)/2, canvas.height*0.75 - 0.236*canvas.height, 0.7*canvas.width, 0.3467*canvas.height);
    }

    if (player) {

      numPlayer = 0;
      for (var drawPlayer in ((game.started) ? game.players : [player])) {
        numPlayer ++;
        var tempPlayer = ((game.started) ? game.players[drawPlayer] : player);
        drawFrame = Math.floor(tempPlayer.animationFrame/tempPlayer.fighter.animationTime).toString();
        spriteWidth = tempPlayer.fighter.spriteWidth*canvas.width;
        spriteHeight = tempPlayer.fighter.spriteHeight*canvas.height;

        if ((imgs['demo'] && demo) || (contains(Object.keys(imgs['fighters']), tempPlayer.fighter.name))) {
          var tempSheet = ((imgs['demo'] && demo) ? imgs['demo'][tempPlayer.sprite][tempPlayer.action] : imgs['fighters'][tempPlayer.fighter.name][tempPlayer.action]);
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
          var tempSheet = ((imgs['demo'] && demo) ? imgs['demo'][tempPlayer.sprite][projectile.name] : imgs['projectiles'][projectile.name]);
          drawProjectileFrame = Math.floor(projectile.frame/projectile.animationTime);
          if (projectile.facing == 'right') {
            context.drawImage(tempSheet, drawProjectileFrame*(tempSheet.width/projectile.frames), 0, tempSheet.width/projectile.frames, tempSheet.height, projectile.x*canvas.width, projectile.y*canvas.height, projectile.width*canvas.width, projectile.height*canvas.height);
          } else {
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.drawImage(tempSheet, drawProjectileFrame*(tempSheet.width/projectile.frames), 0, tempSheet.width/projectile.frames, tempSheet.height, canvas.width - projectile.x*canvas.width - projectile.width, projectile.y*canvas.height, projectile.width*canvas.width, projectile.height*canvas.height);
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
              context.drawImage(imgs['demo'][tempPlayer.sprite]['stock'], i*(canvas.width/60) + numPlayer*(canvas.width/(Object.keys(game.players).length+1)), 3.5*canvas.height/4, canvas.width/71.111111, canvas.height/45);
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
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(0, 0, 255, 1)';
            context.beginPath();
            context.rect(tempPlayer.x*canvas.width + hitbox[0]*spriteWidth, tempPlayer.y*canvas.height + hitbox[1]*spriteHeight, (hitbox[2] - hitbox[0])*spriteWidth, (hitbox[3] - hitbox[1])*spriteHeight);
            context.stroke();
            context.closePath();
          }

          for (var i in tempPlayer.fighter.hurtboxes[tempPlayer.action][drawFrame]) {
            var hitbox = ((tempPlayer.facing == 'left') ? flipHitbox(tempPlayer.fighter.hurtboxes[tempPlayer.action][drawFrame][i]) : tempPlayer.fighter.hurtboxes[tempPlayer.action][drawFrame][i]);
            context.lineWidth = 1;
            context.strokeStyle = 'rgba(255, 0, 0, 1)';
            context.beginPath();
            context.rect(tempPlayer.x*canvas.width + hitbox[0]*spriteWidth, tempPlayer.y*canvas.height + hitbox[1]*spriteHeight, (hitbox[2] - hitbox[0])*spriteWidth, (hitbox[3] - hitbox[1])*spriteHeight);
            context.stroke();
            context.closePath();
          }

          for (var i in tempPlayer.projectiles) {
            var projectile = tempPlayer.projectiles[i];
            drawProjectileFrame = Math.floor(projectile.frame/projectile.animationTime);
            for (var j in projectile.hitboxes[drawProjectileFrame]) {
              var hitbox = ((projectile.facing == 'left') ? flipHitbox(projectile.hitboxes[drawProjectileFrame][j]['hitbox']) : projectile.hitboxes[drawProjectileFrame][j]['hitbox']);
              context.strokeStyle = 'rgba(0, 0, 255, 1)';
              context.beginPath();
              context.rect(projectile.x*canvas.width + hitbox[0]*projectile.width*canvas.width, projectile.y*canvas.height + hitbox[1]*projectile.height*canvas.height, (hitbox[2] - hitbox[0])*projectile.width*canvas.width, (hitbox[3] - hitbox[1])*projectile.height*canvas.height);
              context.stroke();
              context.closePath();
            }
          }
        }
      }
    }

    if (!game.started) {
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width/1.85 + canvas.width/3.83, canvas.height);
      context.fillRect(canvas.width/1.85 + canvas.width/3.83 + canvas.width/19.2, 0, canvas.width - canvas.width/1.85 + canvas.width/3.83 + canvas.width/19.2, canvas.height);
      context.fillRect(canvas.width/1.85 + canvas.width/4, canvas.height/6 + canvas.height/50 + canvas.height/6.5, canvas.width/19.2 + canvas.width/80, canvas.height - canvas.height/6 + canvas.height/50 + canvas.height/6.5);
      context.fillRect(canvas.width/1.85 + canvas.width/3.83, 0, canvas.width/19.2, canvas.height/6 + canvas.height/50);

      context.fillStyle = 'black';
      context.textAlign = 'center';
      context.font = (canvas.width/160).toString() + 'px Arial';
      context.fillText('Try Me! (WASD + Arrow Keys)', canvas.width/1.85 + canvas.width/3.83 + canvas.width/38.4, canvas.height/6 + canvas.height/50 + canvas.height/5.87);
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
    context.lineWidth = 3;
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.font = (canvas.width/60).toString() + 'px Arial';
    context.fillText('Lobby', canvas.width/2, canvas.height/14);

    context.textAlign = 'left';
    context.font = (canvas.width/70).toString() + 'px Arial';
    context.fillText('Players:', canvas.width/4, canvas.height/3.3);

    context.font = (canvas.width/106.67).toString() + 'px Arial';
    var i = 0;
    for (var j in game.players) {
      context.textAlign = 'left';
      context.fillText(game.players[j].name, canvas.width/4, canvas.height/3.3 + canvas.height/38 + (canvas.height/50)*i);

      context.textAlign = 'right';
      if (game.players[j].sacrifices.length < numSacrifices) {
        context.fillText('Sacrifices Needed: ' + (numSacrifices - game.players[j].sacrifices.length).toString(), canvas.width/4 - canvas.width/80 - canvas.width/75, canvas.height/3.3 + canvas.height/38 + (canvas.height/50)*i);
      } else {
        context.fillText('Ready!', canvas.width/4 - canvas.width/80 - canvas.width/75, canvas.height/3.3 + canvas.height/38 + (canvas.height/50)*i);
      }

      if (game.host == game.players[j].id) {
        context.drawImage(imgs['menu']['host'], canvas.width/4 - canvas.width/80 - canvas.width/192, canvas.height/3.3 + canvas.height/35 + (canvas.height/50)*i - canvas.height/45, canvas.width/80, canvas.height/45);
      }

      i++;
    }

    context.lineWidth = 6;
    context.beginPath();
    context.rect(canvas.width/1.85, canvas.height/6, canvas.width/3, 2.5*canvas.height/4);
    context.stroke();
    context.closePath();

    context.textAlign = 'center';
    context.font = (canvas.width/80).toString() + 'px Arial';
    context.fillText('Sacrifices Needed: ' + (numSacrifices - player.sacrifices.length).toString(), canvas.width/1.85 + canvas.width/6, canvas.height/6 + canvas.height/10);

    context.font = (canvas.width/140).toString() + 'px Arial';
    context.fillText('Click on moves or stocks (lives) to sacrifice them. You will be unable to use them in the match.', canvas.width/1.85 + canvas.width/6, canvas.height/6 - canvas.height/108);
    context.fillText('Once everyone has completed their sacrifices, the game can begin', canvas.width/2, canvas.height/1.05);

    context.font = (canvas.width/100).toString() + 'px Arial';
    context.fillText('Aerial attacks', canvas.width/1.85 + canvas.width/24, canvas.height/6 + canvas.height/4.9);
    context.fillText('Ground attacks', canvas.width/1.85 + canvas.width/24, canvas.height/6 + canvas.height/1.85);

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

        if (player.sacrifices.includes(button.id)) {
          context.strokeStyle = 'red';
          context.lineWidth = 6;
          context.beginPath();
          context.moveTo(button.getX(), button.getY());
          context.lineTo(button.getX() + button.getWidth(), button.getY() + button.getHeight());
          context.moveTo(button.getX(), button.getY() + button.getHeight());
          context.lineTo(button.getX() + button.getWidth(), button.getY());
          context.stroke();
          context.closePath();
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
      context.fillRect(canvas.width/1.85 + canvas.width/75 + tempNameWidth + canvas.width/384 + context.measureText('Name: ').width, canvas.height/6 + canvas.height/40, canvas.width/128, canvas.height/43.2);
    }

    if (namingGame) {
      context.font = (canvas.width/106.67).toString() + 'px Arial';
      context.fillStyle = 'black';
      context.fillRect(canvas.width/2 + context.measureText(tempGameName).width/2 + canvas.width/640, canvas.height/10, canvas.width/128, canvas.height/43.2);
    }

    var nope = 0;
    for (var i in cantDoThat) {
      nope = Math.max(nope, cantDoThat[i]);
    }
    context.strokeStyle = 'rgba(255, 0, 0, ' + (nope/100).toString() + ')';
    context.lineWidth = 6;
    context.beginPath();
    context.moveTo(canvas.width/1.85 + canvas.width/3.83, canvas.height/6 + canvas.height/35);
    context.lineTo(canvas.width/1.85 + canvas.width/3.83 + canvas.width/19.2, canvas.height/6 + canvas.height/35 + canvas.height/7.2);
    context.moveTo(canvas.width/1.85 + canvas.width/3.83, canvas.height/6 + canvas.height/35 + canvas.height/7.2);
    context.lineTo(canvas.width/1.85 + canvas.width/3.83 + canvas.width/19.2, canvas.height/6 + canvas.height/35);
    context.stroke();
    context.closePath();
    for (var i in cantDoThat) {
      cantDoThat[i] = Math.max(cantDoThat[i]-3, 0);
    }
    for (var i in canDoThat) {
      canDoThat[i] = Math.max(canDoThat[i]-3, 0);
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
          context.fillText(Object.keys(gamez[lobbyButtons[i].id].players).length + '/' + maxPlayers + ' Players', 2*canvas.width/5 + canvas.width/12.4, canvas.height/6 + i*(canvas.height/27) + canvas.height/70);      
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

                if(newFighterData['effects'][newFighterAction]) {
                  newFighterData['effects'][newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] =
                    {'x': {'add': null, 'set': null, 'facing': 0},
                    'y': {'add': null, 'set': null, 'facing': 0},
                    'velX': {'add': null, 'set': null, 'facing': 0},
                    'velY': {'add': null, 'set': null, 'facing': 0},
                    'projectile': null};
                  newFighterXEffect[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = 0;
                  newFighterYEffect[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = 0;
                  newFighterXVelEffect[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = 0;
                  newFighterYVelEffect[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = 0;
                  newFighterProjectile[newFighterAction][createFighterButtons.length - createFighterButtonsLength - 1] = '';
                }
              }
            }
            
            newFighterFrame = (i-1).toString();
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
        if(files[i].type == 'text/plain' && !files[i].name.startsWith("projectile_")) {
          var fileReader = new FileReader();
          fileReader.onload = function(fileLoadedEvent) {
            newFighterText = splitData(fileLoadedEvent.target.result);
            newFighterData = createFighterFromText(newFighterText);
          };
          fileReader.readAsText(files[i], "UTF-8");
          break;
        }
      }

      for(let i in Object.keys(files)) {
        if(files[i].type == 'image/png' && (contains(actions, files[i].name.substring(0, files[i].name.length - 4)) || files[i].name.substring(0, files[i].name.length - 4) == 'stock')) {
          var fileReader = new FileReader();
          fileReader.onload = function(fileLoadedEvent) {
            if(!imgs['new']) {
              imgs['new'] = {0: {}};
            }

            var actionFrames = 0;
            var tempSplit = newFighterText['frames'].split('|');
            if(tempSplit && contains(tempSplit, files[i].name.substring(0, files[i].name.length - 4))) {
              for (var a in tempSplit) {
                if(tempSplit[a] == files[i].name.substring(0, files[i].name.length - 4)) {
                  actionFrames = parseInt(tempSplit[parseInt(a)+1]);
                }
              }
            }

            var img = new Image();
            img.src = fileLoadedEvent.target.result;
            img.onload = function() {imgs['new'][0][files[i].name.substring(0, files[i].name.length - 4)] = ((actionFrames > 1) ? breakUpSpriteSheet(img, actionFrames) : {0: img});};
          };
          fileReader.readAsDataURL(files[i]);
        }
      }
    }

    if (imgs['new'] && imgs['new'][newFighterSprite] && imgs['new'][newFighterSprite][newFighterAction] && imgs['new'][newFighterSprite][newFighterAction][newFighterFrame]) {
      context.drawImage(imgs['new'][newFighterSprite][newFighterAction][newFighterFrame], canvas.width/2 - (newFighterData['spriteWidth']*canvas.width)/2, canvas.height/2 - (newFighterData['spriteHeight']*canvas.height)/2, newFighterData['spriteWidth']*canvas.width, newFighterData['spriteHeight']*canvas.height);
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

    context.textAlign = 'center';
    context.fillStyle = 'black';
    context.font = '16px Arial';
    context.fillText('Width', canvas.width/3.2 + canvas.width/20, canvas.height/5.82);
    context.fillText('Height', canvas.width/3.2 + canvas.width/20, canvas.height/4.62);

    context.font = canvas.width/68 + 'px Arial';
    context.fillText('Attacks', canvas.width/1.09, canvas.height/20);

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

    context.lineWidth = 2;
    context.beginPath();
    context.rect(0.651*canvas.width, 2.2*canvas.height/4, canvas.width/6, canvas.height/3.3);
    context.stroke();
    context.closePath();

    context.textAlign = 'center';
    context.fillText(((newFighterData['effects'][newFighterAction]) ? 'Effects' : ((newFighterAction != 'stock') ? 'Projectile Properties' : '')), 0.651*canvas.width + canvas.width/12, 2.15*canvas.height/4);

    if(newFighterData['effects'][newFighterAction]) {
      context.textAlign = 'left';
      context.font = canvas.width/100 + 'px Arial';
      context.fillText('X Position', 0.651*canvas.width + canvas.width/200, 2.32*canvas.height/4);
      context.fillText('Y Position', 0.651*canvas.width + canvas.width/200, 2.54*canvas.height/4);
      context.fillText('X Velocity', 0.651*canvas.width + canvas.width/200, 2.76*canvas.height/4);
      context.fillText('Y Velocity', 0.651*canvas.width + canvas.width/200, 2.98*canvas.height/4);
      context.fillText('Projectile', 0.651*canvas.width + canvas.width/200, 3.2*canvas.height/4);

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

      context.textAlign = 'center';
      context.font = canvas.width/160 + 'px Arial';
      context.fillText('Loading an existing fighter will not load its effects', 0.651*canvas.width + canvas.width/12, 0.845*canvas.height);
    } else if(newFighterAction != 'stock') {
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

    context.font = canvas.width/160 + 'px Arial';
    context.fillText('Don\'t load Tony', 0.073*canvas.width, 0.93*canvas.height);

    context.textAlign = 'left';
    context.font = canvas.width/100 + 'px Arial';
    context.fillText('Name', 0.015*canvas.width, 0.195*canvas.height);
    context.fillText('Jumps', 0.015*canvas.width, 0.23*canvas.height);
    context.fillText('Jump Strength', 0.015*canvas.width, 0.265*canvas.height);
    context.fillText('Fall Speed', 0.015*canvas.width, 0.3*canvas.height);
    context.fillText('Weight', 0.015*canvas.width, 0.335*canvas.height);
    context.fillText('Run Speed', 0.015*canvas.width, 0.37*canvas.height);


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
  }

  if (!(ping === undefined)) {
    context.fillStyle = 'rgba(50, 50, 50, 0.6)';
    context.textAlign = 'right';
    context.font = 'bold ' + (canvas.width/160).toString() + 'px Arial';
    context.fillText('Ping: ' + ping, canvas.width/1.01, canvas.height/90);
  }
}

socket.on('data', function(getData, getFighters) {
  data = getData;
  fighters = getFighters;
  loadImages();

  var ind = 0;
  for(var i in fighters) {
    let num = ind;
    let j = i;
    createFighterButtons.unshift(new Button('Load' + fighters[i].name, function() {return 0.015*canvas.width;}, function() {return 0.94*canvas.height - (num+1)*this.getHeight();}, function() {return canvas.width/7 - 0.02*canvas.width;}, function() {return canvas.height/20;}, 2, function() {newFighterLoadExisting(j); fighterSelect = false;}, function() {return true;}, function() {return 'white';}, function() {return [fighters[j].name];}, 'black', function() {return (canvas.width/70).toString() + 'px Arial';}, function() {return null;}, function() {return fighterSelect;}));
    createFighterButtonsLength += 1;
    ind += 1;
  }
});

socket.on('cantDoThat', function(move) {
  cantDoThat[move] = 100;
});

socket.on('canDoThat', function(move) {
  canDoThat[move] = 100;
});

socket.on('state', function(gameObject) {
  player = gameObject.players[socket.id];
  stage = gameObject.stage;
  game = gameObject;
  gamez = null;
});

socket.on('games', function(games) {
  gamez = games;
  player = null;
  stage = null;
  game = null;

  for (var j=lobbyButtons.length-1; j>=lobbyButtonsLength; j--) {
    lobbyButtons.splice(j, 1);
  }

  for (var i in games) {
    if (games[i].visible) {
      lobbyButtons.push(new Button(i.toString(), function() {return 3*canvas.width/5 - this.getWidth() - canvas.width/480;}, function() {for (var k=0; k<lobbyButtons.length; k++) {if (lobbyButtons[k].id == this.id) {break;}} return canvas.height/6 + k*(this.getHeight()*2);}, function() {return canvas.width/20;}, function() {return canvas.height/54}, 1, function() {socket.emit('joinGame', this.id);}, function() {return !games[this.id].started && (Object.keys(games[this.id].players).length < maxPlayers);}, function() {return 'white';}, function() {return ['Join Game'];}, 'black', function() {return (canvas.width/137.1429).toString() + 'px Arial';}, function() {return null;}, function() {return true;}));
    }
  }
});

setInterval(function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  //context.clearRect(0, 0, canvas.width, canvas.height);

  if (player) {
    frame = Math.floor(player.animationFrame/player.fighter.animationTime).toString();
  }

  if (game && game != null && !game.started && preGameButtons.length == preGameButtonsLength) {
    for (var i in fighters) {
      preGameButtons.push(new Button('fighter' + i, function() {return canvas.width/1.85 + canvas.width/3.83 + canvas.width/19.2;}, function() {return canvas.height/6 + canvas.height/35 + parseInt(this.id.substring(7, 8))*this.getHeight();}, function() {return canvas.width/19.2;}, function() {return canvas.height/7.2}, 3, function() {fighterSelect = false; socket.emit('changeFighter', parseInt(this.id.substring(7, 8)));}, function() {return fighterSelect;}, function() {return 'white';}, function() {return [];}, 'black', function() {return (canvas.width/106.67).toString() + 'px Arial';}, function() {
        tempSheet = imgs['fighters'][fighters[this.id.substring(7)].name]['idle'];
        context.drawImage(tempSheet, frame*(tempSheet.width/fighters[this.id.substring(7)].frames['idle']), 0, tempSheet.width/fighters[this.id.substring(7)].frames['idle'], tempSheet.height/fighters[this.id.substring(7)].sprites, this.getX(), this.getY(), ((fighters[this.id.substring(7)].spriteWidth*canvas.width > this.getWidth() || fighters[this.id.substring(7)].spriteHeight*canvas.height > this.getHeight()) ? this.getWidth() : fighters[this.id.substring(7)].spriteWidth*canvas.width), ((fighters[this.id.substring(7)].spriteWidth*canvas.width > this.getWidth() || fighters[this.id.substring(7)].spriteHeight*canvas.height > this.getHeight()) ? this.getHeight() : fighters[this.id.substring(7)].spriteHeight*canvas.height));
        return null;}, function() {return fighterSelect;}));
    }
  }


  if (game && game != null && !game.started) {
    for (var i=preGameButtons.length-1; i>preGameButtonsLength+fighters.length-1; i--) {
      preGameButtons.splice(i, 1);
    }

    var a = 1;
    for (var i in game.players) {
      if (game.players[i].id != game.host) {
        preGameButtons.push(new Button(game.players[i].id, function() {return canvas.width/4 - canvas.width/80 - canvas.width/192;}, function() {return canvas.height/3.3 + canvas.height/35 + (canvas.height/50)*this.textColor - canvas.height/25;}, function() {return canvas.width/80;}, function() {return canvas.height/45}, 0.01, function() {socket.emit('kickPlayer', this.id);}, function() {return true;}, function() {return 'rgba(255, 255, 255, 0)';}, function() {return [];}, a.toString(), function() {return '18px Arial';}, function() {return '/static/kick.png';}, function() {return (game.host == player.id);}));
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
    newFighterFrame = Math.floor(newFighterAnimationFrame/newFighterData['animationTime']);
    newFighterAnimationFrame = (newFighterAnimationFrame + 1)%(newFighterData['animationTime']*(createFighterButtons.length-createFighterButtonsLength));
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

    } else if (newFighterBoxSelected[0] != null && Math.abs(event.clientX - newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0]*canvas.width) < canvas.width/180) {
        if (newFighterBoxSelected[0] != null && Math.abs(event.clientY - newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1]*canvas.height) < canvas.height/90) {
          cornerSelected = [0, 1];
        } else if (newFighterBoxSelected[0] != null && Math.abs(event.clientY - newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3]*canvas.height) < canvas.height/90) {
          cornerSelected = [0, 3];
        }
    } else if (newFighterBoxSelected[0] != null && Math.abs(event.clientX - newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2]*canvas.width) < canvas.width/180) {
      if (newFighterBoxSelected[0] != null && Math.abs(event.clientY - newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1]*canvas.height) < canvas.height/90) {
          cornerSelected = [2, 1];
        } else if (newFighterBoxSelected[0] != null && Math.abs(event.clientY - newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3]*canvas.height) < canvas.height/90) {
          cornerSelected = [2, 3];
        }
    } else if (newFighterBoxSelected[0] != null && event.clientX < newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2]*canvas.width && event.clientX > newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0]*canvas.width && event.clientY < newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3]*canvas.height && event.clientY > newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1]*canvas.height) {
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
    if (newFighterDraw.substring(0, 10) == 'hitboxDraw') {
      letters = 10;
      drawStyle = 'hitboxes';
    } else if (newFighterDraw.substring(0, 11) == 'hurtboxDraw') {
      letters = 11;
      drawStyle = 'hurtboxes';
    }

    if (drawStyle != '' && (newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][0]*canvas.width != event.clientX || newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][1]*canvas.height != event.clientY)) {
      if (newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][0] > newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][2]) {
        var temp = newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][0];
        newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][0] = newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][2];
        newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][2] = temp;
      }

      if (newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][1] > newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][3]) {
        var temp = newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][1];
        newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][1] = newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][3];
        newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][3] = temp;
      }

      newFighterDraw = '';
    } else if (cornerSelected[0] != null && cornerSelected[1] != null) {
      if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0] > newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2]) {
        var temp = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0];
        newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0] = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2];
        newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2] = temp;
      }

      if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1] > newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3]) {
        var temp = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1];
        newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1] = newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3];
        newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3] = temp;
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
      newFighterData['animationTime'] = parseFloat(tempAnimationTime);
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

    if(namingProjectile && tempProjectile != '') {
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

    if(namingProjectileName && tempProjectileName != '' && !contains(Object.keys(newFighterData['projectiles']), tempProjectileName) && !contains(Object.keys(newFighterData['effects']), tempProjectileName) && isNaN(tempProjectileName) && !createFighterButtonIDExists(tempProjectileName)) {
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
            }
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
  if (newFighterDraw.substring(0, 10) == 'hitboxDraw') {
    letters = 10;
    drawStyle = 'hitboxes';
  } else if (newFighterDraw.substring(0, 11) == 'hurtboxDraw') {
    letters = 11;
    drawStyle = 'hurtboxes';
  }

  if (drawStyle != '') {
    newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][2] = event.clientX/canvas.width;
    newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][3] = event.clientY/canvas.height;

    if (event.clientX < 0.40625*canvas.width) {
      newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][2] = 0.40625;
    } else if (event.clientX > 0.59375*canvas.width) {
      newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][2] = 0.59375;
    }

    if (event.clientY < canvas.height/4) {
      newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][3] = 0.25;
    } else if (event.clientY > 3*canvas.height/4) {
      newFighterData[drawStyle][newFighterAction][newFighterFrame][newFighterDraw.substring(letters)][3] = 0.75;
    }
  } else if (cornerSelected[0] != null && cornerSelected[1] != null) {
    newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[0]] += (event.clientX - mouseX)/canvas.width;
    newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[1]] += (event.clientY - mouseY)/canvas.height;

    if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[0]] < 0.40625) {
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[0]] = 0.40625;
    } else if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[0]] > 0.59375) {
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[0]] = 0.59375;
    }

    if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[1]] < 0.25) {
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[1]] = 0.25;
    } else if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[1]] > 0.75) {
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][cornerSelected[1]] = 0.75;
    }
  } else if (dragging) {
    newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0] += (event.clientX - mouseX)/canvas.width;
    newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2] += (event.clientX - mouseX)/canvas.width;
    newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1] += (event.clientY - mouseY)/canvas.height;
    newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3] += (event.clientY - mouseY)/canvas.height;

    if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0] < 0.40625) {
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2] = 0.40625+(newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2]-newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0]);
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0] = 0.40625;
    } else if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2] > 0.59375) {
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0] = 0.59375+(newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][0]-newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2]);
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][2] = 0.59375;
    }

    if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1] < 0.25) {
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3] = 0.25+(newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3]-newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1]);
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1] = 0.25;
    } else if (newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3] > 0.75) {
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1] = 0.75+(newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][1]-newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3]);
      newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame][newFighterBoxSelected[0]][3] = 0.75;
    }
  }

  if (selectedSlider != null) {
    selectedSlider.setValue(Math.max(Math.min((event.clientX - selectedSlider.getX())/selectedSlider.getLineWidth(), 1), 0));
  }

  mouseX = event.clientX;
  mouseY = event.clientY;
});

document.addEventListener('click', function(event) {
  if (selectedSlider == null) {
    
  }
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
      } else if(newFighterBoxSelected[0] != null) {
        newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame].splice([newFighterBoxSelected[0]], 1);
        newFighterBoxSelected[0] = null;
        newFighterBoxSelected[1] = '';
      }
      break;
    case 46: // Delete
      if(newFighterBoxSelected[0] != null) {
        newFighterData[newFighterBoxSelected[1]+'es'][newFighterAction][newFighterFrame].splice([newFighterBoxSelected[0]], 1);
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
        newFighterData['animationTime'] = parseFloat(tempAnimationTime);
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
      } else if((namingProjectile != -1) && tempProjectile != '') {
        newFighterProjectile[newFighterAction][newFighterFrame] = tempProjectile;
        tempProjectile = '';
        newFighterData['effects'][newFighterAction][newFighterFrame]['projectile'] = newFighterProjectile[newFighterAction][newFighterFrame];
      } else if(namingProjectileName && tempProjectileName != '' && !contains(Object.keys(newFighterData['projectiles']), tempProjectileName) && !contains(Object.keys(newFighterData['effects']), tempProjectileName) && isNaN(tempProjectileName) && !createFighterButtonIDExists(tempProjectileName)) {
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