import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { ErrorLayout } from "../layout/ErrorLayout"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { apiHealth } from "../../../services/health"

export const Unavailability = () => {
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const health = await apiHealth();
      if (health) {
        navigate('/')
      }
    })()
  }, [])

  return (
    <ErrorLayout className="dark:bg-orange-600 bg-orange-800 p-4">
      <div className="flex items-center gap-1 justify-between">
        <h1 className="text-5xl font-jakarta font-bold">Server Unavailable</h1>
        <ExclamationTriangleIcon className="size-16"/>
      </div>
      <p className="text-2xl font-medium mt-3">
        The server is temporary unavailable, please try again later or contact the developer.
      </p>
    </ErrorLayout>
  )
}