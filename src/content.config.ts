import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        // Term fields
        termId: z.string().optional(),
        module: z.string().optional(),
        moduleSlug: z.string().optional(),
        subarea: z.string().optional(),
        fieldCode: z.string().optional(),
        definition: z.string().optional(),
        whereInMaximo: z.string().optional(),
        riverbendExample: z.string().optional(),
        relatedTerms: z.array(z.object({
          label: z.string(),
          slug: z.string().nullable(),
        })).optional(),
        commonMisconception: z.string().optional(),
        difficulty: z.string().optional(),
        versionNote: z.string().optional(),
        verifyIn: z.string().optional(),
        reviewStatus: z.string().optional(),
        reviewer: z.string().optional(),
        reviewerNotes: z.string().optional(),
        pageSlug: z.string().optional(),
        // Module fields
        moduleName: z.string().optional(),
        whatItCovers: z.string().optional(),
        termCount: z.number().optional(),
        beginnerCount: z.number().optional(),
        intermediateCount: z.number().optional(),
        advancedCount: z.number().optional(),
        // Learning Path fields
        pathName: z.string().optional(),
        pathSlug: z.string().optional(),
        stepCount: z.number().optional(),
        steps: z.array(z.object({
          step: z.number(),
          term: z.string(),
          slug: z.string().nullable(),
          definition: z.string(),
        })).optional(),
      }),
    }),
  }),
};
