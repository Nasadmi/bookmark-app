import { AuthLayout } from "../layouts/AuthLayout";

export const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {};

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center mt-7"
      >
        <label htmlFor="email" className="text-2xl lg:text-lg mb-3 font-bold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="test@test.com"
          autoComplete="on"
          spellCheck={false}
          className="p-2 rounded-2xl text-2xl lg:text-lg dark:text-white outline-none border-2 border-green-400 font-medium w-75 shadow-none focus:shadow-2xl shadow-green-800 duration-300 ease-in-out"
        />
        <br />
        <label htmlFor="password" className="text-2xl lg:text-lg font-bold">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="p-2 rounded-2xl dark:text-white outline-none border-2 border-green-400 font-medium w-75 shadow-none focus:shadow-2xl shadow-green-800 duration-300 ease-in-out text-2xl lg:text-lg"
        />
        <br />
        <button
          type="submit"
          className="font-bold font-jakarta text-lg border-2 p-2 w-1/2 self-center rounded-lg cursor-pointer bg-green-600 dark:bg-green-800 shadow-none hover:shadow-2xl shadow-green-600 duration-300 ease-in"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
};
