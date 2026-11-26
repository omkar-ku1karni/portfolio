import type { Project } from '../../content/types';

export const familyLabel = (f: Project['family']) => (f === 'ai' ? 'AI engineering' : 'Analytics & ML');
export const familyColor = (f: Project['family']) => (f === 'ai' ? 'ember' : 'lilac') as 'ember' | 'lilac';
