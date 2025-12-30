export const ErrorLayout = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <main className={`${className} flex flex-col items-center justify-center w-[90%] h-60 portrait:mt-70 landscape:mt-50 mx-auto rounded-3xl text-white`}>
      { children }
    </main>
  )
}