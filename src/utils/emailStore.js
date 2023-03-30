import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

// Set up API key and contact ID
const apiKey = 'YOUR_API_KEY';
const contactId = 'YOUR_CONTACT_ID';

// Set up form data payload with email data and PDF file
const formData = new FormData();
formData.append('engagement', JSON.stringify({
  "engagement": {
    "type": "EMAIL",
    "ownerId": 1, // Replace with your owner ID
    "timestamp": Date.now()
  },
  "associations": {
    "contactIds": [contactId]
  }
}));
formData.append('attachments', fs.createReadStream('/2cube-test.pdf'));

// Set up headers for HTTP request
const headers = {
  'Authorization': `Bearer ${apiKey}`,
  ...formData.getHeaders()
};

// Send HTTP POST request to HubSpot API
axios.post('https://api.hubapi.com/engagements/v1/engagements', formData, { headers })
  .then(response => {
    console.log('Email with PDF attachment successfully stored in HubSpot contact.');
  })
  .catch(error => {
    console.error('Error storing email with PDF attachment in HubSpot contact:', error);
  });
