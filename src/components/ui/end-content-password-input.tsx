import { FaEye as Open } from "react-icons/fa";
import { FaEyeSlash as Close } from "react-icons/fa";

type Props = {
     isVisible: boolean
     setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const EndContentPasswordInput: React.FC<Props> = ({ isVisible, setIsVisible }) => {
     const toggleVisibility = () => setIsVisible(!isVisible);

     return (
          <button
               aria-label="toggle password visibility"
               className="focus:outline-none"
               type="button"
               onClick={toggleVisibility}
          >
               {isVisible ? (
                    <Open />
               ) : (
                    <Close />
               )}
          </button>
     )
}
