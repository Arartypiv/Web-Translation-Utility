const TRANS_params = new URLSearchParams(window.location.search);
if (TRANS_params.get('transTransition') === '1')
    TransOut();

function CreateStripe(colour, marginLeft, marginTop)
{
    const div = document.createElement('div');
    div.className = 'slideGeneralDiv';
    document.body.appendChild(div);
    div.offsetWidth;
    div.style.left = `${marginLeft}vw`;
    div.style.top = `${marginTop}vh`;
    div.style.backgroundColor = colour;
    return div;
}

function SlideIn(div, expireAfter)
{
    div.className += ' slideInDiv';
    div.style.left = '0vw';
    setTimeout(() => { div.remove(); }, expireAfter);
}
function SlideOut(div, expireAfter)
{
    div.className += ' slideOutDiv';
    div.style.left = '100vw';
    setTimeout(() => { div.remove(); }, expireAfter);
}

function TransIn(delay=500)
{
    let stripe1 = CreateStripe("#5bcefa", -100, 0);
    let stripe2 = CreateStripe("#f5a9b8", -100, 20);
    let stripe3 = CreateStripe("#ffffff", -100, 40);
    let stripe4 = CreateStripe("#f5a9b8", -100, 60);
    let stripe5 = CreateStripe("#5bcefa", -100, 80);

    setTimeout(() => { SlideIn(stripe1, 900 + delay); }, 0);
    setTimeout(() => { SlideIn(stripe2, 800 + delay); }, 100);
    setTimeout(() => { SlideIn(stripe3, 700 + delay); }, 200);
    setTimeout(() => { SlideIn(stripe4, 600 + delay); }, 300);
    setTimeout(() => { SlideIn(stripe5, 500 + delay); }, 400);
} 
function TransOut(delay=500)
{
    let stripe1 = CreateStripe("#5bcefa", 0, 0);
    let stripe2 = CreateStripe("#f5a9b8", 0, 20);
    let stripe3 = CreateStripe("#ffffff", 0, 40);
    let stripe4 = CreateStripe("#f5a9b8", 0, 60);
    let stripe5 = CreateStripe("#5bcefa", 0, 80);

    setTimeout(() => { SlideOut(stripe1, 900); }, 0 + delay);
    setTimeout(() => { SlideOut(stripe2, 800); }, 100 + delay);
    setTimeout(() => { SlideOut(stripe3, 700); }, 200 + delay);
    setTimeout(() => { SlideOut(stripe4, 600); }, 300 + delay);
    setTimeout(() => { SlideOut(stripe5, 500); }, 400 + delay);
}