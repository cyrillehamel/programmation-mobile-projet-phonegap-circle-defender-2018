var JeuVue = (function()
{
    var pageJeuVue = document.getElementById("page-jeu").innerHTML;

    return function()
    {
        var canvas;
        var stagePrincipal;
        var cercleJoueur;

        var debutInterval = 0;
        var testInterval;

        var dureeTrajetEnnmi;

        var positionJoueurX, positionJoueurY;

        var positionJoueurXPourCible, positionJoueurYPourCible;

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

            afficherCercleJoueur();
            afficherCarreBouclier();
        };

        function rafraichirScene(evenement){

            var isNouvelEnnemi = false;

            if (debutInterval == 0){
                debutInterval = new Date().getTime();
                isNouvelEnnemi = true;
            }
            else {
                testInterval = new Date().getTime();

                if (testInterval - debutInterval >= dureeTrajetEnnmi){
                    isNouvelEnnemi = true;
                }

                if (testerCollisionAvecBouclier()){
                    detruireEnnemis();
                    isNouvelEnnemi = true;
                }
                else if (testerCollision()) {
                    detruireEnnemis();
                    isNouvelEnnemi = true;
                }
            }

            if(isNouvelEnnemi) {
                demarrerEnnemis();
                debutInterval = testInterval;
            }

            stagePrincipal.update(evenement); // pour que le framerate soit pris en compte

        };

        function rendreGesturePourArcDeCercleDisponible(){

            var myElement = document.getElementById('demo-canvas');
            var mc = new Hammer(myElement);
            mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

            mc.on("panleft", function(ev) {
                carreBouclier.rotation += 6;
            });
            mc.on("panright", function(ev) {
                carreBouclier.rotation -= 6;
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
                    console.log("testerCollision : intersection détectée");
                    //alert("Intersection détectée");
                    //cercleJoueur.alpha = .2;
                    return true;
                }
            }
            return false;
        }

        function calculerDistancePourEnnemis(){
            var centreJoueurX = cercleJoueur.x  + 18;
            var centreJoueurY = cercleJoueur.y + 18;

            var centreEnnemiX = cercleEnnemis.x + 10;
            var centreEnnemiY = cercleEnnemis.y + 10;

            return Math.sqrt(Math.pow(centreEnnemiX - centreJoueurX, 2) + Math.pow(centreEnnemiY - centreJoueurY, 2));
        };

        function calculerDureeTrajetEnnemis(distance){
            var tempsObjectif = 500; //pour 200px, en ms
            var distanceObjective = 200; //px

            return Math.floor((tempsObjectif * distance) / distanceObjective);
        };

        function testerCollisionAvecBouclier(){

            var R = 10;
            var pointA = carreBouclier.localToGlobal(65, 0);
            var pointB = carreBouclier.localToGlobal(65, 65);

            //calcule distance euclidienne entre A et B
            var Ax = pointA.x; var Ay = pointA.y;
            var Bx = pointB.x; var By = pointB.y;

            var LAB = Math.sqrt( Math.pow((Bx - Ax), 2) + Math.pow((By - Ay),2) );

            // calcule vector directionnel D de A à B
            var Dx = (Bx - Ax) / LAB;
            var Dy = (By - Ay) / LAB;

            // l'équation d'une droite AB est x = Dx*t + Ax, y = Dy*t + Ay with 0 <= t <= LAB

            //calcule la distance entre A et E, où E est le point appartenant à AB et
            //le plus proche du centre du cercle (Cx, Cy)
            var Cx = cercleEnnemis.x + 10; var Cy = cercleEnnemis.y + 10;

            var t = Dx*(Cx-Ax) + Dy*(Cy-Ay);

            // calcule les coordonnées du point E
            var Ex = t*Dx+Ax;
            var Ey = t*Dy+Ay;

            // calcule la distance entre E et C
            var LEC = Math.sqrt(Math.pow((Ex-Cx),2) + Math.pow((Ey-Cy),2));

            // teste si le segment croise le cercle
            if( LEC < R ) {
               return true;
            }
            return false;
        }

        
        function afficherCercleJoueur(){

            cercleJoueur = new createjs.Shape();
            cercleJoueur.setBounds(positionJoueurX, positionJoueurY, 36, 36);

            cercleJoueur.graphics.beginFill("Black").drawCircle(0, 0, 18);
            cercleJoueur.x = positionJoueurX;
            cercleJoueur.y = positionJoueurY;

            stagePrincipal.addChild(cercleJoueur);
        };

        function afficherCarreBouclier(){
            carreBouclier = new createjs.Container();

            var bouclier = new createjs.Shape();

            bouclier.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)");
            bouclier.graphics.moveTo(50, 0);
            bouclier.graphics.lineTo(50, 50);

            carreBouclier.x = positionJoueurX;
            carreBouclier.y = positionJoueurY;

            carreBouclier.regX = carreBouclier.regY = 25;
            carreBouclier.rotation -= 90;

            carreBouclier.addChild(bouclier);

            stagePrincipal.addChild(carreBouclier);

            console.log("debut bouclier : " + carreBouclier.localToGlobal(65, 0));

        };
        
        function afficherEnnemis() {

            afficherEnnemi1();

            var chanceSpawnNouveau = Math.floor(Math.random() * 10);
            if (chanceSpawnNouveau >= 8){
                //afficherEnnemiAutres();
            }
        };

        function afficherEnnemi1(){
            var isGauche = false;
            var isDroite = false;
            var isHaut = false;
            var isBas = false;

            if (Math.floor(Math.random()*2)){
                isDroite = true;
            }else{
                isGauche = true;
            }
            if (Math.floor(Math.random()*2)){
                isBas = true;
            }else{
                isHaut = true;
            }


            // quart haut gauche
            if(isHaut && isGauche){
                cercleEnnemis.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                cercleEnnemis.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);

            }
            // Quart haut droite
            else if (isHaut && isDroite){
                cercleEnnemis.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 50)+1)+(positionJoueurX - 50));
                cercleEnnemis.y = Math.floor(Math.random()*(positionJoueurY - 25)+1);


            }
            // Quart bas gauche
            else if (isBas && isGauche){
                cercleEnnemis.x = Math.floor(Math.random()*(positionJoueurX - 25)+1);
                cercleEnnemis.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

            }
            // Quart bas droite
            else {
                cercleEnnemis.x = Math.floor(Math.random()*(window.screen.availWidth-(positionJoueurX - 70)+1)+(positionJoueurX - 70));
                cercleEnnemis.y = Math.floor(Math.random()*(window.screen.availHeight-(positionJoueurY - 70)+1)+(positionJoueurY - 70));

            }

            cercleEnnemis.setBounds(cercleEnnemis.x, cercleEnnemis.y, 20, 20);


            stagePrincipal.addChild(cercleEnnemis);

            dureeTrajetEnnmi = calculerDureeTrajetEnnemis(calculerDistancePourEnnemis());

            createjs.Tween.get(cercleEnnemis, {loop: false})
                .to({x:positionJoueurX, y: positionJoueurY}, dureeTrajetEnnmi, createjs.Ease.linear)
                .call(handleComplete);
                //.addEventListener("change", testerCollisionAvecBouclier);


            function handleComplete() {
                //throw new Error();

            }

        };

        function detruireEnnemis(){
            createjs.Tween.removeTweens(cercleEnnemis);
            stagePrincipal.removeChild(cercleEnnemis);
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

