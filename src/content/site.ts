/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit this file to change anything a visitor reads.
 *  Every section is built from it automatically: add a project
 *  and it gets a card, a full-screen sheet and its links
 *  without touching any component.
 * ─────────────────────────────────────────────────────────────
 *
 *  Tips
 *  - Numbers inside descriptions and bullets are highlighted
 *    automatically; just write them in the sentence.
 *  - In achievements, wrap text in **double asterisks** to bold it.
 */
import type { SiteContent } from './types';

export const site: SiteContent = {
  profile: {
    name: 'Omkar Kulkarni',
    tagline:
      'I build AI and machine-learning systems, from LLM agents and RAG to recommenders and experimentation, and turn messy data into decisions a business can defend.',
    location: 'West Lafayette, Indiana',
    headshot: '/headshot.webp',
  },

  reach: [
    { label: 'Resume', value: 'PDF', href: '/resume.pdf', icon: 'resume' },
    {
      label: 'Email',
      value: 'omkarkulkarni1220@gmail.com',
      href: 'mailto:omkarkulkarni1220@gmail.com',
      icon: 'email',
    },
    {
      label: 'LinkedIn',
      value: 'in/reachomkarkulkarni',
      href: 'https://linkedin.com/in/reachomkarkulkarni',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      value: 'omkar-ku1karni',
      href: 'https://github.com/omkar-ku1karni',
      icon: 'github',
    },
  ],

  projects: [
    {
      title: 'Experiment Decision Engine',
      family: 'analytics',
      preview: 'pipeline',
      summary:
        'An A/B-test audit system that checks experiment health before evidence and returns a ship, no ship, inconclusive or blocked readout with reason codes. It audits all 32,487 tests in the Upworthy archive.',
      links: {
        repo: 'https://github.com/omkar-ku1karni/experiment-engine',
        live: 'https://omkar-ku1karni.github.io/experiment-engine/',
      },
    },
    {
      title: 'ReelRank: Short-Video Recommender',
      family: 'analytics',
      preview: 'funnel',
      summary:
        'A multi-stage short-video recommender on 11.6M real KuaiRec interactions: two-tower retrieval, LightGBM ranking and diversity reranking, evaluated leakage-safe with bootstrap intervals.',
      links: {
        repo: 'https://github.com/omkar-ku1karni/reelrank',
        live: 'https://omkar-ku1karni.github.io/reelrank/',
      },
    },
    {
      title: 'Fieldnote: Multimodal RAG for Field Technicians',
      family: 'ai',
      preview: 'fusion',
      summary:
        'Multimodal RAG for HVAC technicians that answers from manuals, job photos and support calls, and cites the exact chart, clip or photo behind every claim.',
      links: {
        repo: 'https://github.com/omkar-ku1karni/fieldnote',
        live: 'https://omkar-ku1karni.github.io/fieldnote/',
      },
    },
    {
      title: 'Casefile: Multi-Agent Claims Triage',
      family: 'ai',
      preview: 'agents',
      summary:
        "Multi-agent claims triage where a supervisor and three specialists draft a recommendation that can't pay out without an adjuster's approval, enforced in code and in the database.",
      links: {
        repo: 'https://github.com/omkar-ku1karni/casefile',
        live: 'https://omkar-ku1karni.github.io/casefile/',
      },
    },
  ],

  // Matches the current resume (public/resume.pdf). Keep the two in step.
  experience: [
    {
      title: 'AI Operations Fellow',
      company: 'iA (prev. Innovation Associates)',
      period: 'Nov 2026 – Present',
      location: 'Indianapolis, Indiana · Hybrid · Part-time',
      achievements: [
        'Collaborating with Customer Support stakeholders to identify opportunities for AI-powered knowledge retrieval and workflow automation.',
        'Supporting the development and evaluation of AI-assisted solutions to streamline support operations, improve access to information, and reduce manual effort.',
      ],
    },
    {
      title: 'Software AI Engineer',
      company: 'Zebra Technologies',
      period: 'Jul 2025 – Jun 2026',
      location: 'Bangalore, India · Hybrid',
      achievements: [
        'Built **Agent Kit**, a reusable framework for A2A-compliant LangGraph agents, reducing agent development time by **95%** and enabling configuration-driven agent creation with only four parameters.',
        'Designed and deployed a **Jira Release Notes Agent** that transformed sprint ticket data into configurable release documentation, achieving a **100% automated workflow** and eliminating repetitive manual documentation effort.',
        'Built a **multi-agent conversational platform** with automatic agent discovery and intelligent routing, enabling a unified interface for interacting with multiple enterprise A2A agents.',
        'Developed and maintained **MCP-based enterprise integrations with policy-driven access controls**, enabling secure integration of internal applications with AI agents.',
        'Enabled automation of **785** test cases by building and benchmarking **fine-tuned YAMNet and wav2vec audio classification models**.',
        'Mentored and led two engineering interns in the development of ATLAS, an automated multi-agent test-run creation system that generated test plans from repository commits and change-log analysis.',
      ],
    },
    {
      title: 'Software Engineering Intern',
      company: 'Zebra Technologies',
      period: 'Jan 2025 – Jul 2025',
      location: 'Bangalore, India · Hybrid',
      achievements: [
        'Analyzed and automated **test-execution workflows** by developing a Flask/PyQt5 desktop application, reducing manual testing effort by approximately **60%** and streamlining end-to-end execution.',
        'Independently analyzed legacy test scripts to identify inefficiencies and bottlenecks, developing Plotly visualizations to communicate findings and recommendations to senior leadership.',
        'Designed a **dynamic test-suite generation system** that translated execution requirements into customized Robot Framework scripts on demand, reducing test execution time by **75%**.',
      ],
    },
    // Not on the current resume, so hidden. Uncomment to show it again.
    // {
    //   title: 'Data Science Intern',
    //   company: 'Syllexa Solutions LLP',
    //   period: 'Jun 2023 – Jul 2023',
    //   location: 'Bangalore, India · Hybrid',
    //   achievements: [
    //     'Developed Python-based trading indicators supporting short-term financial market analysis.',
    //     'Applied **Dynamic Time Warping (DTW)** techniques to identify similarity patterns across time-series datasets.',
    //   ],
    // },
  ],

  education: [
    {
      institution: 'Purdue University',
      location: 'West Lafayette, Indiana',
      degree: 'MS in Business Analytics and Information Management',
      period: 'Aug 2026 – Jul 2027',
      status: 'in-progress',
    },
    {
      institution: 'PES University',
      location: 'Bangalore, India',
      degree: 'B.Tech in Electronics and Communication Engineering',
      period: 'Sep 2021 – Jun 2025',
      status: 'complete',
    },
  ],

  publications: [
    {
      title: 'SURF: Sequential Undersampling-Refinement Framework for Fraud Detection under Extreme Class Imbalance',
      authors: ['Pranav GN', 'Omkar Kulkarni', 'et al.'],
      venue: 'IEEE, 13th International Symposium on Digital Forensics and Security (ISDFS), Boston, MA',
      summary:
        'Co-authored a fraud-detection framework using **Autoencoders and 1D CNNs** for extreme class imbalance, with a **GAN-based undersampling pipeline** that improved model robustness and generalization.',
      year: '2025',
      url: 'https://ieeexplore.ieee.org/document/11011970',
    },
  ],

  credentials: [
    // Dates below match the certificate images. TODO(omkar): the old site's two AWS
    // verify links looked like placeholders (one had non-hex characters); add real ones.
    { name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services', group: 'AWS', date: '2026', image: '/certifications/AWS_AIP.webp' },
    // TODO(omkar): this used the AI Practitioner image on the old site; add the right one.
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', group: 'AWS', date: '2024' },
    { name: 'Retrieval-Augmented Generation (RAG)', issuer: 'DeepLearning.AI', group: 'AI & Agents', date: '2026', image: '/certifications/RAG.webp', verifyUrl: 'https://www.deeplearning.ai/certificates/0675bda9-1346-426f-bef9-ab704ac6a0a2' },
    { name: 'Machine Learning Specialization', issuer: 'DeepLearning.AI · Stanford', group: 'AI & Agents', date: '2023', image: '/certifications/Machine_Learning_Specialization.webp', verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/FVGB6B2FRKJZ' },
    { name: 'Model Context Protocol (Intro)', issuer: 'Anthropic', group: 'AI & Agents', date: '2026', image: '/certifications/MCP1.webp', verifyUrl: 'https://verify.skilljar.com/c/bed956pii628' },
    { name: 'Model Context Protocol (Advanced)', issuer: 'Anthropic', group: 'AI & Agents', date: '2026', image: '/certifications/MCP2.webp', verifyUrl: 'https://verify.skilljar.com/c/shqgqykhcwoa' },
    { name: 'OCI AI Foundations Associate', issuer: 'Oracle', group: 'Oracle Cloud', date: '2025', image: '/certifications/OCI_AI_Foundations.webp' },
    { name: 'OCI Data Science Professional', issuer: 'Oracle', group: 'Oracle Cloud', date: '2025', image: '/certifications/Data_Science_Professional.webp' },
    { name: 'OCI Foundations Associate', issuer: 'Oracle', group: 'Oracle Cloud', date: '2025', image: '/certifications/OCI_Foundations.webp' },
    { name: 'Fusion AI Agent Studio Associate', issuer: 'Oracle', group: 'Oracle Cloud', date: '2025', image: '/certifications/OCI_Fusion.webp' },
    { name: 'Data Analysis with Python', issuer: 'IBM', group: 'Data & Programming', date: '2024', image: '/certifications/IBM_DataAnalytics.webp', verifyUrl: 'https://courses.cognitiveclass.ai/certificates/ce42002deff74c8caf060d5530429389' },
    { name: 'Programming & Data Science Foundations', issuer: 'IIT Madras', group: 'Data & Programming', date: '2023', image: '/certifications/IITM.webp' },
  ],

  skills: [
    {
      label: 'Languages & Tools',
      items: ['Python', 'SQL', 'Pandas / NumPy', 'Scikit-learn', 'PyTorch', 'Excel', 'Git', 'Docker'],
    },
    {
      label: 'Analytics',
      items: ['Data Modeling', 'ETL & Data Pipelines', 'KPI & Metric Definition', 'Cohort & Funnel Analysis', 'Dashboarding & Reporting', 'Requirements Gathering', 'Data Storytelling', 'Stakeholder Communication'],
    },
    {
      label: 'Statistics & ML',
      items: ['A/B Testing & Experiment Design', 'Hypothesis Testing', 'Causal Inference', 'Regression & Classification', 'Gradient Boosting', 'Deep Learning', 'Time-Series Forecasting', 'Model Evaluation'],
    },
    {
      label: 'AI Engineering',
      items: ['LLMs & Prompt Engineering', 'RAG Systems', 'AI Agents', 'LangChain / LangGraph', 'Vector Databases', 'Model Context Protocol', 'LLM Evaluation'],
    },
  ],

  contact: {
    heading: "Let's build something impactful.",
  },
};
