const numbersToLetters = {
    0: "нуль",           // 0  - 4
    1: "один",           // 1  - 4
    2: "два",            // 2  - 3
    3: "три",            // 3  - 3
    4: "чотири",         // 4  - 6
    5: "п'ять",
    6: "шість",          // 6  - 5
    7: "сім",            // 7  - 3
    8: "вісім",          // 8  - 5
    9: "дев'ять",
    10: "десять",        // 10 - 6
    11: "одинадцять",    // 11 - 10
    12: "дванадцять",    // 12 - 10
    13: "тринадцять",    // 13 - 10
    14: "чотирнадцять",  // 14 - 12
    15: "п'ятнадцять",
    16: "шістнадцять",   // 16 - 11
    17: "сімнадцять",    // 17 - 10
    18: "вісімнадцять",  // 18 - 12
    19: "дев'ятнадцять",
    20: "двадцять",      // 20 - 8
    30: "тридцять",
    40: "сорок",
    50: "п'ятдесят",
    60: "шістдесят",
    70: "сімдесят",
    80: "вісімдесят",
    90: "дев'яносто",
    100: "сто"
};

function GetNameFromNumber(number)
{
    if (number < 0 || number > 99)
        return undefined;

    if (numbersToLetters[number] != undefined) // 0-19
        return numbersToLetters[number];

    return numbersToLetters[ ~~(number / 10) * 10] + "" + numbersToLetters[number % 10]
}

function GetProperNumbers(amount)
{
    let arr = [];
    for (let i = 0; i < amount; i++)
        //arr.push(GetRandomElementOfArray([0, 3]));// 11, 12, 13, 14, 16, 17, 18, 20]));
        arr.push(GetRandomElementOfArray([0, 1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18, 20]));
        //arr.push(GetRandomElementOfArray([0, 1, 2, 3, 4, 6, 7, 8]) * 10 + GetRandomElementOfArray([0, 1, 2, 3, 4, 6, 7, 8]));
    return arr;
}

function GetSigns(amount)
{
    let arr = [];
    for (let i = 0; i < amount; i++)
        arr.push(GetRandomElementOfArray(["+", "-", "*"]));
    return arr;
}

let currentAnswer = undefined;
let correctAnswers = 0;
const neededAnswers = 3;
let isGame5On = false;
let isGame5Done = false;
const numbersPerYield = 3;

function Game5Yield()
{
    let numbers = GetProperNumbers(numbersPerYield);
    let signs = GetSigns(numbersPerYield - 1);
    let answer = 0;

    // old - numbers.forEach((num) => answer += GetNameFromNumber(num).length);
    // only works for 2 cuz imma lazy bum
    // I AINT DOIN TS PROPERLY FUCK OFF
    if (signs[1] == "*")
    {
        answer = GetNameFromNumber(numbers[1]).length * GetNameFromNumber(numbers[2]).length;
        switch (signs[0])
        {
            case "+":
                answer = GetNameFromNumber(numbers[0]).length + answer;
                break;
            case "-":
                answer = GetNameFromNumber(numbers[0]).length - answer;
                break;
            case "*":
                answer = GetNameFromNumber(numbers[0]).length * answer;
                break;
        }
    }
    else
    {
        switch (signs[0])
        {
            case "+":
                answer = GetNameFromNumber(numbers[0]).length + GetNameFromNumber(numbers[1]).length;
                break;
            case "-":
                answer = GetNameFromNumber(numbers[0]).length - GetNameFromNumber(numbers[1]).length;
                break;
            case "*":
                answer = GetNameFromNumber(numbers[0]).length * GetNameFromNumber(numbers[1]).length;
                break;
        }
        switch (signs[1])
        {
            case "+":
                answer = answer + GetNameFromNumber(numbers[2]).length;
                break;
            case "-":
                answer = answer - GetNameFromNumber(numbers[2]).length;
                break;
            case "*":
                answer = undefined;
                break;
        }
    }

    currentAnswer = answer;

    WriteLine(`Питання: ${numbers[0]} ${signs[0]} ${numbers[1]} ${signs[1]} ${numbers[2]}.`);
    WriteLine("Відповідь?");

    WriteLine("");
    WritePrefix();
    input.value = "";
}

function Game5Process(command)
{
    if (command == "abort")
    {
        Game5Abort();
        return;
    }

    if (command == currentAnswer)
    {
        correctAnswers += 1;
        WriteLine(`Правильно. ${correctAnswers}/${neededAnswers}.`);
        if (correctAnswers == neededAnswers)
            GiveRootAccess();
        else
           Game5Yield();
    }
    else
    {
        WriteLine(`Неправильно. Відповідь: ${currentAnswer}.`);
        Game5Yield();
    }
}

function Game5Abort()
{
    isGame5On = false;
    WriteLine("Перевірку перервано.");

    WriteLine("");
    WritePrefix();
    input.value = "";
}

let FLAG_HAS_ROOT_ACCESS = false;

function GiveRootAccess()
{
    FLAG_HAS_ROOT_ACCESS = true;
    isGame5Done = true;
    isGame5On = false;
    WriteLine(`Перевірку пройдено. Видано роль адміністратора.`);

    WriteLine("");
    WritePrefix();
    input.value = "";
}