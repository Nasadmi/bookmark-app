import { useEffect, useState } from "react";
import { AuthLayout } from "../layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/login.schema";
import { ErrorText } from "../components/ErrorText";
import { login } from "../services/api";
import { getCookie, setCookie } from "../../../services/cookies";
import { useNavigate } from "react-router";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  useEffect(() => {
    const token = getCookie('token')
    if (token) {
      navigate('/')
    }
  }, [])

  const [loginError, setLoginError] = useState<string>('')
  const navigate = useNavigate();
  
  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await login(data)

    if (!res) {
      return setLoginError('Unknown error or connection refused');
    }

    if (res.message) {
      return setLoginError(res.message)
    }

    setCookie('token', res.token, import.meta.env.VITE_TOKEN_DURATION || '10m')
    navigate('/')
  }

  return (
    <AuthLayout type="login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center mt-7"
        noValidate
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-2xl lg:text-lg mb-2 font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            required
            placeholder="example@mail.com"
            autoComplete="on"
            spellCheck={false}
            className="p-2 rounded-2xl text-2xl lg:text-lg dark:text-white border-2 border-green-400 font-medium w-full shadow-none transition-all duration-300 ease-in-out focus:ring-4 focus:ring-green-300 mb-2 focus:outline-none"
            aria-required="true"
          />
          { errors.email && <ErrorText text={ errors.email.message } /> }
        </div>

        <div className="flex flex-col mb-6">
          <label
            htmlFor="password"
            title="Contraseña"
            className="text-2xl lg:text-lg mb-2 font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            required
            autoComplete="current-password"
            className="p-2 rounded-2xl dark:text-white border-2 border-green-400 font-medium w-full shadow-none transition-all duration-300 ease-in-out focus:ring-4 focus:ring-green-300 focus:outline-none mb-2 text-2xl lg:text-lg"
            aria-required="true"
          />
          { errors.password && <ErrorText text={ errors.password.message } /> }
          <ErrorText text={ loginError } className="text-center"/>
        </div>

        <button
          type="submit"
          className="font-bold font-jakarta text-lg border-2 p-3 w-1/2 self-center rounded-lg cursor-pointer bg-green-600 hover:bg-green-700 text-white dark:bg-green-800 shadow-none hover:shadow-lg transition-colors duration-300 ease-in focus:ring-4 focus:ring-green-400 outline-none"
        >
          Log In
        </button>
      </form>
    </AuthLayout>
  );
};
