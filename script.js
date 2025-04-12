(function () {
    const style = document.createElement('style');
    style.textContent = `
    *{margin:0;padding:0;box-sizing:border-box;}
        #filterMenu {
            position: fixed;
            top: 50px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: #fff;
            padding: 10px;
            border-radius: 8px;
            z-index: 999999;
            font-family: sans-serif;
            width: 220px;
            touch-action: none;
        }
        #filterMenu input[type="range"] {
            width: 100%;
        }
        #filterMenu h4 {
            margin: 0 0 5px;
        }
        #filterMenu button {
            background: #444;
            color: white;
            border: none;
            padding: 4px 8px;
            margin-top: 10px;
            cursor: pointer;
            width: 48%;
        }
        #buttonContainer {
            display: flex;
            justify-content: space-between;
            gap: 4%;
        }
    `;
    document.head.appendChild(style);

    const menu = document.createElement('div');
    menu.id = 'filterMenu';
    menu.innerHTML = `
        <h4>CSS Filter Controls</h4>
        Brightness: <input type="range" min="0" max="2" step="0.01" value="1" data-prop="brightness"><br>
        Contrast: <input type="range" min="0" max="3" step="0.01" value="1" data-prop="contrast"><br>
        <div id="buttonContainer">
            <button id="minBtn">Minimize</button>
            <button id="resetBtn">Reset</button>
        </div>
    `;
    document.body.appendChild(menu);

    let isDragging = false, offsetX = 0, offsetY = 0;
    function startDrag(x, y) {
        isDragging = true;
        offsetX = x - menu.offsetLeft;
        offsetY = y - menu.offsetTop;
    }
    function dragTo(x, y) {
        if (isDragging) {
            menu.style.left = (x - offsetX) + 'px';
            menu.style.top = (y - offsetY) + 'px';
        }
    }
    function stopDrag() {
        isDragging = false;
    }
    menu.addEventListener('mousedown', function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        startDrag(e.clientX, e.clientY);
    });
    document.addEventListener('mousemove', function (e) {
        dragTo(e.clientX, e.clientY);
    });
    document.addEventListener('mouseup', stopDrag);
    menu.addEventListener('touchstart', function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    }, { passive: false });
    document.addEventListener('touchmove', function (e) {
        const touch = e.touches[0];
        dragTo(touch.clientX, touch.clientY);
    }, { passive: false });
    document.addEventListener('touchend', stopDrag);

    const ranges = menu.querySelectorAll('input[type="range"]');
    function updateFilters() {
        let filter = '';
        ranges.forEach(r => {
            const val = r.value;
            const prop = r.dataset.prop;
            filter += `${prop}(${val}) `;
        });
        document.body.style.filter = filter.trim();
    }
    ranges.forEach(r => r.addEventListener('input', updateFilters));
    updateFilters();

    const minBtn = menu.querySelector('#minBtn');
    let isMinimized = false;
    minBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        ranges.forEach(el => el.style.display = isMinimized ? 'none' : 'block');
        minBtn.textContent = isMinimized ? 'Expand' : 'Minimize';
    });

    const resetBtn = menu.querySelector('#resetBtn');
    resetBtn.addEventListener('click', () => {
        ranges.forEach(r => {
            if (r.dataset.prop === 'brightness') r.value = 1;
            if (r.dataset.prop === 'contrast') r.value = 1;
        });
        updateFilters();
    });
})();
