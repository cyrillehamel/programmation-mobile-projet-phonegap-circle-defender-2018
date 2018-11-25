var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    return function()
    {
        var stagePrincipal;

        var positionJoueurX, positionJoueurY;

		var circle = new createjs.Shape();

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
            setInterval(function() { afficherEnnemis() }, 2000);
        };
        
        function afficherCercleJoueur(){

            var circle = new createjs.Shape();
            circle.graphics.beginFill("Black").drawCircle(positionJoueurX, positionJoueurY, 18);
            /*circle.x = positionJoueurX;
            circle.y = positionJoueurY;*/
            stagePrincipal.addChild(circle);
            //stagePrincipal.update();
        };

        function afficherArcDeCercle(){
            var arcDeCercle = new createjs.Shape();

            arcDeCercle.graphics.beginStroke("teal").arc(positionJoueurX, positionJoueurY, 25, 0, Math.PI, true);
            /*arcDeCercle.x = positionJoueurX;
            arcDeCercle.y = positionJoueurY;*/

            stagePrincipal.addChild(arcDeCercle);
        };
        
        function afficherEnnemis() {

            circle.graphics.beginFill("Crimson").drawCircle(0, 0, 10);

            var randomGaucheDroite = Math.floor(Math.random()*2);
            var randomBasHaut = Math.floor(Math.random()*2);

            // Quart haut gauche
            if((randomGaucheDroite===0) && (randomBasHaut===0)){
            	circle.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
            	circle.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);
            }
            // Quart haut droite
            else if ((randomGaucheDroite===1) && (randomBasHaut===0)){
            	circle.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 25)+1)+(positionJoueurX - 25));
            	circle.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);
            }
            // Quart bas gauche
            else if ((randomGaucheDroite===0) && (randomBasHaut===1)){
            	circle.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
            	circle.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 25)+1)+(positionJoueurY - 25));
            }
            // Quart bas droite
            else {
				circle.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 25)+1)+(positionJoueurX - 25));
            	circle.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 25)+1)+(positionJoueurY - 25));
            }

            stagePrincipal.addChild(circle);

            createjs.Tween.get(circle, {loop: true})
                .to({x:positionJoueurX, y: positionJoueurY}, 2000, createjs.Ease.linear); // 25 = rayon du cercle Joueur
        };

        function sleep(ms) {
  			return new Promise(resolve => setTimeout(resolve, ms));
		};
    
        initialiser();

    };

})();

