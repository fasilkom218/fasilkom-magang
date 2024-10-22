import React, { useEffect, useState } from 'react'
import InputForm from '../element/InputForm/InputForm'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'
import { editJob, getJobId } from '../redux/Action/CreateJobAction'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormUpdateLoker = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const { isLoading, job } = useSelector(state => state.job)
    const [input, setInput] = useState({
        jobTitle: '',
        jobType: '',
        maxPositions: '',
        maxApplicants: '',
        duration: '',
        salary: '',
        skillSet: '',
        jobPost: '',
        deadline: '',
    })
    const [desc, setDesc] = useState('')

    const hanldeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {
        setInput((prevInput) => ({
            ...prevInput,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const updateJob = {
            id: id,
            jobTitle: input.jobTitle,
            jobType: input.jobType,
            maxPositions: input.maxPositions,
            maxApplicants: input.maxApplicants,
            duration: input.duration,
            salary: input.salary,
            skillSet: input.skillSet,
            jobPost: input.jobPost,
            deadline: input.deadline,
            desc: desc,
            token: user.token
        }

        dispatch(editJob(updateJob))
        toast.success("Success update job")
        navigate('/company-dashboard/internship')
    }

    useEffect(() => {
        const data = {
            id: id,
            token: user.token
        }
        dispatch(getJobId(data))
    }, [dispatch])

    useEffect(() => {
        if (job) {
            const formatDate = {
                deadline: job?.deadline?.slice(0, 10),
                jobPost: job?.jobPost?.slice(0, 10)
            }
            setInput({
                jobTitle: job.jobTitle || '',
                jobType: job.jobType || '',
                maxPositions: job.maxPositions || '',
                maxApplicants: job.maxApplicants || '',
                duration: job.duration || '',
                salary: job.salary || '',
                skillSet: job.skillSet || '',
                jobPost: formatDate.jobPost || '',
                deadline: formatDate.deadline || '',
            });
            setDesc(job.desc || '')
        }
    }, [job]);
    return (
        <div>
            {isLoading ? (
                <div className='flex items-center justify-center'>
                    <HashLoader size={50} color='#ce231c' />
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4'>
                        <InputForm
                            label="Job Title"
                            name="jobTitle"
                            id="jobTitle"
                            type="text"
                            placeholder="Backend Developer Intern"
                            size="mb-3"
                            style="star-point"
                            value={input.jobTitle}
                            onChange={hanldeInput}
                        />
                        <InputForm
                            label="Maximal Applicants"
                            name="maxApplicants"
                            id="maxApplicants"
                            type="number"
                            placeholder="10"
                            size="mb-3"
                            style="star-point"
                            value={input.maxApplicants}
                            onChange={hanldeInput}
                        />
                        <InputForm
                            label="Maximal Position"
                            name="maxPositions"
                            id="maxPositions"
                            type="number"
                            placeholder="5"
                            size="mb-3"
                            style="star-point"
                            value={input.maxPositions}
                            onChange={hanldeInput}
                        />
                        <div className='mb-3'>
                            <label htmlFor="jobType" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Job Type</label>
                            <select required name="jobType" id="jobType" value={input.jobType} onChange={handleSelect} className='text-sm border border-primary star-point rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                                <option value="">Choose Job Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="duration" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Internship Duration</label>
                            <select required name="duration" id="duration" value={input.duration} onChange={handleSelect} className='text-sm border border-primary star-point rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                                <option value="">Choose Duration</option>
                                <option value="1">1 Month</option>
                                <option value="2">2 Month</option>
                                <option value="3">3 Month</option>
                                <option value="4">4 Month</option>
                                <option value="5">5 Month</option>
                                <option value="6">6 Month</option>
                            </select>
                        </div>
                        <InputForm
                            label="Salary"
                            name="salary"
                            id="salary"
                            type="number"
                            placeholder="3.000.000"
                            size="mb-3"
                            style="star-point"
                            value={input.salary}
                            onChange={hanldeInput}
                        />
                        <InputForm
                            label="Skill Requirement"
                            name="skillSet"
                            id="skillSet"
                            type="text"
                            placeholder="Python, Java, C++"
                            size="mb-3"
                            style="star-point"
                            value={input.skillSet}
                            onChange={hanldeInput}
                        />
                        <InputForm
                            label="Internship Created"
                            name="jobPost"
                            id="jobPost"
                            type="date"
                            size="mb-3"
                            style="star-point"
                            value={input.jobPost}
                            onChange={hanldeInput}
                        />
                        <InputForm
                            label="Applied Deadline"
                            name="deadline"
                            id="deadline"
                            type="date"
                            size="mb-3"
                            style="star-point"
                            value={input.deadline}
                            onChange={hanldeInput}
                        />
                        <div className='mb-3 sm:col-span-2 lg:col-span-3'>
                            <label htmlFor="desc" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Internship Description</label>
                            <ReactQuill
                                theme="snow"
                                value={desc}
                                onChange={setDesc}
                                placeholder="You can write a description of the internship created..."
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 sm:justify-start sm:flex-row-reverse'>
                        {isLoading ? (
                            <div className='relative group'>
                                <button disabled className='bg-secondary px-4 py-2 rounded-lg text-white font-semibold group-hover:cursor-not-allowed'>
                                    {isLoading ? <HashLoader size={25} color='#fff' /> : "Login"}
                                </button>
                                <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-xs rounded-md">
                                    Loading Process
                                </span>
                            </div>
                        ) : (
                            <button className='bg-secondary px-4 py-2 rounded-lg text-white font-semibold'>
                                Submit
                            </button>
                        )}
                        <Link to={"/company-dashboard/internship"}>
                            <button className='w-full bg-white border border-slate-900 px-4 py-2 rounded-lg font-semibold'>Back</button>
                        </Link>
                    </div>
                </form>
            )}
        </div>
    )
}

export default FormUpdateLoker
