const plusBtn = document.getElementById('plusBtn')
let cardIndex = 0

const createCard = (index,card,additionalCard) => {

    // Create the main div
    const accountCart = document.createElement('div');
    accountCart.className = 'accountCart';

    // Create the form
    const form = document.createElement('form');
    form.id = 'dropdownForm'+ index;

    // Create the input wrapper and input elements
    const inputs = [
        { label: 'Environment', id: 'env_'+ index, placeholder: 'Environment' ,value: card ? card?.env : ''},
        { label: 'User', id: 'user_'+ index, placeholder: 'Username' ,value: card ?  card?.user : ''},
        { label: 'Passphrase', id: 'pass_'+ index, placeholder: 'Paste Passphrase' ,value: card ? card?.pass : ''}
    ];

    if(additionalCard){
        browser.storage.local.set({['test_' + index]:{
                env: '',
                user: '',
                pass: ''
            }})
    }

    inputs.forEach(async(input) => {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'inputWrapper';

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = input.label;

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.id = input.id;
        inputElement.placeholder = input.placeholder;
        inputElement.value = input.value;

        inputElement.addEventListener('change', async (e) => {

            const innerKey = input.id.split('_')[0];
            if(card){
                card[innerKey] = e.target.value
                browser.storage.local.set({ ['test_' + index]: card });
            }
            else{
                const intermediateCard = await browser.storage.local.get(['test_' + index]);
                intermediateCard['test_' + index][innerKey] = e.target.value
                browser.storage.local.set({ ['test_' + index]: intermediateCard['test_' + index] });
            }
        })

        inputWrapper.appendChild(label);
        inputWrapper.appendChild(inputElement);
        form.appendChild(inputWrapper);
    });

    // Create the button
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'fillButton'+ index;
    button.textContent = 'Fill';

    button.addEventListener('click', () => {
        const passphrase = card.pass;

        browser.runtime.sendMessage({
            action: "fillDropdowns",
            passphrase: passphrase
        });
    });



    // Append elements to the form
    form.appendChild(button);

    // Append form to the main div
    accountCart.appendChild(form);

    const wrapperDiv = document.getElementById('wrapper')
    wrapperDiv.appendChild(accountCart);
}


const getValueFromStorage = async (key) => {
    try {
        const result = await browser.storage.local.get(key);
        return result[key];
    } catch (error) {
        console.error('Error getting value from storage:', error);
        throw error;
    }
};



// Retrieve values stored in browser storage on load
(async () => {
    try {
        const allCards = await browser.storage.local.get()
        const allCardsLength = Object.keys(allCards).length
        console.log('allCards',allCards)
        console.log('allCardsLength',allCardsLength)

        //if there is no cards yet create one initial
        if (allCardsLength < 1) {
            createCard(0,false,true)
            cardIndex++

        }else{
            //If there are cards stored go and create them with values
            for (const idx in allCards) {
                const card = allCards[idx];

                createCard(cardIndex,card,false)
                cardIndex++
            }
        }

    } catch (error) {
        console.error('Error retrieving value:', error);
    }
})();

plusBtn.addEventListener('click', e => {
  createCard(cardIndex,false,true)
    cardIndex++
})






