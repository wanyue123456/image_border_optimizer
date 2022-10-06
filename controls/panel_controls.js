class PanelControls extends GenControls {
    constructor(scene) {
        super(scene)
        this.imageChanges = []
    }

    delete(index) {
        this.panels.splice(index, 1)
        this.imageChanges.splice(index, 1)
    }

    getChanges(index) { 
        return this.imageChanges[index] || {
            points: [],
            texts: [],
            shapes: [],
        }
    }

    save(points, texts, shapes) {
        this.imageChanges[config.index.value] = {
            points: points,
            texts: texts,
            shapes: shapes,
        }
    }

    draw() {
        let self = this
        let canvas = self.canvas
        let context = self.context
        // log("image draw", self.images)
        let img = self.panels[config.index.value]
        if (img == null) {
            return
        }
        // 空白页面, 不加阴影
        if (img.dataset.type == 'default_blank') {
            canvas.width = config.canvasWidth.value
            canvas.height = config.canvasHeight.value
            context.drawImage(img, 0, 0)
            return
        }
        // get config
        let offset = config.offset.value
        let io = config.imageOffset.value
        // 
        canvas.width = config.canvasWidth.value + offset * 20
        canvas.height = config.canvasHeight.value + offset * 20

        this.drawShadow(img, io)

        context.drawImage(img, io, io)

        this.drawBorder(img, io)
    }

    drawShadow(img, io) {
        let shadowOffset = config.shadowOffset.value
        this.context.save()
        this.context.globalAlpha = config.shadowColorAlpha.value / 10
        this.context.shadowOffsetX = shadowOffset
        this.context.shadowOffsetY = shadowOffset
        this.context.shadowColor = config.shadowColor.value
        this.context.shadowBlur = config.shadowBlur.value
        this.context.fillRect(io, io, img.width, img.height)
        this.context.restore()
    }

    drawBorder(img, io) {
        this.context.save()
        this.context.lineWidth = config.borderLength.value
        this.context.strokeStyle = config.borderColor.value
        this.context.beginPath()
        this.context.moveTo(io, io)
        this.context.lineTo(io, io + img.height)
        this.context.lineTo(io + img.width, io + img.height)
        this.context.lineTo(io + img.width, io)
        this.context.lineTo(io, io)
        this.context.closePath()
        this.context.stroke()
        this.context.restore()
    }

    configAttribute() {
        return {
            "config.borderLength": config.borderLength, 
            "config.borderColor": config.borderColor,
            "config.shadowOffset": config.shadowOffset,
            "config.shadowColorAlpha": config.shadowColorAlpha,
            "config.shadowColor": config.shadowColor,
            "config.shadowBlur": config.shadowBlur,
            "config.imageOffset": config.imageOffset,
            "config.offset": config.offset,
        }
    }
}