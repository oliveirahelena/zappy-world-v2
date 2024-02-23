namespace SpriteKind {
    export const NPC = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile76`, function (sprite, location) {
    level = 0
    loadTileMap()
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    lastKeyPressed = "up"
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite, otherSprite) {
    if (!(win)) {
        if (otherSprite == drByte) {
            game.showLongText("Olá, amigo! Sou o Dr. Byte. Sei que causei uma confusão, mas precisamos resolver. Colete todos os packages e elimine todos os bugs atirando neles.", DialogLayout.Bottom)
        } else {
            game.showLongText("Olá, amigo! Sem querer o Dr. Byte fez uma confusão aqui e tirou a cor da cidade. Mas só ele sabe como resolver isso. Vá até o laboratório dele.", DialogLayout.Bottom)
        }
    } else {
        if (otherSprite == drByte) {
            game.showLongText("Obrigado por limpar a minha bagunça!", DialogLayout.Bottom)
        } else {
            game.showLongText("Parabéns amigo! Você salvou o dia!", DialogLayout.Bottom)
        }
    }
    pause(2000)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (lastKeyPressed == "right") {
        projectileVx = 50
        projectileVy = 0
    } else if (lastKeyPressed == "left") {
        projectileVx = -50
        projectileVy = 0
    } else if (lastKeyPressed == "up") {
        projectileVx = 0
        projectileVy = -50
    } else {
        projectileVx = 0
        projectileVy = 50
    }
    if (level == 0) {
        projectile = sprites.createProjectileFromSprite(assets.image`laser`, dede, projectileVx, projectileVy)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    lastKeyPressed = "left"
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    lastKeyPressed = "right"
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pause(2000)
})
function loadTileMap () {
    if (level == 0) {
        tiles.setCurrentTilemap(tilemap`level`)
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            value.setFlag(SpriteFlag.Ghost, false)
            value.setFlag(SpriteFlag.Invisible, false)
        }
        for (let value of sprites.allOfKind(SpriteKind.Food)) {
            value.setFlag(SpriteFlag.Ghost, false)
            value.setFlag(SpriteFlag.Invisible, false)
        }
        drByte.setFlag(SpriteFlag.Ghost, true)
        drByte.setFlag(SpriteFlag.Invisible, true)
        zappy.setFlag(SpriteFlag.Ghost, false)
        zappy.setFlag(SpriteFlag.Invisible, false)
        tiles.placeOnRandomTile(zappy, assets.tile`myTile65`)
        tiles.placeOnTile(dede, tiles.getTileLocation(12, 5))
    } else {
        tiles.setCurrentTilemap(tilemap`level0`)
        for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
            value.setFlag(SpriteFlag.Ghost, true)
            value.setFlag(SpriteFlag.Invisible, true)
        }
        for (let value of sprites.allOfKind(SpriteKind.Food)) {
            value.setFlag(SpriteFlag.Ghost, true)
            value.setFlag(SpriteFlag.Invisible, true)
        }
        drByte.setFlag(SpriteFlag.Ghost, false)
        drByte.setFlag(SpriteFlag.Invisible, false)
        zappy.setFlag(SpriteFlag.Ghost, true)
        zappy.setFlag(SpriteFlag.Invisible, true)
        tiles.placeOnRandomTile(drByte, assets.tile`myTile75`)
        tiles.placeOnTile(dede, tiles.getTileLocation(5, 2))
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile52`, function (sprite, location) {
    level = 1
    loadTileMap()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    lastKeyPressed = "down"
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    sprites.destroy(sprite, effects.fire, 500)
})
let bug2: Sprite = null
let bug1: Sprite = null
let _package: Sprite = null
let projectile: Sprite = null
let projectileVy = 0
let projectileVx = 0
let win = false
let lastKeyPressed = ""
let dede: Sprite = null
let zappy: Sprite = null
let drByte: Sprite = null
let level = 0
level = 0
let packagesQuantity = 10
let enemyQuantity = 10
drByte = sprites.create(assets.image`myImage5`, SpriteKind.NPC)
drByte.setPosition(32, 75)
zappy = sprites.create(assets.image`myImage`, SpriteKind.NPC)
loadTileMap()
dede = sprites.create(assets.image`myImage2`, SpriteKind.Player)
controller.moveSprite(dede, 100, 100)
scene.cameraFollowSprite(dede)
tiles.placeOnRandomTile(dede, assets.tile`myTile66`)
game.onUpdateInterval(5000, function () {
    if (packagesQuantity > 0 && level == 0) {
        _package = sprites.create(assets.image`myImage4`, SpriteKind.Food)
        tiles.placeOnRandomTile(_package, assets.tile`myTile2`)
        packagesQuantity += -1
    }
})
game.onUpdateInterval(5000, function () {
    if (enemyQuantity > 1 && level == 0) {
        bug1 = sprites.create(assets.image`goomba1`, SpriteKind.Enemy)
        bug1.vy = 30
        bug1.setBounceOnWall(true)
        tiles.placeOnRandomTile(bug1, assets.tile`myTile1`)
        tiles.placeOnTile(bug1, tiles.getTileLocation(4, 0))
        bug2 = sprites.create(assets.image`goomba1`, SpriteKind.Enemy)
        bug2.vx = 30
        bug2.setBounceOnWall(true)
        tiles.placeOnRandomTile(bug2, assets.tile`myTile3`)
        enemyQuantity += -2
    }
})
forever(function () {
    if (!(win)) {
        if (enemyQuantity == 0 && (packagesQuantity == 0 && (sprites.allOfKind(SpriteKind.Enemy).length == 0 && sprites.allOfKind(SpriteKind.Food).length == 0))) {
            win = true
            game.splash("Parabéns! Você salvou a cidade!")
        }
    }
})
