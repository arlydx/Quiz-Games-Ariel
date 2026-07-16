export class QuestionSuivanteUseCase {
  constructor(questionRepository) {
    this.questionRepository = questionRepository;
  }

  executer(indexActuel) {
    const nouvelIndex = indexActuel + 1;
    const totalQuestions = this.questionRepository.compterTotal();

    if (nouvelIndex >= totalQuestions) {
      return { termine: true };
    }

    return {
      termine: false,
      question: this.questionRepository.obtenirParIndex(nouvelIndex),
      indexQuestion: nouvelIndex
    };
  }
}