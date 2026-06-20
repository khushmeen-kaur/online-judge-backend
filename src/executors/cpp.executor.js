const fs = require("fs/promises");
const path = require("path");
//for compile function 
const { exec } =require("child_process");
const util = require("util");
const execPromise =util.promisify(exec);


async function writeCppSource(code, submissionId) {

    const submissionDir = path.join(
        process.cwd(),  // project1 path C:\project1
        "temp",
        submissionId
    );

    await fs.mkdir( 
        submissionDir,
        { recursive: true }
    );
    //create main.cpp
    const filePath = path.join(submissionDir,"main.cpp");
    //write code to "main.cpp"
    await fs.writeFile(filePath,code);
    console.log("CPP file created:",filePath);
    return filePath;
}

async function compileCpp(submissionId){
    const submissionDir=path.join(process.cwd(),"temp",submissionId);
    const command =
`docker run --rm -v "${submissionDir}:/app" gcc bash -c "cd /app && g++ main.cpp -o main"`;
    await execPromise(command);
    console.log("compiltion success");
}


module.exports = {
    writeCppSource,compileCpp
};
