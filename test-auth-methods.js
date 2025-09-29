const axios = require('axios');

const API_KEY = '36066d53-3b2d-4d7f-b696-fc90658e2667';
const TEST_COMPANY = '00445790'; // Tesco PLC

async function testMethod1_BasicAuth() {
  console.log('\n1. Testing Basic Auth (username:password format)...');
  try {
    const response = await axios.get(
      `https://api.company-information.service.gov.uk/company/${TEST_COMPANY}`,
      {
        auth: {
          username: API_KEY,
          password: ''
        }
      }
    );
    console.log('✅ SUCCESS with Basic Auth');
    console.log(`   Company: ${response.data.company_name}`);
    return true;
  } catch (error) {
    console.log('❌ Failed:', error.response?.data || error.message);
    return false;
  }
}

async function testMethod2_AuthHeader() {
  console.log('\n2. Testing Authorization Header (Basic)...');
  try {
    const authString = Buffer.from(`${API_KEY}:`).toString('base64');
    const response = await axios.get(
      `https://api.company-information.service.gov.uk/company/${TEST_COMPANY}`,
      {
        headers: {
          'Authorization': `Basic ${authString}`
        }
      }
    );
    console.log('✅ SUCCESS with Authorization Header');
    console.log(`   Company: ${response.data.company_name}`);
    return true;
  } catch (error) {
    console.log('❌ Failed:', error.response?.data || error.message);
    return false;
  }
}

async function testMethod3_ApiKeyHeader() {
  console.log('\n3. Testing API Key in custom header...');
  try {
    const response = await axios.get(
      `https://api.company-information.service.gov.uk/company/${TEST_COMPANY}`,
      {
        headers: {
          'X-API-Key': API_KEY
        }
      }
    );
    console.log('✅ SUCCESS with X-API-Key header');
    console.log(`   Company: ${response.data.company_name}`);
    return true;
  } catch (error) {
    console.log('❌ Failed:', error.response?.data || error.message);
    return false;
  }
}

async function testMethod4_BearerToken() {
  console.log('\n4. Testing Bearer Token...');
  try {
    const response = await axios.get(
      `https://api.company-information.service.gov.uk/company/${TEST_COMPANY}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    console.log('✅ SUCCESS with Bearer Token');
    console.log(`   Company: ${response.data.company_name}`);
    return true;
  } catch (error) {
    console.log('❌ Failed:', error.response?.data || error.message);
    return false;
  }
}

async function testMethod5_QueryParam() {
  console.log('\n5. Testing API key as query parameter...');
  try {
    const response = await axios.get(
      `https://api.company-information.service.gov.uk/company/${TEST_COMPANY}?api_key=${API_KEY}`
    );
    console.log('✅ SUCCESS with query parameter');
    console.log(`   Company: ${response.data.company_name}`);
    return true;
  } catch (error) {
    console.log('❌ Failed:', error.response?.data || error.message);
    return false;
  }
}

async function testPublicEndpoint() {
  console.log('\n6. Testing if endpoint works without auth (public)...');
  try {
    const response = await axios.get(
      `https://api.company-information.service.gov.uk/company/${TEST_COMPANY}`
    );
    console.log('✅ Endpoint is PUBLIC - no auth needed!');
    console.log(`   Company: ${response.data.company_name}`);
    return true;
  } catch (error) {
    console.log('❌ Auth required:', error.response?.status === 401 ? 'Yes' : error.response?.data || error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('Testing Companies House API Authentication Methods');
  console.log('API Key:', API_KEY);
  console.log('Test Company: Tesco PLC (00445790)');

  const results = [];

  results.push(await testMethod1_BasicAuth());
  results.push(await testMethod2_AuthHeader());
  results.push(await testMethod3_ApiKeyHeader());
  results.push(await testMethod4_BearerToken());
  results.push(await testMethod5_QueryParam());
  results.push(await testPublicEndpoint());

  console.log('\n========================================');
  if (results.some(r => r)) {
    console.log('✅ Found working authentication method!');
  } else {
    console.log('❌ No authentication method worked.');
    console.log('\nPossible issues:');
    console.log('1. The API key might need to be activated or approved');
    console.log('2. The API key might be for a test/sandbox environment');
    console.log('3. The API key format might be incorrect');
    console.log('4. Your account might need additional permissions');
  }
}

runAllTests();