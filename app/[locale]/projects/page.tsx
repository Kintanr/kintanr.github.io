import type { Metadata } from 'next';
import ProjectClient from './ProjectClient';

export const metadata: Metadata = {
  title: 'Peroject',
};

export default function Page() {
  return <ProjectClient />;
}
