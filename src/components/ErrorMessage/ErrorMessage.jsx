import './ErrorMessage.css'
import { useParams } from 'react-router-dom'

const ErrorMessage = () => {
  const { status } = useParams();;
  const statusCode = status || 404;
  return (
    <div id='error-message'>ErrorMessage</div>
  )
}

export default ErrorMessage
