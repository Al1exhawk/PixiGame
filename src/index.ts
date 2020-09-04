import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
import 'pixi-spine';

const App = PIXI.Application;
const Sprite = PIXI.Sprite;
const Loader = PIXI.Loader.shared;
const Spine = PIXI.spine;

const canvas: any = document.getElementById('canvas');

const app = new App({
    view: canvas,
    // width: 400,
    // height: 400,
});

// document.body.appendChild(app.view);
Loader.add('bg', 'assets/char_spine_v5/red.json').load(
    (loader, resources: Record<string, any>) => {
        const forestBg = new Spine.Spine(resources.bg?.spineData);
        forestBg.x = app.renderer.width / 2;
        forestBg.y = app.renderer.height / 2;
        // forestBg.anchor.x = 0.5;
        // forestBg.anchor.y = 0.5;
        const f = forestBg.stateData;
        // console.log(f);
        console.log(forestBg.state);
        if (forestBg.state.hasAnimation('red_loading_screen_animation_loop')) {
            // run forever, little boy!
            forestBg.state.setAnimation(0, 'red_loading_screen_animation_loop', true);
            // dont run too fast
            // forestBg.state.timeScale = 0.1;
        }

        app.stage.addChild(forestBg);
    },
);
