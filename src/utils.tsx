import axios from 'axios'
import z from 'zod'
export const customFetchMeals = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const customFetchDrinks = axios.create({
  baseURL: 'https://boozeapi.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const mealSearchParamsSchema = z.object({
  s: z.string().optional().nullable(),
})

export type MealSearchParams = z.infer<typeof mealSearchParamsSchema>

export const mealResponseSchema = z.object({
  meals: z
    .array(
      z.object({
        idMeal: z.string(),
        strMeal: z.string(),
        strMealAlternate: z.string().nullable(),
        strCategory: z.string(),
        strArea: z.string(),
        strInstructions: z.string(),
        strMealThumb: z.string(),
        strTags: z.string().nullable(),
        strYoutube: z.string(),
        strIngredient1: z.string(),
        strIngredient2: z.string(),
        strIngredient3: z.string(),
        strIngredient4: z.string(),
        strIngredient5: z.string(),
        strIngredient6: z.string(),
        strIngredient7: z.string(),
        strIngredient8: z.string(),
        strIngredient9: z.string(),
        strIngredient10: z.string(),
        strIngredient11: z.string(),
        strIngredient12: z.string(),
        strIngredient13: z.string(),
        strIngredient14: z.string(),
        strIngredient15: z.string(),
        strIngredient16: z.string(),
        strIngredient17: z.string(),
        strIngredient18: z.string(),
        strIngredient19: z.string(),
        strIngredient20: z.string(),
        strMeasure1: z.string(),
        strMeasure2: z.string(),
        strMeasure3: z.string(),
        strMeasure4: z.string(),
        strMeasure5: z.string(),
        strMeasure6: z.string(),
        strMeasure7: z.string(),
        strMeasure8: z.string(),
        strMeasure9: z.string(),
        strMeasure10: z.string(),
        strMeasure11: z.string(),
        strMeasure12: z.string(),
        strMeasure13: z.string(),
        strMeasure14: z.string(),
        strMeasure15: z.string(),
        strMeasure16: z.string(),
        strMeasure17: z.string(),
        strMeasure18: z.string(),
        strMeasure19: z.string(),
        strMeasure20: z.string(),
        strSource: z.string(),
        strImageSource: z.string().nullable(),
        strCreativeCommonsConfirmed: z.string().nullable(),
        dateModified: z.string().nullable(),
      }),
    )
    .nullable(),
})

export const drinkSearchParamsSchema = z.object({
  name: z.string().optional().nullable(),
  alcoholic: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).optional(),
  glass_type: z.coerce.number().min(1).optional(),
})

const drinkCategorySchema = z.object({
  id: z.number(),
  label: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})
const drinkGlassTypeSchema = z.object({
  id: z.number(),
  label: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})
const drinkIngredientSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  contains_alcohol: z.boolean(),
  ABV: z.number().nullable(),
  image: z.url(),
  created_at: z.string(),
  updated_at: z.string(),
})
export const CocktailSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: drinkCategorySchema,
  alcoholic: z.boolean(),
  glass_type: drinkGlassTypeSchema,
  instructions: z.string(),
  image: z.url(),
  ingredients: z.array(drinkIngredientSchema),
  created_at: z.string(),
  updated_at: z.string(),
})
export const drinkResponseSchema = z.object({
  pagination: z.object({
    count: z.number(),
    pages: z.number(),
  }),
  data: z.array(CocktailSchema).optional(),
})
export type MealResponse = z.infer<typeof mealResponseSchema>
export type DrinkResponse = z.infer<typeof drinkResponseSchema>
export type DrinkSearchParams = z.infer<typeof drinkSearchParamsSchema>
export type SingleCocktailResponse = z.infer<typeof CocktailSchema>
