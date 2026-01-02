export const fileToBase64 = (file: File) => {
  return new Promise<string | undefined>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (err) => reject(err)
  })
}