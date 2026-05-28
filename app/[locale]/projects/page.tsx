'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Filter } from 'lucide-react';
import Link from 'next/link';
import Card from '../../components/Card';
import projectsData from '../../data/projects.json';
import Image from 'next/image';
import { ModalImage } from '../../components/ModalImage';
import { useTranslations } from 'next-intl';

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const common = useTranslations('common');
  const navbar = useTranslations('navbar');
  const [selectedFilter, setSelectedFilter] = useState('All');

  type Project = {
    image: string;
    title: string;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);

  const filters = ['All', 'React', 'Vue', 'Firebase', 'Tailwind'];

  const allProjects = projectsData;

  const filteredProjects =
    selectedFilter === 'All'
      ? allProjects
      : allProjects.filter((project) =>
          project.stack.some((stack) => stack.toLowerCase().includes(selectedFilter.toLowerCase()))
        );

  const openModal = (project: Project) => {
    setSelectedProject(project);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20 dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-yellow-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-5 w-5" />
            {common('back_home')}
          </Link>

          <h1 className="mb-4 bg-gradient-to-r from-yellow-500 to-blue-600 bg-clip-text pb-4 text-5xl font-bold text-transparent md:text-7xl">
            {t('title2')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">{t('description')}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Filter className="h-5 w-5" />
              <span className="font-semibold">{common('filter_by')}:</span>
            </div>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`cursor-hover rounded-full px-6 py-2 transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
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
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <div className="mb-4 text-6xl">🔍</div>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              {common('not_found_filter', { item: navbar('project') })}
            </p>
          </motion.div>
        )}
      </div>

      <ModalImage
        image={selectedProject?.image}
        title={selectedProject?.title || ''}
        ref={modalRef}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
