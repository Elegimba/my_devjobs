import { JobCard } from './JobCard.jsx'

export function JobsListing({ jobs }) {
  return(
    <>
      <h2>Resultados de búsqueda</h2>

        <div className="jobs-listing">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
    </>
  )
}
