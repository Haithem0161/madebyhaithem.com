import { queryOptions, useMutation } from "@tanstack/react-query"
import { fetchProjects, fetchProjectBySlug, submitContact } from "./api"
import { transformCmsProject } from "./projects"
import { queryKeys } from "./query-keys"
import type { ContactPayload } from "./api-types"

// ── Query Options (usable in both loaders and components) ───────────

export const projectsQueryOptions = queryOptions({
  queryKey: queryKeys.projects.list(),
  queryFn: async () => {
    const response = await fetchProjects()
    return response.items.map(transformCmsProject)
  },
})

export function projectDetailQueryOptions(slug: string) {
  return queryOptions({
    queryKey: queryKeys.projects.detail(slug),
    queryFn: async () => {
      const raw = await fetchProjectBySlug(slug)
      return transformCmsProject(raw, 0)
    },
  })
}

// ── Mutations ───────────────────────────────────────────────────────

export function useContactMutation() {
  return useMutation({
    mutationFn: (payload: ContactPayload) => submitContact(payload),
  })
}
