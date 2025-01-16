const isLoading = ref(false);

export const usePageLoading = () => {
  const setLoading = (value) => {
    isLoading.value = value;
  };

  return {
    isLoading,
    setLoading,
  };
};
