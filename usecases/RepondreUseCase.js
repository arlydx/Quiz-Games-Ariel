export class RepondreUseCase {
  executer(question, reponseChoisie, scoreActuel) {
    const estCorrecte = question.estCorrecte(reponseChoisie);
    const nouveauScore = estCorrecte ? scoreActuel + 1 : scoreActuel;

    return {
      estCorrecte,
      bonneReponse: question.bonneReponse,
      nouveauScore
    };
  }
}