import serialize from 'node-serialize'

// figma.showUI(__html__);

/*

Accessing document
	root document object:
		figma.root
	pages:
		figma.root.children[0]
	current page:
		figma.currentPage

Page node props:
	name
	children

api methods to create stuff
	https://www.figma.com/plugin-docs/api/properties/figma-createrectangle
	https://www.figma.com/plugin-docs/api/properties/figma-createellipse
	https://www.figma.com/plugin-docs/api/properties/figma-createtext
	https://www.figma.com/plugin-docs/api/properties/figma-createframe
	https://www.figma.com/plugin-docs/api/properties/figma-createpage


*/

// console.log('--> figma.root', figma.root)
// console.log('--> figma.currentPage', figma.currentPage)

// console.log('--> figma.getLocalTextStyles()', figma.getLocalTextStyles())
// console.log('--> figma.getLocalPaintStyles()', figma.getLocalPaintStyles())
// console.log('--> figma.getLocalEffectStyles()', figma.getLocalEffectStyles())
// console.log('--> figma.getLocalGridStyles()', figma.getLocalGridStyles())


// ----- WALK THE NODES AND SEARCH ---------

// const allNodes = []
// const textStyles = []

// function walkTree(node) {
// 	allNodes.push(node)
// 	if (node.children) node.children.forEach(walkTree)
// }

// walkTree(figma.currentPage)

// // console.log(allNodes)

// allNodes.forEach((node) => {
// 	if (node.type === 'TEXT') {
// 		console.log(node)
// 	}
// })

// -----------------


// figma.ui.onmessage = msg => {
// 	if (msg.type === 'create-rectangles') {
// 		const nodes: SceneNode[] = [];
// 		for (let i = 0; i < msg.count; i++) {
// 			const rect = figma.createRectangle();
// 			rect.x = i * 150;
// 			rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
// 			figma.currentPage.appendChild(rect);
// 			nodes.push(rect);
// 		}
// 		figma.currentPage.selection = nodes;
// 		figma.viewport.scrollAndZoomIntoView(nodes);
// 	}

// 	figma.closePlugin();
// };

// -----------------


let styleGuidePage = figma.root.findOne((n) => { return (n.type === 'PAGE' && n.name === "Style Guide") })
console.log('--> styleGuidePage', styleGuidePage)
console.log('--> typeof styleGuidePage', typeof styleGuidePage)

if (!styleGuidePage) {
	styleGuidePage = figma.createPage()
	styleGuidePage.name = 'Style Guide'
}

figma.currentPage = styleGuidePage // switch to the new page

let tFrame = styleGuidePage.findChild((n) => { return (n.type === 'FRAME' && n.name === "Template - Text Styles") })
console.log('--> tFrame', tFrame)
// console.log('--> tFrame JSON', serialize(tFrame))

// if (!tFrame) {
// 	const tFrame = figma.createFrame()
// 	tFrame.name = 'Text Styles'
// }

// figma.viewport.scrollAndZoomIntoView([tFrame])

// const textStyles = figma.getLocalTextStyles()

// let textBlocksNextY = 40
// textStyles.forEach(async (textStyle) => {
// 	console.log('---------------------')
// 	// console.log(textNode)
// 	console.log('name', textStyle.name)
// 	console.log('fontName.family', textStyle.fontName.family)
// 	console.log('fontName.style', textStyle.fontName.style)
// 	// console.log('fontSize', textStyle.fontSize)
// 	// console.log('letterSpacing.unit', textStyle.letterSpacing.unit)
// 	// console.log('letterSpacing.value', textStyle.letterSpacing.value)
// 	// console.log('lineHeight.unit', textStyle.lineHeight.unit)
// 	// console.log('lineHeight.value', textStyle.lineHeight.value)
// 	// console.log('paragraphIndent', textStyle.paragraphIndent)
// 	// console.log('paragraphSpacing', textStyle.paragraphSpacing)
// 	// console.log('textCase', textStyle.textCase)
// 	// console.log('textDecoration', textStyle.textDecoration)
	
// 	await figma.loadFontAsync({
// 		family: textStyle.fontName.family,
// 		style: textStyle.fontName.style
// 	})

// 	const newTextStylePreview = figma.createText()
// 	tFrame.appendChild(newTextStylePreview)
// 	newTextStylePreview.textStyleId = textStyle.id
// 	newTextStylePreview.characters = textStyle.name
// 	newTextStylePreview.x = 40
// 	newTextStylePreview.y = textBlocksNextY

// 	textBlocksNextY += newTextStylePreview.height + 100

// 	tFrame.resize(800, textBlocksNextY)
// })

// const paintStyles = figma.getLocalPaintStyles()

// paintStyles.forEach((paintStyle) => {
// 	console.log('---------------------')
// 	// console.log(paintNode)
// 	console.log('name', paintStyle.name)
// 	// paintNode.paints (Array - Can be multiple)
// 	console.log('type', paintStyle.paints[0].type) // SOLID
// 	console.log('blendMode', paintStyle.paints[0].blendMode) // NORMAL
// 	console.log('visible', paintStyle.paints[0].visible)
// 	console.log('r', paintStyle.paints[0].color.r)
// 	console.log('g', paintStyle.paints[0].color.g)
// 	console.log('b', paintStyle.paints[0].color.b)
// 	console.log('opacity', paintStyle.paints[0].opacity)
// 	// need to see the types for the gradient and other types like background image
// })

// figma.closePlugin()
