// components/button/Button.js

import Block from "../../modules/block";
// ��� ������������� ������������
import { compile } from "../../utils/templator";
import { template } from "./template";

export default class Button extends Block {
  constructor(props) {
        // ������ ������� DOM-������� button
    super("button", props);
  }

  render() {
        // � ������ ������ render ���������� ������� �������� �� �������������
    return compile(template, this.props);
  }
}