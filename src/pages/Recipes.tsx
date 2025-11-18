import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Icon from '@/components/ui/icon'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Recipe {
  id: number
  name: string
  description: string
  ingredients: string
  brewing_method: string
  coffee_amount_g: number
  water_amount_ml: number
  brewing_time_minutes: number
  temperature_celsius: number
  difficulty_level: string
  image_url: string | null
}

const fetchRecipes = async (difficulty?: string): Promise<Recipe[]> => {
  const url = difficulty 
    ? `https://functions.poehali.dev/8b4772dc-5501-4743-9933-d201b68115f8?difficulty=${encodeURIComponent(difficulty)}`
    : 'https://functions.poehali.dev/8b4772dc-5501-4743-9933-d201b68115f8'
  
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  const data = await response.json()
  return data.recipes
}

export default function Recipes() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Все')
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const difficulties = ['Все', 'Легкая', 'Средняя', 'Сложная']

  const { data: recipes = [], isLoading, error } = useQuery({
    queryKey: ['recipes', selectedDifficulty],
    queryFn: () => fetchRecipes(selectedDifficulty === 'Все' ? undefined : selectedDifficulty),
  })

  useEffect(() => {
    if (recipes.length > 0 && !selectedRecipe) {
      setSelectedRecipe(recipes[0])
    }
  }, [recipes, selectedRecipe])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легкая': return 'bg-green-500/10 text-green-700 dark:text-green-400'
      case 'Средняя': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
      case 'Сложная': return 'bg-red-500/10 text-red-700 dark:text-red-400'
      default: return 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2" variant="secondary">
            ☕ База знаний
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Рецепты кофе
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Профессиональные рецепты от бариста со всего мира
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-muted p-1 rounded-full">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <Icon name="Loader2" size={48} className="animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Загружаем рецепты...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <Icon name="AlertCircle" size={48} className="mx-auto text-destructive mb-4" />
            <p className="text-destructive">Ошибка загрузки рецептов</p>
          </div>
        )}

        {!isLoading && !error && recipes.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Coffee" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Рецепты не найдены</p>
          </div>
        )}

        {!isLoading && !error && recipes.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-2xl font-bold mb-4">Все рецепты</h2>
              <div className="space-y-3">
                {recipes.map((recipe) => (
                  <Card
                    key={recipe.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedRecipe?.id === recipe.id ? 'ring-2 ring-primary bg-accent/50' : ''
                    }`}
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{recipe.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {recipe.description}
                        </p>
                      </div>
                      <Badge className={getDifficultyColor(recipe.difficulty_level)}>
                        {recipe.difficulty_level}
                      </Badge>
                    </div>
                    <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {recipe.brewing_time_minutes} мин
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Coffee" size={14} />
                        {recipe.coffee_amount_g}г
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {selectedRecipe && (
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedRecipe.name}</h2>
                      <p className="text-muted-foreground text-lg">{selectedRecipe.description}</p>
                    </div>
                    <Badge className={`${getDifficultyColor(selectedRecipe.difficulty_level)} text-base px-4 py-2`}>
                      {selectedRecipe.difficulty_level}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-8">
                    <Card className="p-4 bg-accent/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Coffee" size={20} className="text-primary" />
                        <span className="text-sm text-muted-foreground">Кофе</span>
                      </div>
                      <p className="text-2xl font-bold">{selectedRecipe.coffee_amount_g}г</p>
                    </Card>
                    <Card className="p-4 bg-accent/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Droplet" size={20} className="text-primary" />
                        <span className="text-sm text-muted-foreground">Вода</span>
                      </div>
                      <p className="text-2xl font-bold">{selectedRecipe.water_amount_ml}мл</p>
                    </Card>
                    <Card className="p-4 bg-accent/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Clock" size={20} className="text-primary" />
                        <span className="text-sm text-muted-foreground">Время</span>
                      </div>
                      <p className="text-2xl font-bold">{selectedRecipe.brewing_time_minutes} мин</p>
                    </Card>
                    <Card className="p-4 bg-accent/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Thermometer" size={20} className="text-primary" />
                        <span className="text-sm text-muted-foreground">Температура</span>
                      </div>
                      <p className="text-2xl font-bold">{selectedRecipe.temperature_celsius}°C</p>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Icon name="ListChecks" size={24} className="text-primary" />
                        Ингредиенты
                      </h3>
                      <p className="text-muted-foreground">{selectedRecipe.ingredients}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Icon name="Wrench" size={24} className="text-primary" />
                        Метод заваривания
                      </h3>
                      <p className="text-muted-foreground">{selectedRecipe.brewing_method}</p>
                    </div>
                  </div>

                  <Button size="lg" className="w-full mt-8">
                    <Icon name="Heart" size={20} className="mr-2" />
                    Добавить в избранное
                  </Button>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
