import { BookOpenIcon } from "@heroicons/react/24/outline";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center min-h-2/3 rounded-2xl justify-center w-[95%] lg:ml-auto lg:w-[40%] mx-auto portrait:mt-20 bg-gray-100 dark:bg-stone-700 landscape:mt-2 landscape:lg:mt-20">
      <header className="flex gap-2 items-center">
        <BookOpenIcon className="size-16 lg:size-12 text-green-800 dark:text-green-600 stroke-2" />
        <h2 className="text-5xl lg:2xl font-jakarta font-bold border-b-2 dark:text-white border-b-green-600">
          Bookmark
        </h2>
      </header>
      <main className="dark:text-white">{children}</main>
    </div>
  );
};
