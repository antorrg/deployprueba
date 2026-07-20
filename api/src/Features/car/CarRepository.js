import { throwError, processError } from '../../Configs/errorHandlers.js'
import { BaseRepository } from '../../Shared/Repositories/BaseRepository.js'
import { Car as CarModel, User as UserModel, sequelize } from '../../Configs/database.js'
import { Car } from './Car.js'
import { QueryTypes } from 'sequelize'

export class CarRepository {
  #base
  constructor () {
    this.#base = new BaseRepository(CarModel, this.#mapToDomain.bind(this), 'Car')
  }

  // ==========================================
  // HELPER: Mapeo de Base de Datos a Dominio
  // ==========================================
  #mapToDomain (record, userId = null) {
    if (!record) return null
    // Asegurarse de tener un objeto JS puro
    const data = record.toJSON ? record.toJSON() : record

    // Extraer userId si viene en la consulta de join (user_car) o usar el parámetro
    let associatedUserId = userId
    if (data.Users && data.Users.length > 0) {
      associatedUserId = data.Users[0].userId || data.Users[0].id
    }

    return new Car({
      id: data.id,
      userId: associatedUserId,
      patent: data.patent,
      mark: data.mark,
      model: data.model,
      year: data.year,
      motorNum: data.motorNum,
      chassisNum: data.chassisNum,
      observations: data.observations,
      picture: data.picture,
      enabled: data.enabled
    })
  }

  // ==========================================
  // CRUD BÁSICO Y MÉTODOS DE DOMINIO
  // ==========================================

  async getById (id) {
    const record = await CarModel.findByPk(id, {
      include: [UserModel]
    })
    return this.#mapToDomain(record)
  }

  async save (carDomain) {
    try {
      const data = carDomain.toDto()
      if (data.patent) {
        const existingCar = await CarModel.findOne({ where: { patent: data.patent, deletedAt: null } })
        if (existingCar) {
          throwError('La patente de este vehiculo ya esta en uso', 409)
        }
      }

      const newCar = await CarModel.create(data)

      if (data.userId) {
        const user = await UserModel.findByPk(data.userId)
        if (user) {
          await newCar.addUser(user)
        } else {
          throwError('Usuario asociado no encontrado', 404)
        }
      }
    } catch (error) {
      processError(error, 'Error guardando vehiculo')
    }
  }

  async update (id, carDomain) {
    try {
      const data = carDomain.toDto()

      const car = await CarModel.findByPk(id)
      if (!car) { throwError('Vehículo no encontrado', 404) }

      const updated = await car.update(data)
      return this.#mapToDomain(updated, data.userId)
    } catch (error) {
      processError(error, 'Error actualizando vehiculo')
    }
  }

  async changeOwner (carId, newUserId) {
    try {
      const car = await CarModel.findByPk(carId)
      if (!car) { throwError('Vehículo no encontrado', 404) }

      const user = await UserModel.findByPk(newUserId)
      if (!user) { throwError('Nuevo titular no encontrado', 404) }

      // Reemplaza todos los dueños actuales con el nuevo
      await car.setUsers([user])
    } catch (error) {
      processError(error, 'Error cambiando titularidad del vehiculo')
    }
  }

  async delete (id) {
    try {
      await this.#base.delete(id)
    } catch (error) {
      processError(error, `Error eliminando vehiculo ${id}`)
    }
  }

  // ==========================================
  // MÉTODOS DE LECTURA COMPLEJA (SQL CRUDO)
  // ==========================================

  async getCars () {
    const cars = await sequelize.query(
      `
        SELECT
          c."id",
          c."patent",
          c."mark",
          c."model",
          c."year",
          c."motorNum",
          c."chassisNum",
          c."observations",
          c."picture",
          c."enabled",
          COALESCE(
            (
              SELECT jsonb_agg(
                jsonb_build_object(
                  'userId', u."userId",
                  'email', u."email",
                  'name', u."name"
                )
                ORDER BY u."createdAt"
              )
              FROM "user_car" uc
              INNER JOIN "Users" u
                ON u."userId" = uc."UserUserId"
              WHERE uc."CarId" = c."id"
            ),
            '[]'::jsonb
          ) AS "Users"
        FROM "Cars" c
        WHERE
          c."deletedAt" IS NULL
        ORDER BY c."createdAt" DESC;
      `,
      {
        type: QueryTypes.SELECT
      }
    )

    if (cars.length === 0) {
      throwError('Vehículos no hallados', 404)
    }

    return cars
  }

  async carByQuery (patent) {
    const cars = await sequelize.query(
      `
        SELECT
          c."id",
          c."patent",
          c."mark",
          c."model",
          c."year",
          c."motorNum",
          c."chassisNum",
          c."observations",
          c."picture",
          c."enabled",
          COALESCE(
            (
              SELECT jsonb_agg(
                jsonb_build_object(
                  'userId', u."userId",
                  'email', u."email",
                  'name', u."name"
                )
                ORDER BY u."createdAt"
              )
              FROM "user_car" uc
              INNER JOIN "Users" u
                ON u."userId" = uc."UserUserId"
              WHERE uc."CarId" = c."id"
            ),
            '[]'::jsonb
          ) AS "Users"
        FROM "Cars" c
        WHERE
          c."patent" = :patent
          AND c."deletedAt" IS NULL
        LIMIT 1;
      `,
      {
        replacements: { patent },
        type: QueryTypes.SELECT
      }
    )

    const car = cars[0]

    if (!car) {
      throwError('Vehículo no hallado', 404)
    }

    return car
  }

  async carById (carId) {
    const cars = await sequelize.query(
      `
        SELECT
          c."id",
          c."patent",
          c."mark",
          c."model",
          c."year",
          c."motorNum",
          c."chassisNum",
          c."observations",
          c."picture",
          c."enabled",
          COALESCE(
            (
              SELECT jsonb_agg(
                jsonb_build_object(
                  'userId', u."userId",
                  'email', u."email",
                  'name', u."name"
                )
                ORDER BY u."createdAt"
              )
              FROM "user_car" uc
              INNER JOIN "Users" u
                ON u."userId" = uc."UserUserId"
              WHERE uc."CarId" = c."id"
            ),
            '[]'::jsonb
          ) AS "Users"
        FROM "Cars" c
        WHERE
          c."id" = :carId
          AND c."deletedAt" IS NULL
        LIMIT 1;
      `,
      {
        replacements: { carId },
        type: QueryTypes.SELECT
      }
    )

    const car = cars[0]

    if (!car) {
      throwError('Vehículo no hallado', 404)
    }

    return car
  }
}
