curl -i 'http://bjfk-staging-ls46.yz02:8090/graphql' \
-H 'Accept-Encoding: gzip, deflate, br' \
-H 'Connection: keep-alive' \
-H "Content-Type: application/json" \
-H "authorization: b-994_b8coNUYRGjlzUQ2Ta9Yr1QzsK58M7OpPsGWb3" \
-H 'Accept: application/json' \
-d '{"query":"query {\n  getUsersByUsername(username: \"dongyong\"){\n    id\n  }\n}"}'


