export default class Note {
    constructor(date, title, desc, tags) {
        this.date = date,
        this.title = title,
        this.desc = desc,
        this.tags = [...tags]
    }
}

export const initialFolders = [
    {
        id: 1,
        name: 'My Notes 01'
    },
    {
        id: 2,
        name: 'My Notes 02'
    },
    {
        id: 3,
        name: 'My Notes 03'
    },
    {
        id: 4,
        name: 'My Notes 04'
    },
    {
        id: 5,
        name: 'My Notes 05'
    },
]

export const initialData = [
    {
        id: 1,
        data: {
            title: 'Exploration Ideas',
            date: '20 apr',
            desc: 'lorem 10',
            tags: ['lorem 01', 'lorem 02', 'lorem 03']
        }
    },
    {
        id: 2,
        data: {
            title: 'Exploration Ideas',
            date: '20 apr',
            desc: 'lorem 10',
            tags: ['lorem 01', 'lorem 02', 'lorem 03']
        }
    },
    {
        id: 6,
        data: {
            title: 'Exploration Ideas',
            date: '20 apr',
            desc: 'lorem 10',
            tags: ['lorem 01', 'lorem 02', 'lorem 03']
        }
    },
    {
        id: 5,
        data: {
            title: 'Exploration Ideas',
            date: '20 apr',
            desc: 'lorem 10',
            tags: ['lorem 01', 'lorem 02', 'lorem 03']
        }
    },
    {
        id: 4,
        data: {
            title: 'Exploration Ideas',
            date: '20 apr',
            desc: 'lorem 10',
            tags: ['lorem 01', 'lorem 02', 'lorem 03']
        }
    },
    {
        id: 3,
        data: {
            title: 'Exploration Ideas',
            date: '20 apr',
            desc: 'lorem 10',
            tags: ['lorem 01', 'lorem 02', 'lorem 03']
        }
    },
    {
        id: 2,
        data: {
            title: 'Exploration Ideas',
            date: '20 apr',
            desc: 'lorem 10',
            tags: ['lorem 01', 'lorem 02', 'lorem 03']
        }
    },
]


export const maleSrc = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F865695281492381696%2F81tOUsc7.jpg&f=1&nofb=1'
export const femaleSrc = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fcircle-avatars-1%2F128%2F050_girl_avatar_profile_woman_suit_student_officer-2-512.png&f=1&nofb=1'
