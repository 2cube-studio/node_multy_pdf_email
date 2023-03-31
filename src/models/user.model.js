import fetch from "node-fetch";
import hubspot from '@hubspot/api-client';

const hubspotClient = new hubspot.Client({ "accessToken": process.env.accessToken });

class JobModel {

    getContactData = async (email) => {
        let data = await fetch(`https://api.hubapi.com/contacts/v1/contact/email/${email}/profile`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'charset': 'utf-8',
                Authorization: `Bearer ${process.env.accessToken}`
            }
        })

        let ContactData = await data.json();

        return ContactData;
    };

    updtPdfUrl = async (filepaths, contId) => {

        

        const properties = {
            "de_pdf": "new_151_en.pdf",
            "fr_pdf": "new_151_es.pdf",
            "it_pdf": "new_151_fr.pdf",
        };
        const SimplePublicObjectInput = { properties };
        const contactId = 151;

        try {
            const apiResponse = await hubspotClient.crm.contacts.basicApi.update(contactId, SimplePublicObjectInput);
            // console.log(JSON.stringify(apiResponse, null, 2));
            return JSON.stringify(apiResponse.results, null, 2);
        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
        }
    }

}

export default new JobModel;