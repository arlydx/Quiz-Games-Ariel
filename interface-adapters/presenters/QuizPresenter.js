export class QuizPresenter {
  constructor() {
    this.ecranAccueil = document.getElementById('ecran-accueil');
    this.ecranJeu = document.getElementById('ecran-jeu');
    this.ecranFin = document.getElementById('ecran-fin');

    this.compteurQuestion = document.getElementById('compteur-question');
    this.chronoEl = document.getElementById('chrono');
    this.epoqueEl = document.getElementById('epoque-question');
    this.texteQuestionEl = document.getElementById('texte-question');
    this.zoneReponses = document.getElementById('zone-reponses');
    this.scoreLiveEl = document.getElementById('score-live');
    this.progressionFill = document.getElementById('progression-fill');

    this.controller = null; // sera injecté après coup pour éviter une dépendance circulaire
  }

  definirController(controller) {
    this.controller = controller;
  }

  afficherEcranJeu() {
    this.ecranAccueil.style.display = 'none';
    this.ecranFin.style.display = 'none';
    this.ecranJeu.style.display = 'block';
  }

  afficherQuestion(question, indexQuestion, totalQuestions, score) {
    this.compteurQuestion.textContent = `Question ${indexQuestion + 1} / ${totalQuestions}`;
    this.epoqueEl.textContent = question.epoque;
    this.texteQuestionEl.textContent = question.texte;
    this.scoreLiveEl.textContent = `Score : ${score}`;

    const pourcentage = ((indexQuestion + 1) / totalQuestions) * 100;
    this.progressionFill.style.width = `${pourcentage}%`;

    this.zoneReponses.innerHTML = '';

    question.choix.forEach(choixTexte => {
      const bouton = document.createElement('button');
      bouton.classList.add('option');
      bouton.textContent = choixTexte;
      bouton.addEventListener('click', () => this.controller.repondre(choixTexte, bouton));
      this.zoneReponses.appendChild(bouton);
    });
  }

  afficherResultatReponse(resultat, boutonClique) {
    const tousLesBoutons = this.zoneReponses.querySelectorAll('.option');
    tousLesBoutons.forEach(bouton => {
      bouton.disabled = true;
      if (bouton.textContent === resultat.bonneReponse) {
        bouton.classList.add('correct');
      }
    });

    if (!resultat.estCorrecte && boutonClique) {
      boutonClique.classList.add('wrong');
    }
  }

  mettreAJourScore(score) {
    this.scoreLiveEl.textContent = `Score : ${score}`;
  }

  mettreAJourChrono(tempsRestant) {
    this.chronoEl.textContent = `${tempsRestant}s`;
  }

  afficherEcranFin(scoreFinal, meilleurScore, totalQuestions) {
    this.ecranJeu.style.display = 'none';
    this.ecranFin.style.display = 'block';

    const scoreFinalEl = document.getElementById('score-final');
    const meilleurScoreEl = document.getElementById('meilleur-score');

    scoreFinalEl.textContent = `Score : ${scoreFinal} / ${totalQuestions}`;
    meilleurScoreEl.textContent = `Meilleur score : ${meilleurScore} / ${totalQuestions}`;
  }
}