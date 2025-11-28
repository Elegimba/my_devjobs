import styles from './Details.module.css'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

/* function JobSection ({ title, content }) {
    const html = snarkdown(content)
} */

export function JobDetails() {
    const { jobId } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
            .then(response => {
                if (!response.ok) throw new Error('Job Not Found')
                return response.json()
            })
            .then(json => {
                setJob(json)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [jobId])

    if (loading) {
        return <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }} >
            <div className={Styles.loading}>
                <p classname={Styles.loadingText}>Cargando...</p>
            </div>
        </div>
    }

    if (error || !job) {
        return (
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
                <div className={styles.error}>
                    <h2 className={styles.errorTitle}>
                        Oferta no encontrada
                    </h2>
                    <button onClick={() => navigate('/')} className={styles.errorButton}>Volver al inicio</button>
                </div>
            </div>
        )
    }

    return (
        <>
            <h2>Job Detail</h2>
            <h3>La id es {jobId}</h3>
        </>
    )
}