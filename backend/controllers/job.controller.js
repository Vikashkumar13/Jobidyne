import { Job } from "../models/job.model.js";

//ADMIN-> POST JOB
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        //validaton-data
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: "Somethin is missing.", success: false })
        };
        //creating job
        const job = await Job.create({
            title, description, location, jobType, position, company: companyId, created_by: userId,
            requirements: requirements.split(","),
            salary: Number(salary),
            experienceLevel: experience,
        });
        return res.status(201).json({ message: "New job created successfully.", job, success: true });
    }
    catch (error) {
        console.log("Error while postin a job : ", error);
    }
}
// ADMIN-> GET-ALL-JOBS
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({ path: 'company', createdAt: -1 });
        //validation-job
        if (!jobs) {
            return res.status(404).json({ message: "Jobs not found.", success: false })
        };
        return res.status(200).json({ jobs, success: true })
    }
    catch (error) {
        console.log("Error while getting all created admin jobs by admin : ", error);
    }
}
//STUDENT-> GET ALL JOBS
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [{ title: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }]
        };
        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });
        //validation-job
        if (!jobs) { return res.status(404).json({ message: "Jobs not found.", success: false }) };

        return res.status(200).json({ jobs, success: true })
    }
    catch (error) {
        console.log("Error while getting job by student : ", error);
    }
}
//STUDENT-> GET-JOB-BY-ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ path: "applications" });
        //validation-job
        if (!job) {
            return res.status(404).json({ message: "Jobs not found.", success: false })
        };
        return res.status(200).json({ job, success: true });
    }
    catch (error) {
        console.log("Error while getting job by id by student : ", error);
    }
}

