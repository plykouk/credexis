const axios = require('axios');
const https = require('https');

const API_KEY = '36066d53-3b2d-4d7f-b696-fc90658e2667';

// Test 1: Using axios with exact format from docs
async function testWithAxios() {
  console.log('\n1. Testing with axios (exact format from docs)...');
  try {
    // Create base64 encoded string: API_KEY + ':' (colon with no password)
    const authString = Buffer.from(`${API_KEY}:`).toString('base64');
    console.log(`   Authorization header: Basic ${authString}`);

    const response = await axios.get(
      'https://api.company-information.service.gov.uk/company/00000006',
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Host': 'api.company-information.service.gov.uk'
        }
      }
    );
    console.log('✅ SUCCESS!');
    console.log(`   Company: ${response.data.company_name}`);
    console.log(`   Number: ${response.data.company_number}`);
    console.log(`   Status: ${response.data.company_status}`);
  } catch (error) {
    console.log('❌ Failed');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${JSON.stringify(error.response.data)}`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
  }
}

// Test 2: Using Node's https module directly
function testWithHttps() {
  console.log('\n2. Testing with native HTTPS module...');

  const authString = Buffer.from(`${API_KEY}:`).toString('base64');
  console.log(`   Authorization header: Basic ${authString}`);

  const options = {
    hostname: 'api.company-information.service.gov.uk',
    port: 443,
    path: '/company/00000006',
    method: 'GET',
    headers: {
      'Authorization': `Basic ${authString}`
    }
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const jsonData = JSON.parse(data);
          console.log('✅ SUCCESS!');
          console.log(`   Company: ${jsonData.company_name}`);
          console.log(`   Number: ${jsonData.company_number}`);
          console.log(`   Status: ${jsonData.company_status}`);
        } else {
          console.log('❌ Failed');
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Response: ${data}`);
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log('❌ Request error:', error.message);
      resolve();
    });

    req.end();
  });
}

// Test 3: Test with the working curl command format
function testCurlEquivalent() {
  console.log('\n3. Testing curl equivalent (using axios with auth property)...');

  return axios.get('https://api.company-information.service.gov.uk/company/00000006', {
    auth: {
      username: API_KEY,
      password: ''
    }
  })
  .then(response => {
    console.log('✅ SUCCESS!');
    console.log(`   Company: ${response.data.company_name}`);
    console.log(`   Number: ${response.data.company_number}`);
    console.log(`   Status: ${response.data.company_status}`);
  })
  .catch(error => {
    console.log('❌ Failed');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${JSON.stringify(error.response.data)}`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
  });
}

async function runTests() {
  console.log('====================================');
  console.log('Testing Companies House API');
  console.log('API Key:', API_KEY);
  console.log('Test endpoint: /company/00000006');
  console.log('====================================');

  await testWithAxios();
  await testWithHttps();
  await testCurlEquivalent();

  console.log('\n====================================');
  console.log('Testing complete');

  // Show the exact base64 encoding for reference
  const encoded = Buffer.from(`${API_KEY}:`).toString('base64');
  console.log('\nFor reference:');
  console.log(`Your API key: ${API_KEY}`);
  console.log(`Base64 encoded: ${encoded}`);
  console.log(`Full header: Basic ${encoded}`);
}

runTests();