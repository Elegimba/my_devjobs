import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Pagination } from './components/Pagination.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { JobsListing } from './components/JobsListing.jsx'
import jobsData from './data.json'


const RESULTS_PER_PAGE = 3


function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)

  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )
 
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  
  return (
    <>
      <Header />

      <main>
        <SearchFormSection />

        <section>
          <JobsListing jobs={pagedResults} />

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

        </section>

      </main>

      <Footer />
    </>
  )
}

export default App