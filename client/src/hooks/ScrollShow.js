export const ScrollShow = (heightWindows, element) => {
  if (heightWindows && element) {
    if (heightWindows + 80 >= element.y) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  }
};
