const formCloseButtons = document.querySelectorAll(".form-close-button");
const registrationFormsChooseButtons = document.querySelectorAll(
    ".registration-wrapper > .registration-forms-choose > div > button");
const registrationFormsWrappers = document.querySelectorAll(".registration-form-wrapper");
const registrationFormsChoose = document.querySelector(".registration-forms-choose");

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

formCloseButtons.forEach(btn => {
    btn.addEventListener("click", event => {
        registrationFormsWrappers.forEach(formWrapper => {
            setVisible(formWrapper, false);
        });
        setVisible(registrationFormsChoose, true);
    });
});