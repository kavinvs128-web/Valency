// Vetted, NCERT-style notes for each lesson the AI can explain.
//
// Prompt-engineering idea: GROUNDING. The model is told to use only this text, so its answer
// comes from lesson facts instead of its own memory. The client sends only a lessonId, never
// the text, so nobody can use this endpoint to send arbitrary text to the model.

const LESSONS = {
  redox: {
    title: "Oxidation and Reduction",
    context: `Oxidation is the loss of electrons, or an increase in oxidation number. Reduction is the gain of electrons, or a decrease in oxidation number. Memory aid: OIL RIG - Oxidation Is Loss, Reduction Is Gain. Oxidation and reduction always happen together, so the reaction is called a redox reaction.
The substance that is reduced takes electrons from the other substance, so it is the oxidising agent. The substance that is oxidised gives electrons, so it is the reducing agent.
Oxidation number rules: an atom in a free element is 0; a monatomic ion has an oxidation number equal to its charge; oxygen is usually -2; hydrogen is usually +1 (-1 in metal hydrides); in a neutral compound the oxidation numbers add up to 0, and in an ion they add up to the charge of the ion.
Example: Zn(s) + Cu2+(aq) -> Zn2+(aq) + Cu(s). Zinc goes from 0 to +2, so it loses 2 electrons and is oxidised; it is the reducing agent. Copper goes from +2 to 0, so it gains 2 electrons and is reduced; Cu2+ is the oxidising agent.
A disproportionation reaction is one in which the same element is both oxidised and reduced, for example 2H2O2 -> 2H2O + O2, where oxygen goes from -1 to -2 and also from -1 to 0.`,
  },

  mole: {
    title: "Mole Concept",
    context: `A mole is the amount of substance that contains 6.022 x 10^23 elementary entities (atoms, molecules or ions). This number is called Avogadro's number.
Molar mass is the mass of one mole of a substance, in grams per mole (g/mol). Number of moles n = given mass (g) / molar mass (g/mol). Number of particles = n x 6.022 x 10^23.
Example: the molar mass of water, H2O, is 18 g/mol (2 x 1 + 16). So 36 g of water is 36 / 18 = 2 mol, which contains 2 x 6.022 x 10^23 molecules.
For gases, one mole of any ideal gas occupies 22.4 L at 273.15 K and 1 atm.
Mass percentage of an element = (mass of that element in one mole of the compound / molar mass of the compound) x 100.`,
  },

  periodic: {
    title: "Periodic Classification of Elements",
    context: `The modern periodic law says that the properties of elements are a periodic function of their atomic numbers. The modern periodic table has 7 periods (rows) and 18 groups (columns). Elements in the same group have similar properties because they have the same number of valence electrons.
The table is divided into blocks: the s-block is groups 1 and 2, the p-block is groups 13 to 18, the d-block is groups 3 to 12, and the f-block is the lanthanoids and actinoids placed below the table. Group 1 elements are alkali metals, group 17 elements are halogens, and group 18 elements are noble gases.
Trends across a period, left to right: atomic radius generally decreases because the nuclear charge increases while electrons enter the same shell; ionisation enthalpy and electronegativity generally increase.
Trends down a group: atomic radius increases because new shells are added; ionisation enthalpy and electronegativity generally decrease.
Ionisation enthalpy has small exceptions in period 3: aluminium is lower than magnesium, and sulphur is lower than phosphorus.
Why: in aluminium the outer electron is in a 3p orbital, which has slightly higher energy and is shielded by the 3s electrons, so it is easier to remove than magnesium's 3s electron. In sulphur, two electrons share one 3p orbital and repel each other, so one of them is easier to remove than in phosphorus.
Example: atomic radius falls from sodium (186 pm) to chlorine (99 pm) across period 3, and rises from lithium (152 pm) to caesium (262 pm) down group 1.`,
  },
};

module.exports = { LESSONS };
