import { useAppSelector } from "store/hooks";

import Loading from "./Loading";
import ErrorCmp from "./ErrorCmp";

type Props = {
  children?: React.ReactNode;
}

const ErrorOrPending = ({ children }: Props) => {
  const { loading, error } = useAppSelector((state) => state.common)

  return (
    <>
      {loading ? <Loading /> : (error ? <ErrorCmp status={error} /> : children)}
    </>
  )
}

export default ErrorOrPending
