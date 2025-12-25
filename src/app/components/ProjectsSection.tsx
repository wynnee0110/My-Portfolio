import { projects } from "../data/projectsData";
import { FiExternalLink } from "react-icons/fi";  // adjust path based on file structure

export default function ProjectsSection() {
  return (
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 hover">
  {projects.map((project, index) => (
<div
  key={index}
  className="p-6 rounded-2xl bg-black/10 backdrop-blur-md border border-white/20 shadow-lg max-w-sm flex flex-col justify-between hover:scale-102 transition-transform duration-300"
>
  <div>
    <h3 className="text-lg text-white font-semibold mb-2">{project.title}</h3>

    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
      <li>{project.description}</li>
      <li>{project.description2}</li>
    </ul>

    <div className="flex flex-wrap gap-2 mt-3">
      {project.languages?.map((tag, i) => (
        <span
          key={i}
          className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>

  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 mt-4 px-3 py-2 text-white text-xs font-small transition-transform duration-200"
  >
    Live Demo <FiExternalLink className="w-4 h-4" />
  </a>
</div>

  ))}
</section>

  );
}
