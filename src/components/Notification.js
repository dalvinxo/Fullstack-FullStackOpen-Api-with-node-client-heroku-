import { useEffect } from "react"

const Notification = ({notification, setNotification}) => {
  
    useEffect(()=>{
      const timeId = setTimeout(() => {
        setNotification(null)
      }, 10000) 
      return () => {
        clearTimeout(timeId)
      }
    })
    
    if (notification === null) {
      return null
    }  
  
    const {message} = notification 
  
    return (
      <div>
        {message}
      </div>
    )
  }


  export default Notification