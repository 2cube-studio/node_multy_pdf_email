import fetch from "node-fetch";
import hubspot from '@hubspot/api-client';



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

        if (ContactData.category == "OBJECT_NOT_FOUND") {
            return null;
        } else {
            return ContactData
        }
    };

    //Base URL - https://6107279.fs1.hubspotusercontent-na1.net/hubfs/6107279/Energiesparrechner_PDFs/
    updtPdfUrl = async (contId, req, res) => {
        let data = []

        const hubspotClient = new hubspot.Client({ "accessToken": process.env.accessToken });

        let baseURL = 'https://6107279.fs1.hubspotusercontent-na1.net/hubfs/6107279/Energiesparrechner_PDFs/';
        const properties = {
            "de_pdf": `${baseURL}${contId}_de.pdf`,
            "fr_pdf": `${baseURL}${contId}_fr.pdf`,
            "it_pdf": `${baseURL}${contId}_it.pdf`,
        };
        const SimplePublicObjectInput = { properties };
        const contactId = contId;

        try {
            const apiResponse = await hubspotClient.crm.contacts.basicApi.update(contactId, SimplePublicObjectInput);
            // console.log(JSON.stringify(apiResponse.results, null, 2));
            // return JSON.stringify(apiResponse.results, null, 2);
            data['create_res'] = apiResponse
        } catch (e) {
            e.message === 'HTTP request failed' ?
                console.error(JSON.stringify(e.response, null, 2)) :
                console.error(e)
        }
    }

}

export default new JobModel;