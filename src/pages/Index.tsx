import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Story {
  id: string;
  title: string;
  emoji: string;
  description: string;
  content: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  story: string;
}

const stories: Story[] = [
  {
    id: 'kolobok',
    title: 'Колобок',
    emoji: '🥮',
    description: 'Сказка о румяном колобке, который укатился от бабушки и дедушки',
    content: 'Жили-были старик со старухой. Вот и говорит старик старухе: — Поди-ка, старуха, по коробу поскреби, по сусеку помети, не наскребёшь ли муки на колобок...'
  },
  {
    id: 'repka',
    title: 'Репка',
    emoji: '🥕',
    description: 'История о том, как вся семья тянула большую-пребольшую репку',
    content: 'Посадил дед репку и говорит: — Расти, расти, репка, сладка! Расти, расти, репка, крепка! Выросла репка сладка, крепка, большая-пребольшая...'
  },
  {
    id: 'teremok',
    title: 'Теремок',
    emoji: '🏠',
    description: 'Сказка о звериных соседях в теремке',
    content: 'Стоит в поле теремок. Бежит мимо мышка-норушка. Увидела теремок, остановилась и спрашивает: — Терем-теремок! Кто в тереме живёт?...'
  },
  {
    id: 'ryaba',
    title: 'Курочка Ряба',
    emoji: '🐔',
    description: 'Сказка о курочке, которая снесла золотое яичко',
    content: 'Жили-были дед да баба. И была у них курочка ряба. Снесла курочка яичко, да не простое — золотое...'
  }
];

const questions: Question[] = [
  {
    id: 1,
    question: 'От кого укатился Колобок первым?',
    options: ['От зайца', 'От бабушки и дедушки', 'От волка', 'От медведя'],
    correct: 1,
    story: 'kolobok'
  },
  {
    id: 2,
    question: 'Кто помог вытянуть репку последним?',
    options: ['Кошка', 'Внучка', 'Мышка', 'Жучка'],
    correct: 2,
    story: 'repka'
  },
  {
    id: 3,
    question: 'Кто первым поселился в теремке?',
    options: ['Лягушка', 'Мышка-норушка', 'Зайчик', 'Лисичка'],
    correct: 1,
    story: 'teremok'
  },
  {
    id: 4,
    question: 'Какое яичко снесла Курочка Ряба?',
    options: ['Серебряное', 'Простое', 'Золотое', 'Расписное'],
    correct: 2,
    story: 'ryaba'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<'home' | 'stories' | 'quiz' | 'games'>('home');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [puzzleMatches, setPuzzleMatches] = useState<number>(0);

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
  };

  const handlePuzzleClick = (heroId: number) => {
    if (heroId === puzzleMatches) {
      setPuzzleMatches(puzzleMatches + 1);
    }
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6 text-8xl animate-bounce-soft">📚</div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4 drop-shadow-lg">
            Русские народные сказки
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Увлекательные истории, викторины и игры для третьеклассников
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 border-4 border-primary bg-white shadow-xl"
            onClick={() => setActiveSection('stories')}
          >
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">📖</div>
              <CardTitle className="text-2xl">Сказки</CardTitle>
              <CardDescription>Читай любимые истории</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 border-4 border-secondary bg-white shadow-xl"
            onClick={() => setActiveSection('quiz')}
          >
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <CardTitle className="text-2xl">Викторина</CardTitle>
              <CardDescription>Проверь свои знания</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 border-4 border-accent bg-white shadow-xl"
            onClick={() => setActiveSection('games')}
          >
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">🎮</div>
              <CardTitle className="text-2xl">Игры</CardTitle>
              <CardDescription>Играй и учись</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 border-4 border-green-400 bg-white shadow-xl"
          >
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">⭐</div>
              <CardTitle className="text-2xl">Достижения</CardTitle>
              <CardDescription>Твои успехи</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block border-4 border-amber-600 rounded-lg p-6 bg-white shadow-xl">
            <div className="text-6xl mb-3">🎭</div>
            <p className="text-lg text-gray-700 font-semibold">
              Выбери раздел и начни своё сказочное путешествие!
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStories = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => {
              setActiveSection('home');
              setSelectedStory(null);
            }}
            variant="outline"
            size="lg"
            className="border-2"
          >
            <Icon name="Home" className="mr-2" />
            На главную
          </Button>
          <h2 className="text-4xl font-bold text-primary">📖 Сказки</h2>
          <div className="w-32"></div>
        </div>

        {!selectedStory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {stories.map((story) => (
              <Card 
                key={story.id}
                className="cursor-pointer hover:scale-105 transition-transform duration-300 border-4 border-primary bg-white shadow-xl"
                onClick={() => setSelectedStory(story)}
              >
                <CardHeader>
                  <div className="text-7xl text-center mb-4">{story.emoji}</div>
                  <CardTitle className="text-3xl text-center">{story.title}</CardTitle>
                  <CardDescription className="text-center text-lg pt-2">
                    {story.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full" size="lg">
                    Читать сказку
                    <Icon name="BookOpen" className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-3xl mx-auto border-4 border-primary bg-white shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Button 
                  onClick={() => setSelectedStory(null)}
                  variant="outline"
                >
                  <Icon name="ArrowLeft" className="mr-2" />
                  Назад
                </Button>
                <div className="text-6xl">{selectedStory.emoji}</div>
              </div>
              <CardTitle className="text-4xl text-center">{selectedStory.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-wrap">
                {selectedStory.content}
              </p>
              <div className="mt-8 p-6 bg-amber-50 rounded-lg border-2 border-amber-300">
                <p className="text-lg font-semibold text-center">
                  ✨ Продолжение следует... ✨
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => setActiveSection('home')}
            variant="outline"
            size="lg"
            className="border-2"
          >
            <Icon name="Home" className="mr-2" />
            На главную
          </Button>
          <h2 className="text-4xl font-bold text-secondary">🎯 Викторина</h2>
          <div className="w-32"></div>
        </div>

        <Card className="max-w-2xl mx-auto border-4 border-secondary bg-white shadow-2xl">
          {!quizFinished ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-semibold bg-primary text-white px-4 py-2 rounded-full">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </div>
                  <div className="text-lg font-semibold bg-accent text-white px-4 py-2 rounded-full">
                    Счёт: {score}
                  </div>
                </div>
                <CardTitle className="text-2xl text-center pt-4">
                  {questions[currentQuestion].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-lg py-6 ${
                      selectedAnswer === index
                        ? index === questions[currentQuestion].correct
                          ? 'bg-green-500 hover:bg-green-500'
                          : 'bg-red-500 hover:bg-red-500'
                        : ''
                    }`}
                    variant={selectedAnswer === null ? 'outline' : 'default'}
                    size="lg"
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </>
          ) : (
            <CardContent className="text-center py-12">
              <div className="text-8xl mb-6">
                {score === questions.length ? '🏆' : score >= questions.length / 2 ? '🌟' : '📚'}
              </div>
              <h3 className="text-4xl font-bold mb-4">
                {score === questions.length 
                  ? 'Отлично!' 
                  : score >= questions.length / 2 
                  ? 'Хорошо!' 
                  : 'Молодец!'}
              </h3>
              <p className="text-2xl mb-8">
                Ты ответил правильно на {score} из {questions.length} вопросов
              </p>
              <Button onClick={resetQuiz} size="lg" className="text-xl px-8 py-6">
                Пройти снова
                <Icon name="RotateCcw" className="ml-2" />
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );

  const renderGames = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => setActiveSection('home')}
            variant="outline"
            size="lg"
            className="border-2"
          >
            <Icon name="Home" className="mr-2" />
            На главную
          </Button>
          <h2 className="text-4xl font-bold text-accent">🎮 Игры</h2>
          <div className="w-32"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border-4 border-accent bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">🧩 Угадай героя</CardTitle>
              <CardDescription className="text-center text-lg">
                Найди героев по порядку
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="inline-block bg-accent text-white px-6 py-3 rounded-full text-xl font-bold">
                  Найдено: {puzzleMatches} из 4
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 0, emoji: '🥮', name: 'Колобок' },
                  { id: 1, emoji: '🥕', name: 'Репка' },
                  { id: 2, emoji: '🏠', name: 'Теремок' },
                  { id: 3, emoji: '🐔', name: 'Курочка' }
                ].map((hero) => (
                  <Button
                    key={hero.id}
                    onClick={() => handlePuzzleClick(hero.id)}
                    disabled={hero.id < puzzleMatches}
                    className={`h-32 text-5xl ${
                      hero.id < puzzleMatches 
                        ? 'bg-green-100 cursor-not-allowed' 
                        : hero.id === puzzleMatches 
                        ? 'bg-white hover:bg-yellow-100 animate-bounce-soft' 
                        : 'bg-gray-100 cursor-not-allowed'
                    }`}
                    variant="outline"
                  >
                    {hero.id < puzzleMatches ? '✅' : hero.emoji}
                  </Button>
                ))}
              </div>
              {puzzleMatches === 4 && (
                <div className="mt-6 text-center">
                  <div className="text-6xl mb-3">🎉</div>
                  <p className="text-2xl font-bold text-green-600 mb-4">Молодец!</p>
                  <Button onClick={() => setPuzzleMatches(0)} size="lg">
                    Играть снова
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-4 border-primary bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">🎨 Раскраска</CardTitle>
              <CardDescription className="text-center text-lg">
                Скоро появится
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-8xl mb-4">🖍️</div>
                <p className="text-xl text-muted-foreground">
                  В разработке...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {activeSection === 'home' && renderHome()}
      {activeSection === 'stories' && renderStories()}
      {activeSection === 'quiz' && renderQuiz()}
      {activeSection === 'games' && renderGames()}
    </>
  );
}
