import { Alert } from "@heroui/react"

type Props = {
     errorMessage: string,
}

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
     return (Boolean(errorMessage) &&
          <div className="w-full flex items-center my-3">
               <Alert color='danger' title={errorMessage} />
          </div>)
}
