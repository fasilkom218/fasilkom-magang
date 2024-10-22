import React from 'react'
import { Link } from 'react-router-dom'

const Tables = ({ children }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {children}
            </table>
        </div>
    )
}

export default Tables
