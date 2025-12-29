import { useEffect } from "react"
import { getCookie } from "../../../services/cookies"
import { useNavigate } from "react-router"

export const Dashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token')
    if (!token) {
      navigate('/login');
      return;
    }
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}