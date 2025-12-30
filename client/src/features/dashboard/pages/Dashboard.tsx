import { useEffect } from "react"
import { getCookie } from "../../../services/cookies"
import { useNavigate } from "react-router"
import { apiHealth } from "../../../services/health";

export const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      const token = getCookie('token')
      const health = apiHealth()
      if (!health) {
        navigate('/unavailability')
        return;
      }
      if (!token) {
        navigate('/login');
        return;
      }
    })()
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}