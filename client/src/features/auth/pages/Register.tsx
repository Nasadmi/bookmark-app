import { useForm } from "react-hook-form";
import { AuthLayout } from "../layouts/AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/register.schema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ErrorText } from "../components/ErrorText";
import { register as registerService } from "../services/api";
import { useNavigate } from "react-router";

export const Register = () => {
  const navigate = useNavigate()
  const [registerError, setRegisterError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
      const res = await registerService(data)

      if (res === 'Created') {
        return navigate('/login')
      }
  
      if (!res) {
        return setRegisterError('Unknown error or connection refused');
      }
  
      if (res.message) {
        return setRegisterError(res.message)
      }
    }

  return (
    <AuthLayout type="register">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center mt-7"
        noValidate
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="text-2xl lg:text-lg mb-2 font-bold">
            Email
          </label>
          <input
            className="p-2 rounded-2xl text-2xl lg:text-lg dark:text-white border-2 border-green-400 font-medium w-full shadow-none transition-all duration-300 ease-in-out focus:ring-4 focus:ring-green-300 mb-2 focus:outline-none"
            type="email"
            id="email"
            spellCheck={false}
            autoComplete="off"
            {...register("email")}
            aria-required="true"
          />
        </div>
        {errors.email && <ErrorText text={errors.email.message} />}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-2xl lg:text-lg mb-2 font-bold"
          >
            Password
          </label>
          <div className="flex gap-3 items-center">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              autoComplete="off"
              {...register("password")}
              aria-required="true"
              className="p-2 rounded-2xl text-2xl lg:text-lg dark:text-white border-2 border-green-400 font-medium w-full shadow-none transition-all duration-300 ease-in-out focus:ring-4 focus:ring-green-300 mb-2 focus:outline-none"
            />
            <button
              type="button"
              className="bg-green-700 focus:ring-4 focus:ring-green-300 outline-none p-1.5 rounded-2xl flex flex-col justify-center items-center cursor-pointer duration-300 ease"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="size-6 dark:text-white" />
              ) : (
                <EyeIcon className="size-6" />
              )}
            </button>
          </div>
          {errors.password && <ErrorText text={errors.password.message} />}
        </div>
        <ErrorText text={ registerError } className="text-center"/>
        <input
          type="submit"
          value="Register"
          className="font-bold font-jakarta text-lg border-2 p-3 w-1/2 self-center rounded-lg cursor-pointer bg-green-600 hover:bg-green-700 text-white dark:bg-green-800 shadow-none hover:shadow-lg transition-colors duration-300 ease-in focus:ring-4 focus:ring-green-400 outline-none mt-2"
        />
      </form>
    </AuthLayout>
  );
};
