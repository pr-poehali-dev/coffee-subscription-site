import React, { useState } from 'react'
import Icon from '@/components/ui/icon'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PricingSection } from '@/components/ui/pricing-section'

const coffeeSubscriptions = [
  {
    id: "starter",
    name: "Стартер",
    price: {
      monthly: 990,
      yearly: 890,
    },
    description: "Для знакомства с кофе",
    features: [
      "2 сорта кофе в месяц",
      "250г каждого сорта",
      "Карточки с описанием",
      "Рецепты приготовления",
      "Доставка включена",
    ],
    cta: "Начать подписку",
    popular: true,
  },
  {
    id: "connoisseur",
    name: "Ценитель",
    price: {
      monthly: 1590,
      yearly: 1390,
    },
    description: "Для истинных любителей",
    features: [
      "4 сорта кофе в месяц",
      "250г каждого сорта",
      "Подробные гиды по завариванию",
      "Эксклюзивные сорта",
      "Приоритетная поддержка",
    ],
    cta: "Выбрать план",
  },
  {
    id: "expert",
    name: "Эксперт",
    price: {
      monthly: 2390,
      yearly: 2090,
    },
    description: "Максимальный опыт кофе",
    features: [
      "6 премиальных сортов",
      "500г каждого сорта",
      "Персональные рекомендации",
      "Доступ к лимитированным сортам",
      "Персональный консультант",
    ],
    cta: "Стать экспертом",
    highlighted: true,
  },
  {
    id: "business",
    name: "Бизнес",
    price: {
      monthly: "От 5000",
      yearly: "От 4500",
    },
    description: "Для офисов и кафе",
    features: [
      "Индивидуальный подбор",
      "Большие объемы",
      "Оборудование в аренду",
      "Обучение персонала",
      "Персональный менеджер",
    ],
    cta: "Связаться",
  },
]

const coffeeRecipes = [
  {
    name: "Эспрессо",
    difficulty: "Легкий",
    time: "2 мин",
    description: "Классический итальянский кофе с насыщенным вкусом",
    ingredients: ["18г молотого кофе", "30мл воды", "Температура 90-96°C"],
    steps: [
      "Разогрейте кофемашину",
      "Утрамбуйте кофе в портафильтре",
      "Пролейте за 25-30 секунд"
    ],
    icon: "Coffee"
  },
  {
    name: "Капучино",
    difficulty: "Средний",
    time: "5 мин",
    description: "Идеальное сочетание эспрессо и молочной пенки",
    ingredients: ["1 порция эспрессо", "150мл молока", "Какао для посыпки"],
    steps: [
      "Приготовьте эспрессо",
      "Взбейте молоко до кремовой пенки",
      "Влейте молоко в эспрессо",
      "Украсьте какао"
    ],
    icon: "Milk"
  },
  {
    name: "Альтернативная заварка",
    difficulty: "Продвинутый",
    time: "8 мин",
    description: "Раскройте весь потенциал зерна",
    ingredients: ["25г кофе среднего помола", "400мл воды", "Фильтр"],
    steps: [
      "Смочите фильтр горячей водой",
      "Добавьте кофе и сделайте блум 30 сек",
      "Лейте воду круговыми движениями",
      "Общее время экстракции 4-6 минут"
    ],
    icon: "Filter"
  }
]

export default function Index() {
  const [selectedRecipe, setSelectedRecipe] = useState(coffeeRecipes[0])
  const [activeFilter, setActiveFilter] = useState('Все')

  const difficulties = ['Все', 'Легкий', 'Средний', 'Продвинутый']
  
  const filteredRecipes = activeFilter === 'Все' 
    ? coffeeRecipes 
    : coffeeRecipes.filter(recipe => recipe.difficulty === activeFilter)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/img/36f41e11-f136-4b71-9ba5-d26d3c686575.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Badge className="mb-6 px-4 py-2" variant="secondary">
            ☕ Кофейная подписка премиум-класса
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Откройте мир
            <br />настоящего кофе
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Ежемесячная подписка на лучшие сорта кофе со всего мира 
            с базой рецептов от экспертов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-6 text-lg">
              <Icon name="Coffee" size={20} className="mr-2" />
              Начать дегустацию
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Icon name="Book" size={20} className="mr-2" />
              Изучить рецепты
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Globe" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Со всего мира</h3>
              <p className="text-muted-foreground">
                Отборные зерна из лучших кофейных регионов планеты
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="BookOpen" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">База рецептов</h3>
              <p className="text-muted-foreground">
                Подробные гиды по приготовлению от профессиональных бариста
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Truck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Доставка</h3>
              <p className="text-muted-foreground">
                Свежеобжаренный кофе до вашей двери каждый месяц
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Coffee Recipes Section */}
      <section className="px-4 py-16 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">База рецептов</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Изучите искусство приготовления кофе с нашими подробными гидами
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-muted p-1 rounded-full">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setActiveFilter(difficulty)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeFilter === difficulty
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredRecipes.map((recipe) => (
              <Card 
                key={recipe.name}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedRecipe.name === recipe.name ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon name={recipe.icon as any} size={24} className="text-primary" />
                  <div className="flex gap-2">
                    <Badge variant="outline">{recipe.difficulty}</Badge>
                    <Badge variant="secondary">{recipe.time}</Badge>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                <p className="text-muted-foreground">{recipe.description}</p>
              </Card>
            ))}
          </div>

          {/* Selected Recipe Details */}
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h3>
                <p className="text-muted-foreground mb-6">{selectedRecipe.description}</p>
                
                <h4 className="font-semibold mb-3">Ингредиенты:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-primary" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Приготовление:</h4>
                <ol className="space-y-3">
                  {selectedRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-16">
        <PricingSection
          title="Выберите свой план"
          subtitle="Найдите идеальную кофейную подписку для себя"
          frequencies={["monthly", "yearly"]}
          tiers={coffeeSubscriptions}
        />
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">CoffeeClub</h3>
              <p className="text-background/70">
                Лучший кофе со всего мира прямо к вашему столу
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Подписка</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Планы</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Подарочная карта</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Корпоративным клиентам</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Рецепты</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Эспрессо</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Альтернативы</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Десерты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-background/70">
                <li>+7 (495) 123-45-67</li>
                <li>hello@coffeeclub.ru</li>
                <li>Москва, ул. Кофейная, 1</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/70">
            <p>&copy; 2024 CoffeeClub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}