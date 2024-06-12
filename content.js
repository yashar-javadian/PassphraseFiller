
function waitForElement(selector) {
    return new Promise((resolve, reject) => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.disconnect();
                    resolve(element);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Check if the element is already in the DOM
        const element = document.querySelector(selector);
        if (element) {
            observer.disconnect();
            resolve(element);
        }
    });
}

const checkMatrixIds = async (matrixId) => {
    const cards = await browser.storage.local.get();

    for (const card in cards) {
        for (const item in cards[card]) {

            if(cards[card][item] === matrixId){
                const keys = Object.keys(cards[card]);
                const index = Object.keys(cards[card]).indexOf(item)
                if (index < 0 || index >= keys.length) {
                    console.error('Index out of bounds');
                    return;
                }
                const key = keys[index+1];

                const passphrase = cards[card][key];

                return {response: true,passphrase:passphrase}
            }
        }
    }
}

waitForElement('.mx_Dropdown_input').then(async (element) => {
    const matrixId = localStorage.getItem('mx_user_id')

    const checkObj = await checkMatrixIds(matrixId)
        if (checkObj?.response){
            fillPassphrase(checkObj?.passphrase)
        }

    }).catch(error => {
        console.error('Error:', error);

}).catch(error => {
    console.error('Error:', error);
});



function fillPassphrase(passphrase) {
    const wordsArr = passphrase?.split(" ")

    const dropdown0 = document.getElementById('0_value');
    const dropdown1 = document.getElementById('1_value');
    const dropdown2 = document.getElementById('2_value');
    const dropdown3 = document.getElementById('3_value');


    dropdown0.click()
    const menu0 = document.getElementById("0_listbox")
    menu0.children.namedItem("0__" + wordsArr[0]).click()

    dropdown1.click()
    const menu1 = document.getElementById("1_listbox")
    menu1.children.namedItem("1__" + wordsArr[1]).click()

    dropdown2.click()
    const menu2 = document.getElementById("2_listbox")
    menu2.children.namedItem("2__" + wordsArr[2]).click()

    dropdown3.click()
    const menu3 = document.getElementById("3_listbox")
    menu3.children.namedItem("3__" + wordsArr[3]).click()
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {

        const passphrase = request.passphrase
        fillPassphrase(passphrase)

});
