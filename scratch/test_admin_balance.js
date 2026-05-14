import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function runTest() {
  try {
    console.log('--- Phase 1: Register Admin ---');
    const adminReg = await axios.post(`${API_URL}/auth/register`, {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin2@netflow.invest',
      password: 'adminpassword123',
      adminKey: '1507003'
    });
    console.log('Admin Registered:', adminReg.data.email);

    console.log('\n--- Phase 2: Register Test User ---');
    const userReg = await axios.post(`${API_URL}/auth/register`, {
      firstName: 'Test',
      lastName: 'Investor',
      email: 'investor2@example.com',
      password: 'userpassword123'
    });
    console.log('User Registered:', userReg.data.email);
    const userId = userReg.data._id;

    console.log('\n--- Phase 3: Login as Admin ---');
    const adminLogin = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin2@netflow.invest',
      password: 'adminpassword123'
    });
    const adminToken = adminLogin.data.token;
    console.log('Admin Logged In.');

    console.log('\n--- Phase 4: Edit User Balance to $4000 ---');
    const balanceUpdate = await axios.put(`${API_URL}/admin/users/${userId}/balance`, 
      { balance: 4000 },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('Balance Updated:', balanceUpdate.data.message);

    console.log('\n--- Phase 5: Verify User Balance ---');
    const userLogin = await axios.post(`${API_URL}/auth/login`, {
      email: 'investor2@example.com',
      password: 'userpassword123'
    });
    console.log('User Balance now:', userLogin.data.balance);
    
    if (userLogin.data.balance === 4000) {
      console.log('\nSUCCESS: Balance is exactly $4000.');
    } else {
      console.log('\nFAILURE: Balance mismatch.');
    }

    console.log('\n--- Credentials for USER ---');
    console.log('Email: investor@example.com');
    console.log('Password: userpassword123');

  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

runTest();
