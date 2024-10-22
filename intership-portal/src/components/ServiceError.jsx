import React from 'react'
import { Link } from 'react-router-dom'

const ServiceError = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="font-semibold text-secondary text-7xl">500</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Internal Server Error
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Oppsss sorry, it seems like our server is having an error 😁
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to={"/"}
                        className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                    >
                        Go back home
                    </Link>
                    <Link to={"/contact"} className="text-sm font-semibold text-gray-900">
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default ServiceError
