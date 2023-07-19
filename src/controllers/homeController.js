import db from "../models/index";
import CRUDService from "../services/CRUDService";








let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error)
    }

}

let getCRUD = async (req, res) => {
    return res.render('crud.ejs')
}



let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {

    let userId = req.query.id;

    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        return res.render('editCRUD.ejs', {
            userData: userData
        })

    } else {
        return res.send('hello bà chằn bích thảo')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data)
    return res.redirect("/get-crud");
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id)
        return res.redirect('/get-crud')
    } else {
        return res.send('hello')
    }
}


module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}