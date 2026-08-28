function UpdateClock()
{
    const now = new Date();
    const clocks =
    {
        vienna: new Intl.DateTimeFormat('en-GB',
            {
            timeZone: 'Europe/Vienna',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }),
        vinnytsia: new Intl.DateTimeFormat('en-GB',
            {
            timeZone: 'Europe/Kiev',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }),
        yerevan: new Intl.DateTimeFormat('en-GB',
            {
            timeZone: 'Asia/Yerevan',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }),
        newyork: new Intl.DateTimeFormat('en-GB',
            {
            timeZone: 'America/New_York',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }),
        malmyzh: new Intl.DateTimeFormat('en-GB',
            {
            timeZone: 'Europe/Kirov',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })
    };

    try
    {
        document.getElementById("clockVinnytsia").textContent = "Вінниця: " + clocks.vinnytsia.format(now);
        document.getElementById("clockYerevan").textContent = "Єреван: " + clocks.yerevan.format(now);
        document.getElementById("clockMalmyzh").textContent = "Малмиж: " + clocks.malmyzh.format(now);
        document.getElementById("clockVienna").textContent = "Відень: " + clocks.vienna.format(now);
        document.getElementById("clockNewYork").textContent = "Нью Йорк: " + clocks.newyork.format(now);

        document.getElementById("clockVinnytsia1").textContent = "Вінниця: " + clocks.vinnytsia.format(now);
        document.getElementById("clockYerevan1").textContent = "Єреван: " + clocks.yerevan.format(now);
        document.getElementById("clockMalmyzh1").textContent = "Малмиж: " + clocks.malmyzh.format(now);
        document.getElementById("clockVienna1").textContent = "Відень: " + clocks.vienna.format(now);
        document.getElementById("clockNewYork1").textContent = "Нью Йорк: " + clocks.newyork.format(now);

        document.getElementById("clockVinnytsia2").textContent = "Вінниця: " + clocks.vinnytsia.format(now);
        document.getElementById("clockYerevan2").textContent = "Єреван: " + clocks.yerevan.format(now);
        document.getElementById("clockMalmyzh2").textContent = "Малмиж: " + clocks.malmyzh.format(now);
        document.getElementById("clockVienna2").textContent = "Відень: " + clocks.vienna.format(now);
        document.getElementById("clockNewYork2").textContent = "Нью Йорк: " + clocks.newyork.format(now);
    }
    catch (error)
    {
        // poh
    }
}
UpdateClock();
setInterval(UpdateClock, 1000);