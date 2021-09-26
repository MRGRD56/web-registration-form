const formCloseButtons = document.querySelectorAll("button.form-close-button");
const registrationFormsChooseButtons = document.querySelectorAll(
    ".registration-container > .registration-forms-choose > div > button");
const registrationFormsContainers = document.querySelectorAll(".registration-form-container");
const registrationFormsChoose = document.querySelector(".registration-forms-choose");
const registrationForms = document.querySelectorAll("form.registration-form");

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
        const formWrapper = Array.from(registrationFormsContainers)
            .filter(function (fw) {
                return fw.getAttribute("data-form") === buttonFormId;
            })[0];
        setVisible(formWrapper, false);
        setVisible(registrationFormsChoose, true);
    });
}

for (let i = 0; i < registrationForms.length; i++) {
    const form = registrationForms[i];
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formInputs = Array.from(event.target.querySelectorAll("input"));
        const formData = formInputs.reduce(function (data, input) {
            const key = input.name;
            const value = input.type === "checkbox" ? input.checked : input.value;
            data[key] = value;
            return data;
        }, {});
        console.log(formData);
    });
}