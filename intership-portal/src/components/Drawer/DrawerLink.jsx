import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

const textVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "auto" },
}

const DrawerLink = ({ children, name, isOpen, path }) => {
    return (
        <a
            href={path}
            className="flex px-1 py-2 rounded cursor-pointer text-white place-items-center gap-3 hover:bg-neutral-200/30 hover:rounded-lg transition-colors duration-100"
        >
            {children}
            <AnimatePresence>
                {isOpen && (
                    <motion.p
                        className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={textVariants}
                        transition={{ duration: 0.3 }}
                    >
                        {name}
                    </motion.p>
                )}
            </AnimatePresence>
        </a>
    )
}

export default DrawerLink
