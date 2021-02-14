
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


const pageMaxX = () => {
	let maxX = 0
	if (figma.currentPage.children) {
		figma.currentPage.children.forEach((node) => {
			if ((node.x + node.width) > maxX) {
				maxX = (node.x + node.width)
			}
		})
	}
	return maxX
}

const createTextStylesTemplateFrame = () => {
	const tFrame = figma.createFrame()
	tFrame.name = 'Template - Text Styles'
	// ...
	// TODO: Create whole template format via code here...
}

const setTextStylePropertyValue = (propsNode, name, value, isDefault) => {
	const propGroupNode = propsNode.findOne((n) => n.name === name)
	if (propGroupNode) {
		let shouldRemoveNode = true
		const propValueNode = propGroupNode.findChild((n) => n.name === 'Value')
		if (propValueNode && isDefault !== true) {
			propValueNode.characters = '' + value
			shouldRemoveNode = false
		}
		if (shouldRemoveNode) {
			propGroupNode.remove()
		}
	}
}

const generateTextStylesFrame = (templateTextStylesFrame) => {
	const textStylesRenderedFrameName = 'Text Styles'
	let textStylesRenderedFrameX = 0

	const existingTextStylesRenderedFrame = figma.currentPage.findOne((n) => { return (n.type === 'FRAME' && n.name === textStylesRenderedFrameName) })
	if (existingTextStylesRenderedFrame) { // replace existing canvas
		textStylesRenderedFrameX = existingTextStylesRenderedFrame.x
		existingTextStylesRenderedFrame.remove()
	}
	else { // new frame in the canvas
		textStylesRenderedFrameX = pageMaxX() + 100
	}

	const generatedTFrame = templateTextStylesFrame.clone()
	generatedTFrame.name = textStylesRenderedFrameName
	generatedTFrame.x = textStylesRenderedFrameX

	const textStyleBlock = generatedTFrame.findOne((n) => { return (n.type === 'GROUP' && n.name === 'Text Style') })
	// console.log('--> textStyleBlock', textStyleBlock)
	
	const textStyles = figma.getLocalTextStyles()
	// let textStyle
	const tsPromises = []
	for(let i = 0; i < textStyles.length; i += 1) {
		const textStyle = textStyles[i]
		// console.log('---------------------')
		// console.log(textStyle)
		
		tsPromises.push(new Promise((resolve, reject) => {
			figma.loadFontAsync({
				family: textStyle.fontName.family,
				style: textStyle.fontName.style
			})
				.then(() => {
					const newStyle = textStyleBlock.clone()

					const previewTextNode = newStyle.findChild((n) => n.name === 'Preview')
					previewTextNode.textStyleId = textStyle.id
					previewTextNode.characters = textStyle.name

					const propertiesGroup = newStyle.findChild((n) => n.name === 'Properties')
					if (propertiesGroup) {
						setTextStylePropertyValue(propertiesGroup, 'Font Family', textStyle.fontName.family)
						setTextStylePropertyValue(propertiesGroup, 'Font Style', textStyle.fontName.style)
						setTextStylePropertyValue(propertiesGroup, 'Font Size', textStyle.fontSize)
						setTextStylePropertyValue(propertiesGroup, 'Letter Spacing', textStyle.letterSpacing.value + ' ' + textStyle.letterSpacing.unit, textStyle.letterSpacing.value === 0)
						setTextStylePropertyValue(propertiesGroup, 'Line Height', textStyle.lineHeight.value + ' ' + textStyle.lineHeight.unit, typeof textStyle.lineHeight.value === 'undefined' || textStyle.lineHeight.value === 0)
						setTextStylePropertyValue(propertiesGroup, 'Paragraph Indent', textStyle.paragraphIndent, textStyle.paragraphIndent === 0)
						setTextStylePropertyValue(propertiesGroup, 'Paragraph Spacing', textStyle.paragraphSpacing, textStyle.paragraphSpacing === 0)
						setTextStylePropertyValue(propertiesGroup, 'Text Case', textStyle.textCase, textStyle.textCase === 'ORIGINAL')
						setTextStylePropertyValue(propertiesGroup, 'Text Decoration', textStyle.textDecoration, textStyle.textDecoration === 'NONE')
					}

					generatedTFrame.appendChild(newStyle)
					resolve()
				})
				.catch((e) => reject(e))
		}))
	}

	Promise.all(tsPromises)
		.then(() => {
			// console.log('All done!')
			textStyleBlock.remove()
			figma.viewport.scrollAndZoomIntoView([generatedTFrame])
			figma.closePlugin()
		})
}


let styleGuidePage = figma.root.findOne((n) => { return (n.type === 'PAGE' && n.name === 'Style Guide') })
// console.log('--> styleGuidePage', styleGuidePage)

if (!styleGuidePage) {
	styleGuidePage = figma.createPage()
	styleGuidePage.name = 'Style Guide'
}

figma.currentPage = styleGuidePage // switch to the new page

let templateTextStylesFrame = styleGuidePage.findChild((n) => { return (n.type === 'FRAME' && n.name === 'Template - Text Styles') })
// console.log('--> tFrame', tFrame)
if (!templateTextStylesFrame) createTextStylesTemplateFrame()

figma.loadFontAsync({ // load font for the labels we will be updating
	family: 'Helvetica',
	style: 'Regular'
})
	.then(() => {
		generateTextStylesFrame(templateTextStylesFrame)
	})

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
