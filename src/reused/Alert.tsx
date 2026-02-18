type Props = {
  className: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Alert = ({ className, icon, children }: Props) => {
  return (
    <div role="alert" className={`alert ${className} rounded-xs sm:rounded-sm`}>
      {icon}
      <div>
        {children}
      </div>
    </div>
  )
}

export default Alert
