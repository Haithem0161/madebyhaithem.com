/**
 * ============================================
 * Torch CMS - Auto-generated TypeScript Types
 * ============================================
 *
 * Generated at: 2026-02-17T09:44:43.758Z
 * API Base URL: https://api.madebyhaithem.com
 *
 * This file contains TypeScript definitions for:
 * - 1 Collection(s)
 * - 0 Form(s)
 *
 * Usage:
 *   import type { BlogPostItem, ContactFormData } from './torch-types';
 */


// ============================================
// COLLECTIONS
// ============================================

/**
 * Projects
 * No description
 *
 * Collection slug: "projects"
 * Total items: 0
 */
export interface ProjectsItem {
  id: string;
  slug: string;
  data: {
    images: string | string[]; // image
    title: string;
    description: string; // richtext
    tags?: string[]; // multiselect
    featured: boolean; // boolean
  };
  published_at: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

export interface ProjectsResponse {
  collection: {
    name: string;
    slug: string;
    description?: string;
  };
  items: ProjectsItem[];
  total: number;
}

// ============================================
// COMMON TYPES
// ============================================

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationParams {
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
