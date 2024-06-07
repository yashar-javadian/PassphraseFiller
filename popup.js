
const passphraseInput = document.getElementById('selector1')
const usernameInput = document.getElementById('username')
const environmentInput = document.getElementById('environment')
const plusBtn = document.getElementById('plusBtn')

const getValueFromStorage = async (key) => {
    try {
        const result = await browser.storage.local.get(key);
        return result[key];
    } catch (error) {
        console.error('Error getting value from storage:', error);
        throw error;
    }
};

(async () => {
    try {
        const envValue = await getValueFromStorage('passphraseEnvironmentInput');
        const userNameValue = await getValueFromStorage('passphraseFillerusername');
        const passphraseFillerValue = await getValueFromStorage('passphraseFiller');
        if (envValue) {
            environmentInput.value = envValue;
        }
        if (userNameValue) {
            usernameInput.value = userNameValue;
        }
        if (passphraseFillerValue) {
            passphraseInput.value = passphraseFillerValue;
        }

    } catch (error) {
        console.error('Error retrieving value:', error);
    }
})();


passphraseInput.addEventListener('change', e => {
    browser.storage.local.set({ ['passphraseFiller']: e.target.value });
})

usernameInput.addEventListener('change', e => {
    browser.storage.local.set({ ['passphraseFillerusername']: e.target.value });
})

environmentInput.addEventListener('change', e => {
    browser.storage.local.set({ ['passphraseEnvironmentInput']: e.target.value });
})

const createNewEntry = () => {
    // Create the main div
    const accountCart = document.createElement('div');
    accountCart.className = 'accountCart';

    // Create the form
    const form = document.createElement('form');
    form.id = 'dropdownForm';

    // Create the input wrapper and input elements
    const inputs = [
      { label: 'Environment', id: 'environment', placeholder: 'Environment' },
      { label: 'User', id: 'username', placeholder: 'Username' },
      { label: 'Passphrase', id: 'selector1', placeholder: 'Paste Passphrase' }
    ];

    inputs.forEach(input => {
      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'inputWrapper';

      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.textContent = input.label;

      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.id = input.id;
      inputElement.placeholder = input.placeholder;

      inputWrapper.appendChild(label);
      inputWrapper.appendChild(inputElement);
      form.appendChild(inputWrapper);
    });

    // Create the button
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'fillButton';
    button.textContent = 'Fill';

    // Append elements to the form
    form.appendChild(button);

    // Append form to the main div
    accountCart.appendChild(form);

    const wrapperDiv = document.getElementById('wrapper')
    wrapperDiv.appendChild(accountCart);

}

plusBtn.addEventListener('click', e => {
  createNewEntry()
})

document.getElementById('fillButton').addEventListener('click', () => {
  const passphrase = passphraseInput.value;



  browser.runtime.sendMessage({
    action: "fillDropdowns",
    passphrase: passphrase
  });
});




