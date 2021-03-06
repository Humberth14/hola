function SpaceShip(scene, time, viewportSize, scale, audioContext, player,colour,shipSelected){
	"use strict";
//Se define el vector momento que permitira realizar los giros
var shipMomentum = new THREE.Vector3(0,0,0);
var invincible = false;
var invincibleTime = 0;
//tiempo de actualizacion de la nave
var lastTime = time;
var timeDelta;
function updateTime(t){
if(lastTime == t) return;
else{
timeDelta = (t - lastTime) / 1000;
lastTime = t;
}
}
//escape de la nave
var showExhaust = false;
//ultimo momento de disparo
var lastShot = 0;
var shipMaterial = new THREE.LineBasicMaterial( { color: colour} );
var shipGeometry = new THREE.Geometry();
var exhaustGeometry = new THREE.Geometry();
switch(shipSelected){
case 1:
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
shipGeometry.vertices.push(new THREE.Vector3(2,-3,0));
shipGeometry.vertices.push(new THREE.Vector3(1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-2,-3,0));
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
break;
case 2:
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
shipGeometry.vertices.push(new THREE.Vector3(1,2,0));
shipGeometry.vertices.push(new THREE.Vector3(1,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(2,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-2,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,2,0));
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
break;
case 3:
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
shipGeometry.vertices.push(new THREE.Vector3(1,0,0));
shipGeometry.vertices.push(new THREE.Vector3(2,1,0));
shipGeometry.vertices.push(new THREE.Vector3(2,0,0));
shipGeometry.vertices.push(new THREE.Vector3(1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-2,0,0));
shipGeometry.vertices.push(new THREE.Vector3(-2,1,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,0,0));
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
break;
case 4:
shipGeometry.vertices.push(new THREE.Vector3(0,2,0));
shipGeometry.vertices.push(new THREE.Vector3(1,3,0));
shipGeometry.vertices.push(new THREE.Vector3(1,0,0));
shipGeometry.vertices.push(new THREE.Vector3(2,0,0));
shipGeometry.vertices.push(new THREE.Vector3(1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-2,0,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,0,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,3,0));
shipGeometry.vertices.push(new THREE.Vector3(0,2,0));
break;
case 5:
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
shipGeometry.vertices.push(new THREE.Vector3(2,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(1,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(-2,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
break;
case 6:
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
shipGeometry.vertices.push(new THREE.Vector3(1,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(2,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(2,-3,0));
shipGeometry.vertices.push(new THREE.Vector3(1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,-2,0));
shipGeometry.vertices.push(new THREE.Vector3(-2,-3,0));
shipGeometry.vertices.push(new THREE.Vector3(-2,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(-1,-1,0));
shipGeometry.vertices.push(new THREE.Vector3(0,3,0));
break;
}
//crear la geometria del escape
exhaustGeometry.vertices.push(new THREE.Vector3(1,-2,0));
exhaustGeometry.vertices.push(new THREE.Vector3(0,-4,0));
exhaustGeometry.vertices.push(new THREE.Vector3(-1,-2,0));
 //juntar escape y nave
var spaceShip = new THREE.Line(shipGeometry,shipMaterial,THREE.LineStrip);
var shipExhaust = new THREE.Line(exhaustGeometry, new THREE.LineBasicMaterial( { color: 0xffff00} ), THREE.LineStrip);
//escalar la nave y el escape
spaceShip.position.set(0,0,750);
spaceShip.scale.set(scale,scale,1);
shipExhaust.position.set(0,0,0);
shipExhaust.scale.set(scale,scale,1);
scene.add(spaceShip);
scene.add(shipExhaust);
//inicializar sonidos
var shotBuffer = null;
var thrustBuffer = null;
function loadSounds(i){
var request = new XMLHttpRequest();
if(i == 0)request.open('GET', "Sounds/Cuack.mp3", true);
 if(i == 1)request.open('GET', "Sounds/Pedo.wav", true);
request.responseType = 'arraybuffer';
request.onload = function() {
audioContext.decodeAudioData(request.response, function(buffer) {
if(i == 0)shotBuffer = buffer;
  if(i == 1)thrustBuffer = buffer;
});
}
request.send();
}
if(player){
 loadSounds(0);
loadSounds(1);
 }
//funciones que obtienen cada componente del vector v para generar las animaciones
this.setPosition = function(v){
spaceShip.position.set(v.x,v.y,v.z);
shipExhaust.position.set(v.x,v.y,v.z);
}
this.getX=function(){
var x=this.position.x
return x;
}
this.getY=function(){
var y=this.position.y;
return y;
}
this.setRotation = function(v){
spaceShip.rotation.z = v.z;
shipExhaust.rotation.z = v.z;
}
this.setMomentum = function(v){
shipMomentum.copy(v);
}
this.clear = function(){
scene.remove(spaceShip);
scene.remove(shipExhaust);
}
this.setInvincible = function(){
invincible = true;
}
//funcion que evita ser destruido despues de cada reinicio
this.getInvincible = function(t){
updateTime(t);
if(invincible){
invincibleTime += timeDelta;
if(invincibleTime >= 5){
invincible = false;
invincibleTime = 0;
}
}
return invincible;
}
//funciones de rotacion
this.rotateLeft = function(t){
updateTime(t);
spaceShip.rotation.z += 6 * timeDelta;
shipExhaust.rotation.z += 6 * timeDelta;
}
this.rotateRight = function(t){
updateTime(t);
spaceShip.rotation.z -= 6 * timeDelta;
shipExhaust.rotation.z -= 6 * timeDelta;
}
//Sonido del escape segun lo que avance
var lastThrustTime = 0;
 this.goForward = function(t){
 updateTime(t);
var forwardVector = new THREE.Vector3(0, 10 * timeDelta, 0);
var rotationMatrix = new THREE.Matrix4();
//matrices de rotacion para solo variar un parametro en el movimiento
rotationMatrix.makeRotationFromEuler(spaceShip.rotation);
forwardVector.applyMatrix4(rotationMatrix);
shipMomentum.add(forwardVector);
//sonido del escape
if(lastTime - lastThrustTime > 250){
lastThrustTime = lastTime;
var thrustSource = audioContext.createBufferSource();
thrustSource.buffer = thrustBuffer;
thrustSource.connect(audioContext.destination);
thrustSource.start(0);
}
//evitar que la nave se dispare en velocidad
if(shipMomentum.x > 5) shipMomentum.x = 5;
 if(shipMomentum.x < -5) shipMomentum.x = -5;
 if(shipMomentum.y > 5) shipMomentum.y = 5;
 if(shipMomentum.y < -5) shipMomentum.y = -5;
 //mostrar escape a la vez del movimiento
showExhaust = true;
shipExhaust.position.z = 1;
}
//funcion de disparo con base en el tiempo de presion de la barra
this.shoot = function(t, held, shipSelected){
updateTime(t);
var shotdelay = held ? 350-(300-50*shipSelected) : 100;
var shotSource = audioContext.createBufferSource();
shotSource.buffer = shotBuffer;
shotSource.connect(audioContext.destination);
if(lastTime - lastShot > shotdelay){
lastShot = lastTime;
var b = new Bullet(spaceShip.position, spaceShip.rotation, scale+(-0.6*shipSelected+3.6), scene, lastTime, viewportSize,colour);
shotSource.start(0);
 return b;
}
}
this.draw = function(t){
updateTime(t);
if(showExhaust) shipExhaust.position.z = 1;
else shipExhaust.position.z = 1000;
showExhaust = false;
var tempMomentum = new THREE.Vector3();
tempMomentum.copy(shipMomentum);
tempMomentum.multiplyScalar(50 * timeDelta);
spaceShip.position.add(tempMomentum);
shipExhaust.position.add(tempMomentum);
//evitar que salga del tablero
if(spaceShip.position.x < viewportSize / -2){
spaceShip.position.x = viewportSize / 2;
shipExhaust.position.x = viewportSize / 2;
}
if(spaceShip.position.x > viewportSize / 2){ 
spaceShip.position.x = viewportSize / -2;
shipExhaust.position.x = viewportSize / -2;
}
if(spaceShip.position.y < viewportSize / -2){ 
spaceShip.position.y = viewportSize / 2;
shipExhaust.position.y = viewportSize / 2;
}
if(spaceShip.position.y > viewportSize / 2){ 
spaceShip.position.y = viewportSize / -2;
shipExhaust.position.y = viewportSize / -2;
}
}
this.getVertices = function(){
 var verts = [];
 for (var i = 0; i < spaceShip.geometry.vertices.length; i ++){
var Vec = new THREE.Vector3();
Vec.copy(spaceShip.geometry.vertices[i]);
Vec.applyAxisAngle(new THREE.Vector3(0,0,1), spaceShip.rotation.z);
Vec.add(spaceShip.position);
verts.push(Vec);
 }
return verts;
}
this.position=function(){
return spaceShip.position;
}
}
//funcion de movimiento y creacion de la bala
function Bullet(shipLocation, shipRotation, scale, scene, time, viewportSize,colour){
var startTime = time;
var lastTime = time;
var timeDelta;
function updateTime(t){
if(lastTime == t) return;
else{
timeDelta = (t - lastTime) / 1000;
lastTime = t;
}
}
var whiteMaterial = new THREE.MeshBasicMaterial( { color: colour } ); 
var bullet = new THREE.Mesh( new THREE.PlaneGeometry( 1 * scale, 1 * scale, 1, 1 ), whiteMaterial );
//vector que situara la bala en la nariz de la nave
var noseVector = new THREE.Vector3(0,3 * scale, 0);
var m = new THREE.Matrix4();
m.makeRotationFromEuler(shipRotation);
noseVector.applyMatrix4(m);
bullet.position.copy(shipLocation);
bullet.position.add(noseVector);
//rotar la bala con la rotacion de la nariz de la nave
bullet.rotation.copy(shipRotation);
scene.add(bullet);
//funcion de destruccion de la bala
this.destroy = function(){
scene.remove(bullet);
}
this.checkTime = function(t){
updateTime(t);
if(lastTime - startTime > 1000) return false;
else return true;
}
this.move = function(){
var movement = new THREE.Vector3(0,10,0);
var m = new THREE.Matrix4();
m.makeRotationFromEuler(bullet.rotation);
movement.applyMatrix4(m);
bullet.position.add(movement);
//checar si la bala salio de las fronteras
if(bullet.position.x < viewportSize / -2){
 bullet.position.x = viewportSize / 2;
}
if(bullet.position.x > viewportSize / 2){ 
bullet.position.x = viewportSize / -2;
}
if(bullet.position.y < viewportSize / -2){ 
bullet.position.y = viewportSize / 2;
}
 if(bullet.position.y > viewportSize / 2){ 
bullet.position.y = viewportSize / -2;
}
}
this.position = function(){
return bullet.position;
}
}
