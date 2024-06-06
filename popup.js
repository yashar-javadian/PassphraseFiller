
const passphraseInput = document.getElementById('selector1')
const usernameInput = document.getElementById('username')

if(localStorage.getItem('passphraseFiller')){
  passphraseInput.value = localStorage.getItem('passphraseFiller');
}

if(localStorage.getItem('passphraseFillerusername')){
  usernameInput.value = localStorage.getItem('passphraseFillerusername');
}


passphraseInput.addEventListener('change', e => {

  // browser.storage.local.set({passphrase: e.target.value});
  localStorage.setItem('passphraseFiller', e.target.value)
})

usernameInput.addEventListener('change', e => {
  // browser.storage.local.set({username: e.target.value});
  localStorage.setItem('passphraseFillerusername', e.target.value)

})
document.getElementById('fillButton').addEventListener('click', () => {
  const passphrase = passphraseInput.value;



  browser.runtime.sendMessage({
    action: "fillDropdowns",
    passphrase: passphrase
  });
});
me
