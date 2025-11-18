import { useState, useEffect } from 'react'

import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobsListing } from '../components/JobsListing.jsx'

import jobsData from '../data.json'


const RESULTS_PER_PAGE = 4


export function SearchPage() {
    const [textToFilter, setTextToFilter] = useState('')
    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        level: ''
    })
    const [currentPage, setCurrentPage] = useState(1)

    const jobsFilteredByFilters = jobsData.filter(job => {
        return (filters.technology === '' || job.data.technology === filters.technology)
    })

    const jobsWithTextFilter = textToFilter === '' ? jobsFilteredByFilters : jobsFilteredByFilters.filter(job => {
        return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    })

    const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)

    const pagedResults = jobsWithTextFilter.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
    )

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

    return (
        <main>
            <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

            <section>
                <JobsListing jobs={pagedResults} />

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            </section>
        </main>
    )
}