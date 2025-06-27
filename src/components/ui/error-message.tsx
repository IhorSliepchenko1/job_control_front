import { Alert } from "@heroui/react"

type Props = {
     errorMessage: string,
}

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
     return (Boolean(errorMessage) &&
          <div className="text-center text-sm mt-2">
               <Alert color='danger' title={errorMessage} />
          </div>)
}
