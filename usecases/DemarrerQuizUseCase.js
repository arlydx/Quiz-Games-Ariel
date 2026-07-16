export class DemarrerQuizUseCase {
  constructor(questionRepository) {
    this.questionRepository = questionRepository;
  }

  executer() {
    const premiereQuestion = this.questionRepository.obtenirParIndex(0);
    return {
      question: premiereQuestion,
      indexQuestion: 0,
      totalQuestions: this.questionRepository.compterTotal(),
      score: 0
    };
  }
}