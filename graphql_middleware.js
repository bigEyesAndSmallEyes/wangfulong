const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    input AccountInput {
        name: String
        age: Int 
        sex: String
        department: String
    }
    type Account {
        name: String
        age: Int 
        sex: String
        department: String
    }
    type Mutation {
        createAccount(input: AccountInput): Account
        updateAccount(id: ID!, input: AccountInput): Account
    }
    type Query {
        accounts: [Account]
    }

`)


const fakeObj = {};

const root = {
    accounts(){ 
        let arr = [];  
        for (const key in fakeObj) {
            if (fakeObj.hasOwnProperty(key)) {
                const element = fakeObj[key];
                arr.push(element);
            }
        }
        return arr;
    },
    createAccount({input}){
        fakeObj[input.name] = input;
        return fakeObj[input.name] ;
    },
    updateAccount({id, input}) {
        let updateObject = Object.assign({}, fakeObj[id], input)
        fakeObj[id] = updateObject;
        return fakeObj[id];
    }
}

const app = express();

const middleware = (req, res, next) => {
    console.log(req.headers);
    if(!req.headers.cookie) {
        res.send(JSON.stringify({
            error: 'error auth'
        }))
        return;
    }
    next()
}

app.use(middleware);
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => { console.log('Now browse to localhost:4000/graphql')});