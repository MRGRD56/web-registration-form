export function removeHtmlElement(element: Element) {
    if (element.remove) {
        element.remove();
    } else {
        element.parentNode.removeChild(element);
    }
}

export function insertAfterElement(element: Element, newElement: Element) {
    element.parentNode.insertBefore(newElement, element.nextSibling);
}

export function arrayFrom(value: Array<any> | NodeList) {
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