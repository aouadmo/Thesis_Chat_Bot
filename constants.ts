import { ThesisSection } from './types';

export const INITIAL_GREETING = "Hello! I am the digital interface for Mohamed Aouad's PhD thesis on FDSOI Cryogenic Modeling. I can explain technical concepts, compare models (BSIM/L-UTSOI), or walk you through the physics of transistors at 4K. How can I help you today?";

export const SUGGESTED_QUESTIONS = [
  "Why does Maxwell-Boltzmann statistics break down at 4K?",
  "What is the numerical stability challenge in your model?",
  "How does this model differ from BSIM or L-UTSOI?",
  "Explain the Poisson-Schrödinger simulation procedure."
];

// Simulating a vector database or search index with raw text chunks from the thesis
export const THESIS_CONTENT: ThesisSection[] = [
  {
    id: "intro-mb-breakdown",
    title: "Maxwell-Boltzmann Approximation Breakdown",
    pageStart: 15,
    keywords: ["maxwell-boltzmann", "fermi-dirac", "statistics", "4k", "breakdown", "physics"],
    content: `At cryogenic temperatures, the Maxwell-Boltzmann (MB) approximation is not valid anymore; the intrinsic carrier concentration ni becomes extremely small (e.g., 10^-678 cm^-3 at 4.2K), resulting in enormous arithmetic underflows. Physically, if the Fermi level crosses the conduction band edge (Ef >= 0), MB leads to a huge overestimation of carrier densities. The electron distribution must be described by Fermi-Dirac statistics to account for degeneracy.`
  },
  {
    id: "model-comparison",
    title: "State-of-the-art Compact Models",
    pageStart: 6,
    keywords: ["bsim", "l-utsoi", "ekv", "psp", "comparison", "difference"],
    content: `Standard models (BSIM, L-UTSOI, PSP) are originally built for room temperature. Adapting them to cryogenic operation often involves empirical formulas (fitting parameters) rather than physics-based core changes. For example, BSIM uses an effective temperature to emulate Fermi-Dirac statistics. L-UTSOI crashes below 173K without modification. My approach builds a fully-physics based model from scratch using Fermi-Dirac statistics intrinsically, ensuring validity in weak, moderate, and strong inversion without artificial clamping.`
  },
  {
    id: "numerical-stability",
    title: "Numerical Pathology and Quantum Shift",
    pageStart: 64,
    keywords: ["numerical", "stability", "pathology", "convergence", "airy", "quantum shift"],
    content: `A numerical pathology manifests around the zero-gate-charge point when using the standard Airy function solution (2/3 power law) for the quantum shift. This causes singularities in the gate-to-channel capacitance (Cgc). To fix this, I developed an "extended quantum shift function" that connects a linear behavior in weak inversion to the 2/3 power behavior in strong inversion using a smoothing function, ensuring C-infinity continuity and numerical robustness.`
  },
  {
    id: "ps-procedure",
    title: "Poisson-Schrödinger Simulation Procedure",
    pageStart: 37,
    keywords: ["poisson", "schrodinger", "simulation", "methodology", "self-consistent"],
    content: `The solver iterates between Poisson's equation (electrostatics) and Schrödinger's equation (quantum mechanics). 1) Poisson is solved with an initial guess. 2) The potential is fed to Schrödinger to find wave functions and energy levels. 3) Electron concentration is calculated using Fermi-Dirac statistics (or Heaviside at 0K). 4) This new concentration goes back into Poisson. 5) This loops until convergence. I specifically replaced the Fermi-Dirac integral with a Heaviside function for T -> 0K simulations to emulate fully degenerate metallic statistics.`
  },
  {
    id: "mobility",
    title: "Mobility at Cryogenic Temperatures",
    pageStart: 31,
    keywords: ["mobility", "scattering", "coulomb", "roughness", "phonon"],
    content: `At low temperatures, phonon scattering is negligible. Transport is governed by Coulomb scattering (impurities) and Surface Roughness. This leads to a specific "bell-shaped" mobility law. In back-biased FDSOI, I also identified "inter-subband scattering" when the second subband begins to populate, causing a degradation in transconductance.`
  }
];

export const COMPLEXITY_PROMPTS = {
  simple: "Explain this simply for a semi-technical stakeholder or undergraduate student. Focus on the 'Why' and 'What'.",
  rigorous: "Explain this with academic rigor for a PhD researcher. Include specific equations concepts, boundary conditions, and limitations."
};
