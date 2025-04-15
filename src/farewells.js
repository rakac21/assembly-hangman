export default function farewells(lang, index)  { const arr = [
        `Goodbye ${lang}!`,
        `Farewell ${lang}...`,
        `Oh no we lost ${lang} as well!`,
        `${lang} down! I repeat, ${lang} down!!!`,
        `${lang} gone...`,
        `Oh no we lost ${lang} as well!`,
        `${lang} down! We at the endgame now...`,
    ]

    return arr[index]
}