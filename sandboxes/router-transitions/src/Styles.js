import { Link } from "wouter"
import "styled-components/macro"
import { a } from "@react-spring/web"
import styled from "styled-components"

const Container = styled(a.div)`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Jumbo = styled.div`
  white-space: pre;
  margin-bottom: 2.5rem;
  font-size: 7em;
  font-weight: 500;
  letter-spacing: 0px;
`

const NavRight = styled(a.div)`
  position: absolute;
  right: 50px;
  top: 50px;
`

const Box = styled(a.div)`
  position: absolute;
  transform: translate3d(-50%, -42%, 0);
  will-change: opacity;
`

const Line = styled(a.div)`
  position: relative;
  width: 100%;
  will-change: transform;
  overflow: hidden;
  line-height: 1.5em;
`

const Cover = styled(a.div)`
  position: absolute;
  will-change: background, transform;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
`

function Nav(props) {
  return (
    <>
      <NavRight {...props}>
        <Link to="/">Torus</Link>
        <Link to="/knot">Knot</Link>
        <Link to="/bomb">Bomb</Link>
      </NavRight>
    </>
  )
}

export { Container, Jumbo, Nav, Box, Line, Cover }
