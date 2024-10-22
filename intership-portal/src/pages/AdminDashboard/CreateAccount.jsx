import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import Tables from '../../components/Tables'
import Modal from '../../components/Modal'
import { DialogTitle } from '@headlessui/react'
import InputForm from '../../element/InputForm/InputForm'
import { useDispatch, useSelector } from 'react-redux'
import { addAccount, deleteAccount, getAccount } from '../../redux/Action/CreateAccountAction'
import { foramterDate } from '../../utils/formaterDate'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'
import { FaTrashAlt } from 'react-icons/fa'
import { RiPencilFill } from 'react-icons/ri'
import ModalContent from '../../components/CreateAccount/ModalContent'
import Pagination from '../../components/Pagination'
import DataNotFound from '../../components/DataNotFound'
import InputPassword from '../../element/InputForm/InputPassword'
import blank from '../../assets/img/blank.png'

const CreateAccount = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { isLoading, account, Error, Success, message } = useSelector(state => state.account)
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [selectId, setSelectId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10)
  const [search, setSearch] = useState('')

  const filterAccount = Array.isArray(account) ? account.filter(item => search.toLowerCase() === '' || item.name.toLowerCase().includes(search.toLowerCase())) : []

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPost = filterAccount.slice(firstPostIndex, lastPostIndex)

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    role: ''
  })

  const handleOpen = () => setOpen(!open)
  const handleClose = () => setOpen(!open)

  const handleShow = (id) => {
    setShow(!show)
    setSelectId(id)
  }

  const handleNotShow = () => setShow(!show)

  useEffect(() => {
    dispatch(getAccount(user.token))
  }, [dispatch])

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newAccount = {
      name: input.name,
      email: input.email,
      password: input.password,
      confPassword: input.confPassword,
      role: input.role,
      token: user.token
    }

    dispatch(addAccount(newAccount))
  }

  useEffect(() => {
    if (Success) {
      toast.success("Account created successfully")
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    } else if (Error) {
      toast.error(message)
    }
  }, [message, Success, Error])

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure want to delete this data?")
    const data = {
      id: id,
      token: user.token
    }

    if (confirm) {
      try {
        dispatch(deleteAccount(data))
        toast.success("Account deleted successfully")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } catch (error) {
        toast.error("Something went wrong")
      }
    }
  }

  return (
    <div className='px-4'>
      <div className='bg-slate-50 drop-shadow-xl rounded-lg p-4'>
        <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
          <div className=''>
            <h1 className='text-lg font-semibold'>Create Account</h1>
            <p className='text-xs sm:text-sm'>Create account and give access to all features.</p>
          </div>
          <button className='w-full bg-secondary text-white font-semibold px-4 py-2 rounded-md sm:w-40 md:self-center' onClick={handleOpen}>Create Account</button>
        </div>
        <label htmlFor="" className='relative block mt-3'>
          <span className='sr-only'>Search</span>
          <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
            <IoSearchOutline className='w-5 h-5' />
          </span>
          <input type="text" name="search" placeholder="Search for anything..." onChange={e => setSearch(e.target.value)} className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:w-80' />
        </label>
        <div className='mt-3'>
          <Tables>
            <thead>
              <tr>
                <th>Name</th>
                <th>No Phone</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className=''>
                  <td colSpan={50} className='text-center' style={{ height: '100px', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <HashLoader color='#ce231c' />
                    </div>
                  </td>
                </tr>
              ) : (
                currentPost.length > 0 ? (
                  currentPost.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 overflow-hidden">
                              <img
                                src={item.profile === null ? blank : item.profile}
                                alt={item.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50">{item.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.no_telpon == null ? "No Data" : item.no_telpon}
                      </td>
                      <td>{item.role}</td>
                      <td>{foramterDate(item.createdAt)}</td>
                      <td className='flex mt-2 gap-2'>
                        <div className='w-6 h-6 rounded-md border border-secondary text-secondary flex items-center cursor-pointer' onClick={() => handleShow(item.id)}>
                          <RiPencilFill className='text-sm mx-auto' />
                        </div>
                        <div className='border-r-2 border-slate-400'></div>
                        <div className='w-6 h-6 rounded-md bg-secondary text-white flex items-center cursor-pointer' onClick={() => handleDelete(item.id)}>
                          <FaTrashAlt className='text-sm mx-auto' />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className=''>
                    <td colSpan={50} className='text-center' style={{ height: '100px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <DataNotFound>
                          {search ? 'Your search result not found' : 'Belum ada akun yang dibuat'}
                        </DataNotFound>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Tables>
          {!isLoading && (
            <Pagination
              totalPost={filterAccount.length}
              postPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>

      {/* Modal Section */}
      <Modal open={open} handleClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Create Account and Give Permission Role.
                </DialogTitle>
                <div className="mt-1">
                  <p className="text-xs text-gray-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, quae.
                  </p>
                </div>
                <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  <InputForm
                    label="Name"
                    name="name"
                    id="name"
                    type="text"
                    style="star-point"
                    placeholder="Gong Yoo"
                    size="mb-3"
                    value={input.name}
                    onChange={handleInput}
                  />
                  <InputForm
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    style="star-point"
                    placeholder="gongyoo@gmail.com"
                    size="mb-3"
                    value={input.email}
                    onChange={handleInput}
                  />
                  <div className='sm:col-span-2'>
                    <InputPassword
                      label={"Password"}
                      name={"password"}
                      id={"password"}
                      margin={"mb-3"}
                      value={input.password}
                      onChange={handleInput}
                    />
                    <InputPassword
                      label={"Confirm Password"}
                      name={"confPassword"}
                      id={"confPassword"}
                      margin={"mb-3"}
                      value={input.confPassword}
                      onChange={handleInput}
                    />
                  </div>
                  <div className='sm:col-span-2'>
                    <label htmlFor="role" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Role</label>
                    <select
                      required
                      name="role"
                      id="role"
                      className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                      value={input.role}
                      onChange={handleInput}
                    >
                      <option value="">Chosee Role</option>
                      <option value="admin">Admin</option>
                      <option value="kaprodi">Kaprodi</option>
                      <option value="dospem">Dosen Pembimbing</option>
                      <option value="tim-magang">Tim Magang</option>
                      <option value="mitra">Mitra</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              className="inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
            >
              {isLoading ? <HashLoader size={20} color="white" /> : "Submit"}
            </button>
            <button
              type="button"
              data-autofocus
              onClick={() => handleClose()}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Section Edit */}
      <Modal open={show} handleClose={handleNotShow}>
        <ModalContent id={selectId} handleClose={handleNotShow} />
      </Modal>
    </div>
  )
}

export default CreateAccount