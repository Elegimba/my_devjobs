import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Pagination } from './components/Pagination.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { JobsListing } from './components/JobsListing.jsx'



function App() {
  return (
    <>
      <Header />

      <main>
        <SearchFormSection />

        <section>
          <JobsListing />

          <Pagination />

        </section>

      </main>

      <Footer />
    </>
  )
}

export default App