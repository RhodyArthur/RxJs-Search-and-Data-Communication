export interface Data {
        license: {
            name:string,
            url:string
        }
    
        meanings: {
            antonyms:[],
            definitions: {
                antonyms: string[],
                definition:string,
                example:string,
                synonyms: string[]
            }[],
            partOfSpeech:string,
            synonyms: string[],
        }[]
    
        phonetic: string
    
        phonetics : {
           audio: string,
           license: {
            name:string,
            url:string,
           }
           sourceUrl: string,
           text?:string
        }[],
    
        sourceUrls: string[],
        word: string,
    
    
    
    }
