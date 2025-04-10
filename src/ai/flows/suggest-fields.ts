'use server';
/**
 * @fileOverview An AI agent that suggests form fields based on a form title or description.
 *
 * - suggestFields - A function that suggests form fields.
 * - SuggestFieldsInput - The input type for the suggestFields function.
 * - SuggestFieldsOutput - The return type for the suggestFields function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestFieldsInputSchema = z.object({
  title: z.string().describe('The title of the form.'),
  description: z.string().describe('The description of the form.'),
});
export type SuggestFieldsInput = z.infer<typeof SuggestFieldsInputSchema>;

const SuggestFieldsOutputSchema = z.object({
  suggestedFields: z.array(
    z.string().describe('A suggested form field based on the title and description.')
  ).describe('An array of suggested form fields.')
});
export type SuggestFieldsOutput = z.infer<typeof SuggestFieldsOutputSchema>;

export async function suggestFields(input: SuggestFieldsInput): Promise<SuggestFieldsOutput> {
  return suggestFieldsFlow(input);
}













const prompt = ai.definePrompt({
  name: 'suggestFieldsPrompt',
  input: {
    schema: z.object({
      title: z.string().describe('The title of the form.'),
      description: z.string().describe('The description of the form.'),
    }),
  },
  output: {
    schema: z.object({
      suggestedFields: z.array(
        z.string().describe('A suggested form field based on the title and description.')
      ).describe('An array of suggested form fields.')
    }),
  },
  prompt: `You are an AI assistant designed to suggest form fields based on a form's title and description.

  Given the following form title and description, suggest relevant form fields that would be useful to include in the form.

  Title: {{{title}}}
  Description: {{{description}}}

  Suggested Form Fields:`,
});

const suggestFieldsFlow = ai.defineFlow<
  typeof SuggestFieldsInputSchema,
  typeof SuggestFieldsOutputSchema
>({
  name: 'suggestFieldsFlow',
  inputSchema: SuggestFieldsInputSchema,
  outputSchema: SuggestFieldsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
