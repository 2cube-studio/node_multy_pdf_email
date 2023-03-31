import fetch from "node-fetch";

import sendEmail from '../utils/sendEmail.utils.js';
import userModel from "../models/user.model.js";


/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {

    findContact = async (req, res, next) => {
        let email = req.body.email

        const hs_contact = await userModel.getContactData(email)

        req.body.id = hs_contact.vid;
        const bodyData = req.body;
        // console.log(bodyData)

        await sendEmail(bodyData);

    };
    upateUrl = async (filepaths, contId) => {
        // console.log('controller', filepaths)
        await userModel.updtPdfUrl(filepaths, contId)
    };

    email_store = async (req, res) => {
        const bodyData = req.body;

        // console.log(bodyData)
        await sendEmail(bodyData);

    };
}


/******************************************************************************
*                               Export
******************************************************************************/
export default new UserController;