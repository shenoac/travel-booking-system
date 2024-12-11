import axios from 'axios';

describe('User API', () => {
    const userEndpoint = 'http://localhost:3000/api/users';
    const mockUserDetails = {
        name: 'test user5',
        email: 'tes346688@test89.com',
        password: 'password123',
    }

    const headers = {
        'Content-Type': 'application/json',
    };

    const timeout = 15000;

    let token;

//   it('should create a new user', async () => {
//     const response = await axios.post(`${userEndpoint}/signup`, mockUserDetails, {
//       headers
//     },);
//     // Access only `status` and `data` to avoid circular references
//     expect(response).toMatchObject({
//         status: 201,
//         data: {
//           // Match specific properties in `data`
//           message: 'User created',
//         },
//       });
//   },
//   timeout
// );



  it('Should Login when details are correct', async () => {
    const response = await axios.post(`${userEndpoint}/signin`, {
        email: mockUserDetails.email,
        password: mockUserDetails.password
    },
    {
        headers
    });
        expect(response).toMatchObject({
            status: 200,
        })
        token = response.data.token;
        expect(response.data).toHaveProperty("token")
        expect(response.data).toHaveProperty("refreshToken")

  },
  timeout
);

// it('Should recive Unauthorized when tring to access a secure route without proving auth token', async() => {
//     axios.get(`${userEndpoint}/`, {
//         headers
//     }).catch((
//         response
//     )=> {
//         expect(response).toMatchObject({
//             status:401,
//         })
//     });
// }, 
// timeout
// )



// it('Should respond with data from a secure route when token is provided ', async() => {
//     const data = await axios.get(`${userEndpoint}/`, {
//       headers: {
//         ...headers,
//         Authorization: `Bearer ${token}`

//       }  
//     });
//     expect(data.status).toBe(200)
//     }, timeout)
});

