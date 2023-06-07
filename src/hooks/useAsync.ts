import { useEffect, useState } from "react"


export const useAsync = (handler: any, immediate: boolean = false) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const act = async (data?: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await handler(data)
      setData(response)
      setLoading(false)
      return response
    } catch (err) {
      setError(error)
      setLoading(false)
      throw err
    }
  }

  useEffect(() => {
    if (immediate) {
      act().catch()
    }
  },[])

  return {
    data,
    loading,
    error,
    act,
  }
}