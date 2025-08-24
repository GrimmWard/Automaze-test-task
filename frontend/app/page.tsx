'use client'

import React, { useEffect } from 'react'

export default function Page() {

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then(res => res.json())
      .then(data => console.log(data)
      )
  }, [])

  return (
    <div>

    </div>
  )
}
