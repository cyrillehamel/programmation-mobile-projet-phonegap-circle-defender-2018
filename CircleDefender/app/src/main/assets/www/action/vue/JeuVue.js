var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    return function()
    {
        var stagePrincipal;

        var arcDeCercle;

        var positionJoueurX, positionJoueurY;

        var arcDeCercleEstEnHaut = true;
        var circleEnnemi1 = new createjs.Shape();
        var circleEnnemiAutres = new createjs.Shape();  
        
        circleEnnemi1.graphics.beginFill("Crimson").drawCircle(0, 0, 10);

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
            setInterval(
                function() 
                { 
                    stagePrincipal.removeChild(circleEnnemiAutres);
                    afficherEnnemis();
                },2000);
        };
        
        function afficherCercleJoueur(){

            var circleJoueur = new createjs.Shape();
            circleJoueur.graphics.beginFill("Black").drawCircle(positionJoueurX, positionJoueurY, 18);
            /*circleJoueur.x = positionJoueurX;
            circleJoueur.y = positionJoueurY;*/
            stagePrincipal.addChild(circleJoueur);
            //stagePrincipal.update();
        };

        function afficherArcDeCercle(booleen){
            arcDeCercle = new createjs.Shape();

            arcDeCercle.graphics.beginStroke("teal").arc(positionJoueurX, positionJoueurY, 25, 0, Math.PI, true);
            /*arcDeCercle.x = positionJoueurX;
            arcDeCercle.y = positionJoueurY;*/

            stagePrincipal.addChild(arcDeCercle);
        };
        
        function afficherEnnemis() {

            afficherEnnemi1();

            var chanceSpawnNouveau = Math.floor(Math.random()*10);
            if(chanceSpawnNouveau>=8){   
                afficherEnnemiAutres();
            }

        };

        function afficherEnnemi1(){
            var randomGaucheDroite = Math.floor(Math.random()*2);
            var randomBasHaut = Math.floor(Math.random()*2);

            if((randomGaucheDroite===0) && (randomBasHaut===0)){
                circleEnnemi1.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                circleEnnemi1.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);
            }
            // Quart haut droite
            else if ((randomGaucheDroite===1) && (randomBasHaut===0)){
                circleEnnemi1.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 25)+1)+(positionJoueurX - 25));
                circleEnnemi1.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);
            }
            // Quart bas gauche
            else if ((randomGaucheDroite===0) && (randomBasHaut===1)){
                circleEnnemi1.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                circleEnnemi1.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 25)+1)+(positionJoueurY - 25));                
            }
            // Quart bas droite
            else {
                circleEnnemi1.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 25)+1)+(positionJoueurX - 25));
                circleEnnemi1.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 25)+1)+(positionJoueurY - 25));
            }

            stagePrincipal.addChild(circleEnnemi1);

            createjs.Tween.get(circleEnnemi1, {loop: true})
                .to({x:positionJoueurX, y: positionJoueurY}, 2000, createjs.Ease.linear);

        };

        function afficherEnnemiAutres(){
            circleEnnemiAutres.graphics.beginFill("Green").drawCircle(0, 0, 10);

            var randomGaucheDroite = Math.floor(Math.random()*2);
            var randomBasHaut = Math.floor(Math.random()*2);


            if((randomGaucheDroite===0) && (randomBasHaut===0)){
                circleEnnemiAutres.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                circleEnnemiAutres.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);
            }
            // Quart haut droite
            else if ((randomGaucheDroite===1) && (randomBasHaut===0)){
                circleEnnemiAutres.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 25)+1)+(positionJoueurX - 25));
                circleEnnemiAutres.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);
            }
            // Quart bas gauche
            else if ((randomGaucheDroite===0) && (randomBasHaut===1)){
                circleEnnemiAutres.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                circleEnnemiAutres.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 25)+1)+(positionJoueurY - 25));                
            }
            // Quart bas droite
            else {
                circleEnnemiAutres.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 25)+1)+(positionJoueurX - 25));
                circleEnnemiAutres.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 25)+1)+(positionJoueurY - 25));
            }

            stagePrincipal.addChild(circleEnnemiAutres);

            createjs.Tween.get(circleEnnemiAutres, {loop: true})
                .to({x:positionJoueurX, y: positionJoueurY}, 2000, createjs.Ease.linear);

        };

        function sleep(ms) {
  			return new Promise(resolve => setTimeout(resolve, ms));
		};
    
        initialiser();

    };

})();

