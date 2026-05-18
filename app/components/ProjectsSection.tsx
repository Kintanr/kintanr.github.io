import { color, motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Card from './Card';
import projectsData from '../data/projects.json';
import Image from 'next/image';
import { ModalImage } from './ModalImage';
import { useState, useRef } from 'react';

export const ProjectsSection = () => {
  type Project = {
    image: string;
    title: string;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const projects = projectsData.filter((project) => project.priority).slice(0, 3);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <section className="relative bg-slate-50 pt-10 pb-55 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 py-2 text-5xl font-bold text-blue-500 md:text-6xl">
            Featured Projects
          </h2>
          <p className="mb-6 text-lg text-slate-600 dark:text-slate-300">Some of my recent work</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-yellow-500 transition-colors hover:text-blue-500"
          >
            View all projects <ExternalLink className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              // whileHover={{ y: -10, rotateY: 5, rotateX: 5 }}
              className="group cursor-hover relative"
              style={{ perspective: 1000 }}
            >
              <div className="relative flex h-140 flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-slate-800">
                {/* Project image/icon */}
                <div
                  className={`h-80 w-full bg-gradient-to-br ${project.gradient} relative flex items-center justify-center overflow-hidden text-8xl`}
                >
                  <div className="relative z-10 h-full w-full">
                    <figure className="h-full w-full">
                      <Image
                        onClick={() => openModal(project)}
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center"
                      />
                    </figure>
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-white/20"
                  />
                </div>

                {/* Project info */}
                <Card color={project.color} project={project} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ModalImage
        image={selectedProject?.image}
        title={selectedProject?.title || ''}
        ref={modalRef}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
