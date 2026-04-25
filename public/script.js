const infoForm = document.querySelector("#info-form");
const registerForm = document.querySelector("#register-form");
const infoResult = document.querySelector("#info-result");
const registerResult = document.querySelector("#register-result");

const resultBaseClass =
  "mt-4 min-h-[4rem] overflow-auto whitespace-pre-wrap rounded-md border bg-slate-50 p-4 font-mono text-sm leading-relaxed";

const showResult = (element, payload, ok) => {
  element.className = ok
    ? `${resultBaseClass} border-emerald-300 text-slate-800`
    : `${resultBaseClass} border-red-300 text-red-700`;
  element.textContent = JSON.stringify(payload, null, 2);
};

infoForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(infoForm);
  const params = new URLSearchParams(formData);

  try {
    const response = await fetch(`/api/info?${params.toString()}`);
    const data = await response.json();
    showResult(infoResult, data, response.ok);
  } catch (error) {
    showResult(infoResult, { success: false, message: error.message }, false);
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    showResult(registerResult, data, response.ok);
  } catch (error) {
    showResult(registerResult, { success: false, message: error.message }, false);
  }
});
