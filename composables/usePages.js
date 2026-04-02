export const usePages = () => {
  const fetchPageBySlug = async (slug) => {
    const supabase = useSupabase();

    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (pageError) {
      console.error('Error fetching page:', pageError);
      return null;
    }

    if (!page) {
      return null;
    }

    const { data: sections, error: sectionsError } = await supabase
      .from('sections')
      .select('*')
      .eq('page_id', page.id)
      .order('order_position', { ascending: true });

    if (sectionsError) {
      console.error('Error fetching sections:', sectionsError);
      return { ...page, sections: [] };
    }

    return {
      ...page,
      sections: sections || [],
    };
  };

  const fetchAllPages = async () => {
    const supabase = useSupabase();

    const { data, error } = await supabase
      .from('pages')
      .select('slug, title, updated_at')
      .eq('published', true)
      .order('slug', { ascending: true });

    if (error) {
      console.error('Error fetching all pages:', error);
      return [];
    }

    return data || [];
  };

  return {
    fetchPageBySlug,
    fetchAllPages,
  };
};
