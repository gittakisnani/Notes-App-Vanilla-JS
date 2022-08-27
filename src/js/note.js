import { userName } from "./sidebar.js";
import { createFullElement, appendAll, getId, editText } from './utilityFns.js'
const createNotePage = () => {
    const activeFolder = document.querySelector('.folder.active');
    const activeNote = document.querySelector('.folder-note.active');
    const notePage = createFullElement('div', 'notePage', 'note-page');
    const hintText = createFullElement('h2', 'hint', 'hint', 'No Note is selected, please select a note to show!')
    if (!activeFolder || !activeNote) {
        notePage.append(hintText);
        return notePage;
    }

    const header = createHeaderNotePage(activeFolder, activeNote)
    const about = createAboutNotePage(activeNote);
    const textOps = createTextHandlers();
    const noteText = createTextArea(activeNote.querySelector('.desc').textContent)
    appendAll(notePage, header, about, textOps, noteText)
    return notePage;
}

const createHeaderNotePage = (activeFolder, activeNote) => {
    const header = createFullElement('div', 'headerNotePage', 'header');
    const path = createFullElement('h1', 'path', 'path', `${activeFolder.querySelector('p').textContent} > ${activeNote.querySelector('h3').textContent}`);
    header.append(path)
    return header;
}

const createAboutNotePage = (activeNote) => {
    const about = createFullElement('div', 'about', 'about');
    const modDate = `${new Date(activeNote.querySelector('h4').textContent).toDateString()}`.slice(0, -5);
    const title = createFullElement('h2', 'noteTitle', 'note-title', `${activeNote.querySelector('h3').textContent}`);
    const creator = createFullElement('div', 'creator', 'creator about-key', 'Created by: ');
    const creatorName = createFullElement('span', 'creatorName', 'creator-name', userName);
    creator.append(creatorName)
    const date = createFullElement('div', 'date', 'date about-key', 'Last modified');
    const lastModDate = createFullElement('span', 'lastModificationDate', 'last-modification-date', modDate)
    date.append(lastModDate)
    const tags = createNoteTags(activeNote)
    appendAll(about, title, creator, date, tags)
    return about;
}

const createNoteTags = note => {
    const tagsWrapper = createFullElement('div', 'noteTags', 'about-key tags', 'Tags: ');
    const tagsArr = [...note.querySelectorAll('.tag')]
    const tags = tagsArr.map(tag => {
        const tagWrapper = createFullElement('span', '', 'tag', tag.textContent)
        return tagWrapper
    });

    appendAll(tagsWrapper, ...tags);

    return tagsWrapper;
}


const createTextHandlers = () => {
    const textHandlersWrapper = createFullElement('div', 'textHandlers', 'text-decoration-transform');
    const fontOptions = createFontOptions();
    const textOptions = createTextOptions()

    appendAll(textHandlersWrapper, ...fontOptions, ...textOptions)
    return textHandlersWrapper
}

const createFontOptions = () => {
    const fontFamilyWrapper = createFullElement('div', 'fontFamily', 'text-family');
    const fontFamilySelect = createFullElement('select', 'fontName');
    ['Serif', 'Sans Serif', 'Display', 'Slab Serif', 'Script', 'Retro', 'Arial'].forEach(item => {
        const option = createFullElement('option');
        option.value = item;
        option.innerHTML = item;
        fontFamilySelect.append(option)
    });

    fontFamilySelect.addEventListener('change', () => editText(fontFamilySelect.id, false, fontFamilySelect.value))

    fontFamilyWrapper.append(fontFamilySelect)
    const fontSizeWrapper = createFullElement('div', 'fontSizeWrapper', 'font-size');
    const fontSizeSelect = createFullElement('select', 'fontSize')
    for(let i = 1; i <= 7; i++) {
        const option  = createFullElement('option');
        option.value = i.toString();
        option.innerHTML = i.toString();
        fontSizeSelect.append(option)
    };

    fontSizeSelect.addEventListener('change', () => editText(fontSizeSelect.id, false, fontSizeSelect.value))

    fontSizeWrapper.append(fontSizeSelect);

    return [fontFamilyWrapper, fontSizeWrapper]
}

const createTextOptions = () => {
    const firstOptionsWrapper = createFullElement('div', '', 'text-opt');
    const secondOptionsWrapper = createFullElement('div', '', 'text-opt');
    const thirdOptionsWrapper = createFullElement('div', '', 'text-opt');
    ['bold', 'italic', 'link', 'list-ul', 'list-ol', 'align-left', 'align-center', 'align-right', 'align-justify', 'image', 'video', 'border-all', 'calendar' ].forEach((item, index) => {
        const button = createFullElement('button', getId(item), item);
        button.addEventListener('click', () => toggleHighlight(button.id, false, null))
        const icon = createFullElement('i', '', `fas fa-${item}`);
        button.append(icon)
        index < 5 ? firstOptionsWrapper.append(button) : index < 9 ? secondOptionsWrapper.append(button) : thirdOptionsWrapper.append(button)
    });
    return [firstOptionsWrapper, secondOptionsWrapper, thirdOptionsWrapper]
}

const toggleHighlight =  (command, defaultUi, value) => {
    editText(command, defaultUi, value);
    const target = document.getElementById(command);
    target.classList.toggle('active');

    //TODO: add logic to special icons
}

const createTextArea = (text) => {
    const textArea = createFullElement('div', 'noteText', 'text');
    textArea.setAttribute('contenteditable', 'true')
    textArea.textContent = text
    return textArea
}
export default createNotePage;