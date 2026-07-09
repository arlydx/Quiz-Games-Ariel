import banqueQuestions from './donnees-questions.js';

let indexQuestion = 0;
let score = 0;
let tempsRestant = 30;
let intervalChrono = null;


const ecranAccueil = document.getElementById('ecran-accueil');
const ecranJeu = document.getElementById('ecran-jeu');
const ecranFin = document.getElementById('ecran-fin');

const btnCommencer = document.getElementById('btn-commencer');
const btnRejouer = document.getElementById('btn-rejouer');

const compteurQuestion = document.getElementById('compteur-question');
const chronoEl = document.getElementById('chrono');
const epoqueEl = document.getElementById('epoque-question');
const texteQuestionEl = document.getElementById('texte-question');
const zoneReponses = document.getElementById('zone-reponses');
const scoreLiveEl = document.getElementById('score-live');


btnCommencer.addEventListener('click', demarrerjeu);
btnRejouer.addEventListener('click', demarrerjeu)

function demarrerjeu() {
    indexQuestion = 0;
    score = 0;
    ecranAccueil.style.display = 'none';
    ecranJeu.style.display = 'block';
    afficherQuestion();
}

function afficherQuestion() {
    const question = banqueQuestions[indexQuestion];

    compteurQuestion.textContent = `Question ${indexQuestion + 1} /${banqueQuestions.length}`;
    const pourcentage = ((indexQuestion + 1) / banqueQuestions.length) * 100;
document.getElementById('progression-fill').style.width = `${pourcentage}%`;
    epoqueEl.textContent = question.epoque;
    texteQuestionEl.textContent = question.texte;
    scoreLiveEl.textContent = `Score : ${score}`;

    zoneReponses.innerHTML = '';

    question.choix.forEach(choixTexte => {
        const bouton = document.createElement('button')
        bouton.classList.add('option');
        bouton.textContent = choixTexte;
        bouton.addEventListener('click', () => verifierReponse (choixTexte, question, bouton));
        zoneReponses.appendChild(bouton);
    });

    demarrerChrono();
}

function demarrerChrono() {
    tempsRestant = 30;
    chronoEl.textContent = `${tempsRestant}s`;

    clearInterval(intervalChrono);

    intervalChrono = setInterval(() => {
        tempsRestant--;
        chronoEl.textContent = `${tempsRestant}s`;

        if (tempsRestant <= 0){
            clearInterval(intervalChrono);
            verifierReponse(null, banqueQuestions[indexQuestion], null);
        }
    }, 1000);
}


function verifierReponse(reponseChoisie, question, boutonClique){
    clearInterval(intervalChrono);

    const tousLesBoutons = zoneReponses.querySelectorAll('.option');
    tousLesBoutons.forEach(bouton =>{
        bouton.disabled = true;
    if(bouton.textContent == question.bonneReponse){
        bouton.classList.add('correct');
    }    
    });

    if (reponseChoisie === question.bonneReponse){
        score++;
    } else if (boutonClique) {
        boutonClique.classList.add('wrong');
    }

    scoreLiveEl.textContent = `Score : ${score}`;

    setTimeout(question_suivante, 1200);
}

function question_suivante() {
indexQuestion++;

if (indexQuestion < banqueQuestions.length) {
    afficherQuestion();
} else {
    finDujeu();
 }
}


function finDujeu() {
    ecranJeu.style.display = 'none';
    ecranFin.style.display = 'block';

    const scoreFinalEl = document.getElementById('score-final');
    const meilleurscoreEl = document.getElementById('meilleur-score');

    scoreFinalEl.textContent =`Score ; ${score} / ${banqueQuestions.length}`;
    let meilleurScore = localStorage.getItem('meilleureScoreHistoire');
    meilleurScore = meilleurScore ? parseInt(meilleurScore) : 0;

    if (score > meilleurScore) {
        meilleurScore = score;
        localStorage.setItem('meilleurScore', meilleurScore);
    }

    meilleurscoreEl.textContent = `Meilleur score : ${meilleurScore} / ${banqueQuestions.length}`;
}