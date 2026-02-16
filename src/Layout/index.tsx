type Props = {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-row justify-center">
      <div className="w-full md:w-xl lg:w-3xl bg-base-100 p-4">
        <div className="flex flex-row justify-between mb-4">
          <h1 className="text-2xl">It`s work!</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout
