import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Container from './Container'
import ResizeHandle from './ResizeHandle'
import CONTAINER_FLOW from '../constants/container-flows'
import * as styles from '../utils/temp-styles'

class Panel extends Component {
  render() {
    this.containers = this.containers || []
    const { panelID, index, children, parent: { flow, panelCount }, width, height } = this.props
    const style = { width, height, ...styles.panel[flow] }
    let containerIndex = 0
    return (
      <section style={style}>
        { React.Children.map(children, (childComponent, childIndex) => {
          let props = { ...childComponent.props }
          if (childComponent.type === Container) {
            props.parentPanelID = panelID
            props.ref = container => { if (container) this.containers.push(container) }
            props.flow = props.flow || CONTAINER_FLOW.HORIZONTAL
            props.containerID = this.containers.length > containerIndex
              ? this.containers[containerIndex].containerID : undefined
            ++containerIndex
          }
          const contents = typeof childComponent === 'object'
            ? <childComponent.type { ...props } />
            : childComponent
          let panel = (<div style={styles.tableCell}>
              { contents }
            </div>)
          switch (flow) {
            case CONTAINER_FLOW.HORIZONTAL: // columns
              panel = (
                <div style={styles.table}>
                  { panel }
                  <ResizeHandle flow={flow} index={index} panelCount={panelCount} />
                </div>
              )
              break
            case CONTAINER_FLOW.VERTICAL: // rows
              panel = (
                <div style={styles.tableCell}>
                  <div style={styles.table}>
                    <div style={styles.tableRow}>
                      { panel }
                    </div>
                    <ResizeHandle flow={flow} index={index} panelCount={panelCount} />
                  </div>
                </div>
              )
              break
          }
          return panel
        })}
      </section>
    )
  }
}

const mapStateToProps = ({ workspacr: { panels, containers }}, { panelID, parent: { flow }}) => {
  if (!panels) return {}
  const width = flow === CONTAINER_FLOW.HORIZONTAL ? panels[panelID].clientWidth + 'px' : undefined
  const height = flow === CONTAINER_FLOW.VERTICAL ? panels[panelID].clientHeight + 'px' : undefined
  return {
    width,
    height,
  }
}

export default connect(mapStateToProps, null, null, { withRef: true })(Panel)