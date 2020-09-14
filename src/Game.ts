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

        this.cardsOpened = 0;
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
        this.dragging = false;

        document.body.appendChild(this.app.view);
    }

    cardsPos: Array<ICardPos>;
    cardsOpened: number;
    app: PIXI.Application;
    coins: number;
    char: MySpine | any;
    width: number;
    height: number;
    winnerCard: string;
    cardContainer: PIXI.Container | null;
    dragging: boolean;

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
            leafSmallURL,
            tentSmallURL,
            ropeSmallURL,
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
        this.generateNewGame(true);
        this.shadow(true);
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

    generateNewGame = (isFirstLoad = false) => {
        this.cardsOpened = 0;
        const bonusFrame = new MySprite(
            PIXILoader.resources[bonusFrameURL].texture,
            this.width - 280,
            450,
        );

        const openAnimation = (value: string) => {
            if (this.winnerCard === value) {
                this.char.happy();
            } else {
                this.char.disappointed();
            }

            console.log(this.cardsOpened);
            if (++this.cardsOpened === 7) {
                this.shadow();
            }
        };

        const worriedAnimation = () => {
            this.char.worried();
        };

        const scratchFrameBig = new MySprite(
            PIXILoader.resources[scratchBonusFrameURL].texture,
        );

        if (isFirstLoad) {
            scratchFrameBig.position.x -= 20;
            scratchFrameBig.position.y += 120;
            bonusFrame.addChild(scratchFrameBig);
        } else {
            // const bonusCard = new Card(
            //     this.getByRegexp() as any,
            //     scratchFrameBig,
            //     brush,
            // );
            // bonusCard.position.x += -20;
            // bonusCard.position.y += 120;
            // bonusFrame.addChild(bonusCard);
        }
        const brush = new PIXI.Graphics();
        brush.beginFill(0xffffff);
        brush.drawCircle(0, 0, 150);
        brush.endFill();

        const container = new Container();
        container.addChild(bonusFrame);

        // const renderTexture = PIXI.RenderTexture.create({
        //     width: this.app.screen.width,
        //     height: this.app.screen.height,
        // });

        // CARDS SCRATCHING

        this.cardsPos.forEach(({ x, y }) => {
            if (isFirstLoad) {
                const scratchFrame = new MySprite(
                    PIXILoader.resources[scratchFrameURL].texture,
                );
                scratchFrame.position.set(x, y);
                container.addChild(scratchFrame);
            } else {
                const cardFrame = new MySprite( //imageToReveal
                    PIXILoader.resources[cardFrameURL].texture,
                );
                cardFrame.position.set(x, y);

                const scratchFrame = new MySprite(
                    PIXILoader.resources[scratchFrameURL].texture,
                );

                cardFrame.addChild(scratchFrame);

                scratchFrame.width = cardFrame.width;
                scratchFrame.height = cardFrame.height;

                const renderTexture = PIXI.RenderTexture.create({
                    width: cardFrame.width,
                    height: cardFrame.height,
                });

                const renderTextureSprite = new MySprite(renderTexture);
                const randomTexture = this.getRandom();
                const randomCard = new Card(randomTexture);

                cardFrame.addChild(randomCard);
                randomCard.width = cardFrame.width;
                randomCard.height = cardFrame.height;

                cardFrame.addChild(renderTextureSprite);
                randomCard.mask = renderTextureSprite;

                cardFrame.interactive = true;
                cardFrame.buttonMode = true;

                const pointerMove = (event: PIXI.InteractionEvent) => {
                    if (this.dragging) {
                        brush.position.copyFrom(event.data.global);
                        this.app.renderer.render(
                            brush,
                            renderTexture,
                            false,
                            undefined,
                            false,
                        );
                    }
                };

                const pointerDown = (event: PIXI.InteractionEvent) => {
                    this.dragging = true;
                    pointerMove(event);
                };

                const pointerUp = (_event: PIXI.InteractionEvent) => {
                    this.dragging = false;
                };

                cardFrame.on('pointerup', pointerUp);
                cardFrame.on('pointermove', pointerMove);
                cardFrame.on('pointerdown', pointerDown);

                container.addChild(cardFrame);
            }
        });

        if (this.cardContainer) this.app.stage.removeChild(this.cardContainer);
        this.cardContainer = container;
        this.app.stage.addChild(container);
        this.app.stage.interactive = false;
    };

    shadow = (isFirstLoad = false) => {
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

        if (!isFirstLoad) {
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

            shadow.addChild(resultFrame);
        }

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

            const winCard = new MySprite(this.getRandomSmall());

            this.winnerCard = this.getCardName(winCard);

            const descriptionText = new Text(
                'MATCH THE WINNER          AND WIN A PRIZE',
                style,
            );

            descriptionFrame.position.set(
                this.width / 2,
                this.height / 2 + 137,
            );

            winCard.position.x += 25;

            descriptionText.position.x -= 460;
            descriptionText.position.y -= 30;

            descriptionFrame.addChild(descriptionText);
            descriptionFrame.addChild(winCard);

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

    getCardName = (s: MySprite) => {
        const cardName = s.texture.textureCacheIds[0].match(
            /(leaf|rope|bow|bonfire|tent)/,
        )?.[0];

        return cardName ? cardName : 'bow';
    };
}
