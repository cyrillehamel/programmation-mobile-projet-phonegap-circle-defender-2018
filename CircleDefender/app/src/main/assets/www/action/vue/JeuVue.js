var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    return function()
    {
        var stagePrincipal;

        var arcDeCercle;

        var positionJoueurX, positionJoueurY;

        var arcDeCercleEstEnHaut = true;

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




            ///// GESTURE
            var myElement = document.getElementById('demo-canvas');

// create a simple instance
// by default, it only adds horizontal recognizers
            var mc = new Hammer(myElement);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
            mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
            mc.on("panleft panright panup pandown tap press", function(ev) {
                myElement.textContent = ev.type +" gesture detected.";
                console.log("Test gesture");
                stagePrincipal.removeChild(arcDeCercle);
                arcDeCercleEstEnHaut = !arcDeCercleEstEnHaut;
                afficherArcDeCercle(arcDeCercleEstEnHaut);
            });
        };


        this.afficher = function()
        {
            afficherCercleJoueur();
            afficherArcDeCercle(arcDeCercleEstEnHaut);
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

        function afficherArcDeCercle(booleen){
            arcDeCercle = new createjs.Shape();

            arcDeCercle.graphics.beginStroke("teal").arc(positionJoueurX, positionJoueurY, 25, 0, Math.PI, booleen);
            /*arcDeCercle.x = positionJoueurX;
            arcDeCercle.y = positionJoueurY;*/

            stagePrincipal.addChild(arcDeCercle);
        };
        
        function afficherEnnemis() {

            circle.graphics.beginFill("Crimson").drawCircle(0, 0, 10);

            var randomGaucheDroite = Math.floor(Math.random()*2);
            var randomBasHaut = Math.floor(Math.random()*2);

            var positionJoueurXModifiee = positionJoueurX;
            var positionJoueurYModifiee = positionJoueurY;

            // Quart haut gauche
            if((randomGaucheDroite===0) && (randomBasHaut===0)){
            	circle.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
            	circle.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);

            	positionJoueurXModifiee -= 23;
            	positionJoueurYModifiee -= 23;
            }
            // Quart haut droite
            else if ((randomGaucheDroite===1) && (randomBasHaut===0)){
            	circle.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 25)+1)+(positionJoueurX - 25));
            	circle.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);

                positionJoueurXModifiee += 23;
                positionJoueurYModifiee -= 23;
            }
            // Quart bas gauche
            else if ((randomGaucheDroite===0) && (randomBasHaut===1)){
            	circle.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
            	circle.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 25)+1)+(positionJoueurY - 25));

                positionJoueurXModifiee -= 23;
                positionJoueurYModifiee += 23;
            }
            // Quart bas droite
            else {
				circle.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 25)+1)+(positionJoueurX - 25));
            	circle.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 25)+1)+(positionJoueurY - 25));

                positionJoueurXModifiee += 23;
                positionJoueurYModifiee += 23;
            }

            stagePrincipal.addChild(circle);

            createjs.Tween.get(circle, {loop: true})
                .to({x:positionJoueurXModifiee, y: positionJoueurYModifiee}, 2000, createjs.Ease.linear); // 25 = rayon du cercle Joueur
        };

        function sleep(ms) {
  			return new Promise(resolve => setTimeout(resolve, ms));
		};
    
        initialiser();

    };

})();

