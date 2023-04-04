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

        if (hs_contact !== null) {
            req.body.id = hs_contact.vid;
            const bodyData = req.body;

            await sendEmail(bodyData);
        } else {
            return res.status(500).json({ message: `Incorrect this email '${req.body.email}'.` });
        }

    };
    upateUrl = async (contId, req, res) => {
        const result = await userModel.updtPdfUrl(contId);
        res.status(200).send();
        // console.log(result.status)
        // return res.status(500).json({ message: `Incorrect this email ` });
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