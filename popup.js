
const passphraseInput = document.getElementById('selector1')
const usernameInput = document.getElementById('username')
const environmentInput = document.getElementById('environment')
console.log('environmentInput',environmentInput)
console.log('usernameInput',usernameInput)

if(localStorage.getItem('passphraseFiller')){
  passphraseInput.value = localStorage.getItem('passphraseFiller');
}

if(localStorage.getItem('passphraseFillerusername')){
  usernameInput.value = localStorage.getItem('passphraseFillerusername');
}

if(localStorage.getItem('passphraseEnvironmentInput')){
  environmentInput.value = localStorage.getItem('passphraseEnvironmentInput');
}


passphraseInput.addEventListener('change', e => {
  // browser.storage.local.set({passphrase: e.target.value});
  localStorage.setItem('passphraseFiller', e.target.value)
})

usernameInput.addEventListener('change', e => {
  // browser.storage.local.set({username: e.target.value});
  localStorage.setItem('passphraseFillerusername', e.target.value)

})

environmentInput.addEventListener('change', e => {
  // browser.storage.local.set({username: e.target.value});
  console.log('e.target.value',e.target.value)
  localStorage.setItem('passphraseEnvironmentInput', e.target.value)

})

document.getElementById('fillButton').addEventListener('click', () => {
  const passphrase = passphraseInput.value;



  browser.runtime.sendMessage({
    action: "fillDropdowns",
    passphrase: passphrase
  });
});

