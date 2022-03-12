const addForm = document.querySelector('.grocery-form')
const list = document.querySelector('.grocery-list')
let data = {}


addForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector('input')
    const id = Date.now();
    addItem(id, input.value)
    input.value = ''
})

document.addEventListener('DOMContentLoaded', () => {
    parseFromLocalStorage()
    for (const [key, value] of Object.entries(data)) {
      addItem(key, value)
    }
})
function addItem(id, value){
    list.removeAttribute('hidden')
    if (value !== '') {
        const element = document.createElement('div')
        element.classList.add('grocery-item')
        element.dataset.id = id
        element.innerHTML = `
               <h3 class="item-title">${value}</h3>
                <form hidden class="item-form">
                    <input type="text" class="item-input">
                </form>
                <div class="item-btns">
                    <button class="edit-btn"></button>
                    <button class="delete-btn"></button>
                </div>`;
        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')
        const title = element.querySelector('.item-title')
        deleteBtn.addEventListener('click', (e) => removeItem(e))
        editBtn.addEventListener("click", (e) => {
            const form = element.querySelector('.item-form')
            form.querySelector('input').value = title.textContent
            title.setAttribute('hidden', true)
            if (form.getAttribute("hidden") === null) {
              form.setAttribute('hidden', true)
              title.removeAttribute('hidden')
            } else {
            form.addEventListener('submit', (e) => {
                e.preventDefault()
                if(form.querySelector('input').value !== ''){
                title.textContent = form.querySelector('input').value
                form.setAttribute("hidden", true);
                title.removeAttribute('hidden')
                addToStorage(id, form.querySelector("input").value);
                saveToLocalStorage(data);
                } else {
                    window.alert('Form is empty...')
                }
            })
            form.removeAttribute('hidden')
        }
        });
        list.appendChild(element)
        addToStorage(id, value)
        saveToLocalStorage(data);
    } else{
        window.alert('Form is empty...')
    }
}


function removeItem(e){
    const element = e.currentTarget.parentElement.parentElement
    if(list.children.length === 1){
        list.setAttribute('hidden', true)
    }
    element.remove()
    removeFromStorage(element.dataset.id)
    saveToLocalStorage(data);
}

function addToStorage(id, value){
    data[id] = value
}
function removeFromStorage(id){
    delete data[id]
}

function saveToLocalStorage(data){
    window.localStorage.setItem('data', JSON.stringify(data))
}

function parseFromLocalStorage(){
    data = JSON.parse(window.localStorage['data'])
}