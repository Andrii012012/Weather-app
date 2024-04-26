function clearDOMNodes(name) {
    if (name && document.querySelectorAll(`${name}`).length > 0) {
        const elements = document.querySelectorAll(`${name}`);
        for (let i = 0; i < elements.length; i++) {
            elements[i].remove();
        }
    }
}

export default clearDOMNodes;