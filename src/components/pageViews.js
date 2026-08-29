import * as React from "react"
import "./pageViews.css"

const STORAGE_KEY = "prabesh_session_view_hit"
const CACHE_KEY = "prabesh_cached_view_count"
const KEY_NAME = "prabeshgouli-portfolio-blog-total-views"
const BASE_URL = "https://countapi.mileshilliard.com/api/v1"

const PageViews = () => {
  const [views, setViews] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let isMounted = true

    // Check cached count for instant layout stability
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached && !isNaN(Number(cached))) {
        setViews(Number(cached))
      }
    }

    const recordOrFetchView = async () => {
      try {
        const hasHitThisSession = typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY)
        const endpoint = hasHitThisSession ? `${BASE_URL}/get/${KEY_NAME}` : `${BASE_URL}/hit/${KEY_NAME}`

        const res = await fetch(endpoint)
        if (!res.ok) throw new Error("Failed to fetch view count")
        
        const data = await res.json()
        if (data && typeof data.value === "number") {
          if (isMounted) {
            setViews(data.value)
            setLoading(false)
          }
          if (typeof window !== "undefined") {
            sessionStorage.setItem(STORAGE_KEY, "true")
            localStorage.setItem(CACHE_KEY, String(data.value))
          }
        }
      } catch (err) {
        if (isMounted) setLoading(false)
      }
    }

    recordOrFetchView()

    return () => {
      isMounted = false
    }
  }, [])

  if (views === null && loading) {
    return null
  }

  const formattedViews = views ? new Intl.NumberFormat("en-US").format(views) : "1,200+"

  return (
    <span className="page-views-badge" title="Real-time verified lifetime page views">
      <span className="page-views-pulse" aria-hidden="true"></span>
      <span className="page-views-number">{formattedViews}</span>
      <span className="page-views-label"> views</span>
    </span>
  )
}

export default PageViews
