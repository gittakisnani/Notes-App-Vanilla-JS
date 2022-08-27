import { appendAll } from './utilityFns.js'
import createAside from './sidebar.js'
import createNotesPage from './notes.js'
import createNotePage from './note.js'

document.addEventListener('DOMContentLoaded', initApp)

//get data
//show and display data
async function initApp() {
    const container = document.getElementById('container')
    const aside = createAside();
    const notesPage = createNotesPage();
    const notePage = createNotePage()
    appendAll(container, aside, notesPage, notePage)
}