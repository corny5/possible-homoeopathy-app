// Config-driven questionnaire system.
// For now every condition uses the same general homeopathic intake form,
// but each disease can define its own questionnaire here later — the form
// renders whatever `getQuestionnaire(slug)` returns.

export type FieldType = "text" | "textarea" | "select" | "radio" | "checkbox" | "scale";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  /** Columns for checkbox / radio option grids. */
  cols?: 2 | 3;
}

export interface Section {
  title: string;
  description?: string;
  fields: Field[];
}

export type Questionnaire = Section[];

// General homeopathic case-taking questionnaire (applies to all conditions).
export const defaultQuestionnaire: Questionnaire = [
  {
    title: "About Your Condition",
    fields: [
      {
        name: "since",
        label: "How long have you had this condition?",
        type: "text",
        placeholder: "e.g. 3 years, since childhood",
      },
      {
        name: "frequency",
        label: "How often do symptoms occur?",
        type: "select",
        options: [
          "All the time / constant",
          "Daily",
          "Several times a week",
          "Once a week",
          "A few times a month",
          "Occasionally / irregularly",
        ],
      },
      {
        name: "severity",
        label: "How severe are your symptoms right now?",
        type: "scale",
        required: true,
      },
    ],
  },
  {
    title: "Symptoms & Triggers",
    fields: [
      {
        name: "symptoms",
        label: "Describe your main symptoms",
        type: "textarea",
        placeholder: "Tell us what you feel and where.",
      },
      {
        name: "triggers",
        label: "What makes it worse? (select all that apply)",
        type: "checkbox",
        cols: 2,
        options: [
          "Stress / tension",
          "Lack of sleep",
          "Certain foods",
          "Weather change",
          "Physical exertion",
          "Skipping meals",
          "Screen time",
          "Not sure",
        ],
      },
      {
        name: "relief",
        label: "What gives you relief?",
        type: "text",
        placeholder: "e.g. rest, warm water, lying down",
      },
    ],
  },
  {
    title: "Health Background",
    fields: [
      {
        name: "medications",
        label: "Current medicines or treatments",
        type: "textarea",
        placeholder: "List any medicines you take now.",
      },
      {
        name: "history",
        label: "Past & family medical history",
        type: "textarea",
        placeholder: "Any other conditions, surgeries, or family history.",
      },
    ],
  },
];

// Per-disease overrides can be added here, e.g. { migraine: migraineQuestionnaire }.
export const questionnaires: Record<string, Questionnaire> = {};

export const getQuestionnaire = (slug?: string): Questionnaire =>
  (slug && questionnaires[slug]) || defaultQuestionnaire;
