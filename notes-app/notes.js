const chalk = require('chalk')
const fs = require('fs')
const getNotes = function(){
    return "Your Notes..."
}
const addNote = function(title,body){
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note)=>note.title === title)//Using Arrow Function
    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })
    // if(duplicateNotes.length === 0){
    //     notes.push({
    //         title:title,
    //         body:body
    //     })
    //     saveNotes(notes)
    //     console.log(chalk.green.inverse("New Note Added!"))
    // }
    const duplicateNote = notes.find((note)=>note.title===title)
    if(!duplicateNote){
        notes.push({
            title:title,
             body:body
         })
         saveNotes(notes)
         console.log(chalk.green.inverse("New Note Added!"))        
    }
    else{
        console.log(chalk.red.inverse('Note title taken'))
    }
}
const removeNote = (title) =>{
    const notes = loadNotes()
    const notesToKeep =notes.filter((note) => note.title !== title)
    // const notesToKeep =notes.filter(function (note) {
    //     return note.title !== title
    // })   

    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note Removed"))
    }
    else{
        console.log(chalk.red.inverse("No note found"))
    }
}
const listNotes =function(){
        console.log(chalk.inverse("Your Notes"))
        notes_load = loadNotes()
        notes_load.forEach((note) => {
            console.log(note.title)            
        });

}

const readNote =function(title){
   const  notes = loadNotes()
    const note_search = notes.find((note)=>note.title === title)
    if(note_search){
        console.log(chalk.inverse(note_search.title)),
        console.log(note_search.body)
    }else{
        console.log(chalk.red.inverse("No Note Found!"))
    }
}

const saveNotes =notes => {
    notes_JSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',notes_JSON)
}
const loadNotes =()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON  = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}
//module.exports = getNotes
module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}
