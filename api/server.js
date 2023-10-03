const express = require('express');
const bodyParser = require('body-parser');
const Realm = require('realm');
const app = express();
app.use(bodyParser.json());

const UserSchema = {
    name: 'User',
    properties: {
        email: 'string',
        password: 'string'
    }
};

const realmConfig = {
    schema: [UserSchema],
    path: 'myrealm.realm',
    schemaVersion: 0
};

app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const realm = await Realm.open(realmConfig);
        const existingUser = realm.objects('User').filtered(`email = "${email}"`);
        if (existingUser.length > 0) {
            return res.status(400).send({ error: 'User already exists' });
        }
        realm.write(() => {
            realm.create('User', { email, password });
        });
        res.status(200).send({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const realm = await Realm.open(realmConfig);
        const user = realm.objects('User').filtered(`email = "${email}" AND password = "${password}"`);
        if (user.length === 0) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }
        res.status(200).send({ message: 'Login successful' });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});