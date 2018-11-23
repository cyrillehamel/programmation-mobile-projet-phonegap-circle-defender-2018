var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    console.log("x is " + window.screen.availHeight);
    console.log("y is " + window.screen.availWidth);
    // It works

    return function()
    {
        var stagePrincipal;

        var positionJoueurX, positionJoueurY;


        var initialiser = function(){
            document.getElementsByTagName("body")[0].innerHTML = pageJeuVue;

            var canvas = document.getElementById("demo-canvas");
            var ctx = canvas.getContext("2d");
            initialize();

            stagePrincipal = new createjs.Stage("demo-canvas");



           /* ctx.canvas.width  = window.screen.availWidth;
            ctx.canvas.height = window.screen.availHeight;
            positionJoueurX = (ctx.canvas.width / 2);
            positionJoueurY = (ctx.canvas.height / 2);*/


            console.log("initialiser : canvas width : " + ctx.canvas.width);
            console.log("initialiser : canvas height : " +  ctx.canvas.height);

            console.log("initialiser : canvas width : " + canvas.width);


            console.log("initialiser : posX : " + positionJoueurX);
            console.log("initialiser : posY : " + positionJoueurY);

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", stagePrincipal);
        };

        function initialize() {
            // Register an event listener to call the resizeCanvas() function
            // each time the window is resized.
            window.addEventListener('resize', resizeCanvas, false);
            // Draw canvas border for the first time.
            resizeCanvas();
        }

        function redraw() {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = '5';
            ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            redraw();
        }

        this.afficher = function()
        {
            afficherCercleJoueur();
            afficherArcDeCercle();
            afficherEnnemis();
        };
        
        function afficherCercleJoueur(){

            var circle = new createjs.Shape();
            circle.graphics.beginFill("Black").drawCircle(positionJoueurX, positionJoueurY, 18);
            circle.x = positionJoueurX;
            circle.y = positionJoueurY;
            stagePrincipal.addChild(circle);
            //stagePrincipal.update();
        };

        function afficherArcDeCercle(){
            var arcDeCercle = new createjs.Shape();

            arcDeCercle.graphics.beginStroke("teal").arc(positionJoueurX, positionJoueurY, 25, 0, Math.PI, true);
            arcDeCercle.x = positionJoueurX;
            arcDeCercle.y = positionJoueurY;

            stagePrincipal.addChild(arcDeCercle);
        };
        
        function afficherEnnemis() {

            var circle = new createjs.Shape();

            circle.graphics.beginFill("Crimson").drawCircle(positionJoueurX, positionJoueurY, 10);
            circle.x = positionJoueurX;
            circle.y = positionJoueurY;

            stagePrincipal.addChild(circle);

            createjs.Tween.get(circle, {loop: true})
                .to({x:188 , y: 400}, 2000, createjs.Ease.linear);

        };
    

        initialiser();

    };

})();

