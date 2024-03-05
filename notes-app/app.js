const chalk =require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')

//
//Goal:Wire Up read command
//
//1.Setup --title option for read command 
//2.Create readNote in notes.js
//  -Search for note by title
//  -Find note and print title(styled) and body(plain)
//  -No note found?Print error in red.
//3.Have the command handler call the function
//4.Test your work by running a couple commands
//

//
//Goal:Wire up list command 
//
//1.Create and export listNotes from node.js
//  - "Your notes" using chalk
//  - Print note title for each note
//2.Call listNotes from command handler
//3.Test your work
//

//
//Challenge:Setup command option and function
//
//1.Setup the remove command to take a required "--title" option
//2.Create and export a removeNote function from notes.js
//3.Call removeNote in remove command handler
//4.Have removeNote log the titleof the note to be removed
//5.Test your work using node app.js remove --title="Some Title"
//
//Challenge:Wire up removeNote
//
//1.Load existing notes
//2.Use array filter method to remove the matching note(if any)
//3.Save the newly created array
//4.Test your work with a title that exists and a title that doesn't exist
//

//
//Challenge:Use chalk to provide useful logs for remove
//
//1.If a note is removed, print "Note Removed!",with a green background
//2.If note is removed, print "No note is found!" with a red background 
//

//console.log(process.argv)
//Customize yargs version
yargs.version('1.1.0')
//
//Challenge: Add an option to yargs
//1.Setup a body option for the add command
//2.Configure a description, make it required, and for it to be a string
//3.Log the body value in the handler function
//4.Test your work
//

//Create add command
yargs.command(
    {
    command:'add',
    describe:'Add a new Note!',
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:"Notes-Content",
            demandOption:true,
            type:'string'

        }
    },
    handler:function(argv){
       // console.log("Adding a New Note!",argv)
       //console.log('Title: '+ argv.title)
       //console.log('Content: '+argv.body)
       notes.addNote(argv.title,argv.body)
    }
})

//Create remove command
yargs.command(
    {
        command:'remove',
        describe:'Remove a Note!',
        builder:{
            title:{
                describe:"Note Title",
                demandOption:true,
                type:'string'   
            }
        },
        handler:function(argv){
            notes.removeNote(argv.title)
        }
    }
)

//Create list command
yargs.command(
    {
        command:'list',
        describe:'List your Notes!',
        handler:function(){
            notes.listNotes()
        }
    }
)

//Create read command
yargs.command(
    {
        command:'read',
        describe:'Read a Note!',
        builder:{
            title:{
                describe:"Note Title!",
                demandOption:true,
                type:"string"
            }
        },
        handler:function(argv){
            notes.readNote(argv.title)
        }
    }
)
yargs.parse()
//add,remove,read,list
//console.log(yargs.argv)


//console.log(process.argv)


// const command = process.argv[2]
// if(command === 'add'){
//     console.log('Adding Note!')
// }
// else if (command === 'remove'){
//     console.log('Removing Note!')
// }
//const chalk = require('./node_modules/chalk')
//const validator =require("validator")
//const notes = require("./notes.js")
//console.log(chalk.red.bold("Error!"))
//console.log(validator.isEmail('saigowtham30601@gmail.com'))
//console.log(validator.isURL('https://mead.io'))
//console.log("Hii "+notes())
// const add = require("./utils.js")
//const fs = require('fs')
//fs.writeFileSync('notes.txt','My Name is Sai Gowtham!')
//fs.appendFileSync('notes.txt','\nI work in TCS')
//console.log("Hii,I am "+ fname)
// const sum = add(4,-2)
// console.log(sum)

//Keyboard Shortcut to Comment Lines : Ctrl + /

//
//Challenge:Append a message to notes.txt
//
//1.Use appendFileSync to append to the file
//2.Run the script
//3.Check your work by opening the file and viewing the appended text
//

//
//Challenge:Define and use a function in a new file
//
//1.Create a new file called notes.js
//2.Create getNotes function that returns "Your Notes..."
//3.Export getNotes function
//4.From app.js,load in and call the function printing message to the console
//

//
//Challenge:Use the chalk library in your project
//
//1.Install version 2.4.1 of chalk
//2.Load chalk into app.js
//3.Use it to print the string "Success!" to console in green
//4.Test your work
//Bonus:Use docs to mess around with other styles.Make text bold and inversed
//
//https://github.com/andrewjmead/node-course-v3-code
