export class QuizController {
  constructor(demarrerQuizUseCase, repondreUseCase, questionSuivanteUseCase, terminerQuizUseCase, presenter) {
    this.demarrerQuizUseCase = demarrerQuizUseCase;
    this.repondreUseCase = repondreUseCase;
    this.questionSuivanteUseCase = questionSuivanteUseCase;
    this.terminerQuizUseCase = terminerQuizUseCase;
    this.presenter = presenter;

    this.indexQuestion = 0;
    this.score = 0;
    this.totalQuestions = 0;
    this.questionActuelle = null;
    this.intervalChrono = null;
  }

  demarrer() {
    const resultat = this.demarrerQuizUseCase.executer();

    this.indexQuestion = resultat.indexQuestion;
    this.score = resultat.score;
    this.totalQuestions = resultat.totalQuestions;
    this.questionActuelle = resultat.question;

    this.presenter.afficherEcranJeu();
    this.presenter.afficherQuestion(resultat.question, resultat.indexQuestion, resultat.totalQuestions, resultat.score);
    this.demarrerChrono();
  }

  repondre(reponseChoisie, boutonClique) {
    clearInterval(this.intervalChrono);

    const resultat = this.repondreUseCase.executer(this.questionActuelle, reponseChoisie, this.score);
    this.score = resultat.nouveauScore;

    this.presenter.afficherResultatReponse(resultat, boutonClique);
    this.presenter.mettreAJourScore(this.score);

    setTimeout(() => this.passerQuestionSuivante(), 1200);
  }

  passerQuestionSuivante() {
    const resultat = this.questionSuivanteUseCase.executer(this.indexQuestion);

    if (resultat.termine) {
      this.terminer();
      return;
    }

    this.indexQuestion = resultat.indexQuestion;
    this.questionActuelle = resultat.question;

    this.presenter.afficherQuestion(resultat.question, resultat.indexQuestion, this.totalQuestions, this.score);
    this.demarrerChrono();
  }

  terminer() {
    const resultat = this.terminerQuizUseCase.executer(this.score);
    this.presenter.afficherEcranFin(resultat.scoreFinal, resultat.meilleurScore, this.totalQuestions);
  }

  demarrerChrono() {
    let tempsRestant = 15;
    this.presenter.mettreAJourChrono(tempsRestant);

    clearInterval(this.intervalChrono);
    this.intervalChrono = setInterval(() => {
      tempsRestant--;
      this.presenter.mettreAJourChrono(tempsRestant);

      if (tempsRestant <= 0) {
        clearInterval(this.intervalChrono);
        this.repondre(null, null);
      }
    }, 1000);
  }
}