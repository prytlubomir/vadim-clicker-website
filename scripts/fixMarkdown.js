/**
 * Replace all <h1>s in the element with <h2>s for structural reasons,
 * while preserving the styling of <h1>
 * @param {Element} element - which element to fix
 * @param {Boolean} allowMainHeading - allows the first h1 to stay h1
 */
function fixHeadingHierarchy(element, allowMainHeading=false){
    
    let h1s = element.querySelectorAll('h1');
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


/**
 * Add horizontal lines under headings, like on GitHub.
 * @param {*} markdownBody - the element that directly contains rendered markdown.
 */
function addHrs(markdownBody){
    const headings = markdownBody.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((element) => {
        const hr = document.createElement('hr');
        element.insertAdjacentElement("afterend", hr);
    });
}


/**
 * Apply fixes
 */
async function fixMarkdown(){
    let about = document.getElementById('about');
    fixHeadingHierarchy(about);
    addHrs(about);
}

fixMarkdown()
