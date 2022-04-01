import HttpError from "http-errors";
import userModel from '../models/usersModel.js'
import bcrypt from 'bcrypt';
import messagesapp from "../data/messages.js";



const register = (req, res, next) => {
    console.log(`---> userController::register`);

    try {
        const body = req.body;
        let result;
        console.log(`---> userController::register ${body.password}`);
        const user = { username: body.username, password: body.password, timestamp: (body.timestamp || 0) , active: (body.avtive || 1)};

        result = userModel.getUser(user);
        if (result != undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            result = userModel.createUser(user);
            if (result < 0)
                next(HttpError(400, { message: messagesapp.user_error_register }))
            
            const resultado = JSON.parse(JSON.stringify(result));

            delete resultado.password;
            delete resultado.active;

            resultado.message = messagesapp.user_loged_successfully;
            res.status(201).json(resultado);
        }

    } catch (error) {
        next(error);
    }

};

const login = (req, res, next) => {
    console.log(`---> userController::login`);

    try {
        const body = req.body;
        const user = { username: body.username, password: body.password };
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            console.log(`---> userController::login ${result.password}`);
            console.log(`---> userController::login ${body.password}`);

            if (!result.active){
                next(HttpError(400, { message: messagesapp.user_error_active}));
            }else{

                if (!bcrypt.compareSync(body.password, result.password))
                    next(HttpError(400, { message: messagesapp.user_error_login }));
                else{
                    //devolver user login con notices.js
                    //console.log("---> userController::getNotices");
                    const resultado = JSON.parse(JSON.stringify(result));

                    delete resultado.password;
                    delete resultado.active;

                    resultado.message = messagesapp.user_loged_successfully;


                    const noticess = userModel.getNotices(result);

                    if (noticess != undefined){
                        resultado.notices = noticess.notices;
                    }
                    res.status(200).json(resultado);
                }
            }

        }

    } catch (error) {
        next(error);
    }
};

const updatePassword = (req, res, next) => {
    console.log(`---> userController::updatePassword`);

    try {
        const body = req.body;
        const user = { username: body.username, password: body.password, newpassword: body.newpassword };
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            if (!bcrypt.compareSync(body.password, result.password))
                next(HttpError(400, { message: messagesapp.user_error_login  }));
            else {
                const result_new = userModel.updatePassword(user);
                
                const resultado = JSON.parse(JSON.stringify(result_new));

                delete resultado.password;
                delete resultado.active;

                
                res.status(201).json(resultado);
            }
        }

    } catch (error) {
        next(error);
    }
};


const addGrantPrivileges = (req, res, next) => {
    console.log(`---> userController::addGrantPrivileges`);

    try {
        const body = req.body;
        const user = { username: body.username, grants: body.grants };
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.addGrantPrivileges(user);
            const resultado = JSON.parse(JSON.stringify(result_new));
            delete resultado.password;
            delete resultado.active;
            

            res.status(201).json(resultado);
        }
    } catch (error) {
        next(error);
    }
};


const insertGrantPrivileges = (req, res, next) => {
    console.log(`---> userController::insertGrantPrivileges`);

    try {
        const body = req.body;
        const user = { username: body.username, grants: body.grants };
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.insertGrantPrivileges(user);
            const resultado = JSON.parse(JSON.stringify(result_new));

            delete resultado.password;
            delete resultado.active;

            
            res.status(201).json(resultado);
        }
    } catch (error) {
        next(error);
    }
};



const deleteGrantPrivileges = (req, res, next) => {
    console.log(`---> userController::deleteGrantPrivileges`);

    try {
        const body = req.body;
        const user = { username: body.username, grants: body.grants };
        const result = userModel.getUser(user);

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.deleteGrantPrivileges(user);
            const resultado = JSON.parse(JSON.stringify(result_new));

            delete resultado.password;
            delete resultado.active;
            
            res.status(201).json(resultado);
        }
    } catch (error) {
        next(error);
    }
};

const getUser = (req, res, next) => {
    console.log(`---> userController::getUser`);

    try {
        console.log(req.params.user)
        const user = req.params.user;
        const result = userModel.getUser({username:user});
        
        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const resultado = JSON.parse(JSON.stringify(result));

            delete resultado.password;
            delete resultado.active;

            resultado.message = messagesapp.user_error_username;

            res.status(200).json(resultado);
        }
    } catch (error) {
        next(error);
    }
}

const deleteUser = (req, res, next) => {
    console.log(`---> userController::dropUser`);

    try {
        const body = req.body;
        const user = { username: body.username };
        const result = userModel.getUser(user);
       

        if (result === undefined) {
            next(HttpError(400, { message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.dropUser(user);
            const resultado = JSON.parse(JSON.stringify(result_new));

            delete resultado.password;
            delete resultado.active;

            resultado.message = messagesapp.user_error_username
            res.status(201).json(resultado);
        }
    } catch (error) {
        next(error);
    }
};


const activeUser = (req, res, next) => {
    console.log(`---> userController::activeUser`);

    try {
        const body = req.body;
        const user = { username: body.username };
        const result = userModel.getUser(user);
       
        if (result === undefined) {
            next(HttpError(400, {message: messagesapp.user_error_username }));
        } else {
            const result_new = userModel.raiseUser(user);
            const resultado = JSON.parse(JSON.stringify(result_new));

            delete resultado.password;
            delete resultado.active;

            resultado.message = messagesapp.user_error_username
            res.status(201).json(resultado);
        }
    } catch (error) {
        next(error);
    }
};


export default {
    register,
    login,
    updatePassword,
    addGrantPrivileges,
    deleteGrantPrivileges,
    insertGrantPrivileges,
    getUser,
    deleteUser,
    activeUser

}