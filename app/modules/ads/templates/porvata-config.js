function getNavbarHeight() {
  const navbar = document.querySelector('.site-head-wrapper');

  return navbar ? navbar.offsetHeight : 0;
}

export const getConfig = () => (
  {
    inViewportOffsetTop: getNavbarHeight(),
    isFloatingEnabled: false,
  }
);

export default {
  getConfig,
};
