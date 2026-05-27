// 地図上の座標定義
const mapLocations = {
    "entrance":    { top: '80%', left: '20%' },
    "garden_path": { top: '50%', left: '40%' },
    "city_view":   { top: '30%', left: '70%' },
    "sunset_road": { top: '10%', left: '85%' }
};

// Pannellumビューアーの初期化
const viewer = pannellum.viewer('panorama', {
    "default": {
        "firstScene": "entrance",
        "autoLoad": true,
        "sceneFadeDuration": 1000,
        "hfov": 100,      // 視野角を広げる（初期値100くらいがおすすめ）
        "minHfov": 50,    // ズームインの限界
        "maxHfov": 120,
        "orientationOnByDefault": false
    },
    "scenes": {
        "entrance": {
            "title": "銀河庭園 入口",
            "type": "equirectangular",
            "panorama": "image/sample.jpg",
            "hotSpots": [{ "pitch": -5, "yaw": 0, "type": "scene", "text": "進む", "sceneId": "garden_path" }]
        },
        "garden_path": {
            "title": "庭園の散策路",
            "type": "equirectangular",
            "panorama": "image/sample2.jpg",
            "hotSpots": [
                { "pitch": -5, "yaw": 180, "type": "scene", "text": "戻る", "sceneId": "entrance" },
                { "pitch": -5, "yaw": 0, "type": "scene", "text": "街へ", "sceneId": "city_view" }
            ]
        },
        "city_view": {
            "title": "街のパノラマ",
            "type": "equirectangular",
            "panorama": "image/sample3.webp",
            "hotSpots": [
                { "pitch": -10, "yaw": 180, "type": "scene", "text": "庭園へ", "sceneId": "garden_path" },
                { "pitch": -5, "yaw": 0, "type": "scene", "text": "夕暮れへ", "sceneId": "sunset_road" }
            ]
        },
        "sunset_road": {
            "title": "夕暮れの道",
            "type": "equirectangular",
            "panorama": "image/sample4.jpg",
            "hotSpots": [{ "pitch": -5, "yaw": 180, "type": "scene", "text": "街へ戻る", "sceneId": "city_view" }]
        }
    }
});

// 地図クリックでシーンを切り替える関数
function changeScene(id) {
    viewer.loadScene(id);
}

// シーン切り替え時に地図の赤丸を更新
viewer.on('load', function() {
    const sceneId = viewer.getScene();
    const pos = mapLocations[sceneId];
    if (pos) {
        const dot = document.getElementById('current-pos');
        dot.style.top = pos.top;
        dot.style.left = pos.left;
    }
});