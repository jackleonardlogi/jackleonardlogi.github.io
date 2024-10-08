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
      resetSearch(); // Reset search when closing the palette
    }
  }
});

// Search filter functionality
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  filterLinks(searchTerm);
  resetNavigation(); // Reset navigation when filtering
});

// Filter the command options based on search input
function filterLinks(searchTerm) {
  links.forEach(link => {
    const linkText = link.textContent.toLowerCase();
    if (linkText.includes(searchTerm)) {
      link.style.display = 'block';
    } else {
      link.style.display = 'none';
    }
  });
}

// Reset navigation when search results change
function resetNavigation() {
  activeIndex = -1; // Reset active index when filtering
  const visibleLinks = Array.from(links).filter(link => link.style.display !== 'none');
  if (visibleLinks.length > 0) {
    moveFocus(1); // Move to the first visible link
  }
}

// Keyboard navigation with arrow keys and Enter
document.addEventListener('keydown', (e) => {
  // Only handle arrow navigation if focus is NOT on the input field
  if (commandMenu.classList.contains('active') && document.activeElement !== searchInput) {
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

// Move focus to next or previous link
function moveFocus(direction) {
  const visibleLinks = Array.from(links).filter(link => link.style.display !== 'none');
  if (visibleLinks.length === 0) return; // No links to focus on

  if (activeIndex >= 0) {
    visibleLinks[activeIndex].classList.remove('focused');
  }
  activeIndex = (activeIndex + direction + visibleLinks.length) % visibleLinks.length;
  visibleLinks[activeIndex].classList.add('focused');
  visibleLinks[activeIndex].focus();
}

// Reset search and visibility
function resetSearch() {
  searchInput.value = '';
  links.forEach(link => {
    link.style.display = 'block'; // Reset all links to visible
  });
}
