import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Pagination } from './components/Pagination.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { JobsListing } from './components/JobsListing.jsx'



function App() {
  const [currentPage, setCurrentPage] = useState(1)
 
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  
  return (
    <>
      <Header />

      <main>
        <SearchFormSection />

        <section>
          <JobsListing />

          <Pagination currentPage={currentPage} onPageChange={handlePageChange} />

        </section>

      </main>

      <Footer />
    </>
  )
}

export default App