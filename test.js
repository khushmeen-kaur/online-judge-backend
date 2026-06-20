const {executeCpp,compileCpp} = require("./src/executors/cpp.executor");

async function test(){
await executeCpp(
`
#include<iostream>

int main(){
   std::cout<<"Hello";
   return 0;
}
`,
"test123"
);

await compileCpp(
   "test123"
);

}

test();

