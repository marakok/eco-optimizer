export const useNavigation = () => {
  const fetchNavigation = async () => {
    const supabase = useSupabase();

    const { data, error } = await supabase
      .from('navigation')
      .select('*')
      .is('parent_id', null)
      .order('order_position', { ascending: true });

    if (error) {
      console.error('Error fetching navigation:', error);
      return [];
    }

    return data || [];
  };

  return {
    fetchNavigation,
  };
};
