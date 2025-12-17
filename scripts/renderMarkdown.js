import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";


// function getArrayByTagName(tagName, parent=document){
//     return Array.from(parent.getElementsByTagName(tagName));
// }



// function getArrayByTagNames(...tagNames, parrent=document){
//     let arr = []
//     tagNames.forEach((tagName) => {
//         elements = getArrayByTagName(tagName, parrent);
//         arr = arr.concat(elements);
//     });
// }



/**
 * Replaces all <h1>s in the element with <h2>s for structural reasons,
 * while preserving the styling of <h1>
 * @param {Element} element - which element to fix
 * @param {Boolean} allowMainHeading - allows the first h1 to stay h1
 * @returns 
 */
function fixHeadingHierarchy(element, allowMainHeading=false){
    
    let h1s = element.querySelectorAll('hi');
    if (allowMainHeading){
        h1s.shift();
    }
    if (h1s.length == 0){
        return;
    }
    h1s.forEach((h1) => {
        let h2 = document.createElement('h2');
        Array.from(h1.attributes).forEach((attr) => {
            h2.setAttribute(attr.nodeName, attr.nodeValue)
        });
        //h2.attributes = h1.attributes;
        h2.innerHTML = h1.innerHTML;
        h2.classList.add('replaced-h1');
        h1.replaceWith(h2);
    });
}



function addHrs(markdownBody){
    const headings = markdownBody.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((element) => {
        const hr = document.createElement('hr');
        element.insertAdjacentElement("afterend", hr);
    });
}



async function renderMarkdown(){
    
    const response = await fetch("https://raw.githubusercontent.com/prytlubomir/vadim-clicker/refs/heads/main/README.md");
    const markdown = await response.text();
    const renderedMarkdown = marked.parse(markdown);
    
    let markdownBody = document.createElement("div");
    markdownBody.classList.add('markdown-body');
    markdownBody.innerHTML = renderedMarkdown;
    
    fixHeadingHierarchy(markdownBody);
    addHrs(markdownBody);
    
    let about = document.getElementById('about');
    about.appendChild(markdownBody);
}

renderMarkdown();
