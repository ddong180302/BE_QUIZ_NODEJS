import userService from '../services/userService';

let deleteAUser = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameters!"
            })
        }
        let message = await userService.deleteUser(id);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: 500,
            errMessage: 'Error from the server'
        })
    }

}

let createANewUser = async (req, res) => {
    try {
        const { email, password, username, role } = req.body;
        if (req.file) {
            const image = req.file.buffer
            let response = await userService.saveANewUser(email, password, username, role, image)
            return res.status(200).json(response)

        } else {
            const image = ""
            let response = await userService.saveANewUser(email, password, username, role, image)
            return res.status(200).json(response)
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: 500,
            errMessage: 'Error from the server'
        })
    }
}

let getAllUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        let participants = await userService.getAllUser(token)
        return res.status(200).json(participants)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: 500,
            errMessage: 'Error from the server'
        })
    }
}

let getEditUser = async (req, res) => {
    try {
        const { id, username, role } = req.body;
        if (req.file) {
            let image = req.file.buffer
            let user = await userService.getEditUser(id, username, role, image)
            return res.status(200).json(user)
        }
        else {
            let imageData = req.body.image
            //console.log('check image data:', imageData)
            const image = Buffer.from(imageData, 'base64');
            let user = await userService.getEditUser(id, username, role, image)
            return res.status(200).json(user)
        }
        // else {
        //     let image = ""
        //     let user = await userService.getEditUser(id, username, role, image)
        //     return res.status(200).json(user)
        // }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: 500,
            errMessage: 'Error from the server'
        })
    }
}


const getUserPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit)
        const data = await userService.getUserPagination(page, limit)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: 500,
            errMessage: 'Error from the server'
        })
    }
}


const handleLogin = async (req, res) => {
    try {
        const { email, password, delay } = req.body;
        const data = await userService.handleLogin(email, password, delay)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: 500,
            errMessage: 'Error from the server'
        })
    }
}

const handleRegister = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const data = await userService.handleRegister(email, password, username);
        return res.status(200).json({
            data
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            errCode: 500,
            errMessage: "Error from the server"
        })
    }
}

module.exports = {
    createANewUser: createANewUser,
    getAllUser: getAllUser,
    getEditUser: getEditUser,
    deleteAUser: deleteAUser,
    getUserPagination: getUserPagination,
    handleLogin: handleLogin,
    handleRegister: handleRegister,
}