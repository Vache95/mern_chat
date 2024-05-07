import 'bootstrap/dist/css/bootstrap.min.css'
import  { Container } from 'react-bootstrap'
import NavBar from '../components/NavBar';
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContextProvider } from '../context/ChatContext'
import Routers from './routes';

function App() {
  
  const {user} = useContext(AuthContext)
  
  return (
    <ChatContextProvider user={user}>
        <NavBar/>
        <Container className='text-secondary'>
          <Routers/>
        </Container>
    </ChatContextProvider>
  )
}

export default App
