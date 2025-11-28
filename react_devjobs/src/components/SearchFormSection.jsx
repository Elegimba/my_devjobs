import { useId, useRef, useState } from "react"


const useSearchForm = ({ idTechnology, idLocation, idLevel, idText, onSearch, onTextFilter }) => {
  const timeoutId = useRef(null)
  const [searchText, setSearchText] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    if (event.target.name === idText) {
      return
    }

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      level: formData.get(idLevel)
    }

    onSearch(filters)
  }

  const handleTextChange = (event) => {
    const text = event.target.value
    setSearchText(text)

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(() => {
      onTextFilter(text)
    }, 500)
  }

  return {
    searchText, handleSubmit, handleTextChange
  }
}

export function SearchFormSection({ initialFilters, onTextFilter, onSearch, initialText }) {
  const idText = useId()
  const inputRef = useRef()
  const idTechnology = useId()
  const technologyRef = useRef()
  const idLocation = useId()
  const locationRef = useRef()
  const idLevel = useId()
  const levelRef = useRef()

  const { handleSubmit, handleTextChange } = useSearchForm({ idTechnology, idLocation, idLevel, idText, onSearch, onTextFilter })

  const handleClearInput = (event) => {
    event.preventDefault()
    inputRef.current.value = ""
    onTextFilter("")

    technologyRef.current.value = ""
    locationRef.current.value = ""
    levelRef.current.value = ""
    onSearch({ technology: "", location: "", level: "" })
  }


  return (
    <section className="jobs-search">
      <h2>Encuentra tu próximo trabajo</h2>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form onChange={handleSubmit} role="search" id="empleos-search-form">

        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input name={idText} onChange={handleTextChange} ref={inputRef} defaultValue={initialText} id="empleos-search-input" type="text" placeholder="Busca trabajos, empresas o habilidades" />

          <button onClick={handleClearInput}>
            ✖
          </button>

        </div>

        <div className="search-filters">
          <select name={idTechnology} id="filter-technology" defaultValue={initialFilters.technology} ref={technologyRef}>
            <option value="">Tecnología</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="react">React</option>
            <option value="node.js">Node.js</option>
          </select>

          <select name={idLocation} id="filter-location" defaultValue={initialFilters.location} ref={locationRef}>
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select name={idLevel} id="filter-experience-level" defaultValue={initialFilters.level} ref={levelRef}>
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </form>

      <span id="filter-selected-vlue"></span>
    </section>
  )
}
