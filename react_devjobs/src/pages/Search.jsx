import { useState, useEffect } from 'react'

import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobsListing } from '../components/JobsListing.jsx'


const RESULTS_PER_PAGE = 4

const useFilters = () => {
    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        level: ''
    })
    const [textToFilter, setTextToFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const [jobs, setjobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true)

                const params = new URLSearchParams()
                if (textToFilter) params.append('text', textToFilter)
                if (filters.technology) params.append('technology', filters.technology)
                if (filters.location) params.append('type', filters.location)
                if (filters.level) params.append('level', filters.level)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)
                const queryParams = params.toString()

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await response.json()

                setjobs(json.data)
                setTotal(json.total)
            } catch (error) {
                console.log('Error fetching jobs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [textToFilter, filters, currentPage])

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter)
        setCurrentPage(1)
    }

    return {
        loading, jobs, total, totalPages, currentPage, handlePageChange, handleSearch, handleTextFilter
    }
}


export function SearchPage() {
    const { loading, jobs, total, totalPages, currentPage, handlePageChange, handleSearch, handleTextFilter } = useFilters()

    const tittle = loading ? `cargando... - DevJobs` : `Resultados: ${total}, Página ${currentPage} - DevJobs`

    return (
        <main>
            <tittle>{tittle}</tittle>
            <meta name="description" content="Explora miles de oportunidades laborales en el sector tecnológico. Encuentra tu próximo empleo en DevJobs" />
            <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

            <section>
                {
                    loading ? <p>Cargando empleos...</p> : <JobsListing jobs={jobs} />
                }

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            </section>
        </main>
    )
}