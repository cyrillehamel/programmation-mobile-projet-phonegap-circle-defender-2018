var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    return function()
    {
        var stagePrincipal;

        var positionJoueurX, positionJoueurY;


        var initialiser = function(){

            var canvas = document.createElement('canvas');
            canvas.id = "demo-canvas";
            canvas.width = window.screen.availWidth;
            canvas.height = window.screen.availHeight;
            /*canvas.style.zIndex = 8;
            canvas.style.position = "center";
            canvas.style.border = "1px solid";*/

            positionJoueurX = (canvas.width / 2);
            positionJoueurY = (canvas.height / 2);

            document.getElementsByTagName("body")[0].innerHTML = pageJeuVue;
            document.body.appendChild(canvas);
            demoCanvas = document.getElementById("demo-canvas");

            //var ctx = canvas.getContext("2d");    Peut être utile !! NE PAS SUPPRIMER !!

            console.log("initialiser : canvas width : " + canvas.width);
            console.log("initialiser : canvas height : " +  canvas.height);
            console.log("initialiser : posX : " + positionJoueurX);
            console.log("initialiser : posY : " + positionJoueurY);

            stagePrincipal = new createjs.Stage("demo-canvas");
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", stagePrincipal);
        };


        this.afficher = function()
        {
            afficherCercleJoueur();
            afficherArcDeCercle();
            afficherEnnemis();
        };
        
        function afficherCercleJoueur(){

            var circle = new createjs.Shape();
            circle.graphics.beginFill("Black").drawCircle(0, 0, 18);
            circle.x = positionJoueurX;
            circle.y = positionJoueurY;
            stagePrincipal.addChild(circle);
            //stagePrincipal.update();
        };

        function afficherArcDeCercle(){
            var arcDeCercle = new createjs.Shape();

            arcDeCercle.graphics.beginStroke("teal").arc(0, 0, 25, 0, Math.PI, true);
            arcDeCercle.x = positionJoueurX;
            arcDeCercle.y = positionJoueurY;

            stagePrincipal.addChild(arcDeCercle);
        };
        
        function afficherEnnemis() {

            var circle = new createjs.Shape();

            circle.graphics.beginFill("Crimson").drawCircle(0, 0, 10);
            circle.x = 50;
            circle.y = 50;

            stagePrincipal.addChild(circle);

            createjs.Tween.get(circle, {loop: true})
                .to({x:positionJoueurX - 25, y: positionJoueurY -25}, 2000, createjs.Ease.linear); // 25 = rayon du cercle Joueur
        };
    

        initialiser();

    };

})();

