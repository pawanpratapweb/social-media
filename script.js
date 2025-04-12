(function() {
  // Create and insert styles
  const style = document.createElement('style');
  style.innerHTML = `
    #filterControls {
      margin-top: 40px;
      padding: 20px;
      background: #eee;
      color: #333;
      font-family: Arial, sans-serif;
      border-top: 2px solid #ccc;
    }
    #filterControls label {
      display: inline-block;
      width: 100px;
      margin-right: 10px;
    }
    #filterControls input[type="range"] {
      width: 300px;
      margin-bottom: 10px;
    }
    #filterControls span {
      display: inline-block;
      width: 40px;
    }
    #resetBtn {
      margin-top: 15px;
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
    }
    #resetBtn:hover {
      background: #0056b3;
    }
  `;
  document.head.appendChild(style);

  // Create the control panel
  const container = document.createElement('div');
  container.id = 'filterControls';
  container.innerHTML = `
    <div>
      <label for="brightness">Brightness:</label>
      <input id="brightness" type="range" min="-200" max="200" value="0">
      <span id="brightnessValue">0</span>
    </div>
    <div>
      <label for="contrast">Contrast:</label>
      <input id="contrast" type="range" min="-100" max="100" value="0">
      <span id="contrastValue">0</span>
    </div>
    <button id="resetBtn">Reset</button>
  `;

  // Append to bottom of body
  document.body.appendChild(container);

  // Setup functionality
  const brightnessSlider = document.getElementById('brightness');
  const contrastSlider = document.getElementById('contrast');
  const brightnessValue = document.getElementById('brightnessValue');
  const contrastValue = document.getElementById('contrastValue');
  const resetButton = document.getElementById('resetBtn');

  function updateFilter() {
    const brightness = brightnessSlider.value;
    const contrast = contrastSlider.value;
    document.body.style.filter = `brightness(${+brightness + 100}%) contrast(${+contrast + 100}%)`;
    brightnessValue.textContent = brightness;
    contrastValue.textContent = contrast;
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
