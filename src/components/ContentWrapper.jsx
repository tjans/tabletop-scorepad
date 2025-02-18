import React from 'react'
// libraries
import { motion } from "framer-motion";


const ContentWrapper = (props) => {
    return (
        <motion.h1
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            <main className={"py-4" + (props.noPadding ? "" : " px-4")}>
                {props.children}
            </main>
        </motion.h1>
    )
}

export default ContentWrapper