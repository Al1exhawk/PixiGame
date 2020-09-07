import {
    Application,
    Container,
    Loader,
    Rectangle,
    spine,
    Sprite,
    Text,
    TextStyle,
} from 'pixi.js';

const App = Application;
const PIXILoader = Loader.shared;
const Spine = spine.Spine;
const PIXISprite = Sprite;

const charURL = 'assets/char_spine_v5/red.json';
const forestURL = 'assets/magic_forest_bg.jpg';

const bonfireURL = 'assets/magic_forest_bonfire.png';
const bonfireSmallURL = 'assets/magic_forest_bonfire_small.png';

const bowURL = 'assets/magic_forest_bow.png';
const bowSmallURL = 'assets/magic_forest_bow_small.png';

const leafURL = 'assets/magic_forest_leaf.png';
const leafSmallURL = 'assets/magic_forest_leaf_small.png';

const tentURL = 'assets/magic_forest_tent.png';
const tentSmallURL = 'assets/magic_forest_tent_small.png';

const ropeURL = 'assets/magic_forest_rope.png';
const ropeSmallURL = 'assets/magic_forest_rope_small.png';

const coinURL = 'assets/magic_forest_coin_icon_big.png';
const coinSmallURL = 'assets/magic_forest_coin_icon_small.png';

const cardFrameURL = 'assets/magic_forest_frame.png';
const scratchFrameURL = 'assets/magic_forest_scratch_frame.png';

const descriptionFrameURL = 'assets/magic_forest_frame_for_text.png';

const bonusFrameURL = 'assets/magic_forest_winner_frame.png';
const scratchBonusFrameURL = 'assets/magic_forest_scratch_frame_big.png';

const shadowURL = 'assets/magic_forest_shadow_40_percent.png';

const winMaxURL = 'assets/magic_forest_win_up_to_100.png';

const resultFrameURL = 'assets/magic_forest_frame1.png';

const startFrameURL = 'assets/magic_forest_frame2.png';
const startButtonURL = 'assets/magic_forest_button.png';

const questionMarkURL = 'assets/magic_forest_question_icon.png';

export {
    App,
    bonfireURL,
    bonfireSmallURL,
    bonusFrameURL,
    bowURL,
    bowSmallURL,
    descriptionFrameURL,
    cardFrameURL,
    charURL,
    coinURL,
    coinSmallURL,
    Container,
    forestURL,
    leafURL,
    leafSmallURL,
    PIXILoader,
    PIXISprite,
    resultFrameURL,
    Rectangle,
    ropeURL,
    ropeSmallURL,
    scratchBonusFrameURL,
    scratchFrameURL,
    shadowURL,
    Spine,
    tentURL,
    tentSmallURL,
    Text,
    TextStyle,
    winMaxURL,
    startFrameURL,
    startButtonURL,
    questionMarkURL,
};
