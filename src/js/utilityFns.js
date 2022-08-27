import { initialData } from "./Data.js";
import createNotePage from "./note.js";



export const createFullElement = (tagName = 'div', id = '', className = '', textContent = '', ...attrs) => {
    const newElement = document.createElement(tagName)
    newElement.className = className;
    newElement.id = id;
    newElement.textContent = textContent //TODO: ADD Text Function to handle the mispels
    attrs.forEach(attr => newElement.setAttribute(attr, ''))
    return newElement
}

export const appendAll = (parent, ...children) => {
    children.forEach(child => parent.append(child))
}

export const createImage = (src, alt, id, className, ...attrs) => {
    const img = createFullElement('img', id, className, ...attrs)
    img.setAttribute('src', src)
    img.setAttribute('alt', alt)

    return img
}

const filterNotes = () => {
    const searchText = document.getElementById('searchText').value
    const folders = [...document.querySelectorAll('.folder')];
    const noFoldersText = document.getElementById('noFolders')
    folders.map(folder => {
        folder.querySelector('.folder-name').textContent.toLowerCase().includes(searchText.toLowerCase()) ?
            folder.classList.remove('hide') :
            folder.classList.add('hide')
    })

    const filteredFolders = folders.filter(folder => !folder.classList.contains('hide'))

    if (!filteredFolders.length) noFoldersText.classList.remove('hide')
    else noFoldersText.classList.add('hide')
}

export const createSearchBox = () => {
    const searchWrapper = createFullElement('div', 'search', 'search')
    const form = createFullElement('form', 'searchForm', 'search-form')
    form.setAttribute('role', 'search')
    const submitSearch = createFullElement('button', 'searchSubmit', 'search-submit')
    const searchIcon = createFullElement('i', 'searchIcon', 'fa-solid fa-magnifying-glass')
    submitSearch.append(searchIcon)
    submitSearch.addEventListener('click', filterNotes)
    const searchInput = createFullElement('input', 'searchText', 'search-text')
    searchInput.addEventListener('keyup', filterNotes)
    searchInput.setAttribute('role', 'searchbox')
    searchInput.setAttribute('placeholder', 'Search notes...')
    appendAll(form, submitSearch, searchInput)
    searchWrapper.append(form)
    return searchWrapper
}

export const getId = className => {
    const execs = {
        'list-ul': 'insertUnorderedList',
        'list-ol': 'insertOrderedList',
        'align-left': 'justifyLeft',
        'align-right': 'justifyRight',
        'align-center': 'justifyCenter',
        'align-justify': 'justifyFull',
        'link' : 'createLink',
        'image': 'insertImage'
    }

    return execs[className] || className
}

export const closeElements = (...elements) => {
    elements.forEach(element => element.remove())
}

export const deleteChildren = parent => {
    [...parent.children].forEach(child => parent.removeChild(child))
}

export const getTitle = () => {
    const activeFolder = document.querySelector('.folder.active p')
    return activeFolder.textContent
}

export const getNotes = () => {
    const activeId = parseInt(document.querySelector('.folder.active').id.split('-')[1])
    const notes = initialData.filter(note => note.id === activeId)
    return notes
}

export const editText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value)
}

export const refreshNotePage = () => {
    const notePage = document.getElementById('notePage');
    notePage.replaceWith(createNotePage())
}