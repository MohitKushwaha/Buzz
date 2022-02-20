export interface VideoFile {
    url: string,
    title: string,
    description: string,
    author: string,
    credits: string,
    duration: number,
    addeddate: Date,
    addedtime: string,
    lastplayeddate: Date,
    lastplayedtime: string,
    lastplayedtill: number,
    favourite: boolean,
    playlists: Array<string>,
    tags: Array<string>
}

export interface Profile {
    username: string,
    userId: number,
    organisation: string,
    playlists: string[]
}

export interface HistoryVid {
    url: string,
    milli: string,
    duration: number;
}