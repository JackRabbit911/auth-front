type Props = {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center min-h-[84vh]">
      <div className="flex flex-row justify-center">
        <div className="w-full md:w-xl lg:w-3xl h-full bg-base-300 border border-zinc-600 rounded-sm p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
