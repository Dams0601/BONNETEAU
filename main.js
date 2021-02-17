// Déclaration de variables globals : circles, boules, click, score
var circles = document.querySelectorAll('.circle');
var boules = document.querySelectorAll('.boule');
var gobBoule = document.querySelectorAll('.choice');
var gobBoules = document.querySelectorAll('.choices');
var click = 0;
var score = 0;

// Réorganisation des gobelets au chargement
var largeurCadre = document.querySelector('#cadre').offsetWidth - 250;
gobBoule[0].style.left = "0px";
gobBoule[1].style.left = (largeurCadre / 2) + 'px';
gobBoule[2].style.left = largeurCadre + 'px';

/***************************************************************************************************************/



// Détecte l'évènement 'click' sur le bouton Démarrer
document.querySelector('.submit').addEventListener('click', function (e) {

    // Réinitialise le "contenu des différents gobelets"
    boules[0].innerHTML = "";
    boules[1].innerHTML = "";
    boules[2].innerHTML = "";

    // Boucle pour réaffecter l'état initial aux gobelets
    for (var i = 0; i < 3; i++) {
        circles[i].classList.remove('final');
        circles[i].classList.add('initial');
        boules[i].classList.remove('final');
        boules[i].classList.add('initial');
    }

    // Réaffecte le commentaire à l'état initial
    document.querySelector('.commentary').classList.remove('final');
    document.querySelector('.commentary').classList.add('initial');

    // Réaffecte le rappel à l'état final
    document.querySelector('.rappel').classList.add('final');
    document.querySelector('.rappel').classList.remove('initial');

    document.querySelector('.rappel').innerHTML = "Suivez bien la balle des yeux...";

    // Réaffecte le rappel à l'état final
    document.querySelector('.submit').classList.add('final');
    document.querySelector('.submit').classList.remove('initial');
    this.disabled = true;

    // Génération d'un nombre aléatoire
    var generation = Math.floor(Math.random() * circles.length);

    // Ajout du texte à un gobelet aléatoire
    boules[generation].innerHTML = "⚪";

    // Fonction qui permet de lever le gobelet pour voir ou se trouve la balle

    setTimeout(function () {
    circles[generation].classList.remove('initial');
    circles[generation].classList.add('final');
    boules[generation].classList.remove('initial');
    boules[generation].classList.add('final');
    }, 500)

    setTimeout(function () {
        circles[generation].classList.remove('final');
        circles[generation].classList.add('initial');
        boules[generation].classList.remove('final');
        boules[generation].classList.add('initial');
    }, 1000)




    // Mélanger les gobelets => le nombre de mélage sera aléatoire entre 5 et 7
    var terminus = Math.floor(Math.random() * 3) + 6; // nbr de mélange
    var i = 0; // numéro du mélange en cours
    var shuffle = setInterval(function () {
        var numGob1 = Math.floor(Math.random() * 3); // Choix n°1 du gobelet
        var numGob2 = Math.floor(Math.random() * 3);
        while (numGob1 == numGob2) {
            numGob2 = Math.floor(Math.random() * 3) // Choix n°2 du gobelet
        }

        // Affectation des positions à l'état actuel
        var largeur1 = gobBoule[numGob1].style.left
        var largeur2 = gobBoule[numGob2].style.left

        // Permutation des places
        $(gobBoule[numGob1]).animate({
            left: largeur2,
            easing: "swing",
        }, 1100)
        $(gobBoule[numGob2]).animate({
            left: largeur1,
            easing: "swing"
        }, 1100);

        i++;
        if (i > terminus) {
            clearInterval(shuffle); // Arrete le mélange
        }
    }, 1100) // Toutes les 1s => sachant que le changement de position dure 0.7s (voir css : .choice)






    // Ajoute 1 au click après le mélange
    setTimeout(function () {
        click++;
        document.querySelector('.rappel').innerHTML = "Selectionne un des gobelets";
    }, 10000)
})


/***************************************************************************************************************/


// Pour tous les gobelets :
for (var i = 0; i < circles.length; i++) {
    // Détecte l'évènement 'click'
    circles[i].addEventListener("click", function (e) {

        // Si tu as préalablement cliquer sur le bouton démarrer alors
        if (click == 1) {

            // Affecte le rappel à l'état initial
            document.querySelector('.rappel').classList.add('initial');
            document.querySelector('.rappel').classList.remove('final');

            // Affecte le commentaire à l'état final
            document.querySelector('.commentary').classList.remove('initial');
            document.querySelector('.commentary').classList.add('final');

            // Conditions de gain
            for (var j = 0; j < 3; j++) {
                if (this === circles[j]) {
                    if (boules[j].textContent.includes("⚪")) {
                        document.querySelector('.commentary').innerHTML = "Bien Joué";
                        document.querySelector('.commentary').style.color = "#94FF83";
                        score++;
                    } else {
                        document.querySelector('.commentary').innerHTML = "Dommage";
                        document.querySelector('.commentary').style.color = "#FF8383";
                    }
                }
            }

            // Changement d'état : circles / boules
            for (var h = 0; h < 3; h++) {
                circles[h].classList.remove('initial');
                circles[h].classList.add('final');
                boules[h].classList.remove('initial');
                boules[h].classList.add('final');
            }

            // Réaffecte le bouton démarrer à l'état initial + lui donner comme contenu : "Rejoue"
            document.querySelector('.submit').classList.add('initial');
            document.querySelector('.submit').classList.remove('final');
            document.querySelector('.submit').innerHTML = "Rejoue";
            document.querySelector('.submit').disabled = false;

            // Remettre à la variable globale 'click' la valeur = 0
            click = 0;

            // Mettre à jour le score de l'utisateur
            document.querySelector('.resultat').innerHTML = score;
        }
    })
}