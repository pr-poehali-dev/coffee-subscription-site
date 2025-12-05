'''
Добавить новый кофейный рецепт в базу данных
'''
import json
import os
from typing import Dict, Any, Optional
import psycopg2
from pydantic import BaseModel, Field, ValidationError

class RecipeRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1)
    ingredients: str = Field(..., min_length=1)
    brewing_method: str = Field(..., min_length=1)
    coffee_amount_g: int = Field(..., gt=0)
    water_amount_ml: int = Field(..., gt=0)
    brewing_time_minutes: int = Field(..., gt=0)
    temperature_celsius: Optional[int] = Field(None, ge=0, le=100)
    difficulty_level: str = Field(..., pattern='^(легкий|средний|сложный)$')
    image_url: Optional[str] = None

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    recipe_req = RecipeRequest(**body_data)
    
    database_url: str = os.environ.get('DATABASE_URL', '')
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO coffee_recipes 
        (name, description, ingredients, brewing_method, coffee_amount_g, 
         water_amount_ml, brewing_time_minutes, temperature_celsius, 
         difficulty_level, image_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (
        recipe_req.name,
        recipe_req.description,
        recipe_req.ingredients,
        recipe_req.brewing_method,
        recipe_req.coffee_amount_g,
        recipe_req.water_amount_ml,
        recipe_req.brewing_time_minutes,
        recipe_req.temperature_celsius,
        recipe_req.difficulty_level,
        recipe_req.image_url
    ))
    
    recipe_id = cursor.fetchone()[0]
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'recipe_id': recipe_id}),
        'isBase64Encoded': False
    }
