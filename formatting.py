from bs4 import BeautifulSoup
import selenium.webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import json
def main(i, url, driver):
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    chapter_number = i
    title = soup.find('div', class_="titles").find('span', class_="chapter-title").text.strip()
    content = soup.find('div', id="chapter-container", class_="chapter-content font_default", itemprop="description").prettify()
    print(i)
    print(title)
    chapter_data = {
        "chapterNumber": chapter_number,
        "title": title,
        "content": content}
    return chapter_data
if __name__ == '__main__':
    options = Options()
    options.add_argument("--headless")
    driver = selenium.webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    chapters = []
    for i in range(1, 1975):
        url = f"https://www.lightnovelworld.co/novel/shadow-slave-1365/chapter-{i}"
        chapter_data = main(i, url, driver)
        chapters.append(chapter_data)
        
    with open('Formatted.json', 'w', encoding='utf-8') as file:
        json.dump({"chapters": chapters}, file, indent=4, ensure_ascii=False)