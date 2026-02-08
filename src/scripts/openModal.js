export const openModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.showModal();
};
