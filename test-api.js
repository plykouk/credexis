const axios = require('axios');

const API_KEY = '36066d53-3b2d-4d7f-b696-fc90658e2667';
const API_BASE_URL = 'https://api.company-information.service.gov.uk';

async function testAPI() {
  try {
    console.log('Testing Companies House API connection...\n');

    // Test 1: Search for Tesco
    console.log('1. Searching for "Tesco"...');
    const searchResponse = await axios.get(`${API_BASE_URL}/search/companies`, {
      params: {
        q: 'Tesco',
        items_per_page: 5
      },
      auth: {
        username: API_KEY,
        password: ''
      },
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log(`   Found ${searchResponse.data.total_results} results`);
    if (searchResponse.data.items && searchResponse.data.items.length > 0) {
      console.log(`   First result: ${searchResponse.data.items[0].title} (${searchResponse.data.items[0].company_number})`);
    }

    // Test 2: Get specific company (Tesco PLC - 00445790)
    console.log('\n2. Fetching Tesco PLC company profile (00445790)...');
    const companyResponse = await axios.get(`${API_BASE_URL}/company/00445790`, {
      auth: {
        username: API_KEY,
        password: ''
      },
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log(`   Company: ${companyResponse.data.company_name}`);
    console.log(`   Status: ${companyResponse.data.company_status}`);
    console.log(`   Type: ${companyResponse.data.type}`);
    console.log(`   Incorporated: ${companyResponse.data.date_of_creation}`);

    console.log('\n✅ API connection successful! Your API key is working correctly.');

  } catch (error) {
    console.error('\n❌ API Error:');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${JSON.stringify(error.response.data)}`);
    } else {
      console.error(`   ${error.message}`);
    }
  }
}

testAPI();