var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    return function()
    {
        var canvas;
        var stagePrincipal;
        var arcDeCercle;
        var cercleJoueur;
        var bouclier;

        var debutBouclier, finBouclier;

        var debutInterval = 0;
        var testInterval;

        var positionJoueurX, positionJoueurY;

        var positionJoueurXPourCible, positionJoueurYPourCible;

        var arcDeCercleEstEnHaut = true;
        var cercleEnnemis = new createjs.Shape();
        var circleEnnemiAutres = new createjs.Shape();


        var initialiser = function(){

            cercleEnnemis.graphics.beginFill("Crimson").drawCircle(0, 0, 10);

            canvas = document.createElement('canvas');
            canvas.id = "demo-canvas";
            canvas.width = window.screen.availWidth;
            canvas.height = window.screen.availHeight;
            /*canvas.style.zIndex = 8;
            canvas.style.position = "center";
            canvas.style.border = "1px solid";*/

            positionJoueurX = Math.round(canvas.width / 2);
            positionJoueurY = Math.round(canvas.height / 2);

            document.getElementsByTagName("body")[0].innerHTML = pageJeuVue;
            document.body.appendChild(canvas);
            demoCanvas = document.getElementById("demo-canvas");

            //var ctx = canvas.getContext("2d");    Peut être utile !! NE PAS SUPPRIMER !!

            rendreGesturePourArcDeCercleDisponible();

            stagePrincipal = new createjs.Stage("demo-canvas");
            createjs.Ticker.setFPS(60);

            createjs.Ticker.addEventListener("tick", rafraichirScene);
        };


        this.afficher = function()
        {
            afficherCarreBouclier();

            afficherCercleJoueur();
            //afficherArcDeCercle(arcDeCercleEstEnHaut);
        };

        function rafraichirScene(evenement){
            carreBouclier.rotation++;

            if (debutInterval == 0){
                debutInterval = new Date().getTime();
                demarrerEnnemis();
            }

            testInterval = new Date().getTime();

            if (testerCollision()){
                createjs.Ticker.removeEventListener("tick", rafraichirScene);
                stagePrincipal.removeChild(cercleEnnemis);
                //plus cercel autres

            }
            else if (testInterval - debutInterval >= 1500){
                demarrerEnnemis();
                debutInterval = testInterval;
            }

            stagePrincipal.update(evenement); // pour que le framerate soit pris en compte
        };

        function rendreGesturePourArcDeCercleDisponible(){

            var myElement = document.getElementById('demo-canvas');
            var mc = new Hammer(myElement);

            // let the pan gesture support all directions.
            // this will block the vertical scrolling on a touch-device while on the element
            mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

            mc.on("panleft panright panup pandown tap press", function(ev) {
                console.log("Gesture Arc de Cercle détectée");
                stagePrincipal.removeChild(arcDeCercle);
                arcDeCercleEstEnHaut = !arcDeCercleEstEnHaut;
                //afficherArcDeCercle(arcDeCercleEstEnHaut);
            });
        }

        function testerIntersection(rect1,  rect2){
                if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
                return true;
        };

        function testerCollision(){

            var rectangleEnnemi = {
                x : cercleEnnemis.x,
                y : cercleEnnemis.y,
                width : cercleEnnemis.getBounds().width,
                height : cercleEnnemis.getBounds().height
            };

            var rectangleJoueur = cercleJoueur.getBounds();

            if (testerIntersection(rectangleJoueur, rectangleEnnemi)){
                var centreJoueurX = (rectangleJoueur.width - rectangleJoueur.x) / 2;
                var centreJoueurY = (rectangleJoueur.height - rectangleJoueur.y) / 2;

                var centreEnnemiX = (rectangleEnnemi.width - rectangleEnnemi.x) / 2;
                var centreEnnemiY = (rectangleEnnemi.height - rectangleEnnemi.y) / 2;

                var distanceReelle = Math.sqrt(Math.pow(centreEnnemiX - centreJoueurX, 2) + Math.pow(centreEnnemiY - centreJoueurY, 2));

                var distanceCollision = rectangleJoueur.width / 2  + rectangleEnnemi.width / 2;

                if (distanceReelle < distanceCollision ){
                    console.log("Intersection détectée");
                    //alert("Intersection détectée");
                    //cercleJoueur.alpha = .2;
                    return true;

                }
            }
            return false;
        }
        
        function afficherCercleJoueur(){

            cercleJoueur = new createjs.Shape();
            //cercleJoueur.graphics.beginFill("red").drawRect(0, 0, 36, 36);
            cercleJoueur.setBounds(positionJoueurX, positionJoueurY, 36, 36);

            //cercleJoueur.regX = cercleJoueur.regY = 9;

            cercleJoueur.graphics.beginFill("Black").drawCircle(0, 0, 18);
            cercleJoueur.x = positionJoueurX;
            cercleJoueur.y = positionJoueurY;



            stagePrincipal.addChild(cercleJoueur);
            //stagePrincipal.update();
        };

        function afficherCarreBouclier(){
            carreBouclier = new createjs.Container();

            var bouclier = new createjs.Shape();

            bouclier.graphics.beginFill("Red").drawRect(0, 0, 65, 65);

            bouclier.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)");
            bouclier.graphics.moveTo(65, 0);
            bouclier.graphics.lineTo(65, 65);

            carreBouclier.x = positionJoueurX;
            carreBouclier.y = positionJoueurY;

            carreBouclier.regX = carreBouclier.regY = 32.5;
            carreBouclier.rotation += 45;

            carreBouclier.addChild(bouclier);

            debutBouclier  = new createjs.Shape();
            debutBouclier.graphics.beginFill("Yellow").drawRect(0, 0, 1, 1);
            debutBouclier.x = 65;
            debutBouclier.y = 0;

            finBouclier  = new createjs.Shape();
            finBouclier.graphics.beginFill("Yellow").drawRect(0, 0, 1, 1);
            finBouclier.x = 65;
            finBouclier.y = 65;

            carreBouclier.addChild(debutBouclier, finBouclier);

            stagePrincipal.addChild(carreBouclier);

            console.log("debut bouclier : " + carreBouclier.localToGlobal(65, 0));

        };

        /*function afficherArcDeCercle(booleen){
            arcDeCercle = new createjs.Shape();
            //arcDeCercle.graphics.beginFill("yellow").drawRect(0, 0, 25, 25);

            arcDeCercle.regX = arcDeCercle.regY = 15;

            arcDeCercle.x = positionJoueurX;
            arcDeCercle.y = positionJoueurY;

            arcDeCercle.graphics.beginStroke("teal").arc(25, 25, 25, 0, Math.PI, booleen);
            //refactor radius

            stagePrincipal.addChild(arcDeCercle);
        };*/
        
        function afficherEnnemis() {

            afficherEnnemi1();

            var chanceSpawnNouveau = Math.floor(Math.random() * 10);
            if (chanceSpawnNouveau >= 8){
                afficherEnnemiAutres();
            }
        };

        function afficherEnnemi1(){
            var randomGaucheDroite = Math.floor(Math.random()*2);
            var randomBasHaut = Math.floor(Math.random()*2);

            positionJoueurXPourCible = positionJoueurX;
            positionJoueurYPourCible = positionJoueurY;

            // quart haut gauche
            if((randomGaucheDroite===0) && (randomBasHaut===0)){
                cercleEnnemis.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                cercleEnnemis.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);

                positionJoueurXPourCible -= 15;
                positionJoueurYPourCible -= 15;
            }
            // Quart haut droite
            else if ((randomGaucheDroite===1) && (randomBasHaut===0)){
                cercleEnnemis.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 50)+1)+(positionJoueurX - 50));
                cercleEnnemis.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);

                positionJoueurXPourCible += 15;
                positionJoueurYPourCible -= 15;
            }
            // Quart bas gauche
            else if ((randomGaucheDroite===0) && (randomBasHaut===1)){
                cercleEnnemis.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                cercleEnnemis.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

                positionJoueurXPourCible -= 15;
                positionJoueurYPourCible += 15;
            }
            // Quart bas droite
            else {
                cercleEnnemis.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 70)+1)+(positionJoueurX - 70));
                cercleEnnemis.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

                positionJoueurXPourCible += 15;
                positionJoueurYPourCible += 15;
            }

            cercleEnnemis.setBounds(cercleEnnemis.x, cercleEnnemis.y, 20, 20);


            stagePrincipal.addChild(cercleEnnemis);

            createjs.Tween.get(cercleEnnemis, {loop: true})
                .to({x:positionJoueurX, y: positionJoueurY}, 1500, createjs.Ease.linear)
                .call(handleComplete);
                //.addEventListener("change", testerCollision)


            function handleComplete() {
                //throw new Error();

            }

        };

        function afficherEnnemiAutres(){
            circleEnnemiAutres.graphics.beginFill("Green").drawCircle(0, 0, 10);

            positionJoueurXPourCible = positionJoueurX;
            positionJoueurYPourCible = positionJoueurY;

            var randomGaucheDroite = Math.floor(Math.random()*2);
            var randomBasHaut = Math.floor(Math.random()*2);

            // Quart haut gauche
            if((randomGaucheDroite===0) && (randomBasHaut===0)){
                circleEnnemiAutres.x = Math.floor(Math.random()*(positionJoueurX - 70)+1);
                circleEnnemiAutres.y = Math.floor(Math.random()*(positionJoueurY - 70)+1);

                positionJoueurXPourCible -= 23;
                positionJoueurYPourCible -= 23;
            }
            // Quart haut droite
            else if ((randomGaucheDroite===1) && (randomBasHaut===0)){
                circleEnnemiAutres.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 70)+1)+(positionJoueurX - 70));
                circleEnnemiAutres.y = Math.floor(Math.random()*(positionJoueurY - 70)+1);

                positionJoueurXPourCible += 23;
                positionJoueurYPourCible -= 23;
            }
            // Quart bas gauche
            else if ((randomGaucheDroite===0) && (randomBasHaut===1)){
                circleEnnemiAutres.x = Math.floor(Math.random()*(positionJoueurX - 70)+1);
                circleEnnemiAutres.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

                positionJoueurXPourCible -= 23;
                positionJoueurYPourCible += 23;
            }
            // Quart bas droite
            else {
                circleEnnemiAutres.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 70)+1)+(positionJoueurX - 70));
                circleEnnemiAutres.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

                positionJoueurXPourCible += 23;
                positionJoueurYPourCible += 23;
            }

            stagePrincipal.addChild(circleEnnemiAutres);

            createjs.Tween.get(circleEnnemiAutres, {loop: true})
                .to({x:positionJoueurXPourCible, y: positionJoueurYPourCible}, 500, createjs.Ease.linear);

        };


        function demarrerEnnemis(){
            stagePrincipal.removeChild(circleEnnemiAutres);
            afficherEnnemis();

        };


    
        initialiser();

    };

})();

