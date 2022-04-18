import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {

  const [resources, setResources] = useState([])

  const getAll = () => {
    return axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }

  const create = (resource) => {
    return axios.post(baseUrl, resource).then(response => {
      setResources(resources.concat(response.data))
    })
  }

  const service = {
    getAll,
    create
  }

  return [
    resources, service
  ]
}