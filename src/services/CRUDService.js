// import bcrypt from 'bcryptjs';
// import db from '../models';
// const salt = bcrypt.genSaltSync(10);

// let createNewUser = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashPasswordFromBcrypt = await hashUserPassword(data.password);
//             await db.User.create({
//                 email: data.email,
//                 password: hashPasswordFromBcrypt,
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 address: data.address,
//                 phonenumber: data.phonenumber,
//                 gender: data.gender === '1' ? true : false,
//                 roleId: data.roleId
//             })
//             resolve("ok create new user succeed")
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

// let hashUserPassword = (password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashPassword = await bcrypt.hashSync(password, salt);
//             resolve(hashPassword);
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

// let getAllUser = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let users = await db.User.findAll({
//                 raw: true
//             });
//             resolve(users)
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

// let getUserInfoById = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: { id: userId },
//                 raw: true
//             })
//             if (user) {
//                 resolve(user)
//             }
//             else {
//                 resolve({})
//             }
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

// let updateUserData = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await db.User.update({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 address: data.address,
//             }, {
//                 where: {
//                     id: data.id
//                 }
//             });
//             resolve();
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

// let deleteUserById = (userId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await db.User.destroy({
//                 where: {
//                     id: userId
//                 }
//             })
//             resolve();
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// module.exports = {
//     createNewUser: createNewUser,
//     getAllUser: getAllUser,
//     getUserInfoById: getUserInfoById,
//     updateUserData: updateUserData,
//     deleteUserById: deleteUserById,
// }