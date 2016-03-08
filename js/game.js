var loadState = {
  preload: function(){
   // load platform graphics
   // game.load.image("platform-half", "res/platform-half.png");
   // game.load.image("platform-full", "res/platform-full.png");

   // load monsters spritesheet
   // game.load.spritesheet("monster", "res/monster.png", 16, 16);

   // load player spritesheet
   // game.load.spritesheet("player", "res/player.png", 16, 16);

   // load door spritesheet
   // game.load.spritesheet("door", "res/door.png", 16, 16);

   // load tilemap
   // game.load.tilemap("world", "res/world.json", null, Phaser.Tilemap.TILED_JSON);


  },
  create: function(){
    game.state.load("game");
  },
};

var gameState = {
  create: function(){
   // start physics
   game.physics.startSystem(Phaser.Physics.ARCADE);
   game.physics.arcade.gravity.y = 200;
   // create map
   this.map = game.add.tilemap("world");
   // add tile images
   this.map.addTilesetImage("", ""); 

   // create map layers

   this.layer = this.map.addLayer("platformLayer");
   this.layer.setCollision();
   this.layer.resizeWorld();

   // create player sprite
     // find spawn point in map
     // var x, y =  
   this.player = game.add.sprite(x, y, "player");
   game.physics.arcade.enable(this.player);

   // create enemies group
   this.enemies = game.add.group();
   this.enemies.physics.enableBody = true;
   this.enemies.createMultiple(100, "monster");

  },

  update: function(){
   // check collisions between enemies and platforms
   game.physics.arcade.collide(this.enemies, this.layer);
   // check collisions between player and platforms
   game.physics.arcade.collide(this.player, this.layer);

   // spawn monster logic

   // update monster logic

   // handle input

  },



};
