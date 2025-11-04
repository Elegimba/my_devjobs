import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Pagination } from './components/Pagination.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { JobsListing } from './components/JobsListing.jsx'



function App() {

  const handlePageChange = (page) => {
    console.log('Cambiando a la página:', page)
  }
  
  return (
    <>
      <Header />

      <main>
        <SearchFormSection />

        <section>
          <JobsListing />

          <Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />

        </section>

      </main>

      <Footer />
    </>
  )
}

export default App