// Shared between the contact form and its API route so both enforce the same rules.

export const topics = [
  { value: "project", label: "A hardware or firmware project" },
  { value: "early-access", label: "Radon Sentinel early access" },
  { value: "newsletter", label: "Notify me about new articles" },
  { value: "other", label: "Something else" },
] as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (input.name.length > 120) errors.name = "That name is too long.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Enter an email like name@company.com.";
  if (!topics.some((t) => t.value === input.topic)) errors.topic = "Choose what this is about.";
  const needsMessage = input.topic === "project" || input.topic === "other";
  if (needsMessage && input.message.trim().length < 20)
    errors.message = "A sentence or two about the project helps us prepare (20 characters minimum).";
  if (input.message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
  if (input.company.length > 160) errors.company = "That company name is too long.";
  return errors;
}
