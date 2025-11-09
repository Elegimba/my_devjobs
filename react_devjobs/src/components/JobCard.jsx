export function JobCard({ job }) {
    return (
        <article
            className="job-listing-card"
            data-technology={job.data.technology}
            data-modalidad={job.data.modalidad}
            data-nivel={job.data.nivel}
        >
            <div>
                <h3><a href="./detalles.html">{job.titulo}</a></h3>
                <small>{job.empresa} | {job.ubicacion}</small>
                <p>{job.descripcion}</p>
            </div>
            <button className="button-apply-job">Aplicar</button>
        </article>   
    )
}