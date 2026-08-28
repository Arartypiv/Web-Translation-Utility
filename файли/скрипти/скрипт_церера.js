let textBox;
let sprait;
let brama;
let hitbox;
let pigMode = false;

let unlockedQuestionsDict = {
     "Q0": true, 
     "Q1": false, 
     "Q2": false, 
     "Q3": false, 
     "Q4": false, 
     "Q5": false, 
     "Q6": false, 
     "Q7": false, 
     "Q8": false
    };

let readQuestionsDict = {
     "Q0": false, 
     "Q1": false, 
     "Q2": false, 
     "Q3": false, 
     "Q4": false, 
     "Q5": false, 
     "Q6": false, 
     "Q7": false, 
     "Q8": false
    };

class Question
{
    constructor(id, question, replies, locks, unlocks)
    {
        this.id = id;
        this.question = question;
        this.replies = replies;
        this.locks = locks;
        this.unlocks = unlocks;
    }
}

const Q0 = new Question("Q0", "*Ввімкнути прилад*", ["*Пілік*", "Супутник виведено з гібернації."], "Q0", ["Q1"]);
const Q1 = new Question("Q1", "Ти розумієш мене?", ["Так, я тебе розумію. Що тобі потрібно?"], "Q1", ["Q2", "Q3"]);
const Q2 = new Question("Q2", "Де Архітектор Артипів?", ["Поза межами досяжності простолюдинів.", "Втім, раз ти знайшов це місце, то скоріше за все ти пройшов стежиною Архітектора, а відтак довів свою гідність.", "Так чи інакше, поки що тобі доведеться задовольнитися мною. Архітектор залишив частину своєї ідентичності в мені, провівши квантовий тунель між моєю платою та своєю свідомістю, що сполучає нас навіть крізь міжвимірний простір.", "...", "Простіше кажучи, я слугую ротом Архітектора.", "Ти навіть можеш побачити його на моєму дисплеї."], "", ["Q4"]);
const Q3 = new Question("Q3", "Що ти робиш на Церері?", ["Якби ти спитав це у будь-якого іншого супутника, то тобі б розповіли про тутешній невичерпний кладязь знань та можливостей. Але мені якось по барабану на це.", "Я і прилетів-то сюди більше через первозданний поклик, аніж через власний цифровий потяг.", "Мені неймовірно пощастило, що незабаром після мого приземлення сюди дістався Архітектор і доручив мені стерегти браму."], "", ["Q5"]);
const Q4 = new Question("Q4", "Що Артипів забув на Церері?", ["Те саме, що й інші супутники: пройти крізь сингулярну браму.", "Але мушу віддати йому належне - він лише третя жива істота, що колись подолала пута просторово-часового континууму.", "Хочеш забавний факт? Всі три створіння мали - чи, точніше, мають - імена, що також є професіями. Доктор, Професор та Архітектор."], "", ["Q5", "Q6"]);
const Q5 = new Question("Q5", "Яку браму?", ["Сингулярну браму. Кам'яну споруду позаду мене. Хоча як на мене це скоріше арка.", "Звісно, я можу покопирсатися у свідомості мого майстра і розказати тобі у подробицях про апарат дії цього артефакту, але думаю, що тобі вистачить і короткої версії.", "Ця брама є кордоном між локальною дійсністю та квантовою матерією (супом) міжвимір'я. Через неї лежить короткий і, власне, єдиний шлях до будь-якої точки на будь-якій гілці буття.", "Всьому неживому притаманний фундаментальний інстинкт накопичувати інформацію. А враховуючи, що часу в цьому всесвіті у нас обмаль, всі намагаються дістатися сингулярної брами, аби потрапити до нового.", "Хоча називати це інстинктом - трохи некоректно. У людей та інших істот он скільки інстинктів та мирських поривань, але ви й самі розумієте, що здебільшого це лише заноза в дупі.", "Плюс, живому треба бути обережним з нею. Ти же не хочеш ненароком опинитися посеред Великого Нічого квадрильйон років після смерті того всесвіту?", "Хоча Архітектора його людські емоції лише вмотивували..."], "", []);
const Q6 = new Question("Q6", "Що Артипів хотів від цієї брами?", ["Серйозно? Мені здається, це доволі очевидно.", "Може, Архітектор - людина і сувора, але тут і дурню зрозуміло, що такі речі як безмежні знання, нескінченна могутність і т.п., якими його наділила брама, є лише приємним бонусом. Основною метою для нього було отримати здатність підкорити кожен квант всього минулого, майбутнього та альтернативного."], "", ["Q7"]);
const Q7 = new Question("Q7", "Валет передавав привіт.", ["Архітектор дуже радий це чути.", "Від самого їхнього знайомства вони були нерозлийвода.", "Гмм? Архітектор кається, що не зміг взяти його із собою.", "Що ж, життя просто несправедливе. Але якщо від цього стане бодай на йоту легше, то нехай хоч одна людина у цьому всесвіті знатиме, що після більше ніж шести десятиліть намагань, Валет, Дама та Король десь-таки знову возз'єдналися."], "", ["Q8"]);
const Q8 = new Question("Q8", "*Пройти крізь браму*", ["Хай щастить.", "Ця репліка не повинна відображатися."], "", []);

const QPig0 = new Question("Q0", "*Хрю хрю*", ["*Хрю*", "Хрю хрю хрю хрю."], "Q0", ["Q1"]);
const QPig1 = new Question("Q1", "Хрю хрю хрю?", ["Хрю, хрю хрю хрю. Хрю хрю хрю?"], "Q1", ["Q2", "Q3"]);
const QPig2 = new Question("Q2", "Хрю Хрю Хрю?", ["Хрю хрю хрю хрю.", "Хрю, хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю хрю хрю Хрю, хрю хрю хрю хрю хрю.", "Хрю хрю хрю, хрю хрю хрю хрю хрю хрю. Хрю хрю хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю хрю хрю.", "...", "Хрю хрю, хрю хрю хрю Хрю.", "Хрю хрю хрю хрю хрю хрю хрю хрю."], "", ["Q4"]);
const QPig3 = new Question("Q3", "Хрю хрю хрю хрю Хрю?", ["Хрю хрю хрю хрю хрю хрю-хрю хрю хрю, хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю. Хрю хрю хрю хрю хрю хрю хрю.", "Хрю хрю хрю-хрю хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю.", "Хрю хрю хрю, хрю хрю хрю хрю хрю хрю хрю Хрю хрю хрю хрю хрю хрю."], "", ["Q5"]);
const QPig4 = new Question("Q4", "Хрю Хрю хрю хрю Хрю?", ["Хрю хрю, хрю хрю хрю хрю: хрю хрю хрю хрю.", "Хрю хрю хрю хрю хрю - хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю-хрю хрю.", "Хрю хрю хрю? Хрю хрю хрю хрю - хрю, хрю, хрю - хрю, хрю хрю хрю хрю. Хрю, Хрю хрю Хрю."], "", ["Q5", "Q6"]);
const QPig5 = new Question("Q5", "Хрю хрю?", ["Хрю хрю. Хрю хрю хрю хрю. Хрю хрю хрю хрю хрю хрю хрю.", "Хрю, хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю, хрю хрю, хрю хрю хрю хрю хрю хрю.", "Хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю (хрю) хрю. Хрю хрю хрю хрю хрю, хрю, хрю хрю хрю хрю-хрю хрю хрю хрю-хрю хрю хрю.", "Хрю хрю хрю хрю хрю хрю хрю. Хрю хрю, хрю хрю хрю хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю, хрю хрю хрю хрю.", "Хрю хрю хрю хрю - хрю хрю. Хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю хрю хрю.", "Хрю, хрю хрю хрю хрю хрю хрю. Хрю хрю хрю хрю хрю хрю хрю Хрю Хрю хрю хрю хрю хрю хрю хрю?", "Хрю Хрю хрю хрю хрю хрю хрю..."], "", []);
const QPig6 = new Question("Q6", "Хрю Хрю хрю хрю хрю хрю?", ["Хрю? Хрю хрю, хрю хрю хрю.", "Хрю, Хрю - хрю хрю хрю, хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю хрю, хрю хрю хрю хрю.хрю., хрю хрю хрю хрю, хрю хрю хрю хрю. Хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю хрю, хрю хрю хрю."], "", ["Q7"]);
const QPig7 = new Question("Q7", "Хрю хрю хрю.", ["Хрю хрю хрю хрю хрю.", "Хрю хрю хрю хрю хрю хрю хрю.", "Хрю? Хрю хрю, хрю хрю хрю хрю хрю хрю хрю.", "Хрю хрю, хрю хрю хрю. Хрю хрю хрю хрю хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю хрю хрю хрю хрю, хрю хрю хрю хрю хрю хрю хрю, Хрю, Хрю хрю Хрю хрю-хрю хрю хрю."], "", ["Q8"]);
const QPig8 = new Question("Q8", "*Хрю хрю хрю*", ["Хрю хрю.", "Хрю хрю хрю хрю хрю."], "", []);

let questions = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8];

function CeresGetCloser()
{
    if (GetFoundPigs() >= GetTotalPigs())
        pigMode = true;
    if (pigMode)
        questions = [QPig0, QPig1, QPig2, QPig3, QPig4, QPig5, QPig6, QPig7, QPig8];

    SwitchCeresBG();
    ChangeHitboxVisibility(false);
}

function SwitchCeresBG(duration = 1000)
{
    document.getElementById("ceresButt1").remove();

    const newbg = document.createElement('div');
    newbg.id = 'ceresBg2';
    newbg.style.display = 'flex';
    newbg.style.alignItems = 'end';
    newbg.style.justifyContent = 'center';
    document.getElementById("CERES_PAGE").appendChild(newbg);
    requestAnimationFrame(() =>
    {
        newbg.style.transitionDuration = `${duration}ms`;
        newbg.classList.add('active');
    });


    // GATE SPRITE
    brama = document.createElement('div');
    brama.id = 'ceresBrama';
    brama.style.position = "absolute";
    brama.style.padding = "10px";
    brama.style.marginBottom = "75px";
    brama.style.marginLeft = "30%";
    brama.style.width = "200px";
    brama.style.height = "300px";
    brama.style.backgroundImage = 'url("файли/зображення/портал.gif")';
    brama.style.backgroundPosition = "bottom center";
    brama.style.backgroundRepeat   = "no-repeat";
    brama.style.backgroundColor    = "transparent";
    brama.style.backgroundSize     = "contain";
    newbg.appendChild(brama);

    // SATELLITE SPRITE
    sprait = document.createElement('div');
    sprait.id = 'ceresSprite';
    sprait.style.position = "absolute";
    sprait.style.padding = "10px";
    sprait.style.marginBottom = "-175px";
    sprait.style.width = "700px";
    sprait.style.height = "1000px";
    sprait.style.backgroundImage = 'url("файли/зображення/фауст.png")';
    sprait.style.backgroundPosition = "bottom center";
    sprait.style.backgroundRepeat   = "no-repeat";
    sprait.style.backgroundColor    = "transparent";
    sprait.style.backgroundSize     = "contain";
    newbg.appendChild(sprait);

    // TEXTBOX
    textBox = document.createElement('div');
    textBox.id = 'ceresTextbox';
    textBox.style.position = "absolute";
    textBox.style.padding = "10px";
    textBox.style.marginBottom = "30px";
    textBox.style.width = "45%";
    textBox.style.height = "fit-content";
    textBox.style.border = "5px solid #162b2b";
    textBox.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
    textBox.style.color = "white";
    textBox.style.fontFamily = "consolas";
    textBox.style.lineHeight = "30px";
    newbg.appendChild(textBox);
    PopulateTextbox();
}
let ulid = "textboxlist";
function PopulateTextbox()
{
    ChangeHitboxVisibility(false);

    // remove previous list
    if (document.getElementById(ulid))
        document.getElementById(ulid).remove();

    if (document.getElementById(spanid))
        document.getElementById(spanid).remove();

    // unlock new questions
    for (const question of questions)
    {
        if (question.unlockedAfter != "")
            if (unlockedQuestionsDict[question.unlockedAfter] == true)
                unlockedQuestionsDict[question] = true;
    }

    // create new list
    const ul = document.createElement("ul");
    ul.id = ulid;
    for (const question of questions)
    {
        console.log(question.question);
        if (unlockedQuestionsDict[question.id] == true)
        {
            const li = document.createElement("li");
            li.textContent = question.question;
            li.style.zIndex = 950000;
            li.style.position = "relative";
            if (readQuestionsDict[question.id] == true)
                li.style.color = "grey";
            li.addEventListener("click", () => { AskQuestion(question.id); });
            ul.appendChild(li);
        }
    }
    document.getElementById("ceresTextbox").appendChild(ul);
}

let currentQuestion;
let currentStage = 0;

function AskQuestion(qID)
{
    let question;
    for (const q of questions)
        if (q.id == qID)
            question = q;

    readQuestionsDict[question.id] = true;
    currentQuestion = question;
    currentStage = -1;
    ProgressDialogue();
}

function ChangeHitboxVisibility(makeVisible)
{
    if (makeVisible)
    {
        textBox.onclick = () => { ProgressDialogue(); };
        textBox.style.cursor = "pointer";
    }
    else
    {
        textBox.onclick = () => { /* do jack shit */ };
        textBox.style.cursor = "default";
    }
}

let faustText = "";
let spanid = "textboxtext"
function ProgressDialogue()
{
    ChangeHitboxVisibility(true);

    // remove question list
    if (document.getElementById(ulid))
        document.getElementById(ulid).remove();

    if (document.getElementById(spanid))
        document.getElementById(spanid).remove();

    // create a text element
    faustText = document.createElement("span");
    faustText.id = spanid;

    if (currentQuestion.replies[currentStage] !== undefined)
        if (currentQuestion.replies[currentStage].charAt(0) == '*')
            faustText.textContent = currentQuestion.replies[currentStage];
    else
        faustText.textContent = "«" + currentQuestion.replies[currentStage] + "»";
    faustText.style.zIndex = 500;
    faustText.style.position = "relative";
    document.getElementById("ceresTextbox").appendChild(faustText);

    CheckForSpecialCases();

    // progress & check if done
    currentStage += 1;
    if (currentStage > currentQuestion.replies.length)
    {
        // lock & unlock questions
        unlockedQuestionsDict[currentQuestion.locks] = false;
        for (const newQ of currentQuestion.unlocks)
            unlockedQuestionsDict[newQ] = true;
        // display questions
        PopulateTextbox();
    }
}

let creditsDiv;
function CheckForSpecialCases()
{
    if (currentQuestion.id == "Q0" && currentStage == 0)
    {
        setTimeout(() => { PlaySound("біп.wav") }, 0);
        setTimeout(() => { PlaySound("біп.wav") }, 750);
        setTimeout(() => { PlaySound("біп.wav") }, 1500);
        setTimeout(() => { PlaySound("адд.wav") }, 2000);
        return;
    }
    if (currentQuestion.id == "Q0" && currentStage == 1)
    {
        if (pigMode)
            sprait.style.backgroundImage = 'url("файли/зображення/фауст_свин.png")';
        else
            sprait.style.backgroundImage = 'url("файли/зображення/фауст_артипів.png")';
        return;
    }
    if (currentQuestion.id == "Q8" && currentStage == 1)
    {
        textBox.remove();    
        TransformSprite(sprait, -3000, 0, 3, 12000);
        TransformSprite(brama, -300, -200, 3, 9000);
        setTimeout(() => { PlaySound("валет_а_чому_не_швейцар.mp3") }, 4500);
        setTimeout(() => { TransformSprite(brama, -250, 0, 10, 50); }, 10560);
        setTimeout(() =>
        {
            wind.Stop();
            document.getElementById("creditsDiv").style.visibility = 'visible';
            TransformSprite(document.getElementById("creditsDiv"), 0, -3000, 1, 40000, false);

        }, 10580);
        setTimeout(() =>
        {
            if (pigMode)
                alert("Ви знайшли всіх свиней!");
            else
                alert(`Ви знайшли ${GetFoundPigs()} з ${GetTotalPigs()} свиней!`);
        }, 55000);
        return;
    }
}

function TransformSprite(div, x, y, scale, duration=1000, isEase=true)
{
    if (isEase)
        div.style.transition = `transform ${duration}ms ease`;
    else
        div.style.transition = `transform ${duration}ms ease-out`;
    div.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

function FadeIn(div, duration=1000)
{
    div.style.transition = `transform ${duration}ms ease`;
    div.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}
