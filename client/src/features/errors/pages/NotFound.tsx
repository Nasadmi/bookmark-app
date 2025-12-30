import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { ErrorLayout } from "../layout/ErrorLayout"
import { Link } from "react-router"

export const NotFound = () => {
  return (
    <ErrorLayout className="dark:bg-red-600 bg-red-800">
      <div className="flex items-center gap-1 justify-between">
        <h1 className="text-5xl font-jakarta font-bold">Not Found</h1>
        <ExclamationCircleIcon className="size-20"/>
      </div>
      <p className="text-2xl font-medium">This page isn't available</p>
      <Link to={'/'} className="mt-6 text-3xl border-b-4 border-b-red-400 font-medium px-3">
        Dashboard
      </Link>
    </ErrorLayout>
  )
}