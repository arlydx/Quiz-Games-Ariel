class Question {
  constructor(texte, choix, bonneReponse, epoque) {
    this.texte = texte;
    this.choix = choix;
    this.bonneReponse = bonneReponse;
    this.epoque = epoque;
  }

  estCorrecte(reponseDonnee) {
    return reponseDonnee === this.bonneReponse;
  }
}