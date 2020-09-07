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
]).load((_loader, resources: Record<string, any>) => {
    const w = app.screen.width;
    const h = app.screen.height;
    let rectangle = new Rectangle(155, 0, w - 2, h);

    const background = resources[forestURL].texture;
    const descriptionFrame = new Sprite(resources[descriptionFrameURL].texture);
    const bow = new Sprite(resources[bowURL].texture);
    const char = new Spine(resources[charURL].spineData);

    const shadow = new Sprite(resources[shadowURL].texture);
    shadow.width = w;
    shadow.height = h;

    const winMax = new Sprite(resources[winMaxURL].texture);
    winMax.anchor.set(0.5);
    winMax.position.set(560, 100);

    char.position.set(320, 620);

    if (char.state.hasAnimation('red_idle_loop')) {
        char.state.setAnimation(0, 'red_idle_loop', true);
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
        fill: 'orange',
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
