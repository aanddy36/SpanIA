import { FadeLoader } from 'react-spinners'

export const LoadingPage = () => {
  return (
    <div className="h-screen w-screen grid place-content-center">
    <FadeLoader
      color="#E31010"
      height={30}
      margin={14}
      radius={4}
      width={10}
    />
  </div>
  )
}
