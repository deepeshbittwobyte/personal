const express = require('express');
const axios = require('axios');
const qs = require('qs');
const app = express();
const port = 7001;

// Replace these values with your actual details
const tenantId = '1bdfd12c-2a78-4966-aaa9-85cdc5ca4a7c';
const clientId = '4073f03c-c3f8-4a4e-a597-97ff68ecb140';
const clientSecret = '45e34058-b433-4b73-82ef-fba1094400d5';
const sharepointSiteUrl = 'https://b2btechnology.sharepoint.com/:x:/r/sites/B2B_sharepoint_data/_layouts/15/Doc.aspx?sourcedoc=%7B5982EAD2-20B1-4B92-BFFC-C3070C606BD7%7D&file=API_TEST.xlsx&action=default&mobileredirect=true';
const sharepointListTitle = 'API_TEST';

// Function to get access token
const getAccessToken = async () => {
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials'
  };

  try {
    const response = await axios.post(tokenUrl, qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log('Access Token Retrieved Successfully');
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

app.get('/api', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const sharepointUrl = `${sharepointSiteUrl}/_api/web/lists/getbytitle('${sharepointListTitle}')/items`;

    const response = await axios.get(sharepointUrl, {
      headers: {
        'Accept': 'application/json;odata=verbose',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    res.json(response.data.d.results);
  } catch (error) {
    console.error('Error fetching data from SharePoint:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching data from SharePoint');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});







// const express = require('express');
// const xlsx = require('xlsx');
// const cors = require('cors');
// const app = express();
// const port = 6003;

// app.use(cors()); // Add this line

// // Function to read data from Excel file
// const readExcelData = (filePath) => {
//   const workbook = xlsx.readFile(filePath);
//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];
//   const data = xlsx.utils.sheet_to_json(worksheet);
//   return data;
// };

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Excel Data API. Access /api/FinancialSample to get the data.');
// });

// app.get('/api', (req, res) => {
//   try {
//     const filePath = 'C:/Users/DeepeshPatel/Downloads/data_students.xlsx';
//     const data = readExcelData(filePath);
//     res.json(data);
//   } catch (error) {
//     console.error('Error reading Excel file:', error);
//     res.status(500).send('Error reading Excel file');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
