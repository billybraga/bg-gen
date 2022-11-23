const domtoimage = require('dom-to-image');
const { saveAs } = require('file-saver')

const root = document.querySelector(':root');
const bg = document.getElementById('bg');
const content = document.getElementById('content');
const downloadBtn = document.getElementById('download-btn');

const color1Value = document.getElementById('color1-value');

const styleVars = getComputedStyle(root);
const bgHeightPx = styleVars.getPropertyValue('--bg-height');
const bgHeight = parseInt(bgHeightPx);
root.style.setProperty('--bg-height-ratio', content.clientHeight / bgHeight);

color1Value.onchange = createSetColor('color1');

function createSetColor(name) {
    return e => {
        setColor(name, e.target.value);
    };
}

function setColor(name, value) {
    localStorage[name] = value;
    root.style.setProperty('--bg-' + name, value);
}

color1Value.value = localStorage['color1'] || '#41b0ca';

downloadBtn.onclick = () => {
    domtoimage.toBlob(bg)
        .then(function (blob) {
            saveAs(blob, 'bg.png');
        });
};
