import Note, { initialData } from "./Data.js"
import { refreshNotePage,createFullElement, appendAll, closeElements, getNotes, getTitle } from './utilityFns.js'
const createNotesPage = () => {
    const notesPage = createFullElement('section', 'notesPage', 'notes-page')
    //Top
    const activeFolder = document.querySelector('.folder.active')
    if (!activeFolder) {
        appendAll(notesPage, notesPageHint())
    } else {
        const folderTitle = createFullElement('h1', 'folderTitle', 'folder-title', getTitle())
        const addNoteWrapper = createAddNote()
        const folderNotes = createFolderNotesList(getNotes())
        appendAll(notesPage, folderTitle, addNoteWrapper, folderNotes)
    }
    return notesPage
}

const notesPageHint = () => {
    const text = createFullElement('h2', '', 'notes-hint', 'Select a folder to show notes')
    return text
}

const createAddNote = () => {
    const addNoteWrapper = createFullElement('div', 'addNote', 'add-folder add-note')
    addNoteWrapper.setAttribute('type', 'button')
    addNoteWrapper.addEventListener('click', addNoteToFolderPortal)
    const plusIcon = createFullElement('i', 'addIcon', 'fas fa-plus')
    const addNoteText = createFullElement('p', 'newNoteText', 'new-note', 'Add new note')
    appendAll(addNoteWrapper, plusIcon, addNoteText)
    return addNoteWrapper
}

const createFolderNotesList = (notes) => {
    const folderNotes = createFullElement('ul', 'folderNotes', 'folder-notes')
    const notesLi = notes.map(note => createNotesLi(note))
    appendAll(folderNotes, ...notesLi)
    return folderNotes
}

const createNotesLi = (noteObj) => {
    const { data } = noteObj;
    const note = createFullElement('li', 'folderNote', 'folder-note');
    note.addEventListener('click', () => {
        document.querySelectorAll('.folder-note').forEach(item => item.classList.remove('active'))
        note.classList.add('active')
        refreshNotePage()
    })
    const deleteNote = createFullElement('i', 'deleteNote', 'fa-solid fa-trash-can')
    deleteNote.addEventListener('click', _ => handleDeleteNote(note, noteObj))
    const date = createFullElement('h4', 'date', 'date', data.date)
    const title = createFullElement('h3', 'noteTitle', 'note-title', data.title)
    const desc = createFullElement('p', 'desc', 'desc', data.desc)
    const tagsWrapper = createFullElement('div', 'tags', 'tags')
    const tags = createTags(data.tags)
    appendAll(tagsWrapper, ...tags)
    appendAll(note, date, title, desc, tagsWrapper, deleteNote)
    return note
}


const createTags = (tags = ['lorem', 'lorem', 'lorem', 'lorem']) => {
    const tagsArray = tags.map(tag => {
        return createFullElement('p', 'tag', 'tag', tag)
    })

    return tagsArray
}

const refreshNotes = () => {
    const oldNotesPage = document.querySelector('.notes-page')
    oldNotesPage.replaceWith(createNotesPage())
}

const addNoteToFolderPortal = () => {
    const container = document.querySelector('.container')
    const portal = createFullElement('div', 'notePortal', 'note-portal')
    const overLay = createFullElement('div', 'overLay', 'overlay')
    appendAll(portal, ...portalOptions(portal, overLay),)
    appendAll(container, portal, overLay)
}


const portalOptions = (portal, overLay) => {
    const input = createFullElement('input', 'newNoteText', 'new-note')
    input.setAttribute('placeholder', 'Title')
    const desc = createFullElement('textarea', 'desc', 'desc')
    desc.setAttribute('placeholder', 'Description')
    const saveBtn = createFullElement('button', 'saveNote', 'save-note', 'Save Note')
    saveBtn.addEventListener('click', () => {
        closeElements(portal, overLay)
        handleAddNote(input, desc)
    })
    const close = createFullElement('i', 'close', 'fa-solid fa-square-xmark')
    close.title = 'Close portal'
    close.addEventListener('click', _ => closeElements(portal, overLay))
    return [input, desc, saveBtn, close]
}

const handleAddNote = (input, desc) => {
    const noteTitle = input.value
    const description = desc.value
    const activeId = parseInt(document.querySelector('.folder.active').id.split('-')[1])
    const newNote = new Note(new Date().toDateString(), noteTitle, description, ['note', 'note', 'note'])

    initialData.push({
        id: activeId, data: newNote
    })

    refreshNotes()
}

const handleDeleteNote = (note, noteObj) => {
    const noteIndex = initialData.findIndex(item => item === noteObj);
    initialData.splice(noteIndex, 1)
    note.remove()
}

export default createNotesPage;
