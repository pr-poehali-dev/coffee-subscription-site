'''
Business: Get coffee recipes from PostgreSQL database
Args: event - dict with httpMethod, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response with coffee recipes JSON array
'''
import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    database_url: str = os.environ.get('DATABASE_URL', '')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    conn = None
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        params = event.get('queryStringParameters', {}) or {}
        difficulty: Optional[str] = params.get('difficulty')
        
        if difficulty:
            safe_difficulty = difficulty.replace("'", "''")
            query = f"""
                SELECT id, name, description, ingredients, brewing_method, 
                       coffee_amount_g, water_amount_ml, brewing_time_minutes, 
                       temperature_celsius, difficulty_level, image_url, 
                       created_at, updated_at
                FROM coffee_recipes 
                WHERE difficulty_level = '{safe_difficulty}'
                ORDER BY name
            """
            cursor.execute(query)
        else:
            query = """
                SELECT id, name, description, ingredients, brewing_method, 
                       coffee_amount_g, water_amount_ml, brewing_time_minutes, 
                       temperature_celsius, difficulty_level, image_url, 
                       created_at, updated_at
                FROM coffee_recipes 
                ORDER BY name
            """
            cursor.execute(query)
        
        recipes: List[Dict[str, Any]] = []
        for row in cursor.fetchall():
            recipe_dict = dict(row)
            if recipe_dict.get('created_at'):
                recipe_dict['created_at'] = recipe_dict['created_at'].isoformat()
            if recipe_dict.get('updated_at'):
                recipe_dict['updated_at'] = recipe_dict['updated_at'].isoformat()
            recipes.append(recipe_dict)
        
        cursor.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'recipes': recipes, 'count': len(recipes)}),
            'isBase64Encoded': False
        }
    
    finally:
        if conn:
            conn.close()
