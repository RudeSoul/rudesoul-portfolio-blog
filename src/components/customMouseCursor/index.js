// src/components/Cursor.js
import React, { useState, useEffect } from "react"
import "./style.css"

const Cursor = () => {
  const [path, setPath] = useState([])

  const onMouseMove = e => {
    const { clientX, clientY } = e
    setPath(prevPath => [...prevPath, { x: clientX, y: clientY }])
  }

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <div className="cursor">
      {path.length > 1 && (
        <svg className="cursor-line">
          <polyline
            points={path.map(point => `${point.x},${point.y}`).join(" ")}
          />
        </svg>
      )}
    </div>
  )
}

export default Cursor
