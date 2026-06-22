const problemModel = require("../models/problem.model");
const testcaseModel = require("../models/testcase.model");

async function createProblem(req, res) {
    const { title, description, difficulty, constraints } = req.body;
    const createdProblem = await problemModel.create({
        title,
        description,
        difficulty,
        constraints,
        createdBy: req.user._id
    });
    res.status(201).json({
        problem: createdProblem
    });
}
async function getAllProblems(req,res){
    try {

        const problems = await problemModel.find()
            .select("title difficulty");

        res.status(200).json(problems);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

async function getProblemById(req, res) {
    const problem = await problemModel.findById(req.params.id);
    if (!problem) {
        return res.status(404).json({
            message:"given problem not found"
        })
    };
    const sampleTestcases=await testcases.finf({
        problemId:problem._id,
        isHidden:false
    });

    res.status(200).json({
        problem,
        sampleTestCases
    });
}

async function createTestcase(req, res) {
    const { input, expectedOutput, isHidden } = req.body;
    const testcase = await testcaseModel.create({
        problemId: req.params.id,
        input,
        expectedOutput,
        isHidden
    });

    res.status(201).json({
        testcase
    });
}

module.exports = { createProblem, getAllProblems, getProblemById, createTestcase };