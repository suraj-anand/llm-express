import Navbar from 'components/shared/Navbar'
import { useParams } from 'react-router-dom'
import UserDetails from './components/UserDetails'

const UserProfile = () => {

    const { userid } = useParams();

    return (
        <>
            <Navbar type='back' />
            <UserDetails />
        </>
    )
}

export default UserProfile