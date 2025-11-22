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
                const response = await fetch('https://jscamp-api.vercel.app/api/jobs')
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
    }, [])

    const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)

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

    useEffect(() => {
        document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`
    }, [total, currentPage])

    return (
        <main>
            <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

            <section>
                <JobsListing jobs={jobs} />

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            </section>
        </main>
    )
}