export const ErrorText = ({ text, className }: { text?: string, className?: string }) => {
  return <p className={`font-bold text-red-500 dark:text-red-400 text-lg ${className}`} aria-live="polite">{ text || '' }</p>
}