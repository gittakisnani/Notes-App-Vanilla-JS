import { initialFolders, femaleSrc, maleSrc } from "./Data.js"
import createNotesPage from "./notes.js"
import { createFullElement, appendAll, createImage, createSearchBox, closeElements, deleteChildren } from './utilityFns.js'

export let userName = 'Taki Snani';
export let gender = 'maleImg'
export let imgSrc = gender === "maleImg" ? maleSrc : femaleSrc;

const createProfileDivSettings = () => {
    const settingsWrapper = createFullElement('div', 'profileSettings', 'profile-settings')
    const nameInput = createFullElement('input', 'nameInput', 'name-input')
    nameInput.addEventListener('keyup', onNameChange)
    nameInput.value = userName
    const button = createFullElement('button', 'saveTopSettings', 'save-settings-top', 'Save updates', 'disabled')
    button.addEventListener('click', saveChanges)
    const imgWrapper = createFullElement('div', 'imgWrapper', 'img-wrapper')
    const maleImg = createImage(maleSrc, 'male', 'maleImg', 'gender-image')
    maleImg.title = 'Male'
    maleImg.addEventListener('click', clickGender)
    const femaleImg = createImage(femaleSrc, 'female', 'femaleImg', 'gender-image')
    femaleImg.title = 'Female'
    femaleImg.addEventListener('click', clickGender)
    appendAll(imgWrapper, maleImg, femaleImg)
    appendAll(settingsWrapper, nameInput, imgWrapper, button)
    return settingsWrapper
}

function onNameChange(e) {
    userName = e.target.value
    document.getElementById('saveTopSettings').removeAttribute('disabled');
}

function clickGender(e) {
    gender = e.target.id;
    imgSrc = gender === 'maleImg' ? maleSrc : femaleSrc;
    document.getElementById('saveTopSettings').removeAttribute('disabled');
}

function saveChanges() {
    toggleTopSettings()
    const aside = document.getElementById('sidebar');
    aside.children[0].children[0].remove()
    aside.children[0].prepend(createProfileDiv());
}

function toggleTopSettings() {
    document.getElementById('profileSettings').classList.toggle('show')
}

const createProfileDiv = () => {
    const profileDiv = createFullElement('div', 'loginButton', 'login-button')
    profileDiv.setAttribute('type', 'button')
    const profileImg = createImage(imgSrc, 'Profile picture', 'profileImg')
    const name = createFullElement('p', 'name', 'name', userName)
    const settingBtn = createFullElement('button', 'settingsTop', 'set-top')
    settingBtn.addEventListener('click', toggleTopSettings)
    const dots = createFullElement('i', 'dots', 'fas fa-chevron-down')
    settingBtn.append(dots)
    const settings = createProfileDivSettings()
    appendAll(profileDiv, profileImg, name, settingBtn, settings)
    return profileDiv
}



const createFolders = (...folders) => {
    const newFolders = folders.map((folder) => {
        const folderLi = createFullElement('li', `folder-${folder.id}`, `folder`)
        folderLi.addEventListener('click', _ => setFolderActive(folderLi))
        const folderIconWrapper = createFullElement('div', 'typeIcon', 'type-icon')
        const folderIcon = createFullElement('i', 'folderIcon', 'fas fa-clipboard')
        folderIconWrapper.append(folderIcon)
        const folderName = createFullElement('p', `folderName-${folder.id}`, 'folder-name', folder.name)
        const optionsIconWrapper = createFullElement('div', `options-${folder.id}`, 'options')
        const optionsIcon = createFullElement('i', `optionsIcon-${folder.id}`, 'fas fa-ellipsis-h')
        optionsIconWrapper.append(optionsIcon)
        optionsIconWrapper.addEventListener('click', () => showFolderOptions(folder.id))
        const foldersOptions = createFullElement('div', `foldersOptions-${folder.id}`, 'folders-options hide')
        const nameInput = createFullElement('input', 'nameInput', 'name-input')
        nameInput.value = folder.name
        const deleteBtn = createFullElement('button', 'deleteBtn', 'delete-btn', 'Delete Note')
        appendAll(foldersOptions, nameInput, deleteBtn)
        appendAll(folderLi, folderIconWrapper, folderName, optionsIconWrapper, foldersOptions)
        return folderLi
    })
    return newFolders
}


const createBottomButtons = () => {
    const addFolderBtn = createFullElement('div', 'addFolderBtn', 'add-folder bottom-button')
    addFolderBtn.setAttribute('type', 'button')
    addFolderBtn.addEventListener('click', addNewFolder)
    const addIcon = createFullElement('i', 'add', 'fas fa-plus')
    const addText = createFullElement('p', '', '', 'Add new folder')
    const settingsBtn = createFullElement('div', 'settingsBtn', 'settings bottom-button')
    settingsBtn.setAttribute('type', 'button')
    const settingsIcon = createFullElement('i', 'settings', 'fas fa-cog')
    const settingsText = createFullElement('p', '', '', 'Settings')
    appendAll(addFolderBtn, addIcon, addText)
    appendAll(settingsBtn, settingsIcon, settingsText)
    return [addFolderBtn, settingsBtn]
}

const createAside = () => {
    const aside = createFullElement('aside', 'sidebar', 'sidebar')
    //top
    const topWrapper = createFullElement('div', 'top', 'top')
    //Profile
    const profileDiv = createProfileDiv()
    topWrapper.append(profileDiv)

    //Search
    const searchBox = createSearchBox()
    topWrapper.append(searchBox)


    //medium
    const mediumWrapper = createFullElement('div', 'medium', 'medium')
    const notesList = createFullElement('ul', 'foldersList', 'folders')
    const noFoldersText = createFullElement('p', 'noFolders', 'no-folders hide', 'No Folders match')
    const folders = createFolders(...initialFolders)
    appendAll(notesList, noFoldersText, ...folders)
    mediumWrapper.append(notesList)

    //bottom
    const bottomWrapper = createFullElement('div', 'bottom', 'bottom')
    const buttons = createBottomButtons()
    appendAll(bottomWrapper, ...buttons)


    appendAll(aside, topWrapper, mediumWrapper, bottomWrapper)
    return aside
}

//Folders Options
const showFolderOptions = (id) => {
    const foldersOptions = [...document.querySelectorAll('.folders-options')];
    foldersOptions.forEach(item => item.classList.add('hide'))
    const targetFolderOpt = document.getElementById(`foldersOptions-${id}`)
    const name = targetFolderOpt.querySelector('input')
    name.addEventListener('keyup', changeNoteName)
    const deleteBtn = targetFolderOpt.querySelector('button')
    deleteBtn.addEventListener(`click`, handleDelete)
    targetFolderOpt.classList.remove('hide')
}

const changeNoteName = (e) => {
    const noteName = e.target.parentElement.parentElement.querySelector('p')
    noteName.textContent = e.target.value
    if (e.key === 'Enter') {
        e.target.parentElement.classList.add('hide');
        refreshNotes()
    }
}


const handleDelete = e => {
    e.target.parentElement.parentElement.remove()
}


//Add new Folder
const createNewFolderPortal = () => {
    const newFolderPortal = createFullElement('div', 'newFolder', 'new-folder')
    const close = createFullElement('i', 'close', 'fa-solid fa-square-xmark')
    close.title = 'Close portal'
    const form = createFullElement('form', 'newFolderForm', 'new-folder-form')
    const label = createFullElement('label', 'newFolderLabel', 'new-folder-label', 'Folder name: ')
    label.setAttribute('for', 'newFolderInput')
    const input = createFullElement('input', 'newFolderInput', 'new-folder-input')
    input.setAttribute('placeholder', 'New folder name...')
    const saveBtn = createFullElement('button', 'saveBtn', 'save-btn', 'Add folder')
    appendAll(form, label, input, saveBtn, close)
    newFolderPortal.append(form)
    return newFolderPortal
}

const addNewFolder = () => {
    const container = document.querySelector('.container')
    const newFolderPortal = createNewFolderPortal()
    const overLay = createFullElement('div', 'overLay', 'overlay')
    appendAll(container, newFolderPortal, overLay)
    const id = initialFolders[initialFolders.length - 1].id + 1 || 1;
    const nameInput = newFolderPortal.querySelector('form input')
    const save = newFolderPortal.querySelector('button')
    save.disabled = true
    nameInput.addEventListener('keyup', e => handleDisable(e, save))
    document.getElementById('close').addEventListener('click', () => closeElements(newFolderPortal, overLay))

    save.addEventListener('click', () => pushFolder({ id, name: nameInput.value }, newFolderPortal, overLay))
}

const handleDisable = (e, btn) => {
    const { value } = e.target
    btn.disabled = value ? false : true;
}

const pushFolder = (newFolder, portal, overLay) => {
    const notesList = document.querySelector('.folders')
    initialFolders.push(newFolder)
    closeElements(portal, overLay)
    deleteChildren(notesList)
    const folders = createFolders(...initialFolders)
    appendAll(notesList, ...folders)
}

const setFolderActive = folderLi => {
    const folders = document.querySelectorAll('.folder')
    folders.forEach(folder => folder.classList.remove('active'))
    folderLi.classList.add('active')
    refreshNotes()
}


const refreshNotes = () => {
    const oldNotesPage = document.querySelector('.notes-page')
    oldNotesPage.replaceWith(createNotesPage())
}

export default createAside;