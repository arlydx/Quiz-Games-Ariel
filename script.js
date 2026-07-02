import banqueQuestions from './donnees-questions';

let indecquestion = 0;
let score = 0;
let tempsRestants = 15;
let intervalChrono = null;


const ecranAccueil = document.getElementById('ecran-accueil');
const ecranjeu = document.getElementById('ecran-jeu');
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
    ecranFin.style.display = 'block';
    afficherQuestion();
}

function afficherQuestion() {
    const question = banqueQuestions[indexQuestion];

    compteurQuestion.textConstent = 'Question ${indexQuestion + 1} /${banqueQuestions.length}';
    epoqueE1.textContent = question.epoque;
    texteQuestionE1.textContent = question.texte;
    scoreLiveEl.textContent = 'Score : ${score}';

    zoneReponses.innerHTML = '';

    banqueQuestions.choix.forEach(choixTexte => {
        const bouton = document.createElement('button')
        bouton.classicList.add('option');
        bouton.textContent = choixTexte;
        bouton.addEventListener('click', () => verifierReponse (choixTexte, question, bouton));
        zoneReponses.appendChild(bouton);
    });

    demarrerChrono();
}

function demarrerChrono() {
    tempsRestants = 30;
    chronoE1.textContent = '${tempsRestant}s';

    clearInterval(intervalChrono);

    intervalChrono = setInterval(() => {
        tempsRestants--;
        chronoe1.textContent = '${tempsRestantes}s';

        if (tempsRestants <= 0){
            clearInterval(intervalChrono);
            verifierReponse(null, banqueQuestions[indexQuestion], null);
        }
    }, 1000);
}


function verifierReponse(reponseChoisie, question, boutonClique){
    clearInterval(intervalChrono);

    const tousLesBoutons = zoneReponses.querySelectorAll('.option');
    tousLesBoutons.forEach(bouton =>{
        bouton.Disabled = true;
    if(bouton.textContent == question.bonneReponse){
        bouton.classList.add('correct');
    }    
    });

    if (reponseChoisie === question.bonnereponse){
        score++;
    } else if (boutonClique) {
        boutonClique.classList.add('Wrong');
    }

    scoreLiveEl.textContent = 'Score : ${score}';

    setTimeout(question_suivante, 1200);
}

function question_suivante() {
indexQuestion++;

if (indexQuestion < banqueQuestion.length) {
    afficherQuestion();
} else {
    finDujeu();
 }
}


function finDujeu() {
    ecranjeu.style.display = 'none';
    ecranFin.style.display = 'block';

    const scoreFinalEl = document.getElementById('score-final');
    const meilleurscoreEl = document.getElementById('meilleur-score');

    scoreFinalEl.textContent ='Score ; ${score} / ${banqueQuestion.length}';
    let meilleurScore = localStorage.getItem('meilleureScoreHistoire');
    meilleurScore = meilleurScore ? parseInt(meilleurScore) : 0;

    if (score > meilleurScore) {
        meilleurScore = score;
        localStorage.setItem('meilleurScore', meilleurScore);
    }

    meilleurScoreE1.textContent = 'Meilleur score : ${meilleurScore} / ${banqueQuestions.length}';
}