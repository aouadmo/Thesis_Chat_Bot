import { Message, Sender, ThesisSection, ComplexityLevel } from '../types';
import { THESIS_CONTENT, COMPLEXITY_PROMPTS } from '../constants';

// Simple keyword matching to simulate AI retrieval
const findRelevantSections = (query: string): ThesisSection[] => {
  const terms = query.toLowerCase().split(' ').filter(t => t.length > 3);
  
  return THESIS_CONTENT.filter(section => {
    const text = (section.title + " " + section.content + " " + section.keywords.join(" ")).toLowerCase();
    // Basic scoring: how many terms match?
    const matches = terms.filter(term => text.includes(term)).length;
    return matches > 0;
  }).sort((a, b) => {
    // Sort by relevance (naive)
    const scoreA = terms.filter(term => (a.title + a.keywords.join(" ")).toLowerCase().includes(term)).length;
    const scoreB = terms.filter(term => (b.title + b.keywords.join(" ")).toLowerCase().includes(term)).length;
    return scoreB - scoreA;
  });
};

const generateResponseText = (query: string, sections: ThesisSection[], complexity: ComplexityLevel): string => {
  if (sections.length === 0) {
    return "I'm sorry, I couldn't find specific information in the thesis regarding that query. I can answer questions about Maxwell-Boltzmann breakdown, Numerical Modeling, BSIM/L-UTSOI comparisons, or the Poisson-Schrödinger procedure.";
  }

  const primarySection = sections[0];
  
  // Simulating generation based on complexity
  if (complexity === 'simple') {
    if (primarySection.id === 'intro-mb-breakdown') {
      return "At very low temperatures (like 4 Kelvin), the standard math used for chips (Maxwell-Boltzmann) fails because it assumes electrons behave like a gas of distinct particles. In reality, at these temperatures, they behave more like a dense crowd (quantum degeneracy). If we use the old math, the equations try to divide by zero or produce impossibly huge numbers. We have to switch to **Fermi-Dirac statistics** to accurately count the electrons.";
    }
    if (primarySection.id === 'model-comparison') {
      return "Think of standard models like BSIM or L-UTSOI as maps drawn for warm weather. To use them in the cold, engineers usually just add 'correction stickers' (empirical fittings). My model is different: I redrew the map specifically for the cold. It calculates the physics from the ground up using the correct statistics, so it doesn't crash or give weird results when the device turns on.";
    }
    if (primarySection.id === 'numerical-stability') {
      return "A major challenge is that the math used to calculate the quantum effects has a 'kink' or a sharp point when the transistor switches from off to on (around zero charge). This sharp point makes circuit simulators crash. I created a mathematical 'bridge' (a smoothing function) that connects the off-state math to the on-state math smoothly, ensuring the simulation runs stable.";
    }
    if (primarySection.id === 'ps-procedure') {
        return "The simulation is like a conversation between two laws of physics: **Poisson** (how voltage pushes charges) and **Schrödinger** (how quantum mechanics arranges charges). The computer guesses a voltage, asks Schrödinger where the electrons go, then asks Poisson if that voltage makes sense with those electrons. It repeats this loop until both agree. I tuned this specifically for 0 Kelvin."
    }
    return `Here is a high-level summary based on section "${primarySection.title}": ${primarySection.content}`;
  } else {
    // Rigorous
    if (primarySection.id === 'intro-mb-breakdown') {
        return `The breakdown of Maxwell-Boltzmann (MB) statistics at cryogenic temperatures is twofold:
        
1. **Numerical:** The intrinsic carrier concentration $n_i$ scales as $\\exp(-E_g/2kT)$. At 4.2K, $n_i \\approx 10^{-678} cm^{-3}$, causing arithmetic underflow in IEEE double precision.
2. **Physical:** When the quasi-Fermi level $E_f$ approaches or exceeds the conduction band edge $E_c$ (degenerate regime), the Boltzmann approximation $f(E) \\approx \\exp(-(E-E_f)/kT)$ drastically overestimates carrier density compared to the correct Fermi-Dirac distribution $f(E) = 1 / (1 + \\exp((E-E_f)/kT))$.

**Solution:** The model explicitly implements Fermi-Dirac integrals of order 0 ($F_0$) to describe the 2D electron gas density continuously from weak to strong inversion.`;
    }
    if (primarySection.id === 'numerical-stability') {
        return `The numerical instability arises from the **Quantum Shift** function $\\Delta V(Q_g)$. 
        
Standard models approximate the potential well as triangular, leading to an Airy function solution where $\\Delta V \\propto Q_g^{2/3}$. The derivative of this function $d(\\Delta V)/dQ_g$ diverges as $Q_g \\to 0$ (singularity).

**Methodological Solution:**
I proposed an **Extended Quantum Shift Function** constructed via a piecewise smoothing technique:
1. **Linear Region (Weak Inversion):** $\\Delta V \\propto Q_g$
2. **Power Law Region (Strong Inversion):** $\\Delta V \\propto Q_g^{2/3}$
3. **Smoothing:** These are connected using a generalized smoothing formalism (Eq 4.17 in thesis) to ensure $C^\\infty$ continuity for the gate-to-channel capacitance ($C_{gc}$).`;
    }
    // Default fallback for rigorous
    return `**From Section: ${primarySection.title}**\n\n${primarySection.content}\n\nThis approach ensures physical validity where $T \\to 0K$.`;
  }
};

const getFollowUpQuestions = (query: string): string[] => {
  const q = query.toLowerCase();
  if (q.includes('maxwell') || q.includes('statistics')) return ["How do you handle the calculation at exactly 0 Kelvin?", "What is the impact on the subthreshold slope?"];
  if (q.includes('stability') || q.includes('numerical')) return ["Show me the equation for the extended quantum shift.", "How does this affect the C-V curves?"];
  if (q.includes('poisson')) return ["How do you handle boundary conditions?", "What happens to the intrinsic carrier concentration at 0K?"];
  return ["Tell me about the mobility model.", "What about short channel effects?"];
};

export const processMessage = async (query: string, complexity: ComplexityLevel): Promise<Message> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const relevantSections = findRelevantSections(query);
  const responseText = generateResponseText(query, relevantSections, complexity);
  const followUps = getFollowUpQuestions(query);

  // Create citations
  const citations = relevantSections.map(s => ({
    id: s.id,
    text: s.title,
    section: "Chapter " + (s.pageStart < 15 ? "1" : s.pageStart < 37 ? "2" : s.pageStart < 60 ? "3" : "4"),
    page: s.pageStart
  })).slice(0, 2); // Limit to top 2

  return {
    id: Date.now().toString(),
    text: responseText,
    sender: Sender.BOT,
    timestamp: new Date(),
    citations: citations.length > 0 ? citations : undefined,
    relatedQuestions: followUps
  };
};