import { useEffect, useState } from "react"
import { getCookie } from "@services/cookies"
import { useNavigate } from "react-router"
import { apiHealth } from "@services/health";
import { getUser } from "../services/api";
import type { UserData } from "../types/api";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {
  const [user, setUser] = useState<null | UserData>(null)
  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      const token = getCookie('token')
      const health = await apiHealth()
      
      if (!health) {
        navigate('/unavailability')
        return;
      }
      
      if (!token) {
        navigate('/login');
        return;
      }

      const user = await getUser(token)
      const message = (user as { message: string }).message

      if (!user) {
        setUser(null)
        return;
      }

      if (message) {
        setUser(null)
        console.log(message)
        return;
      }

      setUser(user as UserData);
    })()
  }, [])

  return (
    <>
      {
        user && 
        (
          <main className="h-screen">
            <Sidebar links={user.links}/>
          </main>
        )
      }
    </>
  )
}