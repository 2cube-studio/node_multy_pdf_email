import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import request from 'request';
import axios from 'axios';
import FormData from 'form-data';


import sendEmail from '../utils/sendEmail.utils.js';



/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {

    register = async (req, res, next) => {

        let data = {
            "firstname": "vikram ravaliya",
            "lastname": "ahir",
            "email": "vikram.ahir4@gmail.com"
        }
        
        const result = await sendEmail(data);
        
        next();
    };

    email_store = async (req, res) => {

        const userPdf = await sendEmail();
        console.log(userPdf)

        // //===* multiple file's store in hubdb *====//
        // const postUrl = 'https://api.hubapi.com/filemanager/api/v3/files/upload';
        // const accessToken = '';
        // const headers = {
        //     'Authorization': `Bearer ${accessToken}`
        // };

        // const fileOptions = {
        //     access: 'PUBLIC_INDEXABLE',
        //     ttl: 'P3M',
        //     overwrite: false,
        //     duplicateValidationStrategy: 'NONE',
        //     duplicateValidationScope: 'ENTIRE_PORTAL'
        // };

        // const folderPath = '108246491403';
        // const filepaths = [
        //     path.resolve() + '/public/pdf_files/2cube-test_en.pdf',
        //     path.resolve() + '/public/pdf_files/2cube-test_es.pdf',
        //     path.resolve() + '/public/pdf_files/2cube-test_fr.pdf'
        // ];

        // filepaths.forEach((filepath) => {
        //     const formData = {
        //         file: fs.createReadStream(filepath),
        //         options: JSON.stringify(fileOptions),
        //         folderPath: folderPath
        //     };

        //     request.post({
        //         url: postUrl,
        //         formData: formData,
        //         headers: headers
        //     }, function optionalCallback(err, httpResponse, body) {
        //         if (err) {
        //             console.error('Error:', err);
        //             return;
        //         }
        //         console.log(`File ${filepath} uploaded successfully`);
        //     });
        // });


         // //===* single file store in hubdb *====//
        // const postUrl = 'https://api.hubapi.com/filemanager/api/v3/files/upload';
        // const accessToken = '';
        // const headers = {
        //     'Authorization': `Bearer ${accessToken}`
        // };

        // // const filename = '/2cube-test.pdf';
        // const filename = path.resolve() + '/public/pdf_files/2cube-test_es.pdf';

        // const fileOptions = {
        //     access: 'PUBLIC_INDEXABLE',
        //     ttl: 'P3M',
        //     overwrite: false,
        //     duplicateValidationStrategy: 'NONE',
        //     duplicateValidationScope: 'ENTIRE_PORTAL'
        // };

        // const formData = {
        //     file: fs.createReadStream(filename),
        //     options: JSON.stringify(fileOptions),
        //     folderPath: '108246491403'
        // };

        // request.post({
        //     url: postUrl,
        //     formData: formData,
        //     headers: headers
        // }, function optionalCallback(err, httpResponse, body) {
        //     if (err) {
        //         console.error('Error:', err);
        //         return;
        //     }
        //     // console.log('Response:', httpResponse.statusCode, body);
        //     res.status(200).send(body);
        // });
    };

    // hash password 
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12);
        }
    }
}


/******************************************************************************
*                               Export
******************************************************************************/
export default new UserController;