const {writeCppSource,compileCpp,runCpp,writeInputFile,compareOutput} = require("./src/executors/cpp.executor");

async function test(){
await writeCppSource(
`
#include<iostream>
using namespace std;

int main() {
    int a,b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}

`,
"test123"
);

await compileCpp(
   "test123"
);
await writeInputFile(
   "test123",
   "2 3"
);
await runCpp("test123");
const output =
   await runCpp(
      "test123"
   );

   console.log(
      "OUTPUT:",
      output
   );


}



test();

