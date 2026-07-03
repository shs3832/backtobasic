const form = document.querySelector(".form");

if (form) {
  const inputName = form.querySelector("#name");
  const inputNameError = form.querySelector("#user-name-error");
  const inputEmail = form.querySelector("#email");
  const inputEmailError = form.querySelector("#user-email-error");
  const inputPassword = form.querySelector("#password");
  const inputPasswordError = form.querySelector("#user-password-error");
  const interestInputs = form.querySelectorAll('input[name="interest"]');
  const interestError = form.querySelector("#interest-error");

  const hasDOM =
    inputName &&
    inputNameError &&
    inputEmail &&
    inputEmailError &&
    inputPassword &&
    inputPasswordError &&
    interestInputs.length > 0 &&
    interestError;

  if (hasDOM) {
    let firstInvalidField = null;
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      firstInvalidField = null;
      interestError.textContent = "";
      inputNameError.textContent = "";
      inputName.removeAttribute("aria-invalid");
      inputEmailError.textContent = "";
      inputEmail.removeAttribute("aria-invalid");
      inputPasswordError.textContent = "";
      inputPassword.removeAttribute("aria-invalid");

      const nameValue = inputName.value.trim();
      const emailValue = inputEmail.value.trim();
      const passwordValue = inputPassword.value.trim();
      const isEmailValid = inputEmail.validity.valid;
      const hasInterest = Array.from(interestInputs).some((input) => {
        return input.checked;
      });

      if (!nameValue) {
        inputNameError.textContent = "이름을 입력해주세요";
        inputName.setAttribute("aria-invalid", "true");
        if (!firstInvalidField) {
          firstInvalidField = inputName;
        }
      }

      if (!emailValue) {
        inputEmailError.textContent = "이메일을 입력해주세요";
        inputEmail.setAttribute("aria-invalid", "true");
        if (!firstInvalidField) {
          firstInvalidField = inputEmail;
        }
      } else if (!isEmailValid) {
        inputEmailError.textContent = "이메일 형식으로 입력해주세요";
        inputEmail.setAttribute("aria-invalid", "true");
        if (!firstInvalidField) {
          firstInvalidField = inputEmail;
        }
      }

      if (!passwordValue) {
        inputPasswordError.textContent = "패스워드를 입력해주세요";
        inputPassword.setAttribute("aria-invalid", "true");
        if (!firstInvalidField) {
          firstInvalidField = inputPassword;
        }
      } else if (passwordValue.length < 8) {
        inputPasswordError.textContent = "비밀번호는 8자 이상이어야합니다";
        inputPassword.setAttribute("aria-invalid", "true");
        if (!firstInvalidField) {
          firstInvalidField = inputPassword;
        }
      }

      if (!hasInterest) {
        interestError.textContent = "관심 분야를 1개 이상 선택해주세요.";
        if (!firstInvalidField) {
          firstInvalidField = interestInputs[0];
        }
      }

      if (firstInvalidField) {
        firstInvalidField.focus();
        return;
      }

      console.log("submit success");
    });
  }
}
