import { carService } from '../../src/Shared/dependencies.js'

export async function seedCarsForE2E (users) {
  const carsToCreate = [
    {
      userId: users['victima@test.com'].userId, // El dueño inicial
      patent: 'ABC123XX',
      mark: 'Toyota',
      model: 'Corolla',
      year: '2020',
      motorNum: 'MOT123456',
      chassisNum: 'CHA123456',
      observations: 'Auto de prueba',
      picture: 'default.jpg'
    },
    {
      userId: users['usuario@test.com'].userId, // Otro auto
      patent: 'XYZ987WW',
      mark: 'Ford',
      model: 'Focus',
      year: '2019',
      motorNum: 'MOT654321',
      chassisNum: 'CHA654321',
      observations: 'Auto de usuario',
      picture: 'default.jpg'
    }
  ]

  const createdCars = {}

  for (const c of carsToCreate) {
    try {
      const car = await carService.registerCar(c)
      createdCars[c.patent] = car
    } catch (e) {
      console.log(`[Seed] Error o vehículo ya existe ${c.patent}:`, e.message)
      // Si falló (ej. patente duplicada), lo buscamos
      const existing = await carService.getCarByQuery(c.patent)
      if (existing) {
        createdCars[c.patent] = existing
      }
    }
  }

  return createdCars
}
