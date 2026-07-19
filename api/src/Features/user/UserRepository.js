import { QueryTypes } from 'sequelize'
import { throwError, processError } from '../../Configs/errorHandlers.js'
import { User as UserModel, sequelize } from '../../Configs/database.js'
import { BaseRepository } from '../../Shared/Repositories/BaseRepository.js'
import { User } from './User.js'
import envConfig from '../../Configs/envConfig.js'

export class UserRepository {
  #base

  constructor () {
    this.#base = new BaseRepository(UserModel, this.#mapToDomain.bind(this), 'User')
  }

  // ==========================================
  // HELPER: Mapeo de Base de Datos a Dominio
  // ==========================================
  #mapToDomain (record) {
    if (!record) return null
    // Asegurarse de tener un objeto JS puro
    const data = record.toJSON ? record.toJSON() : record

    return new User({
      userId: data.userId,
      email: data.email,
      password: data.password,
      typeId: data.typeId,
      numberId: data.numberId,
      name: data.name,
      nickname: data.nickname,
      picture: data.picture,
      role: data.role,
      enabled: data.enabled
    })
  }

  // ==========================================
  // CRUD BÁSICO Y MÉTODOS DE DOMINIO
  // ==========================================

  async getById (id) {
    return await this.#base.getById(id)
  }

  async getAuthCredentials (email) {
    try {
      const record = await UserModel.findOne({ where: { email, deletedAt: null } })
      return this.#mapToDomain(record)
    } catch (error) {
      processError(error, 'Error buscando usuario por email')
    }
  }

  async save (userDomain) {
    try {
      const data = userDomain.toPersistence()
      const existingUser = await UserModel.findOne({ where: { email: data.email, deletedAt: null } })
      if (existingUser) {
        throwError('Este email de usuario ya esta en uso', 409)
      }
      // Delegar al repositorio base
      await this.#base.create(data)
    } catch (error) {
      processError(error, 'Error guardando usuario')
    }
  }

  async update (id, userDomain) {
    try {
      const data = userDomain.toPersistence()
      const updated = await this.#base.update(data.userId, data)
      return this.#mapToDomain(updated)
    } catch (error) {
      processError(error, 'Error actualizando usuario')
    }
  }

  async delete (id) {
    try {
      await this.#base.delete(id)
    } catch (error) {
      processError(error, `Error eliminando usuario ${id}`)
    }
  }

  // ==========================================
  // MÉTODOS DE LECTURA COMPLEJA (SQL CRUDO)
  // ==========================================

  async getUsers () {
    const rootEmail = envConfig.RootEmail || 'root@example.com'

    const users = await sequelize.query(
      `
        SELECT
          u."userId",
          u."email",
          u."typeId",
          u."numberId",
          u."role",
          u."name",
          u."nickname",
          u."picture",
          u."enabled",
          COALESCE(
            (
              SELECT jsonb_agg(
                jsonb_build_object(
                  'patent', c."patent",
                  'id', c."id"
                )
                ORDER BY c."id"
              )
              FROM "user_car" uc
              INNER JOIN "Cars" c
                ON c."id" = uc."CarId"
              WHERE uc."UserUserId" = u."userId"
            ),
            '[]'::jsonb
          ) AS "Cars"
        FROM "Users" u
        WHERE
          u."deletedAt" IS NULL
          AND u."email" NOT IN (:rootEmail)
        ORDER BY u."createdAt" DESC;
      `,
      {
        replacements: { rootEmail },
        type: QueryTypes.SELECT
      }
    )

    if (users.length === 0) {
      throwError('Usuarios no hallados', 404)
    }

    return users
  }

  async userByQuery (numberId) {
    const users = await sequelize.query(
      `
        SELECT
          u."userId",
          u."email",
          u."typeId",
          u."numberId",
          u."role",
          u."name",
          u."nickname",
          u."picture",
          u."enabled",
          COALESCE(
            (
              SELECT jsonb_agg(
                jsonb_build_object(
                  'patent', c."patent",
                  'id', c."id"
                )
                ORDER BY c."id"
              )
              FROM "user_car" uc
              INNER JOIN "Cars" c
                ON c."id" = uc."CarId"
              WHERE uc."UserUserId" = u."userId"
            ),
            '[]'::jsonb
          ) AS "Cars"
        FROM "Users" u
        WHERE
          u."numberId" = :numberId
          AND u."deletedAt" IS NULL
        LIMIT 1;
      `,
      {
        replacements: { numberId },
        type: QueryTypes.SELECT
      }
    )

    const user = users[0]

    if (!user) {
      throwError('Usuario no hallado', 404)
    }

    return user
  }

  async userById (userId) {
    const users = await sequelize.query(
      `
        SELECT
          u."userId",
          u."email",
          u."typeId",
          u."numberId",
          u."role",
          u."name",
          u."nickname",
          u."picture",
          u."enabled",
          COALESCE(
            (
              SELECT jsonb_agg(
                jsonb_build_object(
                  'patent', c."patent",
                  'id', c."id"
                )
                ORDER BY c."id"
              )
              FROM "user_car" uc
              INNER JOIN "Cars" c
                ON c."id" = uc."CarId"
              WHERE uc."UserUserId" = u."userId"
            ),
            '[]'::jsonb
          ) AS "Cars"
        FROM "Users" u
        WHERE
          u."userId" = :userId
          AND u."deletedAt" IS NULL
        LIMIT 1;
      `,
      {
        replacements: { userId },
        type: QueryTypes.SELECT
      }
    )

    const user = users[0]

    if (!user) {
      throwError('Usuario no hallado', 404)
    }

    return user
  }
}
