export class TerminerQuizUseCase {
  constructor(scoreRepository) {
    this.scoreRepository = scoreRepository;
  }

  executer(scoreFinal) {
    const ancienMeilleurScore = this.scoreRepository.obtenirMeilleurScore();
    let meilleurScore = ancienMeilleurScore;

    if (scoreFinal > ancienMeilleurScore) {
      meilleurScore = scoreFinal;
      this.scoreRepository.sauvegarderMeilleurScore(meilleurScore);
    }

    return {
      scoreFinal,
      meilleurScore
    };
  }
}