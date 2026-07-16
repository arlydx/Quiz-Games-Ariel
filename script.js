import { QuestionRepository } from './interface-adapters/repositories/QuestionRepository.js';
import { ScoreRepository } from './interface-adapters/repositories/ScoreRepository.js';
import { DemarrerQuizUseCase } from './usecases/DemarrerQuizUseCase.js';
import { RepondreUseCase } from './usecases/RepondreUseCase.js';
import { QuestionSuivanteUseCase } from './usecases/QuestionSuivanteUseCase.js';
import { TerminerQuizUseCase } from './usecases/TerminerQuizUseCase.js';
import { QuizController } from './interface-adapters/controllers/QuizController.js';
import { QuizPresenter } from './interface-adapters/presenters/QuizPresenter.js';

// --- Repositories : accès aux données ---
const questionRepository = new QuestionRepository();
const scoreRepository = new ScoreRepository();

// --- Use Cases : règles du jeu ---
const demarrerQuizUseCase = new DemarrerQuizUseCase(questionRepository);
const repondreUseCase = new RepondreUseCase();
const questionSuivanteUseCase = new QuestionSuivanteUseCase(questionRepository);
const terminerQuizUseCase = new TerminerQuizUseCase(scoreRepository);

// --- Presenter + Controller : liés l'un à l'autre ---
const presenter = new QuizPresenter();
const controller = new QuizController(
  demarrerQuizUseCase,
  repondreUseCase,
  questionSuivanteUseCase,
  terminerQuizUseCase,
  presenter
);
presenter.definirController(controller);

// --- Connexion des boutons de l'écran d'accueil/fin ---
document.getElementById('btn-commencer').addEventListener('click', () => controller.demarrer());
document.getElementById('btn-rejouer').addEventListener('click', () => controller.demarrer());