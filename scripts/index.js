const formCloseButtons = document.querySelectorAll(".form-close-button");
const registrationFormsChooseButtons = document.querySelectorAll(
    ".registration-wrapper > .registration-forms-choose > div > button");
const registrationFormsWrappers = document.querySelectorAll(".registration-form-wrapper");
const registrationFormsChoose = document.querySelector(".registration-forms-choose");
const registrationForms = document.querySelectorAll("form.registration-form");

function setVisible(element, isVisible) {
    if (isVisible) {
        element.classList.remove("invisible");
    } else {
        element.classList.add("invisible");
    }
}

registrationFormsChooseButtons.forEach((button, buttonIndex) => {
    button.addEventListener("click", () => {
        setVisible(registrationFormsChoose, false);
        registrationFormsWrappers.forEach((formWrapper, formWrapperIndex) => {
            setVisible(formWrapper, formWrapperIndex === buttonIndex);
        });
    });
});

formCloseButtons.forEach(button => {
    button.addEventListener("click", () => {
        registrationFormsWrappers.forEach(formWrapper => {
            setVisible(formWrapper, false);
        });
        setVisible(registrationFormsChoose, true);
    });
});

registrationForms.forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        const formInputs = Array.from(event.target.querySelectorAll("input"));
        const formData = formInputs.reduce((data, input) => {
            const key = input.name;
            const value = input.type === "checkbox" ? input.checked : input.value;
            return {[key]: value, ...data};
        }, {});
        console.log(formData);
    });
});