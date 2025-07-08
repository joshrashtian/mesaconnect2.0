"use server"


import { supabase } from "../../../../config/mesa-config";



/**
 * Search teachers by name, category or class name using one search term.
 */
export async function searchTeachers(
  searchTerm: string | null
): Promise<any[]> {
  const { data, error } = await supabase
    .rpc<any, any>("search_teachers_single", {
      p_search: searchTerm,
    });

  if (error) {
    console.error("search_teachers_single error:", error);
    throw error;
  }
  
  return data;
}