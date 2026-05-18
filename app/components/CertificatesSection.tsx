import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export const CertificatesSection = () => {
  const certificates = [
    {
      id: 1,
      title: 'Advanced React Development',
      organization: 'Meta',
      year: '2025',
      icon: '⚛️',
    },
    {
      id: 2,
      title: 'Frontend Web Developer',
      organization: 'Google',
      year: '2024',
      icon: '🎓',
    },
    {
      id: 3,
      title: 'JavaScript Algorithms',
      organization: 'freeCodeCamp',
      year: '2024',
      icon: '💻',
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      organization: 'Coursera',
      year: '2024',
      icon: '🎨',
    },
    {
      id: 5,
      title: 'Modern Web Performance',
      organization: 'Frontend Masters',
      year: '2025',
      icon: '⚡',
    },
    {
      id: 6,
      title: 'TypeScript Mastery',
      organization: 'Udemy',
      year: '2023',
      icon: '📘',
    },
  ];

  return (
    <section
      id="certificates"
      className="relative bg-gradient-to-b from-white to-slate-50 pt-32 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-4 py-2 backdrop-blur-sm dark:border-cyan-400/30">
            <Award className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Professional Certifications
            </span>
          </div>
          <h2 className="mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Certificates
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Continuous learning and professional development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-hover relative"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:border-transparent hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative mb-4 text-6xl">{cert.icon}</div>

                {/* Content */}
                <div className="relative">
                  <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="mb-1 font-semibold text-cyan-500 dark:text-cyan-400">
                    {cert.organization}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{cert.year}</p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
