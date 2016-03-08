var loadState = {
  preload: function(){
   // load platform graphics
   game.load.spritesheet("platforms", "res/platforms.png", 32, 32);
   game.load.spritesheet("doors", "res/doors.png", 64, 32);

   // load monsters spritesheet
   game.load.image("monster", "res/monster.png");

   // load player spritesheet
   game.load.image("player", "res/player.png");

   // load door spritesheet
   // game.load.spritesheet("door", "res/door.png", 16, 16);

   // load tilemap
   game.load.tilemap("world", "res/world.json", null, Phaser.Tilemap.TILED_JSON);


  },
  create: function(){
    game.state.start("game");
  },
};

var gameState = {
  create: function(){
   game.stage.backgroundColor = '#787878';
   // start physics
   game.physics.startSystem(Phaser.Physics.ARCADE);
   game.physics.arcade.gravity.y = 200;
   // create map
   this.map = game.add.tilemap("world");
   // add tile images
   this.map.addTilesetImage("platforms", "platforms"); 
   this.map.addTilesetImage("doors", "doors");

   // create map layers

   this.layer = this.map.createLayer("platform-layer");
   this.map.setCollisionBetween(1, 4);
   //this.layer.setCollision();
   this.layer.resizeWorld();

   // create player sprite
     // find spawn point in map
     // var x, y = 
   var x = 400;
   var y = 400; 
   this.player = game.add.sprite(x, y, "player");
   game.physics.arcade.enable(this.player);

   // create enemies group
   this.enemies = game.add.group();
   this.enemies.enableBody = true;
   this.enemies.createMultiple(100, "monster");
   for (var i = 0; i < 100; i++){
     var monster = this.enemies.getFirstDead();
     monster.reset(game.rnd.between(0, 600), game.rnd.between(0, 2000));
   }
   game.camera.follow(this.player);

  },

  update: function(){
   // check collisions between enemies and platforms
   game.physics.arcade.collide(this.enemies, this.layer);
   // check collisions between player and platforms
   game.physics.arcade.collide(this.player, this.layer);

   // spawn monster logic

   // update monster logic

   // handle input
   if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
      this.player.body.velocity.x = -200;
   }
   else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      this.player.body.velocity.x = 200;
   } 
   else {
      this.player.body.velocity.x = 0;
   }
   if (this.player.body.velocity.y == 0 && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.player.body.velocity.y = -400;
   }
  },



};
