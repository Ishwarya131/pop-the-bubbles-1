document.getElementById('Restart').onclick=function () {
    window.location.reload();
  }
  var score=0;
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d');
  document.getElementById("play").addEventListener("click",function(){
    document.getElementById("intro").style.display="none";
    document.getElementById("canvas").style.display="block";
    setTimeout(function(){ timeout=true;}, 10000);
    
  });


  canvas.width = innerWidth
  canvas.height = innerHeight
  
  const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
  }
  
  const colors = ['#2185C5', '#800000', '#FFF6E5', '#FF7F66','#FFFF00','#00FF00']
  
  // Event Listeners
  addEventListener('mousedown', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    console.log(mouse);
  })
  
  addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init()
  })
  
  // Objects
  class circle {
    constructor(x, y,dx,dy, radius) {
      this.x = x
      this.y = y
      this.dx=dx;
      this.dy = dy
      this.radius = radius
      this.color=colors[Math.floor(Math.random() * colors.length) ];
    }
  
    draw() {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath()
    }
  
    update() {
      if (this.x+this.radius>innerWidth || this.x-this.radius<0){
        this.dx=-this.dx;
      }
      if (this.y+this.radius>innerHeight || this.y-this.radius<0){
        this.dy=-this.dy;
      }
      this.y+=this.dy;
      this.x+=this.dx;
      var xd=mouse.x-this.x;
      var yd=mouse.y-this.y;
      if (Math.sqrt( (xd)**2 +(yd)**2)<=this.radius){
          this.radius=0;
          score+=1;
      }
      this.draw();
    }
  
  }
  var n=20;
  setTimeout(n+=1,1000);
  var bubbleArray=[];
  for (var i=0;i<n;i++){
    var radius=Math.random()*30+10;
    var x=Math.random() * (innerWidth-radius*2)+radius;
    var y=Math.random() * (innerHeight-radius*2)+radius;
    var dy=(Math.random()+1);
    var dx=(Math.random()+1);
    bubbleArray.push(new circle(x,y,dx,dy,radius));
  }
  
  // Implementation
  
  function init() {
  
  
  }
  var a;
  function checkradius(ba){
    return (ba.radius==0);
  }
  function reload(){
    window.location.reload();
  }
  
  // Animation Loop
  function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    setTimeout(n+=1,10000);
    for (var i=0;i<bubbleArray.length;i++){
          bubbleArray[i].update();
    }
  
    if (bubbleArray.every(checkradius)==true  || timeout==true){
      canvas.style.display="none";
          bubbleArray=[]; // emptying array after game is over
      document.getElementById("final").style.display="block";
      document.getElementById("score").innerHTML="popped "+(score-1)+" bubbles";
    }
  
  
  }
  
  
  init()
  animate()
  
