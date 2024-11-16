let chapters = [];
function loadChapters() {
    fetch('Formatted.json')
        .then(response => response.json())
        .then(data => {
            chapters = data.chapters;
            const chapterList = document.getElementById("chapter-list");
            chapters.forEach((chapter, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = chapter.title;
                listItem.onclick = () => window.location.href = `chapter.html?index=${index}`;
                chapterList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error loading chapters:", error));
}
function loadChapterFromURL() {
    const params = new URLSearchParams(window.location.search);
    const index = parseInt(params.get('index'), 10);
    fetch('Formatted.json')
        .then(response => response.json())
        .then(data => {
            chapters = data.chapters;
            const chapter = chapters[index];
            document.getElementById("chapter-title").innerText = chapter.title;
            document.getElementById("chapter-content").innerHTML = chapter.content;
            document.getElementById("prev-chapter").disabled = index <= 0;
            document.getElementById("next-chapter").disabled = index >= chapters.length - 1;
            document.getElementById("prev-chapter").setAttribute('data-index', index - 1);
            document.getElementById("next-chapter").setAttribute('data-index', index + 1);
        })
        .catch(error => console.error("Error loading chapter:", error));
}
function navigateChapter(offset) {
    const params = new URLSearchParams(window.location.search);
    const index = parseInt(params.get('index'), 10) + offset;
    window.location.href = `chapter.html?index=${index}`;
}
function changeTextSize(size) {
    const content = document.getElementById("chapter-content");
    const sizeMap = {
        small: "14px",
        medium: "18px",
        large: "22px",
        xlarge: "26px",
        xxlarge: "30px"
    };
    content.style.fontSize = sizeMap[size];
}
window.onload = function() {
    changeTextSize('large'); 
};