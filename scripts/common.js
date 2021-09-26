function arrayFrom(value) {
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