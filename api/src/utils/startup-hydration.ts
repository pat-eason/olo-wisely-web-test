import { createRestaurant } from '../repositories/restaurant-repository'

export const createInitialRestaurant = async (): Promise<void> => {
  await createRestaurant(
    "OWL Bakery",
    "295 Haywood Rd, Asheville, NC 28806"
  )
}
