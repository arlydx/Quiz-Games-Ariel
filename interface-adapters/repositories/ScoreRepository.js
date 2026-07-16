const CLE_STOCKAGE = 'meilleurScoreHistoire';

export class ScoreRepository {
  obtenirMeilleurScore() {
    const valeur = localStorage.getItem(CLE_STOCKAGE);
    return valeur ? parseInt(valeur) : 0;
  }

  sauvegarderMeilleurScore(score) {
    localStorage.setItem(CLE_STOCKAGE, score);
  }
}