

$(function (){

  
  var canvas = $('#myCanvas')[0],

      
      c = canvas.getContext('2d'),
      
      
      n = 100,
      
      
      xMin = -10,
      xMax = 10,
      yMin = -10,
      yMax = 10,
      
      
      math = mathjs(),

      
      expr = '',

      
      defaultExpr = 'x',

      
      scope = {
        x: 0,
        t: 0
      },

      
      tree,

      
      time = 0,
      timeIncrement = 0.1;

  
  setExprFromHash();
  initTextField();
  startAnimation();

  
  window.addEventListener('hashchange', setExprFromHash);

 
  function setExprFromHash(){

    var hash = getHashValue();
    if(hash){
      setExpr(hash);
    } else {
      setExpr(defaultExpr);
      setHashValue(expr);
    }

   
    $('#inputField').val(expr);
  }

  
  function setExpr(newExpr){
    expr = newExpr;
    tree = math.parse(expr, scope);
  }

 
  function initTextField(){

    var input = $('#inputField');

   
    input.val(expr);
    
  
    input.keyup(function (event) {
      setExpr(input.val());
      setHashValue(expr);
    });
  }

 
  function startAnimation(){
    (function animloop(){
      requestAnimationFrame(animloop);
      render();
    }());
  }

 
  function render(){
  
    time += timeIncrement;
    
  
    drawCurve();
  }

  function drawCurve(){
   
    var i, 
        
       
        xPixel, yPixel,
        
       
        percentX, percentY,
        
 
        mathX, mathY;
    
 
    c.clearRect(0, 0, canvas.width, canvas.height);
    
   
    c.beginPath();

    
    for(i = 0; i < n; i++) {

      
      percentX = i / (n - 1);

     
      mathX = percentX * (xMax - xMin) + xMin;
      
      // console.log(mathX)
     
      mathY = evaluateMathExpr(mathX);
      // console.log(mathY)
     
      percentY = (mathY - yMin) / (yMax - yMin);
        // console.log(percentY)
      
      percentY = 1 - percentY;
      
    
      xPixel = percentX * canvas.width;
       // console.log(xPixel)
      yPixel = percentY * canvas.height;
       // console.log(yPixel)

      
      c.lineTo(xPixel, yPixel);
    }
    
    c.stroke();
  }

  
  function evaluateMathExpr(mathX){

   
    scope.x = mathX;
    scope.t = time;

    
    return tree.eval();
  }


 
  function getHashValue(){
    return location.hash.substr(1);
  }

 
  function setHashValue(value){
    return location.hash = value;
  }
});