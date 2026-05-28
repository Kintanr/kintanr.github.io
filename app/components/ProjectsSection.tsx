import { motion, useSpring, useMotionValue } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Card from './Card';
import projectsData from '../data/projects.json';
import Image from 'next/image';
import { ModalImage } from './ModalImage';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export const ProjectsSection = () => {
  type Project = {
    image: string;
    title: string;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const projects = projectsData.filter((project) => project.priority).slice(0, 6);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 150;
      const moveY = (clientY / window.innerHeight - 0.5) * 150;

      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const codeElements = [
    '{ }',
    '<div>',
    'const',
    '=>',
    '</>',
    'useState',
    'return',
    '<script>',
    'if ()',
  ];

  const t = useTranslations('projects');

  return (
    <section className="relative z-1 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="relative sticky top-0 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center overflow-hidden px-6">
        {codeElements.map((code, index) => (
          <motion.div
            key={index}
            style={{
              left: `${5 + index * 12}%`,
              top: `${20 + (index % 3) * 20}%`,
              x: smoothX,
              y: smoothY,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute font-mono text-2xl text-blue-400/50 select-none md:text-4xl dark:text-blue-300/50"
          >
            {code}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-2 py-2 text-5xl font-bold text-blue-500 md:text-6xl">{t('title')}</h2>
          <p className="mb-4 text-lg text-slate-600 dark:text-slate-300">{t('subtitle')}</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-yellow-500 transition-colors hover:text-blue-500"
          >
            {t('view')} <ExternalLink className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              
              className="group cursor-hover relative"
              style={{ perspective: 1000 }}
            >
              <div className="relative flex h-140 flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-slate-800">
                
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

                
                <Card color={project.color} project={project} />
              </div>
            </motion.div>
          ))}
        </div> */}
      </div>

      <div className="z-2 min-h-screen">
        {projects.map((project, index) => (
          <div
            style={{
              [(index + 1) % 2 === 0 ? 'marginRight' : 'marginLeft']:
                `${index + (0.5 + index) * 5 > 20 ? (index + (1 + index) * 5) / 3 : index + (0.5 + index) * 5}vw`,
              paddingBottom: `${(index + index + 1) * 5 * 10 > 100 ? (index == 5 ? index * 9 : ((index + 1) * 5 * 10) / 4) : (index + index + 1) * 5 * 10}vh`,
              paddingTop: `${index == 0 ? 30 : 0}vh`,
            }}
            className={` ${(index + 1) % 2 === 0 ? 'flex justify-end' : ''} `}
            key={project.id}
          >
            {project.mobile ? (
              <div className="w-50 scale-80 lg:w-80">
                <div className="mockup-phone border-blue-900 shadow-2xl dark:shadow-blue-500/30">
                  <div className="mockup-phone-camera" />
                  <div className="mockup-phone-display">
                    <img
                      src={project.image_mobile}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mockup-browser relative w-80 border border-blue-800 bg-blue-900 shadow-2xl lg:w-100 dark:border-blue-900 dark:bg-blue-950 dark:shadow-blue-500/30">
                <div className="mockup-browser-toolbar">
                  <div className="input bg-blue-800 text-white">{project.title}</div>
                </div>
                <div className="grid h-40 place-content-center lg:h-50">
                  <figure className="relative h-40 w-full lg:h-50">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </figure>
                </div>
              </div>
            )}
          </div>
        ))}
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
