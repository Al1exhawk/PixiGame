import {
    App,
    PIXILoader,
    charURL,
    forestURL,
    bonfireSmallURL,
    bonfireURL,
    bowURL,
    bonusFrameURL,
    descriptionFrameURL,
    cardFrameURL,
    scratchFrameURL,
    shadowURL,
    winMaxURL,
    resultFrameURL,
    coinURL,
    coinSmallURL,
    startFrameURL,
    startButtonURL,
    questionMarkURL,
    Container,
    tentURL,
    leafURL,
    ropeURL,
    bowSmallURL,
    tentSmallURL,
    leafSmallURL,
    ropeSmallURL,
    scratchBonusFrameURL,
    TextStyle,
    Text,
} from './aliases';
import { MySpine } from './MySpine';
import { Background, Card, MySprite } from './MySprite';

interface ICardPos {
    x: number;
    y: number;
}

export class Game {
    constructor() {
        this.app = new App({
            width: 1097,
            height: 1920,
        });

        this.width = this.app.screen.width;
        this.height = this.app.screen.height;
        this.cardContainer = null;
        this.cardsPos = [
            { x: this.width / 2, y: this.height / 2 + 405 },
            { x: this.width / 2 - 335, y: this.height / 2 + 405 },
            { x: this.width / 2 + 335, y: this.height / 2 + 405 },
            { x: this.width / 2, y: this.height / 2 + 405 + 335 },
            { x: this.width / 2 + 335, y: this.height / 2 + 405 + 335 },
            { x: this.width / 2 - 335, y: this.height / 2 + 405 + 335 },
        ];

        this.coins = 25; // `cause bonus field
        this.char = null;
        this.winnerCard = 'bow';

        document.body.appendChild(this.app.view);
    }
    cardsPos: Array<ICardPos>;
    app: PIXI.Application;
    coins: number;
    char: MySpine | any;
    width: number;
    height: number;
    winnerCard: string;
    cardContainer: PIXI.Container | null;

    load = () => {
        PIXILoader.add([
            charURL,
            forestURL,
            bonfireSmallURL,
            ropeURL,
            bonusFrameURL,
            descriptionFrameURL,
            cardFrameURL,
            scratchFrameURL,
            shadowURL,
            winMaxURL,
            resultFrameURL,
            coinURL,
            coinSmallURL,
            startFrameURL,
            startButtonURL,
            questionMarkURL,
            bonfireURL,
            bowURL,
            leafURL,
            tentURL,
            bowSmallURL,
            scratchBonusFrameURL,
        ]).load(this.loadingStep);
    };

    loadingStep = () => {
        this.char = new MySpine(PIXILoader.resources[charURL].spineData);
        this.char.position.set(
            this.app.renderer.width / 2,
            this.app.renderer.height / 2,
        );
        this.app.stage.addChild(this.char);
        this.char.loading();

        setTimeout(() => {
            this.positioning();
        }, 3000);
    };

    positioning = () => {
        const bg = new Background(
            PIXILoader.resources[forestURL].texture,
            this.width,
            this.height,
        );

        this.app.stage.removeChild(this.char);
        this.app.stage.sortableChildren = true;

        this.app.stage.addChild(bg);
        this.app.stage.addChild(this.char);
        this.char.positioning();

        const winMax = new MySprite(
            PIXILoader.resources[winMaxURL].texture,
            560,
            100,
        );

        this.app.stage.addChild(winMax);
        this.generateNewGame();

        // RESULT FRAME AND SHADOW
        // const resultFrame = new MySprite(
        //     PIXILoader.resources[resultFrameURL].texture,
        // );
        // resultFrame.anchor.set(0.5);
        // resultFrame.position.set(this.width / 2, 400);
        // resultFrame.height += 50;

        // const resultStyle = new TextStyle({
        //     fontFamily: 'DR',
        //     fontSize: 116,
        //     fill: 'red',
        // });

        // const resultText = new Text('YOU WiN', resultStyle);
        // const rText = new Text('25', { ...resultStyle, fill: 'black' });
        // resultText.position.y -= 55;
        // rText.position.y += 55;
        // resultText.anchor.set(0.5);
        // rText.anchor.set(0.5);
        // const coin = new MySprite(PIXILoader.resources[coinURL].texture);
        // coin.position.y += 65;
        // coin.position.x += 125;
        // coin.anchor.set(0.5);
        // resultFrame.addChild(resultText);
        // resultFrame.addChild(rText);
        // resultFrame.addChild(coin);

        const startFrame = new MySprite(
            PIXILoader.resources[startFrameURL].texture,
        );
        startFrame.anchor.set(0.5);
        startFrame.position.set(this.width / 2 + 15, this.height + 320);

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

        const startButton = new MySprite(
            PIXILoader.resources[startButtonURL].texture,
        );
        const questionMark = new MySprite(
            PIXILoader.resources[questionMarkURL].texture,
        );
        const coin1 = new MySprite(PIXILoader.resources[coinSmallURL].texture);
        startButton.anchor.set(0.5);
        questionMark.anchor.set(0.5);
        coin1.anchor.set(0.5);
        coin1.position.x += 210;
        coin1.position.y -= 20;

        startButton.interactive = true;
        startButton.buttonMode = true;

        startButton.position.y += 100;
        startButton.height += 50;
        startButton.addChild(buttonText);
        startButton.addChild(coin1);

        hintText.position.y -= 105;
        questionMark.position.x -= 220;

        startFrame.addChild(startButton);
        startFrame.addChild(hintText);
        hintText.addChild(questionMark);

        const shadow = new PIXI.Sprite(PIXILoader.resources[shadowURL].texture);
        // shadow.addChild(resultFrame);
        shadow.addChild(startFrame);
        shadow.width = this.width;
        shadow.height = this.height;
        shadow.zIndex = 10000;
        this.app.stage.addChild(shadow);
        this.app.stage.sortChildren();

        startButton.on('click', () => {
            this.app.stage.removeChild(shadow);
            this.generateNewGame();
        });
    };

    getByRegexp = () => {
        const cardOpt = [
            PIXILoader.resources[bonfireURL].texture,
            PIXILoader.resources[bowURL].texture,
            PIXILoader.resources[tentURL].texture,
            PIXILoader.resources[leafURL].texture,
            PIXILoader.resources[ropeURL].texture,
        ];
        const re = new RegExp(this.winnerCard);

        return cardOpt.find((el) => el.textureCacheIds[0].match(re));
    };

    getRandom = () => {
        const cardOpt = [
            PIXILoader.resources[bonfireURL].texture,
            PIXILoader.resources[bowURL].texture,
            PIXILoader.resources[tentURL].texture,
            PIXILoader.resources[leafURL].texture,
            PIXILoader.resources[ropeURL].texture,
        ];
        return cardOpt[Math.floor(Math.random() * cardOpt.length)];
    };

    generateNewGame = () => {
        const bonusFrame = new MySprite(
            PIXILoader.resources[bonusFrameURL].texture,
            this.width - 280,
            450,
        );

        const cardCallback = (value: string) => {
            if (this.winnerCard === value) {
                this.char.happy();
            } else {
                this.char.disappointed();
            }
        };

        const cardCallback2 = () => {
            this.char.worried();
        };

        const scratchFrameBig = new MySprite(
            PIXILoader.resources[scratchBonusFrameURL].texture,
        );
        const bonusCard = new Card(
            this.getByRegexp() as any,
            scratchFrameBig,
            cardCallback,
            cardCallback2,
        );
        bonusCard.position.x += -20;
        bonusCard.position.y += 120;
        bonusFrame.addChild(bonusCard);

        const container = new Container();
        container.addChild(bonusFrame);

        this.cardsPos.forEach(({ x, y }) => {
            const randomTexture = this.getRandom();

            const cardFrame = new MySprite(
                PIXILoader.resources[cardFrameURL].texture,
            );

            const scratchFrame = new MySprite(
                PIXILoader.resources[scratchFrameURL].texture,
            );

            const randomCard = new Card(
                randomTexture,
                scratchFrame,
                cardCallback,
                cardCallback2,
            );

            cardFrame.position.set(x, y);

            container.addChild(cardFrame);
            cardFrame.addChild(randomCard);
        });

        if (this.cardContainer) this.app.stage.removeChild(this.cardContainer);
        container.zIndex = 1;
        this.cardContainer = container;
        this.app.stage.addChild(container);
    };
    shadow = () => {
        // RESULT FRAME AND SHADOW
        const resultFrame = new MySprite(
            PIXILoader.resources[resultFrameURL].texture,
        );
        resultFrame.anchor.set(0.5);
        resultFrame.position.set(this.width / 2, 400);
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
        const coin = new MySprite(PIXILoader.resources[coinURL].texture);
        coin.position.y += 65;
        coin.position.x += 125;
        coin.anchor.set(0.5);
        resultFrame.addChild(resultText);
        resultFrame.addChild(rText);
        resultFrame.addChild(coin);

        const startFrame = new MySprite(
            PIXILoader.resources[startFrameURL].texture,
        );
        startFrame.anchor.set(0.5);
        startFrame.position.set(this.width / 2 + 15, this.height + 320);

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

        const startButton = new MySprite(
            PIXILoader.resources[startButtonURL].texture,
        );
        const questionMark = new MySprite(
            PIXILoader.resources[questionMarkURL].texture,
        );
        const coin1 = new MySprite(PIXILoader.resources[coinSmallURL].texture);
        startButton.anchor.set(0.5);
        questionMark.anchor.set(0.5);
        coin1.anchor.set(0.5);
        coin1.position.x += 210;
        coin1.position.y -= 20;

        startButton.interactive = true;
        startButton.buttonMode = true;

        startButton.position.y += 100;
        startButton.height += 50;
        startButton.addChild(buttonText);
        startButton.addChild(coin1);

        hintText.position.y -= 105;
        questionMark.position.x -= 220;

        startFrame.addChild(startButton);
        startFrame.addChild(hintText);
        hintText.addChild(questionMark);

        const shadow = new PIXI.Sprite(PIXILoader.resources[shadowURL].texture);
        // shadow.addChild(resultFrame);
        shadow.addChild(startFrame);
        shadow.width = this.width;
        shadow.height = this.height;
        shadow.zIndex = 10000;
        this.app.stage.addChild(shadow);
        this.app.stage.sortChildren();

        startButton.on('click', () => {
            this.app.stage.removeChild(shadow);
            const descriptionFrame = new MySprite(
                PIXILoader.resources[descriptionFrameURL].texture,
            );
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
            descriptionFrame.addChild(descriptionText);
            descriptionFrame.position.set(
                this.width / 2,
                this.height / 2 + 137,
            );

            this.app.stage.addChild(descriptionFrame);

            this.generateNewGame();
        });
    };

    getRandomSmall = () => {
        const cardOpt = [
            PIXILoader.resources[bonfireSmallURL].texture,
            PIXILoader.resources[bowSmallURL].texture,
            PIXILoader.resources[tentSmallURL].texture,
            PIXILoader.resources[leafSmallURL].texture,
            PIXILoader.resources[ropeSmallURL].texture,
        ];
        return cardOpt[Math.floor(Math.random() * cardOpt.length)];
    };
}
