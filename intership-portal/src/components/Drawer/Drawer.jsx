import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
    BookmarkSquareIcon,
    BuildingOffice2Icon,
    ChartBarIcon,
    ChartPieIcon,
    DocumentCheckIcon,
    RectangleStackIcon,
    SpeakerWaveIcon,
    Square2StackIcon,
    UsersIcon,
} from "@heroicons/react/24/outline"
import DrawerLink from "./DrawerLink"
import logo from "../../assets/img/logo-univ.png"
import { HiOutlineSpeakerphone, HiTable } from "react-icons/hi"
import { useSelector } from "react-redux"
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import fasilkom from '../../assets/img/fasilkom.png'

const textVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "auto" },
}

const containerVariants = {
    close: {
        width: "5rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
    open: {
        width: "22rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
}

const svgVariants = {
    close: {
        rotate: 360,
    },
    open: {
        rotate: 180,
    },
}

const Drawer = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useSelector(state => state.auth)

    const containerControls = useAnimationControls()
    const svgControls = useAnimationControls()

    useEffect(() => {
        if (isOpen) {
            containerControls.start("open")
            svgControls.start("open")
        } else {
            containerControls.start("close")
            svgControls.start("close")
        }
    }, [isOpen])

    const handleOpenClose = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <motion.nav
                variants={containerVariants}
                animate={containerControls}
                initial="close"
                className="bg-neutral-800 flex flex-col z-10 gap-20 p-5 fixed top-0 left-0 h-full shadow shadow-white"
            >
                <div className="flex flex-row w-full justify-between place-items-center">
                    <div className="w-16 h-16 bg-white rounded-md flex gap-4">
                        <img src={fasilkom} alt="" className="w-full" />
                        <AnimatePresence>
                            {isOpen && (
                                <motion.p
                                    className="text-3xl font-bold text-white self-center"
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={"hidden"}
                                    transition={{ duration: 0.3 }}>
                                    Fasilkom
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <button
                        className="p-1 rounded-full flex"
                        onClick={() => handleOpenClose()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="w-8 h-8 text-white"
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                variants={svgVariants}
                                animate={svgControls}
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col gap-8 mt-8">
                    {/* Admin Routes */}
                    {user && user.role === "admin" && (
                        <>
                            <DrawerLink name="Dashboard" isOpen={isOpen} path={"/admin-dashboard"}>
                                <ChartBarIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Information" isOpen={isOpen} path={"/admin-dashboard/information"}>
                                <SpeakerWaveIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Account" isOpen={isOpen} path={"/admin-dashboard/create-account"}>
                                <Square2StackIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Magang Reguler" isOpen={isOpen} path={"/admin-dashboard/magang-reguler"}>
                                <DocumentCheckIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Magang Kompetensi" isOpen={isOpen} path={"/admin-dashboard/magang-kompetensi"}>
                                <ChartPieIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Profile" isOpen={isOpen} path={`/admin-dashboard/profile/${user && user.id}`}>
                                <UsersIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                        </>
                    )}

                    {/* Kaprodi Routes */}
                    {user && user.role === "kaprodi" && (
                        <>
                            <DrawerLink name="Dashboard" isOpen={isOpen} path={"/kaprodi-dashboard"}>
                                <ChartBarIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Pengajuan Magang Reguler" isOpen={isOpen} path={"/kaprodi-dashboard/magang-reguler"}>
                                <SpeakerWaveIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Pengajuan Magang Kompetensi" isOpen={isOpen} path={"/kaprodi-dashboard/magang-kompetensi"}>
                                <Square2StackIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Pengajuan Dosen Pembimbing" isOpen={isOpen} path={"/kaprodi-dashboard/dosen-pembimbing"}>
                                <DocumentCheckIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Laporan Magang" isOpen={isOpen} path={"/kaprodi-dashboard/laporan"}>
                                <ChartPieIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Profile" isOpen={isOpen} path={`/kaprodi-dashboard/profile/${user && user.id}`}>
                                <UsersIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                        </>
                    )}

                    {/* Mitra Routes */}
                    {user && user.role === "mitra" && (
                        <>
                            <DrawerLink name="Dashboard" isOpen={isOpen} path={"/mitra-dashboard"}>
                                <ChartBarIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Nilai Magang" isOpen={isOpen} path={"/mitra-dashboard/nilai"}>
                                <HiTable className="text-white text-4xl" />
                            </DrawerLink>
                            <DrawerLink name="Profile" isOpen={isOpen} path={`/mitra-dashboard/profile/${user && user.id}`}>
                                <UsersIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                        </>
                    )}

                    {/* Dospem Routes */}
                    {user && user.role === "dospem" && (
                        <>
                            <DrawerLink name="Dashboard" isOpen={isOpen} path={"/dospem-dashboard"}>
                                <ChartBarIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Bimbingan Magang" isOpen={isOpen} path={"/dospem-dashboard/bimbingan"}>
                                <LiaChalkboardTeacherSolid className="text-white text-4xl" />
                            </DrawerLink>
                            <DrawerLink name="Logbook Magang" isOpen={isOpen} path={"/dospem-dashboard/logbook"}>
                                <BookmarkSquareIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Laporan Magang" isOpen={isOpen} path={"/dospem-dashboard/laporan"}>
                                <ChartPieIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Nilai Magang" isOpen={isOpen} path={"/dospem-dashboard/nilai"}>
                                <HiTable className="text-white text-4xl" />
                            </DrawerLink>
                            <DrawerLink name="Profile" isOpen={isOpen} path={`/dospem-dashboard/profile/${user && user.id}`}>
                                <UsersIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                        </>
                    )}

                    {/* Tim Magang Routes */}
                    {user && user.role === "tim-magang" && (
                        <>
                            <DrawerLink name="Dashboard" isOpen={isOpen} path={"/company-dashboard"}>
                                <ChartBarIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Lowongan Magang" isOpen={isOpen} path={"/company-dashboard/internship"}>
                                <BuildingOffice2Icon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Pendaftar Magang" isOpen={isOpen} path={"/company-dashboard/applicant"}>
                                <RectangleStackIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                            <DrawerLink name="Profile" isOpen={isOpen} path={`/company-dashboard/profile-company/${user && user.id}`}>
                                <UsersIcon className="text-white min-w-8 w-8" />
                            </DrawerLink>
                        </>
                    )}
                </div>
            </motion.nav>
        </>
    )
}

export default Drawer
