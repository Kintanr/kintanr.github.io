export const scrollToSection = (
  id: string,
  router?: { push: (...args: any[]) => Promise<unknown> | void },
  pathname?: string
) => {
  // Guard for server-side execution
  if (typeof window === 'undefined') return;

  const doScroll = () => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // If router and pathname are provided (inside client components using hooks),
  // navigate to homepage first when not already there, then scroll.
  if (router && typeof pathname === 'string') {
    if (pathname !== '/') {
      // router.push may return a Promise or void depending on the wrapper.
      const res = router.push('/');
      if (res && typeof (res as Promise<unknown>).finally === 'function') {
        (res as Promise<unknown>).finally(() => setTimeout(doScroll, 100));
      } else {
        // fallback: schedule scroll after tiny delay
        setTimeout(doScroll, 100);
      }
      return;
    }
    doScroll();
    return;
  }

  // Fallback: try to scroll on the current page
  doScroll();
};
