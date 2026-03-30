import ErrorCmp from "reused/ErrorCmp";
import Loading from "reused/Loading";
import { useAppSelector } from "store/hooks";

type Props = {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { loading, error } = useAppSelector((state) => state.common)

  return (
    <div className="flex flex-col justify-center min-h-[84vh]">
      <div className="flex flex-row justify-center">
        {loading ? <Loading /> : (error ? <ErrorCmp status={error} /> :
          <div className="w-full md:w-lg lg:w-xl h-full bg-base-300 border border-zinc-600 rounded-sm p-4">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default Layout
