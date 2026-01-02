import { useForm } from "react-hook-form";
import { AuthLayout } from "../layouts/AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/register.schema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState, type ChangeEvent } from "react";
import { fileToBase64 } from "../../../services/fileToBase64";
import { ErrorText } from "../components/ErrorText";

export const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { onChange, ...rest } = register("img");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setValue("img", base64, { shouldValidate: true });
      } catch (err) {
        console.error("Error on convert image", err);
      }
    } else {
      setValue('img', undefined, { shouldValidate: true })
    }
  };

  const onSubmit = async (data: { email: string; password: string, img?: string }) => {
    console.log(data)
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset title="email&password">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              spellCheck={false}
              autoComplete="off"
              {...register("email")}
              aria-required="true"
            />
          </div>
          { errors.email && <ErrorText text={errors.email.message} /> }
          <div>
            <label htmlFor="password">Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              autoComplete="off"
              {...register("email")}
              aria-required="true"
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeSlashIcon className="size-6" />
              ) : (
                <EyeIcon className="size-6" />
              )}
            </button>
          </div>
          { errors.password && <ErrorText text={errors.password.message} /> }
        </fieldset>
        <fieldset title="img">
          <label htmlFor="img"></label>
          <input
            onChange={handleFileChange}
            type="file"
            id="img"
            accept="image/webp"
            {...rest}
          />
          { errors.img && <ErrorText text={errors.img.message} /> }
        </fieldset>
      </form>
    </AuthLayout>
  );
};
