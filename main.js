// Déclaration de variables globals : circles, boules, click, score
var circles = document.querySelectorAll('.circle');
var boules = document.querySelectorAll('.boule');
var click = 0;
var score = 0;


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

    // Réaffecte le rappel à l'état final
    document.querySelector('.submit').classList.add('final');
    document.querySelector('.submit').classList.remove('initial');
    this.disabled = true;

    // Ajoute 1 au click
    click++;

    // Génération d'un nombre aléatoire
    var generation = Math.floor(Math.random() * circles.length);

    // Ajout du texte à un gobelet aléatoire
    boules[generation].innerHTML = "⚪";
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