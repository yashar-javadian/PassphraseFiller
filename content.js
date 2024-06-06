
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fillDropdowns") {

        const passphrase = request.passphrase
        const wordsArr = passphrase.split(" ")

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

}});
