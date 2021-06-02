import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import express, { response } from 'express';
import knex from 'knex';
import handleRegister from './Controllers/register.js';
import signInHandler from './Controllers/signin.js';
import profileHandler from './Controllers/profile.js';
import imageHandler from './Controllers/image.js';



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'michaelfalat',
    password : '',
    database : 'faceDetectionDB'
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());
// const database = {
//     users: [
//         {
//             id: '123',
//             name: "Tom",
//             email: 'Test@test.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: "Jay",
//             email: 'TestJay@test.com',
//             password: 'Sheep',
//             entries: 0,
//             joined: new Date()
//         }
//     ]
// }

app.get('/',(req, res)=> {
    res.send('PSQL');

})

app.post('/signIn', (req, res) => signInHandler(req, res, db, bcrypt))

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => profileHandler(req, res, db))

app.put('/image', (req, res) => imageHandler(req, res, db))

app.listen(3000 , ()=> {
    console.log('Go on port 3000!');
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


// --------TASKS--------

// /--> res = this is working x
// /Signin --> POST = success/fail x
// /register --> POST = user x
// /profile/:userId --> GET = user x
// /image --> PUT --> user x