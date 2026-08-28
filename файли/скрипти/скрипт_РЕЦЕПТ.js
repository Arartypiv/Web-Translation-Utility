
const greetings = ["Привіт всім моїм майбутнім шефкухарям!",
                   "Добрий день!",
                   "Добрий вечір!",
                   "Вітаю всіх!"];


const intros = ["Сьогоднішній рецепт я успадкувала від своєї бабусі, а вона - від своєї прабабусі. {{dish}} - це страва, яку не кожна людина здатна приготувати, але не бійтеся! Я поділюся з вами своїм фамільним рецептом!",
                "{{dish}} - це унікальна страва, рецепт якої передається в нашій родині з покоління в покоління!",
                "Сьогодні я розкажу вам, як я готую таке блюдо як {{dish}}. Якщо ви неухильно дотримуватиметесь мого рецепта, то знайте: через декілька годин ви пальчики оближете!",
                "Коли я приготувала своєму чоловікові {{dish}} за цим рецептом, то він в той же день прополов город, полагодив гардину в кімнаті малого і відлизав мені пизду! Хочете так само? Тоді уважно слухайте..."];

const ingredient_list = ["Перелік інгредієнтів:",
                         "Нам знадобиться:",
                         "Список інгредієнтів:"];

const first_steps = ["Помийте та наріжте {{ingr1}} дрібними шматочками. Залийте окропом.",
                     "У великій каструлі закип’ятіть воду, додайте {{ingr1}} та варіть протягом {{timeSmall}} на середньому вогні.",
                     "Тонко наріжте {{ingr1}} та киньте до каструлі. Дайте настоятися у власному соку протягом {{timeLarge}}.",
                     "Подрібніть {{ingr1}}, закиньте до розігрітої пательні та смажте до золотистого кольору."];

const second_steps = ["Додайте {{ingr2}} і перемішуйте протягом {{timeSmall}}.",
                      "Додайте {{ingr2}} та приправте перцем.",
                      "Ретельно промийте {{ingr2}} та промокніть паперовими рушниками.",
                      "Дістаньте з банки {{ingr2}}, подрібніть до бажаного розміру та додайте до тари."];

const third_steps = ["Порвіть на маленькі шматочки {{ingr3}} і вкиньте до тари.",
                     "Натріть {{ingr3}} на великій терці та повільно висипте до решти страви.",
                     "Маленькими кубиками наріжте {{ingr3}} і додайте до решти страви. Обережно перемішайте інгредієнти.",
                     "Наріжте {{ingr3}} соломкою. Повільно перемішуючи, висипте до решти блюда."];

const fourth_steps = ["Дістаньте з холодильника коробку {{ingrLiq}}, відміряйте {{liqVol}} та додайте до тари.",
                      "Розігрійте {{liqVol}} {{ingrLiq}} у мікрохвильовці та додайте до страви, повільно помішуючи, доки не загусне.",
                      "Процідіть {{liqVol}} {{ingrLiq}}. Все, що залишилося у ситі додайте до тари, а решту рідини вилийте в раковину.",
                      "Влийте {{liqVol}} {{ingrLiq}} до решти інгредієнтів та почекайте {{timeSmall}}."];

const fifth_steps = ["Приправте перцем.",
                     "Додайте сіль за смаком.",
                     "Додайте чебрець.",
                     "Прикрасьте кінзою чи іншою зеленню."];

const endings = ["Подавайте страву теплою. Насолоджуйтесь!",
                 "Подавайте страву остиглою.",
                 "Вуаля! Страва готова!",
                 "Ось і все! Насолоджуйтесь!"]

const dish_names = ["{{ingr1Name}} а-ля гурме", "Ригато", "Капрічоза", "Маринований фурункул"];
const reg_ingr_list = [ ["Капуста", "капусту", "г"],
                        ["Помідори", "помідори", "шт."],
                        ["Гриби", "гриби", "г"],
                        ["Курка", "курку", "г"],
                        ["Цибуля", "цибулю", "шт."],
                        ["Гречка", "гречку", "г"],
                        ["Яйця", "яйця", "шт."],
                        ["Фарш", "фарш", "г"],
                        ["Сир", "сир", "г"],
                        ["Картопля", "картоплю", "г"],
                        ["Болгарський перець", "болгарський перець", "шт."],
                        ["Яблука", "яблука", "шт."],
                        ["Родзинки", "родзинки", "г"],
                        ["Макарони", "макарони", "г"],
                        ["Червона риба (наприклад лосось)", "рибу", "г"],
                        ["Фундук", "фундук", "г"],
                        ["Водорості норі", "водорості", "г"],
                        ["Манго", "манго", "шт."],
                        ["Полуниця", "полуницю", "шт."],
                        ["Кабачки", "кабачки", "шт."]

                    ];
const liq_ingr_list = [["Молоко", "молока"],
                        ["Курячий бульйон", "курячого бульйону"],
                        ["Розсіл", "розсолу"],
                        ["Вершки", "вершків"],
                        ["Коньяк", "коньяку"],
                        ["Соняшникова олія", "олії"],
                        ["Оливкова олія", "олії"],
                        ["Оцет", "оцету"],
                        ["Соєвий соус", "соєвого соусу"],
                        ["Апельсиновий сік", "соку"]
                    ];

function GetTimeSmall()
{
    return GetRandom(2, 5) + "хв";
}
function GetTimeLarge()
{
    return parseInt(GetRandom(20, 50) / 5) * 5 + "хв";
}
function GetIngrAmount(units="мл")
{
    if (units=="мл")
        return parseInt(GetRandom(200, 500) / 10) * 10 + units;
    else if (units=="г")
        return parseInt(GetRandom(100, 750) / 10) * 10 + units;
    else if (units=="шт.")
        return GetRandom(2, 5) + units;
}

function GetRecipe()
{
    /* Текст */
    let greeting    = greetings[Math.floor(Math.random()*greetings.length)];
    let intro       = intros[Math.floor(Math.random()*intros.length)];
    let ingr_list   = ingredient_list[Math.floor(Math.random()*ingredient_list.length)];
    let first_step  = first_steps[Math.floor(Math.random()*first_steps.length)];
    let second_step = second_steps[Math.floor(Math.random()*second_steps.length)];
    let third_step  = third_steps[Math.floor(Math.random()*third_steps.length)];
    let fourth_step = fourth_steps[Math.floor(Math.random()*fourth_steps.length)];
    let fifth_step  = fifth_steps[Math.floor(Math.random()*fifth_steps.length)];
    let ending      = endings[Math.floor(Math.random()*endings.length)];

    /* Назва страви */
    let dish_name = dish_names[Math.floor(Math.random()*dish_names.length)];
    
    /* Сухі інгред. */
    let index1 = Math.floor(Math.random()*reg_ingr_list.length);
    let index2 = index1;
    let index3 = index1;
    while (index2 == index1)
        index2 = Math.floor(Math.random()*reg_ingr_list.length);
    while (index3 == index1 || index3 == index2)
        index3 = Math.floor(Math.random()*reg_ingr_list.length);

    let ingredient_1_name   = reg_ingr_list[index1][0];
    let ingredient_1_intext = reg_ingr_list[index1][1];
    let ingredient_1_amount = GetIngrAmount(reg_ingr_list[index1][2]);
    
    let ingredient_2_name   = reg_ingr_list[index2][0];
    let ingredient_2_intext = reg_ingr_list[index2][1];
    let ingredient_2_amount = GetIngrAmount(reg_ingr_list[index2][2]);

    let ingredient_3_name   = reg_ingr_list[index3][0];
    let ingredient_3_intext = reg_ingr_list[index3][1];
    let ingredient_3_amount = GetIngrAmount(reg_ingr_list[index3][2]);
    
    /* Рідкий інгред. */
    let index4 = Math.floor(Math.random()*liq_ingr_list.length);

    let ingredient_4_name   = liq_ingr_list[index4][0];
    let ingredient_4_intext = liq_ingr_list[index4][1];
    let ingredient_4_amount = GetIngrAmount();

    /* string */
    let string = [];
    
    string.push(greeting);
    string.push("<br>");

    string.push(intro);
    string.push("<br>");

    string.push(ingr_list);

    string.push("- " + ingredient_1_name + " " + ingredient_1_amount);
    string.push("- " + ingredient_2_name + " " + ingredient_2_amount);
    string.push("- " + ingredient_3_name + " " + ingredient_3_amount);
    string.push("- " + ingredient_4_name + " " + ingredient_4_amount);
    string.push("<br>");

    string.push("Крок №1");
    string.push(first_step);
    string.push("<br>");

    string.push("Крок №2");
    string.push(second_step);
    string.push("<br>");

    string.push("Крок №3");
    string.push(third_step);
    string.push("<br>");

    string.push("Крок №4");
    string.push(fourth_step);
    string.push("<br>");

    string.push("Крок №5");
    string.push(fifth_step);
    string.push("<br>");

    string.push(ending);

    let fin_string = string.join("<br>");

    fin_string = fin_string.replaceAll("{{dish}}", dish_name);
    fin_string = fin_string.replaceAll("{{ingr1}}", ingredient_1_intext);
    fin_string = fin_string.replaceAll("{{ingr2}}", ingredient_2_intext);
    fin_string = fin_string.replaceAll("{{ingr3}}", ingredient_3_intext);
    fin_string = fin_string.replaceAll("{{timeSmall}}", GetTimeSmall());
    fin_string = fin_string.replaceAll("{{timeLarge}}", GetTimeLarge());
    fin_string = fin_string.replaceAll("{{ingrLiq}}", ingredient_4_intext);
    fin_string = fin_string.replaceAll("{{liqVol}}", ingredient_4_amount);
    fin_string = fin_string.replaceAll("{{ingr1Name}}", ingredient_1_name);

    return fin_string;
}

function GenerateRecipe()
{
    let recipe = GetRecipe();
    let textbox = document.getElementById("recipeText");
    textbox.innerHTML = recipe;
}