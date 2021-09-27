export function removeHtmlElement(element) {
    if (element.remove) {
        element.remove();
    } else {
        element.parentNode.removeChild(element);
    }
}

export function insertAfterElement(element, newElement) {
    element.parentNode.insertBefore(newElement, element.nextSibling);
}

export function arrayFrom(value) {
    if (Array.from) {
        return Array.from(value);
    }

    const array = [];
    const length = value.length;

    for (let i = 0; i < length; i++) {
        array.push(value[i]);
    }

    return array;
}