function startDownload() {
  const button = document.querySelector('.download-button');
  button.textContent = 'Downloading...';
  button.disabled = true;

  setTimeout(() => {
    button.textContent = 'Download Complete';
    button.style.backgroundColor = '#28a745';
    button.style.color = '#fff';
    button.disabled = false;
  }, 3000); // Simulate a 3-second download time
}