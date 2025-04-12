(function() {
  // Create style for controls
  const style = document.createElement('style');
  style.innerHTML = `
    #filterControls {
      position: relative;
      z-index: 9999;
      background: rgba(255, 255, 255, 0.95);
      color: #000;
      font-family: sans-serif;
      padding: 15px;
      margin-top: 20px;
      font-size: 14px;
    }
    #filterControls label {
      display: inline-block;
      width: 100px;
      margin-right: 10px;
    }
    #filterControls input[type="range"] {
      width: 250px;
      vertical-align: middle;
    }
    #resetBtn {
      margin-top: 10px;
      padding: 5px 10px;
      font-size: 12px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 3px;
    }
    #resetBtn:hover {
      background: #0056b3;
    }
  `;
  document.head.appendChild(style);

  // Create control box
  const controls = document.createElement('div');
  controls.id = 'filterControls';
  controls.innerHTML = `
    <div>
      <label for="brightness">Brightness:</label>
      <input id="brightness" type="range" min="-200" max="200" value="0">
    </div>
    <div>
      <label for="contrast">Contrast:</label>
      <input id="contrast" type="range" min="-100" max="100" value="0">
    </div>
    <button id="resetBtn">Reset</button>
  `;

  // Make sure the video is not above our controls
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.style.position = 'relative';
    video.style.zIndex = '1';
  });

  // Append controls after video
  document.body.appendChild(controls);

  const brightnessSlider = document.getElementById('brightness');
  const contrastSlider = document.getElementById('contrast');
  const resetButton = document.getElementById('resetBtn');

  function updateFilter() {
    const brightness = +brightnessSlider.value;
    const contrast = +contrastSlider.value;
    videos.forEach(video => {
      video.style.filter = `brightness(${brightness + 100}%) contrast(${contrast + 100}%)`;
    });
  }

  brightnessSlider.addEventListener('input', updateFilter);
  contrastSlider.addEventListener('input', updateFilter);

  resetButton.addEventListener('click', () => {
    brightnessSlider.value = 0;
    contrastSlider.value = 0;
    updateFilter();
  });

  updateFilter();
})();
