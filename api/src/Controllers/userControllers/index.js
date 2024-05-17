import compare from './compare.js'
import updatePassword from './resetPassword.js'
import { getUsers, userByQuery, userById, updateUser, deleteUser } from './userControllers.js'
import { userLogin, userCreate } from './userLogin.js'

export default {
    compare,
    updatePassword,
    getUsers,
    userByQuery,
    userById,
    updateUser,
    deleteUser,
    userLogin,
    userCreate
}