import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="font-semibold text-third text-7xl">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Page Not Found
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Oppsss sorry, it looks like the page you are looking for doesn't exist 😁
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to={"/"}
                        className="rounded-md bg-third px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-third focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-third"
                    >
                        Go back home
                    </Link>
                    <a href="/contact" className="text-sm font-semibold text-gray-900">
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </main>
    )
}

export default PageNotFound
