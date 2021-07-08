import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, margin, padding, bg, children, center, line, _onClick, is_right} = props;

  const styles = {
      is_flex: is_flex,
      width: width,
      margin: margin,
      padding: padding,
      bg: bg,
      center: center,
      line: line,
      is_right: is_right,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  line: false,
  is_right: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
  ${(props) =>
    props.is_right
      ? `display: block; align-items: center; text-align: right;`
      : ""}
  ${(props) => props.center ? `text-align: center;`: ""}
  ${(props) => props.line ? `border-bottom: ${props.line};` : ""}
`;

export default Grid;
