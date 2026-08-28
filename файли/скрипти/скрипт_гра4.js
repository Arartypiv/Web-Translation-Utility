const instrument = "Glockenspiel";
const note_to_val =
{ 
     "F":   1, 
     "F#":  2, 
     "G":   3, 
     "G#":  4, 
     "A":   5, 
     "A#":  6, 
     "B":   7, 
     "C":   8, 
     "C#":  9
};
const val_to_note =
{ 
     1: "F",
     2: "F#",
     3: "G",
     4: "G#",
     5: "A",
     6: "A#",
     7: "B",
     8: "C",
     9: "C#"
};
const sixval_to_note =
{ 
     1: "F", 
     2: "G", 
     3: "G#", 
     4: "A#", 
     5: "C", 
     6: "C#"
};
const note_to_sixval =
{ 
     "F":   1,
     "G":   2,
     "G#":  3,
     "A#":  4,
     "C":   5,
     "C#":  6
};
const correctNoteArray = [6,   8,   9,   9,   6,   8,   6,   4,   3,   1,   3,   4,   4,   1,   3,   6,   1]; // 17
const delayArray =     [0,  500, 500, 500, 375, 125, 625, 125, 125, 125, 500, 500, 500, 375, 125, 375, 125];  // 16
const totalNotes = 17;
const totalPositions = 6;
let isEasyMode = false;
let delayMultiplier = 1.5;

function SetUpExampleTable(columnCount = totalNotes)
{
    for (let i = 1; i <= columnCount; i++)
    {
        let col =   `<tr>
                        <td><span class="noteMiddle noteTop">   </span></td>
                        <td><span id="exampleNote${i}" class="noteMiddle"> ? </span></td>
                        <td><span class="noteMiddle noteBottom">   </span></td>
                    </tr>`
        document.getElementById("noteExampleTable").insertAdjacentHTML("beforeend", col);
    }
}

function SetUpTable(columnCount = totalNotes)
{
    for (let i = 1; i <= columnCount; i++)
    {
        let col =   `<tr>
                        <td><span id="note${i}Value" style="display: none;">3</span></td>
                        <td><span id="note${i}DisplayValue">G#</span></td>
                        <td><button onclick="ProcessNoteButton(${i}, true)">△</button></td>
                        <td><span id="note${i}Position6" class="noteMiddle noteTop"> - </span></td>
                        <td><span id="note${i}Position5" class="noteMiddle"> - </span></td>
                        <td><span id="note${i}Position4" class="noteMiddle"> - </span></td>
                        <td><span id="note${i}Position3" class="noteMiddle"> ♪ </span></td>
                        <td><span id="note${i}Position2" class="noteMiddle"> - </span></td>
                        <td><span id="note${i}Position1" class="noteMiddle noteBottom"> - </span></td>
                        <td><button onclick="ProcessNoteButton(${i}, false)">▽</button></td>
                        <td><span id="note${i}IsCorrect"></span></td>
                    </tr>`
        document.getElementById("noteTable").insertAdjacentHTML("beforeend", col);
    }
}

SetUpExampleTable();
SetUpTable();

function ProcessNoteButton(noteNumber, isUp)
{
    let oldVal = parseInt(document.getElementById(`note${noteNumber}Value`).innerHTML);
    
    for (let i = 1; i <= totalPositions; i++)
    {
        document.getElementById(`note${noteNumber}Position${i}`).innerHTML = " - ";
    }

    let newVal = isUp ? oldVal + 1 : oldVal - 1;

    if (newVal > totalPositions || newVal < 1)
    {
        document.getElementById(`note${noteNumber}Position${oldVal}`).innerHTML = " ♪ ";
        PlaySound(`/ноти/${instrument}/note (${note_to_val[sixval_to_note[oldVal]]}).mp3`)
    }
    else
    {
        document.getElementById(`note${noteNumber}Position${newVal}`).innerHTML = " ♪ ";
        document.getElementById(`note${noteNumber}Value`).innerHTML = newVal;
        document.getElementById(`note${noteNumber}DisplayValue`).innerHTML = sixval_to_note[newVal];
        PlaySound(`/ноти/${instrument}/note (${note_to_val[sixval_to_note[newVal]]}).mp3`)
    }
}

function CheckMelody()
{
    let noteArray = [];
    for (let i = 1; i <= totalNotes; i++)
    {
        noteArray.push(
            parseInt(
                note_to_val[
                    sixval_to_note[
                        document.getElementById(`note${i}Value`).innerHTML
                    ]
                ]
            )
        );
    }
    PlayMelody(noteArray, delayArray);
}

function SkipKatawaPuzzle()
{
    for (let noteNumber = 1; noteNumber <= totalNotes; noteNumber++)
    {
        for (let i = 1; i <= totalPositions; i++)
            document.getElementById(`note${noteNumber}Position${i}`).innerHTML = " - ";

        document.getElementById(`note${noteNumber}Position${note_to_sixval[val_to_note[correctNoteArray[noteNumber - 1]]]}`).innerHTML = " ♪ ";
        document.getElementById(`note${noteNumber}Value`).innerHTML = note_to_sixval[val_to_note[correctNoteArray[noteNumber - 1]]];
        document.getElementById(`note${noteNumber}DisplayValue`).innerHTML = val_to_note[correctNoteArray[noteNumber - 1]];
    }
    MelodyWin();
}

const checkButton = document.getElementById("noteCheckButton");
const listenButton = document.getElementById("notePlayExampleButton");

function PlayExample(noteArray = correctNoteArray, _delayArray = delayArray, instrument="Glockenspiel")
{
    // delayArray - delay BEFORE the note
    if (noteArray.length != _delayArray.length)
    {
        alert("mismatch");
        return;
    }

    checkButton.disabled = true;
    listenButton.disabled = true;

    let accumulatedDelay = 0;
    let previousElement = null;
    for (let i = 0; i < noteArray.length; i++)
    {
        accumulatedDelay += _delayArray[i] * delayMultiplier;
        setTimeout(() => {
            PlaySound(`/ноти/${instrument}/note (${noteArray[i]}).mp3`);
            if (previousElement != null)
                previousElement.style.backgroundColor = "transparent";
            previousElement = document.getElementById(`exampleNote${i + 1}`).parentElement.parentElement.parentElement;
            previousElement.style.backgroundColor = "#767676";
        }, accumulatedDelay);
    }
    setTimeout(() => {
            previousElement.style.backgroundColor = "transparent";
            checkButton.disabled = false;
            listenButton.disabled = false;
        }, accumulatedDelay + 750);
}

function PlayMelody(noteArray, delayArray, instrument="Glockenspiel")
{
    // delayArray - delay BEFORE the note
    if (noteArray.length != delayArray.length)
    {
        alert("mismatch");
        return;
    }

    checkButton.disabled = true;
    listenButton.disabled = true;

    document.querySelectorAll("#noteTable tbody tr td button").forEach(button => { button.disabled = true; });

    let accumulatedDelay = 0;
    let previousElement = null;
    let correctCount = 0;
    for (let i = 0; i < noteArray.length; i++)
    {
        accumulatedDelay += delayArray[i] * delayMultiplier;
        setTimeout(() => {
            PlaySound(`/ноти/${instrument}/note (${noteArray[i]}).mp3`);
            
            if (previousElement != null)
                previousElement.style.backgroundColor = "transparent";
            previousElement = document.getElementById(`note${i + 1}Value`).parentElement.parentElement.parentElement;
            previousElement.style.backgroundColor = "#767676";

            if (noteArray[i] == correctNoteArray[i])
            {
                // correct
                document.getElementById(`note${i + 1}IsCorrect`).innerHTML = "✓";
                document.getElementById(`note${i + 1}IsCorrect`).title = "Нота підібрана правильно";
                correctCount += 1;
            }
            else
            {
                if (isEasyMode)
                {
                    if (noteArray[i] > correctNoteArray[i])
                    {
                        document.getElementById(`note${i + 1}IsCorrect`).innerHTML = "↘";
                        document.getElementById(`note${i + 1}IsCorrect`).title = "Нота має бути нижче"; 
                    }
                    else if (noteArray[i] < correctNoteArray[i])
                    {
                        document.getElementById(`note${i + 1}IsCorrect`).innerHTML = "↗"; 
                        document.getElementById(`note${i + 1}IsCorrect`).title = "Нота має бути вище"; 
                    }
                }
                else
                {
                    document.getElementById(`note${i + 1}IsCorrect`).innerHTML = "✗"; 
                    document.getElementById(`note${i + 1}IsCorrect`).title = "Нота підібрана неправильно"; 
                }
            }
        }, accumulatedDelay);
    }
    setTimeout(() => {
            previousElement.style.backgroundColor = "transparent";
            checkButton.disabled = false;
            listenButton.disabled = false;
            console.log("nig");
            document.querySelectorAll("#noteTable tbody tr td button").forEach(button => { button.disabled = false; });
        }, accumulatedDelay + 750);
    setTimeout(() => {
            if (correctCount == totalNotes)
                MelodyWin();
        }, accumulatedDelay + 1000);
}

function ToggleMelodyEasyMode()
{
    isEasyMode = !isEasyMode;
}

function MelodyWin()
{
    FixRadio();
}