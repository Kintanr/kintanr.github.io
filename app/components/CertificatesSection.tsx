import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import certificates from '../data/certificates.json';
import { ModalImage } from './ModalImage';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

export const CertificatesSection = () => {
  const t = useTranslations('certificates');
  // const certificates = [
  //   {
  //     id: 1,
  //     title: 'Advanced React Development',
  //     organization: 'Meta',
  //     year: '2025',
  //     icon: '⚛️',
  //   },
  //   {
  //     id: 2,
  //     title: 'Frontend Web Developer',
  //     organization: 'Google',
  //     year: '2024',
  //     icon: '🎓',
  //   },
  //   {
  //     id: 3,
  //     title: 'JavaScript Algorithms',
  //     organization: 'freeCodeCamp',
  //     year: '2024',
  //     icon: '💻',
  //   },
  //   {
  //     id: 4,
  //     title: 'UI/UX Design Principles',
  //     organization: 'Coursera',
  //     year: '2024',
  //     icon: '🎨',
  //   },
  //   {
  //     id: 5,
  //     title: 'Modern Web Performance',
  //     organization: 'Frontend Masters',
  //     year: '2025',
  //     icon: '⚡',
  //   },
  //   {
  //     id: 6,
  //     title: 'TypeScript Mastery',
  //     organization: 'Udemy',
  //     year: '2023',
  //     icon: '📘',
  //   },
  // ];

  type Certificate = {
    image: string;
    name: string;
  };

  const [selectedCertificate, setselectedCertificate] = useState<Certificate | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = (certificate: Certificate) => {
    setselectedCertificate(certificate);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  return (
    <section
      id="certificates"
      className="relative bg-gradient-to-b from-white to-slate-50 py-32 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-4 py-2 backdrop-blur-sm dark:border-cyan-400/30">
            <Award className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Professional Certifications
            </span>
          </div> */}
          <h2 className="mb-4 text-5xl font-bold text-blue-500 md:text-6xl">{t('title')}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-hover relative"
            >
              <div className="hover-3d mb-10">
                <div className="card max-w-96 rounded-3xl bg-slate-900 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_2px,transparent_2px)] bg-[size:28px_28px] p-0 text-white dark:bg-slate-800">
                  <div className="card-body p-4">
                    <figure className="max-h-60 max-w-100 rounded-2xl">
                      <img src={cert.image} alt={cert.name} onClick={() => openModal(cert)} />
                    </figure>

                    <div className="mb-4 text-lg opacity-70">{cert.name}</div>
                    <div className="text-sm text-slate-300 opacity-70 dark:text-slate-400">
                      {cert.publisher}
                    </div>
                    <div className="text-xs text-slate-400 opacity-70 dark:text-slate-500">
                      {cert.year}
                    </div>
                  </div>
                </div>

                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </motion.div>
          ))}
        </div>

        <ModalImage
          image={selectedCertificate?.image}
          title={selectedCertificate?.name || ''}
          ref={modalRef}
          onClose={() => setselectedCertificate(null)}
        />
      </div>
    </section>
  );
};
