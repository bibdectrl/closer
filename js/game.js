var loadState = {
  preload: function(){
   // load platform graphics
   game.load.spritesheet("platforms", "res/platforms.png", 32, 32);
   game.load.spritesheet("doors", "res/doors.png", 64, 32);

   // load monsters spritesheet
   game.load.image("monster", "res/witch.png");

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
   game.physics.arcade.gravity.y = 300;
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
   var nEnemies = 10;
   this.enemies.createMultiple(nEnemies, "monster");
   for (var i = 0; i < nEnemies; i++){
     var e = this.enemies.getFirstDead();
     e.reset(game.rnd.between(0, 600), game.rnd.between(0, 2000));
     e.body.immovable = true;
     e.body.velocity.x = 100;
     e.falling = true;
   }
   game.camera.follow(this.player);

  },

  update: function(){
   // check collisions between enemies and platforms
   game.physics.arcade.collide(this.enemies, this.layer, function(e, l){  e.falling = false});
   // check collisions between player and platforms
   game.physics.arcade.collide(this.player, this.layer, function(p, l){ if (p.y > l.y) p.falling = false;});
   game.physics.arcade.collide(this.player, this.enemies, function(p, e){ p.falling = false;});
   // spawn monster logic

   // update monster logic
   this.enemies.forEach(function(enemy){
     if (enemy.body.velocity.y > 0) { enemy.falling = true; };
     if (! enemy.falling && (enemy.x < 0 || enemy.x > game.world.width - 32)){
       enemy.body.velocity.x *= -1;
     }
 
   });
  

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
   //if (this.player.body.velocity.y == 0 && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
   if (! this.player.falling && this.player.body.velocity.y == 0 && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.player.body.velocity.y = -350;
      this.player.falling = true;
   }
  },



};
