import db from "../models/index";
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

let saveANewUser = (email, password, username, role, image) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!email || !password) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required prameters'
                })
            }
            let check = await checkUserEmail(email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, Plz try another email'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(password);
                await db.Participant.create({
                    email: email,
                    password: hashPasswordFromBcrypt,
                    username: username,
                    role: role,
                    image: image
                });
                resolve({
                    errCode: 0,
                    errMessage: 'ok! create a new user succeed!'
                })
            }
        } catch (e) {

            reject(e);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Participant.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let salt = bcrypt.genSaltSync(10);
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}


const getAllUser = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!token) {
                resolve({
                    errCode: -1,
                    data: "",
                    errMessage: "Not authenticated the user"
                })
            }
            const access_token = token.split(" ")[1];
            let decoded = jwt.verify(access_token, process.env.JWT_ACCESS_KEY);
            if (decoded) {
                let data = await db.Participant.findAll({
                    order: [['id', 'DESC']],
                    attributes: {
                        exclude: [
                            "password",
                            "deletedAt",
                            "refreshToken",
                            "refreshExpired",
                            "createdAt",
                            "updatedAt"
                        ]
                    },
                    raw: false,
                    nest: true
                })

                for (let i = 0; i < data.length; i++) {
                    if (data[i].image) {
                        data[i].image = await new Buffer.from(data[i].image, 'binary').toString('base64');
                    } else {
                        data[i].image = '';
                    }
                }

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getEditUser = (id, username, role, image) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !username || !role) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required prameters'
                })
            }

            let user = await db.Participant.update({
                username: username,
                role: role,
                image: image
            }, {
                where: {
                    id: id
                }
            });
            if (user) {
                resolve({
                    errCode: 0,
                    errMessage: 'Update the user successds!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                });
            }

        } catch (e) {
            reject(e)
        }
    })
}


let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Participant.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `the user isn't exist`
                })
            }
            await db.Participant.destroy({
                where: {
                    id: userId
                }
            });
            resolve({
                errCode: 0,
                errMessage: 'delete the user successds!'
            });
        } catch (e) {
            reject(e)
        }
    })
}


const getUserPagination = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!page || !limit) {
                resolve({
                    errCode: 2,
                    errMessage: "'Missing required prameters"
                })
            }
            const offset = (page - 1) * limit;
            const users = await db.Participant.findAndCountAll({
                offset,
                limit,
                order: [['id', 'DESC']],
                attributes: {
                    exclude: [
                        "password",
                        "deletedAt",
                        "refreshToken",
                        "refreshExpired",
                        "createdAt",
                        "updatedAt",
                    ]
                },
                raw: false,
                nest: true
            });
            const totalPages = Math.ceil(users.count / limit); // Tổng số trang


            const data = {
                totalRecords: users.count,
                totalPages,
                users: users.rows,
            };
            if (data && data.users) {
                for (let i = 0; i < data.users.length; i++) {
                    if (data.users[i].image) {
                        data.users[i].image = await new Buffer.from(data.users[i].image, 'binary').toString('base64');
                    } else {
                        data.users[i].image = '';
                    }
                }
            }

            resolve({
                data: data,
                errCode: 0,
                errMessage: 'Ok'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const handleLogin = async (email, password, delay) => {
    //await new Promise(resolve => setTimeout(resolve, delay * 1000));
    //console.log('check delay: ', delay)

    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.Participant.findOne({
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        const access_token = jwt.sign({
                            id: user.id,
                            role: user.role
                        },
                            process.env.JWT_ACCESS_KEY, {
                            expiresIn: "1d"
                        })
                        const refresh_token = jwt.sign({
                            id: user.id,
                            role: user.role
                        },
                            process.env.JWT_REFRESH_KEY, {
                            expiresIn: "1d"
                        })
                        const data = {
                            access_token,
                            refresh_token,
                            username: user.username,
                            role: user.role,
                            image: user.image,
                            email: user.email
                        }
                        if (data && data.image) {
                            data.image = await new Buffer.from(data.image, 'binary').toString('base64')
                        }

                        if (delay) {
                            await new Promise(resolve => setTimeout(resolve, delay));
                        }
                        resolve({
                            data: data,
                            errCode: 0,
                            errMessage: 'Login succeed!'
                        })
                    } else {
                        resolve({
                            errCode: 3,
                            errMessage: 'Wrong password'
                        })
                    }
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: `User's not found~`
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Your's Email isn't exist in your system. Plz try other email!`
                })
            }
            ///resolve
        } catch (e) {
            reject(e)
        }
    })
}

const handleRegister = (email, password, username) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!email || !password || !username) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter!"
                })
            }
            const checkEmail = await checkUserEmail(email)
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email is already in used, Plz try another email"
                })
            } else {
                let hashPassword = await hashUserPassword(password)
                await db.Participant.create({
                    email: email,
                    password: hashPassword,
                    username: username,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create new user succeed!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    saveANewUser: saveANewUser,
    getAllUser: getAllUser,
    getEditUser: getEditUser,
    deleteUser: deleteUser,
    getUserPagination: getUserPagination,
    handleLogin: handleLogin,
    handleRegister: handleRegister,
}
