import { projects } from "../data/projectsData";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";

export default function ProjectsSection() {
  return (
<section className="max-w-5xl mx-auto px-6 py-6" id="projects">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    {projects.slice(0, 4).map((project, index) => (
      <div
        key={index}
        className="
          group relative flex flex-col h-full min-h-[22rem]
          rounded-xl overflow-hidden
          border border-black/10 dark:border-white/10
          bg-white/5 backdrop-blur-md
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:shadow-xl
          hover:border-black/30 dark:hover:border-white/30
        "
      >

        {/* IMAGE */}
        <div className="relative w-full h-44 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="
                object-cover
                transition-transform duration-500 ease-out
                group-hover:scale-110
              "
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10">
              <span className="text-xs text-black/30 dark:text-white/30">
                No preview
              </span>
            </div>
          )}

          {/* hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 justify-between p-4">

          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-semibold text-black dark:text-white truncate pr-2">
                {project.title}
              </h3>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-black/40 dark:text-white/40
                  hover:text-black dark:hover:text-white
                  transition-transform duration-200
                  hover:scale-110
                "
              >
                <FiExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-black/70 dark:text-white/70 line-clamp-3 mb-4 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
            {project.languages?.map((tag, i) => (
              <span
                key={i}
                className="
                  px-2 py-0.5 text-[10px] font-medium
                  rounded-md
                  bg-black/5 dark:bg-white/10
                  text-black/80 dark:text-white/80
                "
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    ))}
  </div>
</section>
  );
}