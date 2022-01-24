import { v4 as uuid } from 'uuid';

let users = [
    {
        id: '123e4567-e89b-12d3-a456-426614174000',
        username: 'test',
        password: 'test',
        email: 'test@dev.com'
    }
];

export const getUsers = (req, res) => {
    console.log('get user api is called ');
    res.send({data: users, count: users.length}, 200);
};

export const createUser = (req, res) => {
    const body = req.body;
    users.push({...body, id: uuid()});
    console.log('created new user');
    res.send({message: 'Successfully created the user'}, 201);
}

export const updatedUser = (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
    user = {
        ...user,
        ...req.body
    };
    console.log('updated the user with id: ' + user.id);
    res.send({message: 'Successfully updated the user'}, 200);
}

export const  getUser = (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
    res.send({data: user}, 200);
}

export const loginUser = (req, res) => {
    const body = req.body;
    const user = users.find((user) => (user.username === body.username && user.password === body.password));
    if(user) {
        res.send({userId: user.id}, 200);
    } else {
        res.send({message: 'username not found, or password is incorrect'}, 400);
    }
}