(function()
{
    var soundWait = new Howl({
        src: ['data/musique/Waiting-Song.mp3'],
        loop: true,
        volume: 0.2
    });

    document.addEventListener("deviceready", function(){

        // attach events
        document.addEventListener("resume", onResume, false);
        document.addEventListener("pause", onPause, false);
    }, false);

    function onPause() {
        soundWait.stop();
    }

    function onResume() {
        soundWait.play();
    }
     
    var utilisateurDao= new UtilisateurDAO();
    var instance = this;
    if (localStorage['idUtilisateur'] != null)
        {
        var idUtilisateur=Number(localStorage['idUtilisateur']);
        }else{
           var idUtilisateur= null;
        }

    mute = function()
    {
        soundWait.mute(true);
        console.log("oui");
    }
        
    var initialiser = function()
    {
        window.addEventListener("hashchange",naviguer);
        naviguer();
    }

    var naviguer = async function()
    {
    
        
     var hash = window.location.hash;
       
        
        if(!hash)
        {
            if(null!=idUtilisateur)
            {
               naviguerAccueil(); 
            }
            stopMusique();
            soundWait.play();
            var authentifierVue = new AuthentifierVue(actionAuthentifierCompte);
            authentifierVue.afficher();
        }
        else if(hash.match(/^#menu/))
        {
            if(null==idUtilisateur)
            {
               naviguerAuthentification(); 
            }
            stopMusique();
            soundWait.play();
            var menuVue = new MenuVue();
            menuVue.afficher();
        }
        else if(hash.match(/^#jeu/))
        {
            if(null==idUtilisateur)
            {
               naviguerAuthentification(); 
            }
            stopMusique();
            var jeuVue = new JeuVue();
            jeuVue.afficher();
        }
        else if(hash.match(/^#creer-compte/))
        {
            stopMusique();
            var creerCompte = new CreationCompteVue(actionCreationCompte);
            creerCompte.afficher();
        }
        else if(hash.match(/^#modifier-compte/))
        {   
            if(null==idUtilisateur)
            {
               naviguerAuthentification(); 
            }
            stopMusique();
            var utilisateur =await  utilisateurDao.lireUtilisateurParId(idUtilisateur);
            var modifierCompteVue = new ModifierCompteVue(utilisateur,actionModifierCompte);
            modifierCompteVue.afficher();
        }
        else if(hash.match(/^#detail-joueur\/([0-9]+)/))
        {   
            if(null==localStorage['idUtilisateur'])
            {
               naviguerAuthentification(); 
            }
            stopMusique();
            var detailJoueurVue = new DetailJoueurVue();
            detailJoueurVue.afficher();
        }
        else if(hash.match(/^#leaderboard/))
        {   
            if(null==localStorage['idUtilisateur'])
            {
               naviguerAuthentification(); 
            }
            stopMusique();        
            var utilisateurTest1 = new Utilisateur(1,'toto@mail.fr', 'motDePasse', 'pseudonyme1');
            var utilisateurTest2 = new Utilisateur(2,'toto@mail.fr', 'motDePasse', 'pseudonyme2');
            var listeUtilisateurDonnee = [ utilisateurTest1 ,  utilisateurTest2 ];
            var scoreTest1 = new Score(1, 500, 1, 1, 1);
            var scoreTest2 = new Score(2, 250, 2, 1, 1);
            var listeScoreDonnee = [scoreTest1,scoreTest2];
            var leaderboardVue = new LeaderboardVue(listeScoreDonnee,listeUtilisateurDonnee);
            leaderboardVue.afficher();  
        }
        else if (hash.match(/^#quitter/))
        {
            stopMusique();
            navigator.app.exitApp();
        }
        else if (hash.match(/^#deconecter/))
        {
            stopMusique();
            actionDeconectionCompte();
        }
        else {
            stopMusique();
        }
    }
    
    var actionCreationCompte = async function(utilisateur)
    {
        
        var compteCreation = await utilisateurDao.ajouterUtilisateur(utilisateur.mail,utilisateur.motDePasse,utilisateur.pseudonyme);
        actionAuthentifierCompte(utilisateur);
    }
    
    var actionModifierCompte =async function(utilisateur)
    {
        await utilisateurDao.modifierUtilisateur(utilisateur);
        naviguerAccueil();
    }
    
      var actionAuthentifierCompte = async function(utilisateur)
    {
        //appel au DAO
        
        var testauthen= await utilisateurDao.lireUtilisateurPourAuthentification(utilisateur.mail,utilisateur.motDePasse);
        if(testauthen==true){
            utilisateurAutentifier= await utilisateurDao.lireUtilisateurParMail(utilisateur.mail);
            localStorage['idUtilisateur']=utilisateurAutentifier.id;
            idUtilisateur=Number(localStorage['idUtilisateur']);
             naviguerAccueil();
        }else{
             window.alert("Erreur d'authentification, login ou mot de passe incorect !!  ");
            naviguerAuthentification();
        }
    }

    var naviguerAccueil = function()
    {
        window.location.hash = "#menu";
    }
     var naviguerAuthentification = function()
    {
        window.location.hash = "#";
    }
     
     var actionDeconectionCompte = async function()
    {
         localStorage.removeItem('idUtilisateur');
        idUtilisateur=null;
    naviguerAccueil();
    }

    var stopMusique = function()
    {
        soundWait.stop();
    }
    
    initialiser();

})();