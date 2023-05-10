let idx = 0;
let highlightArr = [`function`, `async`, `class`, `var`, `let`, `const`, `return`, `await`, `new`];

Element.prototype.generateImage = function(text = ``) {
    this.innerHTML = ``;

    text.split(`\n`).forEach(line => {
        const lineObject = document.createElement(`span`);
        lineObject.classList.add(`output-window-skeleton-line`);

        line.split(` `).forEach(tag => {
            const tagObject = document.createElement(`span`);
            tagObject.classList.add(`output-window-skeleton-line-tag`);
            tagObject.style.width = `${tag.length * 10}px`;

            if (highlightArr.includes(tag)) {
                tagObject.classList.add(`highlight`);
            }

            lineObject.appendChild(tagObject);
        });

        this.appendChild(lineObject);
    });
}

Element.prototype.download = function() {
    html2canvas(this).then(canvas => {
        idx++;

        const link = document.createElement(`a`);
        link.download = `code2skeleton-${idx}.jpg`;
        link.href = canvas.toDataURL();

        document.body.appendChild(link);
        link.click();
    });
}


const output = document.querySelector(`.output-bg`);
const code = document.querySelector(`.code`);
const generateButton = document.querySelector(`.generate-button`);

const outputWindowSkeleton = document.querySelector(`.output-window-skeleton`);

const downloadButton = document.querySelector(`.download-button`);

code.oninput = () => { outputWindowSkeleton.generateImage(code.value); }
generateButton.onclick = () => { outputWindowSkeleton.generateImage(code.value); }

downloadButton.onclick = () => {
    output.download();
}