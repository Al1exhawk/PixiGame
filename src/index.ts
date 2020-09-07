import 'pixi-spine';

import {
    App,
    bonfireSmallURL,
    bonfireURL,
    bonusFrameURL,
    bowURL,
    Container,
    descriptionFrameURL,
    cardFrameURL,
    charURL,
    forestURL,
    PIXILoader as Loader,
    PIXISprite as Sprite,
    resultFrameURL,
    Rectangle,
    scratchFrameURL,
    Spine,
    Text,
    TextStyle,
    shadowURL,
    winMaxURL,
    coinURL,
    coinSmallURL,
    startFrameURL,
    startButtonURL,
    questionMarkURL,
} from './aliases';

const app = new App({
    width: 1097,
    height: 1920,
});

document.body.appendChild(app.view);

Loader.add([
    { url: forestURL },
    { url: bonfireSmallURL },
    { url: bonfireURL },
    { url: bowURL },
    { url: bonusFrameURL },
    { url: descriptionFrameURL },
    { url: cardFrameURL },
    { url: charURL },
    { url: scratchFrameURL },
    { url: shadowURL },
    { url: winMaxURL },
    { url: resultFrameURL },
    { url: coinURL },
    { url: coinSmallURL },
    { url: startFrameURL },
    { url: startButtonURL },
    { url: questionMarkURL },
]).load((_loader, resources: Record<string, any>) => {
    const w = app.screen.width;
    const h = app.screen.height;
    let rectangle = new Rectangle(155, 0, w - 2, h);

    const background = resources[forestURL].texture;
    const descriptionFrame = new Sprite(resources[descriptionFrameURL].texture);
    const bow = new Sprite(resources[bowURL].texture);
    const char = new Spine(resources[charURL].spineData);

    // RESULT FRAME AND SHADOW
    const resultFrame = new Sprite(resources[resultFrameURL].texture);
    resultFrame.anchor.set(0.5);
    resultFrame.position.set(w / 2, 400);
    resultFrame.height += 50;

    const resultStyle = new TextStyle({
        fontFamily: 'DR',
        fontSize: 116,
        fill: 'red',
    });

    const resultText = new Text('YOU WiN', resultStyle);
    const rText = new Text('25', { ...resultStyle, fill: 'black' });
    resultText.position.y -= 55;
    rText.position.y += 55;
    resultText.anchor.set(0.5);
    rText.anchor.set(0.5);
    const coin = new Sprite(resources[coinURL].texture);
    coin.position.y += 65;
    coin.position.x += 125;
    coin.anchor.set(0.5);
    resultFrame.addChild(resultText);
    resultFrame.addChild(rText);
    resultFrame.addChild(coin);

    const startFrame = new Sprite(resources[startFrameURL].texture);
    startFrame.anchor.set(0.5);
    startFrame.position.set(w / 2 + 15, h + 320);

    const startTextStyle = new TextStyle({
        fontFamily: 'DR',
        fontSize: 72,
        fill: 'white',
        align: 'center',
    });

    const buttonText = new Text('Play for 60', startTextStyle);
    const hintText = new Text('How to play', {
        ...startTextStyle,
        fill: 'orange',
    });
    hintText.anchor.set(0.5);
    buttonText.anchor.set(0.5);
    buttonText.position.y -= 25;

    const startButton = new Sprite(resources[startButtonURL].texture);
    const questionMark = new Sprite(resources[questionMarkURL].texture);
    const coin1 = new Sprite(resources[coinSmallURL].texture);
    startButton.anchor.set(0.5);
    questionMark.anchor.set(0.5);
    coin1.anchor.set(0.5);
    coin1.position.x += 210;
    coin1.position.y -= 20;

    startButton.interactive = true;

    startButton.on('click', () => {
        console.log(123);
    });

    startButton.position.y += 100;
    startButton.height += 50;
    startButton.addChild(buttonText);
    startButton.addChild(coin1);

    hintText.position.y -= 105;
    questionMark.position.x -= 220;

    startFrame.addChild(startButton);
    startFrame.addChild(hintText);
    hintText.addChild(questionMark);

    const shadow = new Sprite(resources[shadowURL].texture);
    shadow.addChild(resultFrame);
    shadow.addChild(startFrame);
    shadow.width = w;
    shadow.height = h;
    ///////////////////////////////////////////////////////////////////////////

    const winMax = new Sprite(resources[winMaxURL].texture);
    winMax.anchor.set(0.5);
    winMax.position.set(560, 100);

    char.position.set(320, 620);

    if (char.state.hasAnimation('red_idle_loop')) {
        char.state.setAnimation(0, 'red_idle_loop', true);
        console.log(char.state.data);
    }

    const bonfireSmall = new Sprite(resources[bonfireSmallURL].texture);

    const bonusFrame = new Sprite(resources[bonusFrameURL].texture);
    bow.anchor.set(0.5);
    bow.position.x += -20;
    bow.position.y += 120;
    bonusFrame.addChild(bow);

    bonusFrame.anchor.set(0.5);
    bonusFrame.position.set(w - 280, 450);

    background.frame = rectangle;

    const backgroundS = new Sprite(background);

    const cardCoords = [
        { x: w / 2, y: h / 2 + 405 },
        { x: w / 2 - 335, y: h / 2 + 405 },
        { x: w / 2 + 335, y: h / 2 + 405 },
        { x: w / 2, y: h / 2 + 405 + 335 },
        { x: w / 2 + 335, y: h / 2 + 405 + 335 },
        { x: w / 2 - 335, y: h / 2 + 405 + 335 },
    ];

    const container = new Container();

    cardCoords.forEach(({ x, y }) => {
        const cardFrame = new Sprite(resources[cardFrameURL].texture);
        const bonfire = new Sprite(resources[bonfireURL].texture);
        const scratchFrame = new Sprite(resources[scratchFrameURL].texture);

        cardFrame.position.set(x, y);
        cardFrame.anchor.set(0.5);

        bonfire.anchor.set(0.5);

        scratchFrame.anchor.set(0.5);

        container.addChild(cardFrame);
        cardFrame.addChild(bonfire);
        cardFrame.addChild(scratchFrame);
    });

    backgroundS.width = w;
    backgroundS.height = h;

    const style = new TextStyle({
        fontFamily: 'DR',
        fontSize: 52,
        align: 'center',
        fill: 'red',
    });

    const descriptionText = new Text(
        'MATCH THE WINNER          AND WIN A PRIZE',
        style,
    );

    bonfireSmall.anchor.set(0.5);
    bonfireSmall.position.x += 40;

    descriptionText.anchor.set(0.5, 0.5);
    descriptionFrame.anchor.set(0.5, 0.5);

    descriptionFrame.addChild(descriptionText);
    descriptionFrame.addChild(bonfireSmall);

    descriptionFrame.position.set(w / 2, h / 2 + 137);

    app.stage.addChild(backgroundS);
    app.stage.addChild(char);
    app.stage.addChild(descriptionFrame);
    app.stage.addChild(container);
    app.stage.addChild(bonusFrame);
    app.stage.addChild(winMax);
    app.stage.addChild(shadow);
});

// LOAD BACKGROUND
// const bg = () => {
//     Loader.add({ url: forestURL }).load(
//         (loader, resources: Record<string, any>) => {
//             let rectangle = new Rectangle(
//                 155,
//                 0,
//                 app.screen.width - 2,
//                 app.screen.height,
//             );
//             const background = resources[forestURL].texture;
//             t.frame = rectangle;

//             const char = new Sprite(t);
//             // char.position.set(app.renderer.width/2, app.renderer.height/2);

//
//             char.width = app.screen.width;
//             char.height = app.screen.height;

//             app.stage.addChild(char);
//         },
//     );
// };

// CHAR ANIMATION
// char.position.set(app.renderer.width/2, app.renderer.height/2);
// if (char.state.hasAnimation('red_loading_screen_animation_loop')) {
//     char.state.setAnimation(
//         0,
//         'red_loading_screen_animation_loop',
//         true,
//     );
// }
