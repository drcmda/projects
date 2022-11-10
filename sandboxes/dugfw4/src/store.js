import { proxy, useSnapshot } from 'valtio'

const state = proxy({ hovered: false })

export { state, useSnapshot }
