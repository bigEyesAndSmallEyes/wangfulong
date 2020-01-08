const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Account {
        name: String
        age: Int 
        sex: String
        department: String
    }

    type Query {
        hello: String
        accountName: String
        account: Account
    }
`);

const root = {
    hello: () => {
        return 'Hello Graphql';
    },
    accountName: () => {
        return 'wangfulong';
    },
    account: () => {
        return {
            name: 'wfl',
            age: 18,
            sex: 'male',
            department: 'dept01'
        }
    }
}

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => { console.log('Now browse to localhost:4000/graphql')});