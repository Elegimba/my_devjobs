import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export function JobDetails() {
    const { jobId } = useParams()

    const [job, setJob] = useState(null)


    return (
        <>
            <h2>Job Detail</h2>
            <h3>La id es {jobId}</h3>
        </>
    )
}