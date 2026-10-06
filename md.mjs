import ejs from 'ejs';
import { marked } from 'marked';


async function renderMarkdown(markdownUrl) {
    
    const response = await fetch(markdownUrl);
    const markdown = await response.text();
    const renderedMarkdown = marked.parse(markdown);

    return renderedMarkdown;
}

function insertMd(html) {
    return ejs.render(html, { renderMarkdown }, { async: true });
}

export default {
    insertMd
}
