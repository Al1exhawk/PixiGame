import { Spine } from './aliases';

export class MySpine extends Spine {
    constructor(spineData: PIXI.spine.core.SkeletonData) {
        super(spineData);
        console.log(this.state.data.skeletonData.animations);
    }

    positioning = () => {
        this.position.set(320, 620);
        this.idle();
    };

    idle = () => {
        if (this.state.hasAnimation('red_idle_loop')) {
            this.state.setAnimation(0, 'red_idle_loop', true);
        }
    };

    addIdle = () => {
        if (this.state.hasAnimation('red_idle_loop')) {
            this.state.addAnimation(0, 'red_idle_loop', true, 0);
        }
    };

    disappointed = () => {
        if (this.state.hasAnimation('red_disappointed_loop')) {
            this.state.setAnimation(0, 'red_disappointed_loop', false);
            this.addIdle();
        }
    };

    happy = () => {
        if (this.state.hasAnimation('red_happy_card_loop')) {
            this.state.setAnimation(0, 'red_happy_card_loop', false);
            this.addIdle();
        }
    };

    worried = () => {
        if (this.state.hasAnimation('red_worry_loop')) {
            this.state.setAnimation(0, 'red_worry_loop', false);
            this.addIdle();
        }
    };

    loading = () => {
        if (this.state.hasAnimation('red_loading_screen_animation_loop')) {
            this.state.setAnimation(
                0,
                'red_loading_screen_animation_loop',
                true,
            );
        }
    };
}
