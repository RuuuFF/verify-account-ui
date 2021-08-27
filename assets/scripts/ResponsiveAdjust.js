const Options = {
  minWidth: 420,
  maxWidth: 1365,
  measure: "px"
}

const CSSDeclarations = [
  {
    selector: "p",
    propAndValue: [
      { property: "font-size", min: 13.33, max: 16 },
    ]
  },
  {
    selector: "small",
    propAndValue: [
      { property: "font-size", min: 12, max: 13.333 },
    ]
  },

  {
    selector: ".container",
    propAndValue: [
      { property: "padding", min: 20, max: 30 },
    ]
  },

  {
    selector: ".code-container",
    propAndValue: [
      { property: "gap", min: 5, max: 10 },
      { property: "margin-top", min: 30, max: 40 },
      { property: "margin-bottom", min: 30, max: 40 },
    ]
  },

  {
    selector: ".code",
    propAndValue: [
      { property: "width", min: 40, max: 100 },
      { property: "height", min: 50, max: 120 },
      { property: "font-size", min: 42, max: 76 },
    ]
  },
]

const ResponsiveAdjust = {
  createStyleEl() {
    const styleEl = document.createElement('style')
    styleEl.setAttribute("id", "responsive-adjust")
    document.querySelector('head').appendChild(styleEl)
    styleEl.insertAdjacentHTML("beforebegin", "<!-- Style injected by ResponsiveAdjust (github.com/ruuuff/responsive-adjust) -->")
  },

  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value

    return value
  },

  callScaleWithParameters(min, max) {
    return ResponsiveAdjust.scale(Number(document.documentElement.clientWidth), Number(Options.minWidth), Number(Options.maxWidth), Number(min), Number(max))
  },

  formatSize(sizeToFormat) {
    return parseFloat(sizeToFormat.toFixed(3))
  },

  innerStyles() {
    const style = document.querySelector('head style#responsive-adjust')
    style.innerHTML = ""

    CSSDeclarations.forEach(({ selector, propAndValue }, index) => {
      style.insertAdjacentHTML("beforeend", `${selector} {`)

      propAndValue.forEach(({ property, min, max }) => {
        const size = ResponsiveAdjust.formatSize(ResponsiveAdjust.callScaleWithParameters(min, max))

        style.insertAdjacentHTML("beforeend", `  ${property}: ${size + Options.measure};`)
      })
      style.insertAdjacentHTML("beforeend", index !== CSSDeclarations.length - 1 ? `}
      ` : `}`)
    })
  },
}

ResponsiveAdjust.createStyleEl()
ResponsiveAdjust.innerStyles()
window.addEventListener('resize', ResponsiveAdjust.innerStyles)