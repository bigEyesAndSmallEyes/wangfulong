const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Account {
        name: String
        age: Int
        sex: String
        department: String
        salary(city: String): Int
    }
    type Query {
        getClassMate(classNo: Int!): [String]
        account(username: String): Account
    }
   
`);

const root = {
  getClassMate({ classNo }) {
    const obj = {
      31: ["aaa", "bbb"],
      32: ["accaa", "ddd"]
    };
    return obj[classNo];
  },
  account({username}) {
      const name = username;
      const sex = "man";
      const age = 18;
      const department = "zongban";
      const salary = ({city}) => {
        if(city == "beijing") {
            return 10000;
        }
        return 3000;
      }

      return {
          name,
          sex,
          age,
          department,
          salary
      }
  }
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

// 公开文件夹,供用户访问静态资源
app.use(express.static('public'));

app.listen(4000, () => {
  console.log("Now browse to localhost:4000/graphql");
});
