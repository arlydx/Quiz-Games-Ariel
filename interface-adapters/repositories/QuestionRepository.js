import banqueQuestionsBrutes from '../../donnees-questions.js';
import { Question } from '../../entities/Questions.js';

export class QuestionRepository {
  constructor() {
    this.questions = banqueQuestionsBrutes.map(
      q => new Question(q.texte, q.choix, q.bonneReponse, q.epoque)
    );
  }

  obtenirToutes() {
    return this.questions;
  }

  obtenirParIndex(index) {
    return this.questions[index];
  }

  compterTotal() {
    return this.questions.length;
  }
}