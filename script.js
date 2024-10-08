const commandMenu = document.querySelector('.command-menu');
const searchInput = document.querySelector('.command-menu-search');
const links = document.querySelectorAll('.group-option-link');
let activeIndex = -1;

// Show/hide command palette on Cmd+K or Ctrl+K
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    commandMenu.classList.toggle('active');
    if (commandMenu.classList.contains('active')) {
      searchInput.focus();
    } else {
      searchInput.blur();
    }
  }
});

// Keyboard navigation with arrow keys and Enter
document.addEventListener('keydown', (e) => {
  if (commandMenu.classList.contains('active')) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveFocus(1); // Move down
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveFocus(-1); // Move up
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      links[activeIndex].click(); // Simulate click on focused item
    }
  }
});

function moveFocus(direction) {
  if (activeIndex >= 0) {
    links[activeIndex].classList.remove('focused');
  }
  activeIndex = (activeIndex + direction + links.length) % links.length;
  links[activeIndex].classList.add('focused');
  links[activeIndex].focus();
}
