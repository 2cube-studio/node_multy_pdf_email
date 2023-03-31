import sendEmail from '../utils/sendEmail.utils.js';


/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {

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