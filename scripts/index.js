const formCloseButtons = document.querySelectorAll("button.form-close-button");
const registrationFormsChooseButtons = document.querySelectorAll(
    ".registration-container > .registration-forms-choose > div > button");
const registrationFormsContainers = document.querySelectorAll(".registration-form-container");
const registrationFormsChoose = document.querySelector(".registration-forms-choose");
const registrationForms = document.querySelectorAll("form.registration-form");

function setFieldValidationMessage(field, message) {
    const nextSibling = field.nextSibling;
    const validationDiv = nextSibling && nextSibling.classList
        ? (nextSibling.classList.contains("validation-message") ? nextSibling : null)
        : null;

    if (validationDiv) {
        if (!message) {
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

function validateField(field) {
    const validity = field.validity;
    const validationMessage = field.getAttribute("data-validation-msg");

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

function validateForm(form) {
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

function setVisible(element, isVisible) {
    if (isVisible) {
        element.classList.remove("invisible");
    } else {
        element.classList.add("invisible");
    }
}

for (let buttonIndex = 0; buttonIndex < registrationFormsChooseButtons.length; buttonIndex++) {
    const button = registrationFormsChooseButtons[buttonIndex];
    const buttonFormId = button.getAttribute("data-form");
    button.addEventListener("click", function () {
        setVisible(registrationFormsChoose, false);
        for (let formWrapperIndex = 0; formWrapperIndex < registrationFormsContainers.length; formWrapperIndex++) {
            const formWrapper = registrationFormsContainers[formWrapperIndex];
            const formId = formWrapper.getAttribute("data-form");
            setVisible(formWrapper, formId === buttonFormId);
        }
    });
}

for (let i = 0; i < formCloseButtons.length; i++) {
    const button = formCloseButtons[i];
    const buttonFormId = button.getAttribute("data-form");
    button.addEventListener("click", function () {
        const formWrapper = arrayFrom(registrationFormsContainers)
            .filter(function (fw) {
                return fw.getAttribute("data-form") === buttonFormId;
            })[0];
        setVisible(formWrapper, false);
        setVisible(registrationFormsChoose, true);
    });
}

for (let i = 0; i < registrationForms.length; i++) {
    const form = registrationForms[i];
    const formInputs = arrayFrom(form.querySelectorAll("input"));

    for (let j = 0; j < formInputs.length; j++) {
        const formInput = formInputs[j];
        formInput.addEventListener("input", function () {
            setFieldValidationMessage(formInput, null);
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const isFormValid = validateForm(form);
        if (!isFormValid) return;

        const formData = formInputs.reduce(function (data, input) {
            const key = input.name;
            const value = input.type === "checkbox" ? input.checked : input.value;
            data[key] = value;
            return data;
        }, {});
        console.log(formData);
    });
}