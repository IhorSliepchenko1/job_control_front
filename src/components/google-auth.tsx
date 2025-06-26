import { BASE_URL } from '@/config/constants'
import { FcGoogle } from 'react-icons/fc'

type Props = {
     text: string
}

export const GoogleAuth: React.FC<Props> = ({ text }) => {
     const handleGoogleAuth = () => {
          window.location.href = `${BASE_URL}/auth/google/redirect`;
     };

     return (
          <span onClick={handleGoogleAuth} className='flex items-center gap-1 justify-center cursor-pointer'>
               <p>
                    {text} с помощью
               </p>
               <FcGoogle />
          </span>
     )
}

