class Flip {
  nodes = new Map()
  duration = 500
  constructor(elements, duration) {
    this.duration = duration * 1000
    for (const node of elements) {
      this.first(node)
    }
  }
  first(node) {
    let { x, y } = node.getBoundingClientRect()
    this.nodes.set(node, {
      first: { x, y }
    })
  }
  last(node) {
    let { x, y } = node.getBoundingClientRect()
    let status = this.nodes.get(node)
    status['last'] = { x, y }
    this.nodes.set(node, status)
  }
  invert(nodes) {
    for (let [node, bcr] of nodes) {
      let x = bcr.first.x - bcr.last.x
      let y = bcr.first.y - bcr.last.y
      if (!(x === 0 && y === 0)) {
        node.animate([{ transform: `translate(${x}px, ${y}px)` }, { transform: 'none' }], {
          duration: this.duration,
          fill: 'both'
        })
      }
    }
  }
  play() {
    for (let [key] of this.nodes) {
      this.last(key)
    }
    this.invert(this.nodes)
  }
}

export default Flip
