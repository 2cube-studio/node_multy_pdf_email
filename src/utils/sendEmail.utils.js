import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import util from 'util';
import request from 'request';
import userController from '../controllers/user.controller.js';


const sendEMail = async (bodyData) => {
    const writeFileAsync = util.promisify(fs.writeFile);

    // Function to generate PDF file from HTML and CSS
    async function generatePDF(html, css) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.addStyleTag({ content: css });
        const pdfBuffer = await page.pdf();
        await browser.close();
        return pdfBuffer;
    }

    async function StorePdf(filePath_en, filePath_fr, filePath_es) {

        //===* multiple file's store in hubdb *====//
        const postUrl = 'https://api.hubapi.com/filemanager/api/v3/files/upload';
        const headers = {
            Authorization: `Bearer ${process.env.accessToken}`
        };

        const fileOptions = {
            access: 'PUBLIC_INDEXABLE',
            ttl: 'P3M',
            overwrite: false,
            duplicateValidationStrategy: 'NONE',
            duplicateValidationScope: 'ENTIRE_PORTAL'
        };

        const folderPath = `${process.env.folderPath}`;
        // const filepaths = [
        //     path.resolve() + '/public/pdf_files/2cube-test_en.pdf',
        //     path.resolve() + '/public/pdf_files/2cube-test_es.pdf',
        //     path.resolve() + '/public/pdf_files/2cube-test_fr.pdf'
        // ];
        const filepaths = [filePath_en, filePath_fr, filePath_es];
        const contId = bodyData.id;        

        filepaths.forEach((filepath) => {
            const formData = {
                file: fs.createReadStream(filepath),
                options: JSON.stringify(fileOptions),
                folderPath: folderPath
            };

            request.post({
                url: postUrl,
                formData: formData,
                headers: headers
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    console.error('Error:', err);
                    return;
                }
                console.log(`File ${filepath} uploaded successfully`);
                // res.status(200).send('File uploaded successfully')
            });
        });
        await userController.upateUrl(filepaths, contId);

    }

    // Example usage
    async function main() {
        // const en_data = bodyData.data_en;
        // const fr_data = bodyData.data_fr;
        // const es_data = bodyData.data_es;

        const en_data = bodyData;
        const fr_data = bodyData;
        const es_data = bodyData;

        // English data
        const data_en = {
            id: en_data.id,
            firstname: en_data.firstname,
            lastname: en_data.lastname,
            email: en_data.email
        }

        // French data
        const data_fr = {
            id: fr_data.id,
            firstname: fr_data.firstname,
            lastname: fr_data.lastname,
            email: fr_data.email
        }

        // Spanish data
        const data_es = {
            id: en_data.id,
            firstname: es_data.firstname,
            lastname: es_data.lastname,
            email: es_data.email
        }

        // console.log(data_en, data_fr, data_es)

        // English PDF
        const htmlTemplate_en = fs.readFileSync(path.resolve() + '/src/assets/templates/index_en.html', 'utf8');
        const html_en = htmlTemplate_en.replace('{{fname}}', data_en.firstname)
            .replace('{{lname}}', data_en.lastname)
            .replace('{{email}}', data_en.email);
        const css_en = fs.readFileSync(path.resolve() + '/src/assets/templates/css/style.css', 'utf8');
        const pdfBuffer_en = await generatePDF(html_en, css_en);
        const filePath_en = path.resolve() + `/public/pdf_files/${data_en.id}_en.pdf`;
        await writeFileAsync(filePath_en, pdfBuffer_en);
        console.log(`PDF saved to ${filePath_en}`);

        // French PDF
        const htmlTemplate_fr = fs.readFileSync(path.resolve() + '/src/assets/templates/index_fr.html', 'utf8');
        const html_fr = htmlTemplate_fr.replace('{{fname}}', data_fr.firstname)
            .replace('{{lname}}', data_fr.lastname)
            .replace('{{email}}', data_fr.email);
        const css_fr = fs.readFileSync(path.resolve() + '/src/assets/templates/css/style.css', 'utf8');
        const pdfBuffer_fr = await generatePDF(html_fr, css_fr);
        const filePath_fr = path.resolve() + `/public/pdf_files/${data_fr.id}_fr.pdf`;
        await writeFileAsync(filePath_fr, pdfBuffer_fr);
        const pdfPath_fr = filePath_fr;
        console.log(`PDF saved to ${filePath_fr}`);

        // Spanish PDF
        const htmlTemplate_es = fs.readFileSync(path.resolve() + '/src/assets/templates/index_es.html', 'utf8');
        const html_es = htmlTemplate_es.replace('{{fname}}', data_es.firstname)
            .replace('{{lname}}', data_es.lastname)
            .replace('{{email}}', data_es.email);
        const css_es = fs.readFileSync(path.resolve() + '/src/assets/templates/css/style.css', 'utf8');
        const pdfBuffer_es = await generatePDF(html_es, css_es);
        const filePath_es = path.resolve() + `/public/pdf_files/${data_es.id}_es.pdf`;
        await writeFileAsync(filePath_es, pdfBuffer_es);
        console.log(`PDF saved to ${filePath_es}`);

        // Email all PDFs
        const attachments = [
            { filename: '2cube-test_en.pdf', content: pdfBuffer_en },
            { filename: '2cube-test_fr.pdf', content: pdfBuffer_fr },
            { filename: '2cube-test_es.pdf', content: pdfBuffer_es }
        ];
        await StorePdf(filePath_en, filePath_fr, filePath_es);
    }

    main();

};

export default sendEMail;
