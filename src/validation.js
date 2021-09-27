import {removeHtmlElement, insertAfterElement} from "./common";

export function setFieldValidationMessage(field, message) {
    const isValid = !message;

    const nextSibling = field.nextSibling;
    const validationDiv = nextSibling && nextSibling.classList
        ? (nextSibling.classList.contains("validation-message") ? nextSibling : null)
        : null;

    const hasInvalidClassName = field.classList.contains("invalid");
    if (isValid && hasInvalidClassName) {
        field.classList.remove("invalid");
    } else if (!isValid && !hasInvalidClassName) {
        field.classList.add("invalid");
    }

    if (validationDiv) {
        if (isValid) {
            removeHtmlElement(validationDiv);
        } else {
            validationDiv.innerText = message;
        }
    } else if (message) {
        const newValidationDiv = document.createElement("div");
        newValidationDiv.classList.add("validation-message");
        newValidationDiv.innerText = message;
        insertAfterElement(field, newValidationDiv);
    }
}

export function validateField(field) {
    const validity = field.validity;
    let validationMessage = field.getAttribute("data-validation-msg");
    if (!validationMessage) {
        validationMessage = "Поле заполнено некорректно";
    }

    const isValid = validity.valid;
    const isEmpty = validity.valueMissing;

    const message = isValid
        ? null
        : isEmpty
            ? "Заполните это поле"
            : validationMessage;

    setFieldValidationMessage(field, message);
    return isValid;
}

export function validateForm(form) {
    let isValid = true;

    const inputs = form.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        const isFieldValid = validateField(inputs[i]);
        if (!isFieldValid && isValid) {
            isValid = false;
        }
    }

    return isValid;
}