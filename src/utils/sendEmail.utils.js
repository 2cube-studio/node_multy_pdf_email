import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import util from 'util';

const sendEMail = async (req, res, data) => {
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

    // Example usage
    async function main() {
        // const udata = {
        //     fname: data.firstname,
        //     lname: data.lastname,
        //     email: data.email
        // }

        // English data
        const data_en = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com'
        }

        // French data
        const data_fr = {
            firstname: 'Jean',
            lastname: 'Dupont',
            email: 'jean.dupont@example.com'
        }

        // Spanish data
        const data_es = {
            firstname: 'Juan',
            lastname: 'Pérez',
            email: 'juan.perez@example.com'
        }

        // English PDF
        const htmlTemplate_en = fs.readFileSync(path.resolve() + '/src/assets/templates/index_en.html', 'utf8');
        const html_en = htmlTemplate_en.replace('{{fname}}', data_en.firstname)
            .replace('{{lname}}', data_en.lastname)
            .replace('{{email}}', data_en.email);
        const css_en = fs.readFileSync(path.resolve() + '/src/assets/templates/css/style.css', 'utf8');
        const pdfBuffer_en = await generatePDF(html_en, css_en);
        const filePath_en = path.resolve() + '/public/pdf_files/2cube-test_en.pdf';
        await writeFileAsync(filePath_en, pdfBuffer_en);
        const pdfPath_en = filePath_en;
        // console.log(`PDF saved to ${filePath_en}`);

        // French PDF
        const htmlTemplate_fr = fs.readFileSync(path.resolve() + '/src/assets/templates/index_fr.html', 'utf8');
        const html_fr = htmlTemplate_fr.replace('{{fname}}', data_fr.firstname)
            .replace('{{lname}}', data_fr.lastname)
            .replace('{{email}}', data_fr.email);
        const css_fr = fs.readFileSync(path.resolve() + '/src/assets/templates/css/style.css', 'utf8');
        const pdfBuffer_fr = await generatePDF(html_fr, css_fr);
        const filePath_fr = path.resolve() + '/public/pdf_files/2cube-test_fr.pdf';
        await writeFileAsync(filePath_fr, pdfBuffer_fr);
        const pdfPath_fr = filePath_fr;
        // console.log(`PDF saved to ${filePath_fr}`);

        // Spanish PDF
        const htmlTemplate_es = fs.readFileSync(path.resolve() + '/src/assets/templates/index_es.html', 'utf8');
        const html_es = htmlTemplate_es.replace('{{fname}}', data_es.firstname)
            .replace('{{lname}}', data_es.lastname)
            .replace('{{email}}', data_es.email);
        const css_es = fs.readFileSync(path.resolve() + '/src/assets/templates/css/style.css', 'utf8');
        const pdfBuffer_es = await generatePDF(html_es, css_es);
        const filePath_es = path.resolve() + '/public/pdf_files/2cube-test_es.pdf';
        await writeFileAsync(filePath_es, pdfBuffer_es);
        const pdfPath_es = filePath_es;
        // console.log(`PDF saved to ${filePath_es}`);

        // Email all PDFs
        // const attachments = [
        //     { filename: '2cube-test_en.pdf', content: pdfBuffer_en },
        //     { filename: '2cube-test_fr.pdf', content: pdfBuffer_fr },
        //     { filename: '2cube-test_es.pdf', content: pdfBuffer_es }
        // ];

        // Return an array of file paths
        return [pdfPath_en, pdfPath_fr, pdfPath_es];
    }

    // main();

    // Call main() and log the returned file paths
    main().then((pdfPaths) => {
        console.log('PDF files saved to:', pdfPaths);
    });


};

export default sendEMail;