import { userService } from '../../src/Shared/dependencies.js'
import { User as UserModel } from '../../src/Configs/database.js'

export async function seedUsersForE2E () {
  const usersToCreate = [
    { email: 'dueno@test.com', role: 'DUENO' },
    { email: 'mecanico@test.com', role: 'MECANICO' },
    { email: 'usuario@test.com', role: 'USUARIO' },
    { email: 'victima@test.com', role: 'USUARIO' }
  ]

  const createdUsers = {}

  for (const u of usersToCreate) {
    try {
      // 1. Registramos al usuario usando el flujo normal (queda con rol USUARIO por defecto)
      const user = await userService.registerUser({
        email: u.email,
        passwordRaw: 'password123',
        typeId: 'DNI',
        numberId: '12345678'
      })

      // 2. Si el rol necesario es distinto a USUARIO, forzamos el cambio en la base de datos
      if (u.role !== 'USUARIO') {
        await UserModel.update(
          { role: u.role },
          { where: { userId: user.userId } }
        )
        user.role = u.role
      }

      // Guardamos para uso en los tests referenciándolo por su email
      createdUsers[u.email] = user
    } catch (e) {
      console.log(`[Seed] Error o usuario ya existe ${u.email}:`, e.message)
      // Si falló (ej. ya existe), podríamos intentar buscarlo en la DB
      const existing = await UserModel.findOne({ where: { email: u.email } })
      if (existing) {
        createdUsers[u.email] = existing.toJSON()
      }
    }
  }

  return createdUsers
}
